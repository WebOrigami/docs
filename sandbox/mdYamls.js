export const mdYamlRegex = /```yaml\n(?<yaml>[\s\S]*?)\n```/g;

export default function mdYaml(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const matches = [...markdown.matchAll(mdYamlRegex)];
  return matches.map((match) => match.groups.yaml);
}
