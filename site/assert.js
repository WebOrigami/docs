import {
  ExplorableGraph,
  ExplorableObject,
  MetaMixin,
} from "@explorablegraph/explorable";
import assert from "assert/strict";

export default async function (variant) {
  if (!variant) {
    return undefined;
  }
  const graph = ExplorableGraph.from(variant);
  const obj = await ExplorableGraph.plain(graph);
  const test = new (MetaMixin(ExplorableObject))(obj);
  if (this?.scope) {
    test.scope = new Compose(graph, this.scope);
  }
  const description = await test.get("description");
  const expected = await test.get("expected");
  const expectedPlain = ExplorableGraph.isExplorable(expected)
    ? await ExplorableGraph.plain(expected)
    : expected;
  const actual = await test.get("actual");
  const actualPlain = ExplorableGraph.isExplorable(actual)
    ? await ExplorableGraph.plain(actual)
    : actual;
  try {
    assert.deepStrictEqual(actualPlain, expectedPlain);
    return undefined;
  } catch (e) {
    const result = description ? { description } : {};
    Object.assign(result, { expected: expectedPlain, actual: actualPlain });
    return result;
  }
}
