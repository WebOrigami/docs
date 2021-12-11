import { ExplorableGraph } from "@explorablegraph/explorable";
import algoliasearch from "algoliasearch";

const adminClient = algoliasearch(
  "D6JMTAAKIS",
  "4cf6110908f0f80dd5acf60fd27b8f24"
);

export default async function index(graph, indexName) {
  const objects = [];
  await visit(graph, async (value, key) => {
    objects.push({
      objectID: key,
      ...value,
    });
  });

  const testIndex = adminClient.initIndex(indexName);
  await testIndex.clearObjects();
  await testIndex.saveObjects(objects);
}

async function visit(graph, visitorFn) {
  for await (const key of graph) {
    const value = await graph.get(key);
    // Ignore system files
    if (key.startsWith?.(".")) {
      continue;
    } else if (ExplorableGraph.isExplorable(value)) {
      await visit(value, visitorFn);
    } else {
      await visitorFn(value, key);
    }
  }
}
