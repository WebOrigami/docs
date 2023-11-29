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

  // HACK
  if (fileName.endsWith(".md")) {
    fileName = `${fileName.slice(0, -3)}.html`;
  }

  area = String(area);
  const areaHref = `/${area}/`;
  const areaLinks = await markCurrent(areas, areaHref);

  const filePath = area ? `${area}/${fileName}` : `/${fileName}`;
  const icon = document.icon ?? (await chooseIcon(filePath, icons));

  const pageLinks = await markCurrent(pages, fileName);

  return Object.assign(
    {
      area,
      areaLinks,
      fileName,
      icon,
      pageLinks,
    },
    document
  );
}
