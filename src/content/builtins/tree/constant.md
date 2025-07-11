---
title: constant(value)
supertitle: "Tree."
---

This returns a deep tree that returns the indicated `value` for any path.

```ori
// constant.ori
${ <samples.jse/help/constant.jse> }
```

This always returns the value 1 for any path:

```console
$ ori constant.ori/a
${ Origami.yaml(<samples.jse/help/constant.jse/a>) }
$ ori constant.ori/b
${ Origami.yaml(<samples.jse/help/constant.jse/b>) }
$ ori constant.ori/a/b/c
${ Origami.yaml(<samples.jse/help/constant.jse/a/b/c>) }
```

## Set a default value

One use for `constant` is to [define a default value for a tree](/language/idioms.html#define-a-default-value) using [`Tree.deepMerge`](deepMerge.html).

```ori
// deepDefault.ori
${ <samples.jse/help/deepDefault.jse> }
```

This provides the default value of zero for any level of the tree:

```console
$ ori deepDefault.ori/a
${ Origami.yaml(<samples.jse/help/deepDefault.jse/a>) }
$ ori deepDefault.ori/x
${ Origami.yaml(<samples.jse/help/deepDefault.jse/x>) }
$ ori deepDefault.ori/b/c
${ Origami.yaml(<samples.jse/help/deepDefault.jse/b/c>) }
$ ori deepDefault.ori/b/y
${ Origami.yaml(<samples.jse/help/deepDefault.jse/b/y>) }
```
