---
title: flat(map, [depth])
supertitle: "Tree."
---

Flattens the values of the [map-based](/async-tree/mapBasedTree.html) tree to the indicated `depth`, with a default depth of 1.

```console
$ ori Tree.flat { a: 1, more: { b: 2 }}
${ Origami.yaml(Tree.flat({ a: 1, more: { b: 2 }})) }
$ ori Tree.flat { a: 1, more: { b: 2 }}, 2
${ Origami.yaml(Tree.flat({ a: 1, more: { b: 2 }}, 2)) }
```

If the supplied `depth` is `Infinity`, the `Tree.flat` function works like [`Tree.deepValues`](deepValues.html):

```console
$ ori Tree.flat { a: 1, more: { b: 2, sub: { c: 3 } }}, Infinity
${ Origami.yaml(Tree.flat({ a: 1, more: { b: 2, sub: { c: 3 } }}, Infinity)) }
$ ori Tree.deepValues { a: 1, more: { b: 2, sub: { c: 3 } }}
${ Origami.yaml(Tree.deepValues({ a: 1, more: { b: 2, sub: { c: 3 } }})) }
```
