import { Tree } from "@weborigami/async-tree";

export default async function flatMap(treelike, options) {
  const mapped = await Tree.map(treelike, options);
  const values = [...(await Tree.values(mapped))];
  const filtered = values.filter((value) => value !== undefined);
  const merged = await Tree.merge(...filtered);
  return merged;
}
