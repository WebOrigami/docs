import {
  ExplorableGraph,
  ExplorableObject,
  MetaMixin,
} from "@explorablegraph/explorable";
import assert from "assert/strict";

export default async function (variant) {
  const graph = ExplorableGraph.from(variant);
  const obj = await ExplorableGraph.plain(graph);
  const test = new (MetaMixin(ExplorableObject))(obj);
  const description = await test.get("description");
  const expected = await test.get("expected");
  const actual = await test.get("actual");
  try {
    assert.deepStrictEqual(actual, expected);
    return undefined;
  } catch (e) {
    const result = description ? { description } : {};
    Object.assign(result, { expected, actual });
    return result;
  }
}
