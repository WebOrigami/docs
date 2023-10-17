import { MergeTree, TextDocument } from "@graphorigami/origami";

export default async function addData(buffer, area, fileName) {
  fileName = String(fileName);

  // HACK
  if (fileName.endsWith(".md")) {
    fileName = `${fileName.slice(0, -3)}.html`;
  }

  const document = await buffer.unpack();

  const merged = new MergeTree(document.data, {
    area: String(area),
    fileName,
  });

  return new TextDocument(document, merged, document.parent);
}
