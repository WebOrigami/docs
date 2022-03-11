// Extract the current page from end of the path.
export default function (path) {
  if (!path) {
    return undefined;
  }
  const parts = path.split("/");
  let result = parts[parts.length - 1];

  // HACK: convert .md page to .html page
  // Need to do this elsewhere
  if (result.endsWith(".md")) {
    result = result.slice(0, -3) + ".html";
  }

  return result;
}
