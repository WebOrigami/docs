// Extract the current page from end of the path.
export default function (path) {
  if (!path) {
    return undefined;
  }
  const parts = path.split("/");
  const result = parts[parts.length - 1];
  return result;
}
