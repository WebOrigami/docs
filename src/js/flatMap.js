import { merge, Tree } from "@weborigami/async-tree";
import { map } from "@weborigami/origami";

/** @this {import("@weborigami/types").AsyncTree} */
export default async function flatMap(treelike, options) {
  const mapped = await map.call(this, treelike, options);
  const values = [...(await Tree.values(mapped))];
  const filtered = values.filter((value) => value !== undefined);
  const merged = await merge.call(this, ...filtered);
  return merged;
}
