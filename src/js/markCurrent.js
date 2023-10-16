// Given a set of links, add an annotation to the link whose href is the current
// page.

import { ObjectTree, Tree } from "@graphorigami/origami";

export default async function markCurrent(treelike, currentPage) {
  if (!treelike) {
    return new ObjectTree({});
  }
  const links = Object.values(await Tree.plain(treelike));
  const result = links.map((entry) => {
    const current = entry.href === currentPage;
    return Object.assign({ current }, entry);
  });
  return result;
}
