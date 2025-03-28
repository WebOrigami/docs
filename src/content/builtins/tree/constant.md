---
title: constant(value)
supertitle: "tree:"
---

This returns a deep tree that returns the indicated `value` for any path.

```ori
// constant.ori
${ samples.ori/help/constant.ori }
```

This always returns the value 1 for any path:

```console
$ ori constant.ori/a
${ yaml samples.ori/help/constant.ori/a }
$ ori constant.ori/b
${ yaml samples.ori/help/constant.ori/b }
$ ori constant.ori/a/b/c
${ yaml samples.ori/help/constant.ori/a/b/c }
```

## Set a default value

One use for `constant` is to [define a default value for a tree](/language/idioms.html#define-a-default-value) using [`tree:deepMerge`](deepMerge.html).

```ori
// deepDefault.ori
${ samples.ori/help/deepDefault.ori }
```

This provides the default value of zero for any level of the tree:

```console
$ ori deepDefault.ori/a
${ yaml(samples.ori/help/deepDefault.ori/a) }
$ ori deepDefault.ori/x
${ yaml(samples.ori/help/deepDefault.ori/x) }
$ ori deepDefault.ori/b/c
${ yaml(samples.ori/help/deepDefault.ori/b/c) }
$ ori deepDefault.ori/b/y
${ yaml(samples.ori/help/deepDefault.ori/b/y) }
```
