---
title: constant(value)
supertitle: "Tree."
---

This returns a deep tree that returns the indicated `value` for any path.

```ori
// constant.ori
${ samples/help/constant.ori }
```

This always returns the value 1 for any path:

```console
$ ori constant.ori/a
${ Origami.yaml(samples/help/constant.ori/a) }
$ ori constant.ori/b
${ Origami.yaml(samples/help/constant.ori/b) }
$ ori constant.ori/a/b/c
${ Origami.yaml(samples/help/constant.ori/a/b/c) }
```

## Set a default value

One use for `constant` is to [define a default value for a tree](/language/howTo.html#define-a-default-value) using [`Tree.deepMerge`](deepMerge.html).

```ori
// deepDefault.ori
${ samples/help/deepDefault.ori }
```

This provides the default value of zero for any level of the tree:

```console
$ ori deepDefault.ori/a
${ Origami.yaml(samples/help/deepDefault.ori/a) }
$ ori deepDefault.ori/x
${ Origami.yaml(samples/help/deepDefault.ori/x) }
$ ori deepDefault.ori/b/c
${ Origami.yaml(samples/help/deepDefault.ori/b/c) }
$ ori deepDefault.ori/b/y
${ Origami.yaml(samples/help/deepDefault.ori/b/y) }
```
