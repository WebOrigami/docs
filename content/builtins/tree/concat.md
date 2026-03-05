---
title: concat(...maps)
supertitle: "Tree."
---

This is a variation of [`Tree.merge`](merge.html) that renumbers numeric keys in a set of [map-like](/async-tree/maplike.html) objects. It is conceptually similar to, but more general than, the standard [`Array.prototype.concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method.

If the supplied maps all have numeric keys, the result is a flat array:

```console
$ ori "Tree.concat(['a', 'b'], { 1: 'c', 2: 'd' })"
${ Origami.yaml(Tree.concat(['a', 'b'], { 1: 'c', 2: 'd' })) }
```

If the maps have a mixture of numeric and non-numeric keys, the result is a `Map` that renumbers the numeric keys and leaves the non-numeric keys alone:

```console
$ ori "Tree.concat(['a', 'b'], { x: 1, y: 2 }, ['c', 'd' ])"
${ Origami.yaml(Tree.concat(['a', 'b'], { x: 1, y: 2 }, ['c', 'd' ])) }
```

When used with arrays, the `concat` function performs the same function as the `...` [spread operator](/language/expressions.html#spread-operator):

```console
$ ori "Tree.concat(['a', 'b'], ['c', 'd'])
${ Origami.yaml(Tree.concat(['a', 'b'], ['c', 'd']))}
$ ori "[...['a', 'b'], ...['c', 'd']]"
${ Origami.yaml([...['a', 'b'], ...['c', 'd']])}
```
