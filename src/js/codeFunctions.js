import { ObjectGraph } from "@explorablegraph/explorable";

/**
 * Given JavaScript source code, returns a graph of the source code for the
 * code's top-level functions. Anything before the first function is included
 * under the special key `@prologue`, and anything after the last function is
 * included under the special key `@epilogue`.
 */
export default function codeFunctions(code) {
  return new CodeFunctionsGraph(code.toString());
}

class CodeFunctionsGraph extends ObjectGraph {
  constructor(code) {
    const functionRegex =
      /(\/\/.+)?\n(async )?function (?<name>.+)\([\s\S]+?\n\}\n/g;
    const matches = [...code.matchAll(functionRegex)];
    const functions = {};
    functions["@prologue"] = code.slice(0, matches[0].index).trim();
    for (const match of matches) {
      functions[match.groups.name] = match[0];
    }
    const lastMatch = matches[matches.length - 1];
    if (lastMatch) {
      functions["@epilogue"] = code
        .slice(lastMatch.index + lastMatch[0].length)
        .trim();
    }
    super(functions);
  }
}
