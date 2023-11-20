import { Tree } from "@graphorigami/async-tree";
import { treeMap } from "@graphorigami/origami";

export default async function separatedList(list, separator, valueMap) {
  if (!list) {
    return undefined;
  }
  const mapped = treeMap.call(this, list, valueMap);
  const values = await Tree.values(mapped);
  const trimmed = values.map((value) => value.trim());
  const result = trimmed.join(separator);
  return result;
}
