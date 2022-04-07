export const codeBlockRegex = /```(?<language>.+)\n(?<code>[\s\S]*?)```/g;

export default function mdCode(markdownBuffer) {
  const markdown = String(markdownBuffer);
  // const normalized = markdown.replace("\r\n", "\n");
  const normalized = markdown.replaceAll("\r", "");
  const matches = [...normalized.matchAll(codeBlockRegex)];

  const codeBlocks = {};
  matches.forEach((match, index) => {
    const { language, code } = match.groups;
    const key = `${index}.${language}`;
    codeBlocks[key] = code;
  });

  return codeBlocks;
}
