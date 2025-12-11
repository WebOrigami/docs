// Remove some markdown features from the text
export default function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
    .replace(/_(.*?)_/g, "$1") // Italic
    .replace(/`(.*?)`/g, "$1") // Inline code
    .trim();
}
