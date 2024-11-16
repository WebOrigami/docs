import { Tree } from "@weborigami/async-tree";
import { map } from "@weborigami/origami";

export default async function separatedList(list, separator, valueFn) {
  if (!list) {
    return undefined;
  }
  const mapped = await map.call(this, list, valueFn);
  const values = await Tree.values(mapped);
  const trimmed = values.map((value) => value.trim());
  const result = trimmed.join(separator);
  return result;
}
