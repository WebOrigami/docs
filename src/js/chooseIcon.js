// Pick an icon for a page that is quasi-random but stable across visits.
export default async function chooseIcon(filePath, icons) {
  if (!filePath || !icons) {
    return undefined;
  }

  // Get the keys that end with .svg
  const keys = Array.from(await icons.keys()).filter((key) =>
    key.endsWith(".svg")
  );

  // Treating the icons as buckets, hash the page URL to a bucket (icon).
  const pageHash = hash(filePath, keys.length);
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
