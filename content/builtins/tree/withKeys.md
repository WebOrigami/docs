---
title: withKeys(tree, keys)
supertitle: "Tree."
---

Returns a new tree with the specified keys. This is similar to [`mask`](mask.html), but here the _values_ (not the keys) will be used from the `keys` option. Typically `keys` will be an array of strings.

A use for this is to establish a domain for a function. Given a function that returns a string, `withKeys` establishes a domain for the function.

```ori
// withKeys.ori
${ samples/help/withKeys.ori }
```

Since the function now has a domain, it can be expanded into a full tree.

```console
$ ori withKeys.ori/
${ Origami.yaml(samples/help/withKeys.ori) + "\n" }
```

Here the `ori` CLI can ask for the keys, and then get the value for each of those keys using the function.
