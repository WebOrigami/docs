---
title: child(tree, key)
supertitle: "Tree."
---

Given a [map-based tree](/async-tree/mapBasedTree.html) and a `key`, this returns a child node for the given key, creating it if necessary. This method is called by tree operations like [`Tree.assign`](/builtins/tree/assign.html) and [`Dev.copy`](/builtins/dev/copy.html) when copying subtrees.

The behavior of `child()` is as follows:

- If the indicated map node implements the [`child()`](/async-tree/mapBasedTree.html#childkey-method) method, this calls that method and returns the result.
- Otherwise the default behavior is used:

  1.  The map's `get()` method is called. If the value is a map, that's returned as is.
  1.  The map's constructor is called to create a child map. For this to work, the map's constructor must not require any arguments.
  1.  The map's `set()` method is called to establish the child map as the value for `key`.
  1.  The child map is returned.

If the map represents network resources, the default behavior will make consecutive `async` calls to the network. If greater efficiency is possible, the [`AsyncMap`](/async-tree/AsyncMap.html) representing the network storage can implement the `child()` method, and that method's implementation will be used instead.
