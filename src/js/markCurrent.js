// Given a set of links, add an annotation to the link whose href is the current
// page.

import { ExplorableGraph, ExplorableObject } from "@explorablegraph/explorable";

export default async function markCurrent(variant, currentPage) {
  if (!variant) {
    return new ExplorableObject({});
  }
  const links = Object.values(await ExplorableGraph.plain(variant));
  const result = links.map((entry) => {
    const current = entry.href === currentPage;
    return Object.assign({ current }, entry);
  });
  return result;
}
