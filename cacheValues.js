import {
  applyMixinToObject,
  CachedValuesTransform,
  ExplorableGraph,
} from "@explorablegraph/explorable";

export default async function cacheValues(variant) {
  const graph = ExplorableGraph.from(variant);
  const mixed = applyMixinToObject(CachedValuesTransform, graph);
  return mixed;
}
