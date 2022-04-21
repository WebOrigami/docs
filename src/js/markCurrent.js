// Given a set of links, add an annotation to the link whose href is the current

import { ExplorableObject } from "@explorablegraph/explorable";

// page.
export default function markCurrent(links, currentPage) {
  if (!links) {
    return new ExplorableObject({});
  }
  const result = links.map((entry) => {
    const current = entry.href === currentPage;
    return Object.assign({ current }, entry);
  });
  return result;
}
