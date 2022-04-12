export const codeBlockRegex =
  /```(?<language>\S+)(?<metadata>[\S ]+)?\n(?<code>[\s\S]*?)```/g;

export default function mdCode(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const normalized = markdown.replaceAll("\r", "");
  const matches = [...normalized.matchAll(codeBlockRegex)];
  const codeBlocks = matches.map((match) => {
    const { language, metadata, code } = match.groups;
    return { language, metadata, code };
  });
  return codeBlocks;
}
