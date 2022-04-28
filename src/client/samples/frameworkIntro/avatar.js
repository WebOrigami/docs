import fetch from "node-fetch";

// Return a random avatar from the DiceBear Avatars web service.
// Given the same input key (like a name), this always returns the same avatar.
export default async function avatar(key) {
  const url = `https://avatars.dicebear.com/api/adventurer-neutral/${key}.svg`;
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}
