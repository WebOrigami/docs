---
title: set(map, key, value)
supertitle: "Tree."
---

This updates the given [map-like](/async-tree/maplike.html) object so that `key` is associated with `value`.

Note: The standard [`Map.prototype.set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) method returns the map being updated — but the `Tree.set` builtin does not return anything. This is to facilitate its use with the [ori CLI](/cli), where returning the map would cause the entire map to be dumped to the console.
