import token from "./token.json" with { type: "json" };

const MASTODON_BASE_URL = "https://fosstodon.org";

// Upload a post with the given data
export default async function uploadPost(data) {
  const body = JSON.stringify(data);
  const response = await fetch(`${MASTODON_BASE_URL}/api/v1/statuses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Posting status failed: ${response.status} ${text}`);
  }

  return response.json(); // Status object
}
