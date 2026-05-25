import { Tree } from "@weborigami/async-tree";
import { Origami } from "@weborigami/origami";

// Pick an icon for a page that is quasi-random but stable across visits.
export default async function chooseIcon(filePath, icons) {
  const iconNames = await Tree.keys(icons);
  const random = Origami.randomFrom(filePath);
  return iconNames[random % iconNames.length];
}
