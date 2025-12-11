import token from "./token.json" with { type: "json" };

const MASTODON_BASE_URL = "https://fosstodon.org";

// Posts image, returns media ID on success or null on failure.
export default async function uploadImage(buffer, fileName, altText) {
  const formData = new FormData();
  formData.append("file", new Blob([buffer], { type: "image/png" }), fileName);
  if (altText) {
    formData.append("description", altText);
  }

  const response = await fetch(`${MASTODON_BASE_URL}/api/v2/media`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // fetch() sets multipart boundary automatically
    },
    body: formData,
  });

  if (!response.ok) {
    console.warn(
      `Media upload failed: ${response.status} ${await response.text()}`
    );
    return null;
  }

  const media = await response.json();
  return media;
}
