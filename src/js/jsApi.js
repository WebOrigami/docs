import {
  extension,
  isPlainObject,
  toPlainValue,
  toString,
  trailingSlash,
  Tree,
} from "@weborigami/async-tree";
import path from "node:path";
import ts from "typescript";
/**
 * Extracts the documentation from the given JavaScript source tree. This uses
 * the TypeScript compiler to parse the source file, and returns information
 * from both the documentation comments and type signatures.
 */
export default async function jsDocs(treelike) {
  const tree = Tree.from(treelike);
  const plain = await toPlainValue(tree);

  const paths = sourceFilePaths(plain);
  const host = await virtualHost(plain);
  const options = {
    allowJs: true,
    module: ts.ModuleKind.ESNext,
  };

  const program = ts.createProgram(paths, options, host);

  const result = await docsTree(tree, program);
  result.parent = this;
  return result;
}

/** Serialize a class symbol information */
function classDocs(checker, symbol) {
  const result = {
    kind: "class",
  };

  // Get the construct signatures
  let constructorType = checker.getTypeOfSymbolAtLocation(
    symbol,
    symbol.valueDeclaration
  );
  const constructorSignature = constructorType.getConstructSignatures()[0];
  if (constructorSignature.declaration) {
    result.classConstructor = {
      name: checker.typeToString(constructorSignature.getReturnType()),
      isConstructor: true,
      description: ts.displayPartsToString(
        constructorSignature.declaration.symbol.getDocumentationComment(checker)
      ),
      parameters: parametersDocs(checker, constructorSignature),
    };
  }

  const staticMembers = constructorType.properties
    .map((staticPropertySymbol) => {
      const docs = symbolDocs(checker, staticPropertySymbol);
      docs.static = true;
      return docs;
    })
    .filter((member) => member.kind && member?.description);

  const classType = checker.getTypeAtLocation(symbol.valueDeclaration);
  const propertySymbols = classType.getProperties();
  const instanceMembers = propertySymbols
    .map((propertySymbol) => symbolDocs(checker, propertySymbol))
    .filter((member) => member.kind && member?.description);

  if (staticMembers.length > 0 || instanceMembers.length > 0) {
    result.members = [...(staticMembers ?? []), ...(instanceMembers ?? [])];
  }

  return result;
}

// Given a tree of source files, return a tree of documentation objects
async function docsTree(sourceTree, program, docsPath = "") {
  // We'd like to use a deep map with extensions, but we have to do special
  // handling to construct paths, so we handle the deep behavior ourselves
  return Tree.map(sourceTree, {
    inverseKey: (resultKey) =>
      extension.match(resultKey, ".yaml")
        ? extension.replace(resultKey, ".yaml", ".js")
        : trailingSlash.has(resultKey)
        ? resultKey
        : undefined,

    key: (sourceValue, sourceKey) =>
      extension.match(sourceKey, ".js")
        ? extension.replace(sourceKey, ".js", ".yaml")
        : trailingSlash.has(sourceKey)
        ? sourceKey
        : undefined,

    value: (sourceValue, sourceKey) => {
      const sourcePath = `${trailingSlash.add(docsPath)}${trailingSlash.remove(
        sourceKey
      )}`;
      if (Tree.isMap(sourceValue)) {
        // Folder; add the key to the path
        return docsTree(sourceValue, program, sourcePath);
      } else {
        // Single .js file
        const sourceFile = program.getSourceFile(sourcePath);
        const checker = program.getTypeChecker();
        const name = path.basename(sourceKey, ".js");
        return {
          name,
          exports: exportsDocs(checker, sourceFile),
        };
      }
    },
  });
}

/**
 * Return docs for the exports of the given source file node.
 *
 * @param {ts.TypeChecker} checker
 * @param {ts.Node} node
 */
function exportsDocs(checker, node) {
  const results = [];

  // Walk the tree
  ts.forEachChild(node, (child) => {
    if (!isNodeExported(child)) {
      // Skip non-exported node
      return;
    }

    // Get symbol for this node.
    const symbol = checker.getSymbolAtLocation(child.name);

    // Get docs for that symbol.
    const docs = symbol && child.name ? symbolDocs(checker, symbol) : null;

    if (docs) {
      results.push(docs);
    }
  });

  return results;
}

