---
title: withKeys(map, keys)
supertitle: "Tree."
---

Given a [map-like](/async-tree/maplike.html) object and a set of `keys`, this returns a new map with the specified keys. This is similar to [`mask`](mask.html), but here the _values_ (not the keys) will be used from the `keys` option. Typically `keys` will be an array of strings.

## Establishing a domain for a function

One use for `withKeys` is to establish a domain for a function:

```ori
// withKeys.ori
${ samples/help/withKeys.ori }
```

Since the function now has a domain, it can be expanded into a full map.

```console
$ ori withKeys.ori/
${ Origami.yaml(samples/help/withKeys.ori) + "\n" }
```

Here the `ori` CLI can ask for the keys, and then get the value for each of those keys using the function.

## Sorting in arbitrary order

Another use for `withKeys` is to manually specify a sort order.

```yaml
# movies.yaml
${ samples/templateDocuments/movies/movies.yaml }
```

You could use [`Tree.sort`](sort.html) to sort this according to data like `date`, but if you want to specify an arbitrary order for the entries or omit specific keys — say, to list your personal favorites — you can use `withKeys`:

```console
$ ori withKeys.ori movies.yaml, [«mononoke», «spirited», «kiki»]
${ Origami.yaml(Tree.withKeys(
  samples/templateDocuments/movies/movies.yaml
  ["mononoke", "spirited", "kiki"]
)) }
```
