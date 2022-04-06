import { extractFrontMatter, MapGraph } from "@explorablegraph/explorable";
import consoleAsserts from "./consoleAsserts.js";
import mdCode from "./mdCode.js";

export default async function mdAsserts(markdown) {
  markdown = String(markdown);

  // Split off front matter (if present) from body text.
  const frontMatter = extractFrontMatter(markdown);
  const data = frontMatter?.frontData ?? {};
  const bodyText = frontMatter?.bodyText ?? markdown;

  // Extract code blocks from the body text.
  const codeBlocks = await mdCode(bodyText);

  // Convert console asserts to regular asserts.
  const withConsoleAsserts = new MapGraph(
    codeBlocks,
    consoleAsserts,
    ".console"
  );

  // Add the extracted asserts to the data.
  data.asserts = withConsoleAsserts;

  return data;
}
