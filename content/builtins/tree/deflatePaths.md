---
title: deflatePaths(map, [basePath])
supertitle: "Tree."
---

Given a [map-based tree](/async-tree/mapBasedTree.html), this returns a flattened `Map` of slash-separated paths to values. If the optional `basePath` is provided, that will be prepended to all the paths.

Example: A folder contains a set of markdown posts organized into subfolders for year and month:

```console
$ ori posts
${ Origami.yaml(samples/help/paths/posts) }
```

This can be flattened with:

```console
$ ori Tree.deflatePaths posts
${ Origami.yaml(Tree.deflatePaths(samples/help/paths/posts)) }
```

See also the inverse operation, [`Tree.inflatePaths`](inflatePaths.html). The related [`Tree.paths`](paths.html) returns just the paths an array.
