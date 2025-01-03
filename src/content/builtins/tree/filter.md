---
title: filter(source, filter)
supertitle: "tree:"
---

This returns the tree that results from applying the `filter` tree to the `source` tree, preserving only keys that exist in `filter` and have a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value.

Suppose `filter.ori` contains:

```ori
// filter.ori

${ samples.ori/help/filter.ori }
```

Invoking this returns the filtered result:

```console
$ ori filter.ori/
${ yaml(samples.ori/help/filter.ori/) }
```

If the `filter` tree does not specify a value for a given key, the result of asking for that value will be `undefined`, which is a falsy value. This means it is not normally necessary to specify `false` values in the filter tree.

Above, `b` and `c/e` have been filtered from the `source` tree because those do paths do not lead to truthy values in the `filter` tree.

## Default value

You can influence the result of a filter operation by defining a default value for the filter tree using [tree:constant](constant.html#set-a-default-value).

```ori
// filterDefault.ori
${ samples.ori/help/filterDefault.ori }
```

The above defines a filter where the default value is `true`, so all keys and values in the `source` tree will come through the filter unless specifically overridden with a falsy value.

```console
$ ori filterDefault.ori/
${ yaml(samples.ori/help/filterDefault.ori/) }
```

This flips the logic of `filter`: instead of only allowing truthy values in, this `filter` excludes falsy values.

## Filter with globs and regular expressions

You can use `filter` in conjunction with [`tree:globKeys`](globKeys.html) and [`tree:regExpKeys`](regExpKeys.html).

```ori
${ samples.ori/help/filterGlobs.ori }
```
