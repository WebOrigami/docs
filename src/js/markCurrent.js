// Given a set of links, add an annotation to the link whose href is the current

import { ExplorableObject } from "@explorablegraph/explorable";

// page.
export default function markCurrent(links, currentPage) {
  if (!links) {
    return new ExplorableObject({});
  }
  const result = links.map((entry) => {
    if (entry.href === currentPage) {
      return Object.assign({ current: true }, entry);
    } else {
      return entry;
    }
  });
  return result;
}
