import {
  extractFrontMatter,
  MetaTransform,
  ObjectTree,
} from "@graphorigami/origami";
import consoleAsserts from "./consoleAsserts.js";
import mdCode from "./mdCode.js";

// TODO: The following path traversal code was cut from ori.js as being too
// specific. Incorporate this into the mdAsserts function.

// // If a path was provided, traverse that before evaluating the code.
// //
// // REVIEW: This path-traversing feature of ori exists to support asserts,
// // which often need to traverse a tree before evaluating an assertion. That
// // feels too specific to support in this otherwise general-purpose function.
// // The use of slash-separated paths also feels too specific.
// if (path) {
//   const keys = path.split("/");
//   const [first, ...rest] = keys;
//   let tree = await scope.get(first);
//   if (!tree) {
//     return undefined;
//   }
//   tree = transformObject(InheritScopeTransform, tree);
//   tree.parent = scope;
//   tree = await Tree.traverse(tree, ...rest);
//   scope = getScope(tree);
// }

export default async function mdAsserts(markdown) {
  markdown = String(markdown);

  // Split off front matter (if present) from body text.
  const frontMatter = extractFrontMatter(markdown);
  const data = frontMatter?.frontData ?? {};
  const bodyText = frontMatter?.bodyText ?? markdown;

  // Extract code blocks from the body text.
  const codeBlocks = await mdCode(bodyText);

  // Find code with `console` as language and `assert: true` in metadata.
  const consoleCodeData = codeBlocks
    .filter(
      (codeBlock) =>
        codeBlock.language === "console" && codeBlock.metadata?.assert
    )
    .map((codeBlock) => ({
      code: codeBlock.code,
      path: codeBlock.metadata?.path,
    }));

  // Convert console asserts to regular asserts.
  const asserts = consoleCodeData.flatMap(consoleAsserts);

  // Add the extracted asserts to the data. Workaround: we expand the map to a
  // plain object so that the eventual application of the MetaTransform will be
  // applied to this subtree.
  data.asserts = {};
  asserts.forEach((assert, index) => {
    data.asserts[index] = assert;
  });

  const meta = new (MetaTransform(ObjectTree))(data);
  meta.parent = this;

  return meta;
}
