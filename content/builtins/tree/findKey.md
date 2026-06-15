---
title: findKey(map, fn)
supertitle: "Tree."
---

This returns the key of the first entry in the [map-like](/async-tree/maplike.html) object for which the `fn` test returns `true`. This is analogous to the standard JavaScript [`Array.prototype.findKey`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findKey) function but extended to cover objects and other types of maps.

Example: if `bunnies.tsv` contains

```tsv
${ samples/help/bunnies.tsv }
```

then:

```console
$ ori "Tree.findKey(samples/help/bunnies.tsv, (entry) => entry.fur === 'Short')"
${ Tree.findKey(samples/help/bunnies.tsv, (entry) => entry.fur === 'Short') }

```

because 1 is the index of the first matching entry.

To get the value of the first matching entry, see the related [`Tree.find`](find.html).
