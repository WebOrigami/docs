export const codeBlockRegex = /```(?<language>.+)\n(?<code>[\s\S]*?)```/g;

export default function mdCode(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const matches = [...markdown.matchAll(codeBlockRegex)];

  const codeBlocks = {};
  matches.forEach((match, index) => {
    const { language, code } = match.groups;
    const key = `${index}.${language}`;
    codeBlocks[key] = code;
  });

  return codeBlocks;
}
