export default async function pageJson(markdownBuffer) {
  const body = String(markdownBuffer);
  return { body };
}
