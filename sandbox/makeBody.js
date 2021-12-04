export default async function makeBody(content) {
  return content
    ? {
        body: String(content),
      }
    : undefined;
}
