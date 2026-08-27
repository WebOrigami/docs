---
title: deflatePaths(map, [options])
supertitle: "Tree."
---

Given a [map-based tree](/async-tree/mapBasedTree.html), this returns a flattened `Map` of slash-separated paths to values.

The `options` argument can include:

- `assumeSlashKeys`: if true, the operation will skip descending into a value if the tree supports [trailing slashes](/async-tree/trailingSlash.html) and the key does not end in a trailing slash. This speeds up the operation on large trees.
- `base`: a string that will be prepended to all the paths.

## Example

A folder contains a set of markdown posts organized into subfolders for year and month:

```console
$ ori posts
${ Origami.yaml(samples/help/paths/posts) }
```

This can be flattened with:

```console
$ ori Tree.deflatePaths posts
${ Origami.yaml(Tree.deflatePaths(samples/help/paths/posts)) }
```

See also the inverse operation, [`Tree.inflatePaths`](inflatePaths.html). The related [`Tree.paths`](paths.html) returns just the paths as an array.
