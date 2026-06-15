---
title: find(map, test)
supertitle: "Tree."
---

This returns the value of the first entry in the [map-like](/async-tree/maplike.html) object for which the `test` function returns `true`. This is analogous to the standard JavaScript [`Array.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) function but extended to cover objects and other types of maps.

The `test` function will be called with the `value`, `key`, and `map` of each key/value in the map. The `test` function should return a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) result if the entry passes the test.

Example: if `bunnies.tsv` contains

```tsv
${ samples/help/bunnies.tsv }
```

then:

```console
$ ori "Tree.find(samples/help/bunnies.tsv, (entry) => entry.fur === 'Short')"
${ Origami.yaml(Tree.find(samples/help/bunnies.tsv, (entry) => entry.fur === 'Short')) }
```

To get the index of the first matching entry, see the related [`Tree.findKey`](findKey.html). To extract all matching values, see [`Tree.filter`](filter.html) and [`Tree.mask`](mask.html).
