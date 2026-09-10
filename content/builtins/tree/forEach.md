---
title: forEach(map, fn, [options])
supertitle: "Tree."
---

Invokes a callback `fn` once for each key-value pair present in the [map-like](/async-tree/maplike.html) object. For each pair, the callback function will be passed `value`, `key`, and `map` arguments.

By default, this only processes the top-level entries in the map. If you want to perform an operation on all entries in a map-based tree, include an `options` object with `{ deep: true }`.
