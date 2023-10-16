import {
  MetaTransform,
  ObjectTree,
  StringWithTree,
  Tree,
  config,
} from "@graphorigami/origami";
import assert from "assert/strict";

export default async function (variant) {
  if (!variant) {
    return undefined;
  }
  const tree = Tree.from(variant);
  const obj = await Tree.plain(tree);
  const test = new (MetaTransform(ObjectTree))(obj);
  test.parent = this?.tree ?? (await config());
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
  return result instanceof StringWithTree
    ? result.toString()
    : Tree.isAsyncDictionary(result)
    ? await Tree.plain(result)
    : result;
}
