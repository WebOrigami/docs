---
title: flat(map, [depth])
supertitle: "Tree."
---

Flattens the values of the [map-based](/async-tree/mapBasedTree.html) tree to the indicated `depth`. If `depth`
is omitted, a single level of the tree is flattened:

```console
$ ori Tree.flat { a: 1, more: { b: 2, sub: { c: 3 } }}
${ Origami.yaml(Tree.flat({ a: 1, more: { b: 2, sub: { c: 3 } }})) }
```

If the supplied `depth` is `Infinity`, the entire tree is flattened:

```console
$ ori Tree.flat { a: 1, more: { b: 2, sub: { c: 3 } }}, Infinity
${ Origami.yaml(Tree.flat({ a: 1, more: { b: 2, sub: { c: 3 } }}, Infinity)) }
```

If the flattened keys are all numeric, the result is an array:

```console
$ ori "Tree.flat([['a', 'b'], { 5: 'c', 6: 'd' }])"
${ Origami.yaml(Tree.flat([['a', 'b'], { 5: 'c', 6: 'd' }])) }
```
