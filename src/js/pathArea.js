// Extract the current page from end of the path.
export default function (path) {
  if (!path) {
    return undefined;
  }
  const parts = path.split("/", 2);
  return parts.join("/");
}
