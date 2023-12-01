import { Tree } from "@graphorigami/async-tree";
import { map } from "@graphorigami/origami";

export default async function separatedList(list, separator, valueMap) {
  if (!list) {
    return undefined;
  }
  const mapped = map.call(this, list, valueMap);
  const values = await Tree.values(mapped);
  const trimmed = values.map((value) => value.trim());
  const result = trimmed.join(separator);
  return result;
}
