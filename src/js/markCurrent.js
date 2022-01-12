// Given a set of links, add an annotation to the link whose href is the current
// page.
export default function markCurrent(links, currentPage) {
  if (!links) {
    return undefined;
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
