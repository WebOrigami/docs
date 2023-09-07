// Given a set of links, add an annotation to the link whose href is the current
// page.

import { GraphHelpers, ObjectGraph } from "@graphorigami/origami";

export default async function markCurrent(variant, currentPage) {
  if (!variant) {
    return new ObjectGraph({});
  }
  const links = Object.values(await GraphHelpers.plain(variant));
  const result = links.map((entry) => {
    const current = entry.href === currentPage;
    return Object.assign({ current }, entry);
  });
  return result;
}
