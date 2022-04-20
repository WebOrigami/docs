import fetch from "node-fetch";

// Return an avatar from DiceBear Avatars.
export default async function avatar(key) {
  const url = `https://avatars.dicebear.com/api/open-peeps/${key}.svg`;
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}
