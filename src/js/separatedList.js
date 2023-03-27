import { ExplorableGraph, mapValues } from "@graphorigami/origami";

export default async function separatedList(list, separator, itemFn) {
  if (!list) {
    return undefined;
  }
  const mapped = mapValues.call(this, list, itemFn);
  const values = await ExplorableGraph.values(mapped);
  const trimmed = values.map((value) => value.trim());
  const result = trimmed.join(separator);
  return result;
}
