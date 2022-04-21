import YAML from "yaml";

export const codeBlockRegex =
  /```(?<language>\S+)(?<metadataText>[\S ]+)?\n(?<code>[\s\S]*?)```/g;

export default function mdCode(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const normalized = markdown.replaceAll("\r", "");
  const matches = [...normalized.matchAll(codeBlockRegex)];
  const codeBlocks = matches.map((match) => {
    const { language, metadataText, code } = match.groups;
    const metadata = metadataText ? YAML.parse(`{ ${metadataText} }`) : null;
    return { language, metadata, code };
  });
  return codeBlocks;
}