/** True if this is exported by this file. */
function isNodeExported(node) {
  return (
    (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0
    // || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

function methodDocs(checker, symbol) {
  const methodType = checker.getTypeOfSymbolAtLocation(
    symbol,
    symbol.valueDeclaration
  );
  const signature = methodType.getCallSignatures()[0];
  const returnType = signature.getReturnType();
  const returnTypes = renderTypes(checker, returnType);
  const result = {
    kind: "function",
    returnTypes,
  };

  result.parameters = parametersDocs(checker, signature);

  const async = ts.isAsyncFunction(signature.declaration);
  if (async) {
    result.async = true;
  }

  const generator = signature.declaration.asteriskToken !== undefined;
  if (generator) {
    result.generator = true;

    // HACK: ts.isAsyncFunction doesn't seem to work for async generators. If we
    // have a generator named "__@asyncIterator", we guess that it's been
    // declared async.
    if (symbol.getName() === "__@asyncIterator") {
      result.async = true;
    }
  }

  return result;
}

// The TypeChecker can render a complex type to a string, but we want to
// decompose that into its component types.
function renderTypes(checker, type) {
  // The `boolean` type is actually composed of two types: `true` and `false`,
  // but we just want to return `boolean`.
  const multipleTypes =
    type.types !== undefined && type.intrinsicName !== "boolean";
  let result = multipleTypes
    ? type.types.map((type) => checker.typeToString(type))
    : [checker.typeToString(type)];
  // HACK: Map `{}` to `unknown`
  result = result.map((type) => (type === "{}" ? "unknown" : type));
  return result;
}

function parameterDocs(checker, parameter) {
  const valueDeclaration = parameter.valueDeclaration;

  const type = checker.getTypeOfSymbolAtLocation(parameter, valueDeclaration);
  let types = renderTypes(checker, type);

  // Don't yet understand enough about the TypeChecker API to know why user
  // types defined in other files can be represented in, say, VS Code, but show
  // up as `any` or `{}` when we ask the checker for the type name.
  const typeString = checker.typeToString(type);
  if (typeString === "any" || typeString === "{}") {
    types =
      parameterTypesFromComment(
        checker,
        valueDeclaration.jsDocCache?.[0]?.typeExpression.type
      ) ?? types;
  }

  const result = {
    types,
  };

  const optional = checker.isOptionalParameter(valueDeclaration);
  if (optional) {
    result.optional = true;
  }

  return result;
}

function parametersDocs(checker, signature) {
  const docs = signature.parameters.map((parameter) =>
    symbolDocs(checker, parameter)
  );

  // TypeScript adds a mysterious `args` parameter to the end of every function
  // that inspects `arguments`. We remove that from the API.
  const lastArg = docs.length > 0 ? docs[docs.length - 1] : null;
  if (lastArg?.name === "args" && lastArg?.type === undefined) {
    docs.pop();
  }

  return docs;
}

// HACK: We try to extract the type name(s) from a jsDoc comment.
function parameterTypesFromComment(checker, comment) {
  if (!comment) {
    return null;
  } else if (comment.types) {
    // Multiple types in comment
    const typeNames = comment.types.map((type) =>
      parameterTypeFromCommentType(checker, type)
    );
    return typeNames;
  } else {
    return [parameterTypeFromCommentType(checker, comment)];
  }
}

function parameterTypeFromCommentType(checker, commentType) {
  if (commentType.typeName) {
    return commentType.typeName.text;
  } else {
    const type = checker.getTypeAtLocation(commentType);
    return type ? checker.typeToString(type) : null;
  }
}

// Return docs for the given symbol.
function symbolDocs(checker, symbol) {
  let name = symbol.getName();
  const isDefault = name === "default";
  if (isDefault) {
    // Not quite sure what the best way to get the real name of a default object
    // is; improvising.
    name = symbol.declarations[0]?.localSymbol.getName() ?? name;
  } else if (name.startsWith("__@")) {
    // Use more standard `[Symbol.foo]` notation.
    name = `[Symbol.${name.slice(3)}]`;
  }

  const result = {
    name,
  };

  if (isDefault) {
    result.default = true;
  }

  const description = ts.displayPartsToString(
    symbol.getDocumentationComment(checker)
  );
  if (description) {
    result.description = description;
  }

  const valueDeclaration = symbol.valueDeclaration;
  if (valueDeclaration) {
    const mapNodeTypeToDocs = {
      isClassDeclaration: classDocs,
      isFunctionDeclaration: methodDocs,
      isMethodDeclaration: methodDocs,
      isPartOfParameterDeclaration: parameterDocs,
    };

    let docsFn;
    for (const [isNodeType, fn] of Object.entries(mapNodeTypeToDocs)) {
      if (ts[isNodeType](valueDeclaration)) {
        docsFn = fn;
        break;
      }
    }
    const additionalDocs = docsFn ? docsFn(checker, symbol) : null;
    if (additionalDocs) {
      Object.assign(result, additionalDocs);
    }
  }

  return result;
}

// In the given plain object, return the paths to .js and .ts source files.
function sourceFilePaths(plain, root = "") {
  const result = [];
  for (const [key, value] of Object.entries(plain)) {
    if (isPlainObject(value)) {
      result.push(...sourceFilePaths(value, `${root}/${key}`));
    } else if (key.endsWith(".js") || key.endsWith(".ts")) {
      result.push(`${root}/${key}`);
    }
  }
  return result;
}

// Traverse the indicated path in a plain object.
function traverse(plain, path) {
  const keys = path.split("/");
  let current = plain;
  for (const key of keys) {
    if (!key) {
      continue;
    }
    current = current[key];
    if (!current) {
      return undefined;
    }
  }
  return current;
}

// Create a virtual compiler host serving the plain object tree.
async function virtualHost(plain) {
  // directoryExists: (dirPath) => dirPath === "/",
  // getDirectories: () => [],

  return {
    fileExists: (filePath) => traverse(plain, filePath) !== undefined,
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "",
    getNewLine: () => "\n",
    getSourceFile: (filePath) =>
      ts.createSourceFile(filePath, toString(traverse(plain, filePath))),
    readFile: (filePath) => toString(traverse(plain, filePath)),
    useCaseSensitiveFileNames: () => true,
    // writeFile: (fileName, contents) => {
    //   plain[fileName] = contents;
    // },
  };
}
