// Extract the current page from end of the path.
export default function (path) {
  if (!path) {
    return undefined;
  }
  const parts = path.split("/");
  return parts[parts.length - 1];
}
