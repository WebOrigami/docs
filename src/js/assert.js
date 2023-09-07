import {
  GraphHelpers,
  MetaTransform,
  ObjectGraph,
  StringWithGraph,
  config,
} from "@graphorigami/origami";
import assert from "assert/strict";

export default async function (variant) {
  if (!variant) {
    return undefined;
  }
  const graph = GraphHelpers.from(variant);
  const obj = await GraphHelpers.plain(graph);
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
    : GraphHelpers.isAsyncDictionary(result)
    ? await GraphHelpers.plain(result)
    : result;
}
