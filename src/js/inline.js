import {
  ExplorableGraph,
  extractFrontMatter,
} from "@explorablegraph/explorable";

export default async function inline(buffer) {
  const text = String(buffer);
  const frontMatter = extractFrontMatter(text);
  let frontBlock;
  let bodyText;
  if (frontMatter) {
    ({ frontBlock, bodyText } = frontMatter);
  } else {
    frontBlock = "";
    bodyText = text;
  }

  const inlineRegex = /{{\s*inline\s(?<path>\S*)\s*}}/g;
  const matches = [...bodyText.matchAll(inlineRegex)];
  const valuePromises = matches.map(async (match) => {
    const path = match.groups.path;
    const keys = path.split("/");
    const value = await ExplorableGraph.traverse(this, ...keys);
    return value ?? `[Couldn't resolve path ${path}]`;
  });
  const values = await Promise.all(valuePromises);

  let index = 0;
  const inlined = bodyText.replace(inlineRegex, () => {
    return values[index++];
  });

  return `${frontBlock}${inlined}`;
}
