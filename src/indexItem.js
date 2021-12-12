import path from "path";

export default function indexItem(fileName) {
  const text = path.basename(fileName, ".md");
  const href =
    path.extname(fileName) === ".md"
      ? `${path.basename(fileName, ".md")}.html`
      : fileName;
  return {
    text,
    href,
  };
}
