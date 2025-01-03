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

One use for `constant` is to set a default value for a tree using the [spread operator](/language/syntax.html#spread-operator):

```ori
// default.ori
${ samples.ori/help/default.ori }
```

The `...` spread operator merges in the `constant` tree so that it will serve as a backstop for any key not found in the set of explicitly-defined keys. Since `constant` returns a value for any key, this idiom has the effect of setting a default value for the merged tree.

```console
$ ori default.ori/a
${ yaml samples.ori/help/default.ori/a }
$ ori default.ori/x
${ yaml samples.ori/help/default.ori/x }
```

If you want to set a default value for a deep tree, instead of the spread operator use [`tree:deepMerge`](deepMerge.html) to merge the `constant` tree with the desired deep tree.
