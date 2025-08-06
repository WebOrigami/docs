---
title: Origami idioms
---

These [programming idioms](https://en.wikipedia.org/wiki/Programming_idiom) are small, useful code patterns whose working may not be immediately obvious. They are not Origami language features but fall out of how the language works.

## Return a result from a tree

It can be helpful to break down the construction of complex tree values into simpler temporary values that are used but not made publicly available.

One way to accomplish this is to have a tree define a `public` value that is later extracted from the tree.

As a trivial example, this program defines a site whose `index.html` includes a `name` value:

```ori
// public.ori
${ samples.jse/help/public.jse }
```

Along with `index.html`, this tree will expose the `name` value:

```console
$ ori public.ori/
${ Origami.yaml(samples.jse/help/public.jse) }
```

But if you don't want the `name` value to be exposed, you can move the portion of the tree you _do_ want to expose into a `public` subtree, and then arrange to return only that subtree:

```ori
// private.ori
${ samples.jse/help/private.jse }
```

This program effectively defines a [closure](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>): inside the `public` subtree, the `name` property is available for use in calculations.

The `.public` at the end of the program returns only the `public` subtree, so the internal `name` value is not available externally:

```console
$ ori private.ori/
${ Origami.yaml(samples.jse/help/private.jse) }
```

## Define a default value

You can define a default value for a tree using the [spread operator](syntax.html#spread-operator) with a [lambda function](syntax.html#lambda-functions):

```ori
// default.ori
${ samples.jse/help/default.jse }
```

This tree returns the indicated value for any defined key, and zero for anything else:

```console
$ ori default.ori/a
${ Origami.yaml(samples.jse/help/default.jse/a) }
$ ori default.ori/b
${ Origami.yaml(samples.jse/help/default.jse/b) }
$ ori default.ori/x
${ Origami.yaml(samples.jse/help/default.jse/x) }
```

This works as follows:

- The `() => 0` syntax defines a function that returns zero for any input.
- The `...` spread operator merges that function into the tree.
- Merging the function into the tree implicitly turns it into a tree: asking this tree for a key will call the indicated function, which will return zero.
- The merged tree ends up combining two trees: 1) the tree defined by the `=0` function, and 2) the tree of the explicitly defined keys and values.

When asked to get a key, the merged tree starts by consulting the _second_ tree (of explicit keys/values). If the tree has a value, that will be returned. Otherwise, the merged tree consults the first tree (the function).

The idiom as written above is suitable for shallow trees: the `...` spread operator does a shallow merge, and the `() => 0` function defines a shallow tree.

You can adapt this idiom to provide a default value for deep trees using the [`Tree.deepMerge`](/builtins/tree/deepMerge.html) function to do the merge and the [`Tree.constant`](/builtins/tree/constant.html) builtin to define the default value.

```ori
// deepDefault.ori
${ samples.jse/help/deepDefault.jse }
```

This provides the default value of zero for any level of the tree:

```console
$ ori deepDefault.ori/a
${ Origami.yaml(samples.jse/help/deepDefault.jse/a) }
$ ori deepDefault.ori/x
${ Origami.yaml(samples.jse/help/deepDefault.jse/x) }
$ ori deepDefault.ori/b/c
${ Origami.yaml(samples.jse/help/deepDefault.jse/b/c) }
$ ori deepDefault.ori/b/y
${ Origami.yaml(samples.jse/help/deepDefault.jse/b/y) }
```

One use for this is to provide a default "Not found" page for a dynamic site:

```ori
${ samples.jse/help/notFound.jse }
```

## Extract specific resources from a site

The [`httpstree:`](/builtins/Protocol/httpstree.html) protocol lets you treat a live website as a tree. Since sites don't generally make their keys (routes) available, you can only use such a tree to obtain values at known routes.

That said, if you know the routes you want to extract from a site, you can combine `httpstree:` with [`Tree.deepMerge`](/builtins/tree/deepMerge.html) to extract those specific routes.

```ori
// extract.ori

${ samples.jse/help/extract.jse }
```

This merges two trees together:

1. The `httpstree:` defines an opaque tree with values but no keys.
2. The object literal defines a skeleton tree with keys but no defined values.

When this merged tree is asked to enumerate its keys, it will return the keys from the second tree. When the merged tree is later asked for the values of those keys, it will look for those in the second tree -- but since that tree has no defined values, the values from the first tree (the site) will be used.

The result is the tree of explicitly-requested resources from the site:

```console
$ ori extract.ori/
index.html: [contents of index.html]
language:
  index.html: [contents of language/index.html]
```

This technique is useful when you know the set of resources you want to fetch. If you don't know what resources the site provides, the [`dev:crawl`](/builtins/dev/crawl.html) builtin can return the complete publicly-reachable set of resources.
