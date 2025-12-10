// Given a set of links, add an annotation to the link whose href is the current
// page.

import { ObjectMap, Tree } from "@weborigami/async-tree";

export default async function markCurrent(treelike, currentPage) {
  if (!treelike) {
    return new ObjectMap({});
  }
  const links = Object.values(await Tree.plain(treelike));
  const result = links.map((entry) => {
    // Compare the full href as well as just the page portion.
    const fullMatch = entry.href === currentPage;
    const pageMatch = entry.href.split("/").pop() === currentPage;
    const current = fullMatch || pageMatch;
    return Object.assign({ current }, entry);
  });
  return result;
}
