---
title: mask(tree, mask)
supertitle: "tree:"
---

This returns the tree that results from applying the `mask` tree to the `source` tree, preserving only keys that exist in `mask` and have a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value.

See also [`tree:filter`](filter.html).

## Example

Suppose `mask.ori` contains:

```ori
// mask.ori

${ samples.jse/help/mask.ori }
```

Invoking this returns the masked result:

```console
$ ori mask.ori/
${ yaml(samples.jse/help/mask.ori/) }
```

If the `mask` tree does not specify a value for a given key, the result of asking for that value will be `undefined`, which is a falsy value. This means it is not normally necessary to specify `false` values in the mask tree.

Above, `b` and `c/e` have been masked from the `source` tree because those do paths do not lead to truthy values in the `mask` tree.

## Default value

You can influence the result of a mask operation by [defining a default value](/language/idioms.html#define-a-default-value) for the mask tree using a shorthand function or [tree:constant](constant.html#set-a-default-value).

```ori
// maskDefault.ori
${ samples.jse/help/maskDefault.ori }
```

The above defines a mask where the default value is `true`, so all keys and values in the `source` tree will come through the mask unless specifically overridden with a falsy value.

```console
$ ori maskDefault.ori/
${ yaml(samples.jse/help/maskDefault.ori/) }
```

This flips the logic of `mask`: instead of only allowing truthy values in, this `mask` excludes falsy values.

## Mask with globs and regular expressions

You can use `mask` in conjunction with [`tree:globKeys`](globKeys.html) and [`tree:regExpKeys`](regExpKeys.html).
