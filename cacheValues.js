import {
  CachedValuesTransform,
  ExplorableGraph,
  transformObject,
} from "@explorablegraph/explorable";

export default async function cacheValues(variant) {
  const graph = ExplorableGraph.from(variant);
  const mixed = transformObject(CachedValuesTransform, graph);
  return mixed;
}
