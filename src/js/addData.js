import { TextDocument } from "@graphorigami/origami";

export default function addData(document, area, fileName) {
  fileName = String(fileName);

  // HACK
  if (fileName.endsWith(".md")) {
    fileName = `${fileName.slice(0, -3)}.html`;
  }

  // HACK
  const documentData = document.data?.object ?? document.data;

  const data = Object.assign({}, documentData, {
    area: String(area),
    fileName,
  });
  return new TextDocument(document, data);
}
