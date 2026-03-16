---
title: flat(map, [depth])
supertitle: "Tree."
---

Flattens the values of the [map-based](/async-tree/mapBasedTree.html) tree to the indicated `depth`. If `depth`
is omitted, a single level of the tree is flattened.

This can be useful when, for example, you have a folder or tree-like hierarchy in which individual items have unique names, and you want to flatten that hierarchy by a given amount.

Example: a folder called `posts` contains subfolders numbered by year, then by month:

```console
$ ori posts
${ Origami.yaml(samples/help/flat/posts) }
```

Passing this folder tree to `Tree.flat` flattens it by one level:

```console
$ ori Tree.flat posts
${ Origami.yaml(Tree.flat(samples/help/flat/posts)) }
```

You can flatten the entire tree by passing a `depth` of `Infinity`:

```console
$ ori Tree.flat posts, Infinity
${ Origami.yaml(Tree.flat(samples/help/flat/posts, Infinity)) }
```

Note: if the flattened keys are all numeric, the result is an array with renumbered indices:

```console
$ ori "Tree.flat([['a', 'b'], { 5: 'c', 6: 'd' }])"
${ Origami.yaml(Tree.flat([['a', 'b'], { 5: 'c', 6: 'd' }])) }
```
