// Replace links in markdown with plain text
export default function stripLinks(markdown) {
  return markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
