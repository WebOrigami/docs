// Given a set of links, add an annotation to the link whose href is the current
// page.

import { Graph, ObjectGraph } from "@graphorigami/origami";

export default async function markCurrent(graphable, currentPage) {
  if (!graphable) {
    return new ObjectGraph({});
  }
  const links = Object.values(await Graph.plain(graphable));
  const result = links.map((entry) => {
    const current = entry.href === currentPage;
    return Object.assign({ current }, entry);
  });
  return result;
}
