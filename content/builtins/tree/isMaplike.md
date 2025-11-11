---
title: isMaplike(obj)
supertitle: "Tree."
---

Returns true if the indicated object is a sync or async map — or is a [maplike object](/async-tree/maplike.html)that can be converted to one by wrapping it with a class like [`ObjectMap`](/async-tree/ObjectMap.html).

```console
$ ori "Tree.isMaplike(new Map())"
${ Tree.isMaplike(new Map()) }

$ ori Tree.isMaplike {}
${ Tree.isMaplike({}) }

$ ori Tree.isMaplike []
${ Tree.isMaplike([]) }

```

See also [`isMap`](isMap.html), a stricter test that returns `true` only if its input is already a map.
