---
title: find(map, fn)
supertitle: "Tree."
---

This returns the value of the first entry in the [map-like](/async-tree/maplike.html) object for which the `fn` test returns `true`. This is analogous to the standard JavaScript [`Array.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) function but extended to cover objects and other types of maps.

Example: if `bunnies.tsv` contains

```tsv
${ samples/help/bunnies.tsv }
```

then:

```console
$ ori "Tree.find(samples/help/bunnies.tsv, (entry) => entry.fur === 'Short')"
${ Origami.yaml(Tree.find(samples/help/bunnies.tsv, (entry) => entry.fur === 'Short')) }
```

To get the index of the first matching entry, see the related [`Tree.findKey`](findKey.html).
