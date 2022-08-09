// Extract the current area from end of the path.
export default function (path) {
  if (!path) {
    return undefined;
  }
  const parts = path.split("/");
  const area = parts[parts.length - 1];
  return "/" + area;
}
