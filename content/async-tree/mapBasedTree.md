---
title: Map-based trees
---

You can construct tree structures using objects that support the [Map interface](interface.html). This is useful when representing hierarchical storage systems like the file system, or when building the tree for a software artifact like a site.

As an example, this small YAML document describes a tiny site with a home page, and a nested about area that has its own `index.html` page:

```yaml
index.html: "Home page"
about:
  index.html: "About us"
```

Both the top-level object and the nested `about` object are [map-like](maplike.html), so we can treat them both as `Map` instances. The top-level map will have the nested `about` map as a value, resulting in a tree structure:

<figure>
${ svg({
  index.html: "Home page"
  about: {
    index.html: "About us"
  }
}) }
</figure>

When working with a tree like this, you will often hold a reference to its root node. Depending on what you want to do, you can think about that node as a map (because it has keys and values) or as a tree (because it some deeper structure).

## Optional tree members

While any `Map` (or [`AsyncMap`](AsyncMap.html)) object can be treated as a tree node, the async-tree library defines some optional members that map classes can implement to facilitate their use in trees.

### `child(key)` method

Tree operations like [`Tree.assign`](/builtins/tree/assign.html) and [`Dev.copy`](/builtins/dev/copy.html) copy one map-based tree into another. During the operation, they need the ability to retrieve or create a child node in a map. The [`Tree.child`](/builtins/tree/child.html) operation can do that, but particularly for async maps the default behavior may not be the most efficient behavior possible.

A map class can implement a `child(key)` method that retrieves a child node with the given key, creating it if necessary.

- If the map already has a value for `key` that's a child map, that map is returned as is. The child's existing contents are left alone.
- Otherwise the map creates a new, empty child map for the given `key` and returns it. If the map previously had a value for `key` that was not a map, that value is overwritten.

To use a file system map as an example, calling `child("subfolder")` on a [`FileMap`](FileMap.html) has the following effect:

- If the folder already has a subfolder called "subfolder", a `FileMap` for that subfolder is returned.
- Otherwise, the folder creates a new subfolder called "subfolder". (If the folder has an existing _file_ called "subfolder", that's erased first.) A new `FileMap` for the subfolder is then returned.

For synchronous maps, the `child()` method is synchronous; for asynchronous maps, the `child()` method is `async`.

### `parent` property

A map can define an optional `parent` property pointing to another map. A map can also set the `parent` property on any child maps that it returns via `child()` (see above) or `get()`.

### `trailingSlashKeys` property

To indicate that a map does or doesn't comply with the [JSON Keys](jsonKeys.html) protocol, a map can define an optional `trailingSlashKeys` property. This should be a boolean value, and should be `true` if the map's `keys()` method appends trailing slashes to keys for child nodes.

If a map has no `trailingSlashKeys` property, tree operations will assume the map doesn't support the protocol.
