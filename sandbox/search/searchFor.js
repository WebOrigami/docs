import algoliasearch from "algoliasearch";

const searchClient = algoliasearch(
  "D6JMTAAKIS",
  "50b3e28fe2725f8873726f3295812084"
);
const index = searchClient.initIndex("docs");

export default async function searchFor(query) {
  const hits = await index.search(query, {
    highlightPreTag: "<strong>",
    highlightPostTag: "</strong>",
  });
  return hits;
}
