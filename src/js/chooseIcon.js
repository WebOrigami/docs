import { Tree } from "@weborigami/async-tree";
import { createHash } from "node:crypto";

// Pick an icon for a page that is quasi-random but stable across visits.
export default async function chooseIcon(filePath, icons) {
  const iconNames = await Tree.keys(icons);
  const hash = createHash("sha256").update(filePath).digest().readUInt32LE(0);
  return iconNames[hash % iconNames.length];
}
