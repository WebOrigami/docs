import { Tree } from "@weborigami/async-tree";

/** @this {import("@weborigami/types").AsyncTree} */
export default async function flatMap(treelike, options) {
  const mapped = await Tree.map.call(this, treelike, options);
  const values = [...(await Tree.values(mapped))];
  const filtered = values.filter((value) => value !== undefined);
  const merged = await Tree.merge.call(this, ...filtered);
  return merged;
}
