import assert from "node:assert";
import test from "node:test";
import folder from "./folder.js";
import transform from "./transform.js";

const graph = transform(folder);

test("can iterate over the keys of the object", async () => {
  const keys = [];
  for await (const key of graph) {
    keys.push(key);
  }
  assert.deepEqual(keys, ["Alice.html", "Bob.html", "Carol.html"]);
});

test("can get the value for a key", async () => {
  const alice = await graph.get("Alice.html");
  assert.equal(alice, "<p>Hello, <strong>Alice</strong>.</p>\n");
});

test("getting a non-existent value returns undefined", async () => {
  const david = await graph.get("David.html");
  assert.equal(david, undefined);
});
