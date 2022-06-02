import {
  config,
  ExplorableGraph,
  ObjectGraph,
  MetaTransform,
  StringWithGraph,
} from "@explorablegraph/explorable";
import assert from "assert/strict";

export default async function (variant) {
  if (!variant) {
    return undefined;
  }
  const graph = ExplorableGraph.from(variant);
  const obj = await ExplorableGraph.plain(graph);
  const test = new (MetaTransform(ObjectGraph))(obj);
  test.parent = this?.graph ?? (await config());
  const description = await test.get("description");
  const expected = await test.get("expected");
  const expectedPlain = await plainResult(expected);
  const actual = await test.get("actual");
  const actualPlain = await plainResult(actual);
  try {
    assert.deepStrictEqual(actualPlain, expectedPlain);
    return undefined;
  } catch (e) {
    const result = description ? { description } : {};
    Object.assign(result, { expected: expectedPlain, actual: actualPlain });
    return result;
  }
}

async function plainResult(result) {
  return result instanceof StringWithGraph
    ? result.toString()
    : ExplorableGraph.isExplorable(result)
    ? await ExplorableGraph.plain(result)
    : result;
}
