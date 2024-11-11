import { documentObject } from "@weborigami/origami";
import chooseIcon from "./chooseIcon.js";
import markCurrent from "./markCurrent.js";

export default async function addData(buffer, fileName, areas, pages, icons) {
  const object = await documentObject(buffer);

  // HACK
  if (fileName.endsWith(".md")) {
    fileName = `${fileName.slice(0, -3)}.html`;
  }

  // area = String(area);
  const area = "";

  // const areaHref = `/${area}/`;
  // const areaLinks = await markCurrent(areas, areaHref);
  const areaLinks = areas;

  const filePath = area ? `${area}/${fileName}` : `/${fileName}`;
  const icon = object.icon ?? (await chooseIcon(filePath, icons));

  const pageLinks = pages ? await markCurrent(pages, fileName) : null;

  return Object.assign(
    {
      area,
      areaLinks,
      fileName,
      icon,
      pageLinks,
    },
    object
  );
}
