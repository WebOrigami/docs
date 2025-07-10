---
title: constant(value)
supertitle: "tree:"
---

This returns a deep tree that returns the indicated `value` for any path.

```ori
// constant.ori
${ <samples.jse/help/constant.ori> }
```

This always returns the value 1 for any path:

```console
$ ori constant.ori/a
${ Origami.yaml(<samples.jse/help/constant.ori/a>) }
$ ori constant.ori/b
${ Origami.yaml(<samples.jse/help/constant.ori/b>) }
$ ori constant.ori/a/b/c
${ Origami.yaml(<samples.jse/help/constant.ori/a/b/c>) }
```

## Set a default value

One use for `constant` is to [define a default value for a tree](/language/idioms.html#define-a-default-value) using [`tree:deepMerge`](deepMerge.html).

```ori
// deepDefault.ori
${ <samples.jse/help/deepDefault.ori> }
```

This provides the default value of zero for any level of the tree:

```console
$ ori deepDefault.ori/a
${ Origami.yaml(<samples.jse/help/deepDefault.ori/a>) }
$ ori deepDefault.ori/x
${ Origami.yaml(<samples.jse/help/deepDefault.ori/x>) }
$ ori deepDefault.ori/b/c
${ Origami.yaml(<samples.jse/help/deepDefault.ori/b/c>) }
$ ori deepDefault.ori/b/y
${ Origami.yaml(<samples.jse/help/deepDefault.ori/b/y>) }
```
