---
title: "Tree namespace"
subtitle: Work with trees
---

This is a collection of functions for working with tree structures built from maps: instances of the standard [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class, the asynchronous [`AsyncMap`](/async-tree/AsyncMap.html) variation, or [map-like](/async-tree/maplike.html) objects.

Most of the `Tree` operations accept such a map as their first argument. If the argument is not already a `Map` or `AsyncMap`, it will be wrapped in one.

Some operations like [`Tree.values`](/builtins/tree/values.html) are inherently shallow and only work on the input as if it were a flat map. Other operations like [`Tree.deepValues`](/builtins/tree/deepValues.html) treat their input as the root node of a [map-based tree](/async-tree/mapBasedTree.html) and generally walk through that tree structure.

```console
$ ori Tree.values { a: 1, b: { c: 2 }}
${ Origami.yaml(Tree.values({ a: 1, b: { c: 2 }})) }
$ ori Tree.deepValues { a: 1, b: { c: 2 }}
${ Origami.yaml(Tree.deepValues({ a: 1, b: { c: 2 }})) }
```

Here `Tree.values` returns the values of the map it is given, one of which is the object `{ c: 2 }`. The `Tree.deepValues` function walks the tree to returns the leaf values. To reflect this, `Tree.values` is documented as taking a `map` parameter, while `Tree.deepValues` is documented as taking a `tree` parameter.

## Commands by name

${ src/templates/commandList.ori/Tree }
