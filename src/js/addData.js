import { Tree } from "@weborigami/async-tree";
import { documentObject, toString } from "@weborigami/origami";
import chooseIcon from "./chooseIcon.js";
import markCurrent from "./markCurrent.js";

export default async function addData(
  buffer,
  fileName,
  areas,
  tree,
  pages,
  icons
) {
  const object = await documentObject(buffer);

  // HACK
  if (fileName.endsWith(".md")) {
    fileName = `${fileName.slice(0, -3)}.html`;
  }

  let areaLinks;
  const scope = await Tree.scope(tree);
  const area = await scope.get("area");
  if (area) {
    const areaHref = `/${toString(area)}/`;
    areaLinks = await markCurrent(areas, areaHref);
  } else {
    areaLinks = areas;
  }

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
