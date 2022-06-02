import {
  ObjectGraph,
  extractFrontMatter,
  MetaTransform,
} from "@explorablegraph/explorable";
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
  // applied to this subgraph.
  data.asserts = {};
  asserts.forEach((assert, index) => {
    data.asserts[index] = assert;
  });

  const meta = new (MetaTransform(ObjectGraph))(data);
  meta.parent = this;

  return meta;
}
