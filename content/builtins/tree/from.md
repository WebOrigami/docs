---
title: from(obj, [options])
supertitle: "Tree."
---

Returns the indicated object as a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). If the object is:

- A `Map`, `AsyncMap`, or has a `Map`-compatible interface: returns the object as is
- A plain object or array: wraps it with an [ObjectMap](/async-tree/ObjectMap.html)
- A function: wraps it with a [FunctionMap](/async-tree/FunctionMap.html)
- A `Set`: wraps it with a [SetMap](/async-tree/SetMap.html)
- An `Iterator`: enumerates its values as an array, then wraps the array with an `ObjectMap`
- Some other kind of object: wraps it with an `ObjectMap`

The optional `deep` option can be set to `true` to convert a plain object to a `DeepObjectMap`. The optional `parent` parameter will be used as the default parent of the new tree.
