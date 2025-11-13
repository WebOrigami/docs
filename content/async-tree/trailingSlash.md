---
title: Trailing slash convention
---

To facilitate the use of maps as nodes in a tree, maps may elect to support the trailing slash convention: _a key ends in a trailing slash if its value is known to be a map_.

For example, this tree has two map nodes that follow the trailing slash convention. The root node (the circle on the left) has a key called `subfolder/` because that key's value is a map (the circle in the middle):

<figure>
${ svg({
a: 1
subfolder/: { b: 2 }
}) }
</figure>

The trailing slash convention serves several purposes.

## Indicating subtrees

Trailing slashes can help you interpret tree structure when looking at a list of keys. For comparison, operating system shells commonly append trailing slashes to folder names to help you navigate the file system tree in the terminal.

For example, you can use Origami's [`keys`](/builtins/tree/keys.html) command to display the keys for a folder:

```console
$ ori keys myProject
- README.md
- src/
- test/
```

The trailing slashes let you quickly see that `src/` and `test/` represent subfolders.

## Saving work in tree traversal

Operations that traverse a tree also benefit from quickly knowing which keys represent subtrees.

As an example, the [`Tree.paths`](/builtins/tree/paths.html) function returns a list of path-separated paths for every value in a tree. The function needs to visit each node in the tree — but it wants to avoid wasting work getting values that aren't map nodes.

- If the map for a node supports trailing slashes, the `paths` operation knows it only needs to get the values for keys that end in slashes. The keys without slashes won't be child nodes.
- If the map for a node doesn't support trailing slashes, then `paths` must get every value in that node to decide whether it needs to descend into it.

## Indicating intent

Tools can look at a trailing slash on a key to infer intent. For example, the Origami [language](/language) interprets the presence of a trailing slash to indicate that you're expecting to get back a traversable tree. If the value you're working with is a file, Origami implicitly [unpacks the file](/language/fileTypes.html#unpacking-files) into data. For example, the expression `data.json` returns the raw file contents of the indicated file, but `data.json/` (with a trailing slash) parses the JSON in the file and returns the data object.

## Supporting the trailing slash convention

Any map object can indicate that it supports the trailing slash convention:

1. Define a `trailingSlashKeys` property that returns `true`.
1. Have the `keys()` method add trailing slashes to every key whose value is known to be a map.
1. Ensure that methods that accept a key — `delete()`, `get()`, `has()`, and `set()` — can accept a key with or without a trailing slash. For example, `get("a")` and `get("a/")` should have equivalent results, regardless of whether `a` is a child node or not.

The following classes support the convention:

- [`BrowserFileMap`](BrowserFileMap.html)
- [`ExplorableSiteMap`](ExplorableSiteMap.html)
- [`FileMap`](FileMap.html)
- [`ObjectMap`](ObjectMap.html)

Origami also includes a set of [`slash`](/builtins/origami/slash.html) functions for working with trailing slashes.
