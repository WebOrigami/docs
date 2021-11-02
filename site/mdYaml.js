export const mdYamlRegex = /```yaml\n(?<yaml>[\s\S]*?)\n```/g;

export default function mdYaml(markdownBuffer) {
  // const yamlBlocks = [];
  const yamlBlocks = {};
  let count = 0;
  const markdown = String(markdownBuffer);
  for (const match of markdown.matchAll(mdYamlRegex)) {
    const { yaml } = match.groups;
    if (yaml) {
      // yamlBlocks.push(yaml);
      count++;
      yamlBlocks[count] = yaml;
    }
  }
  return yamlBlocks;
}
