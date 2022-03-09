import { ExplorableGraph } from "@explorablegraph/explorable";

// Pick an icon for a page that is quasi-random but stable across visits.
export default async function chooseIcon(page, icons) {
  if (!page || !icons) {
    return undefined;
  }

  // Treating the icons as buckets, hash the page URL to a bucket (icon).
  const keys = await ExplorableGraph.keys(icons);
  const pageHash = hash(page, keys.length);
  const icon = keys[pageHash];
  return icon;
}

function hash(key, buckets) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * (i + 1)) % buckets;
  }
  return hash;
}
