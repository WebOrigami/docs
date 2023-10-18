import { MergeTree, TextDocument } from "@graphorigami/origami";
import chooseIcon from "./chooseIcon.js";
import markCurrent from "./markCurrent.js";

export default async function addData(
  buffer,
  area,
  fileName,
  areas,
  pages,
  icons
) {
  const document = await buffer.unpack();
  const { data } = document;

  fileName = String(fileName);

  // HACK
  if (fileName.endsWith(".md")) {
    fileName = `${fileName.slice(0, -3)}.html`;
  }

  area = String(area);
  const areaHref = `/${area}/`;
  const areaLinks = await markCurrent(areas, areaHref);

  const filePath = area ? `${area}/${fileName}` : `/${fileName}`;
  const icon = data.icon ?? (await chooseIcon(filePath, icons));

  const pageLinks = await markCurrent(pages, fileName);

  const merged = new MergeTree(data, {
    area,
    areaLinks,
    fileName,
    icon,
    pageLinks,
  });

  return new TextDocument(document, merged, document.parent);
}
