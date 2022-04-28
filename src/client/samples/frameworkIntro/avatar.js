import fetch from "node-fetch";

// Return an avatar from the Lorem Picsum service at https://picsum.photos.
// Given the same text key, the same image will always be returned.
export default async function avatar(key) {
  const url = `https://picsum.photos/seed/${key}/500/500`;
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}
