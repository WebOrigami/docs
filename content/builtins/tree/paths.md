---
title: paths(tree)
supertitle: "Tree."
---

Returns an array of slash-separated paths for all values in the [map-based tree](/async-tree/mapBasedTree.html).

```console
$ ori greetings.yaml
${ samples/help/greetings.yaml }$ ori Tree.paths greetings.yaml
${ Origami.yaml(Tree.paths(samples/help/greetings.yaml)) }
```

Note: If the indicated tree supports the [`trailingSlashKeys`](/async-tree/mapBasedTree.html#trailingslashkeys-property) property, the `Tree.paths` operation will only descend into child nodes whose keys are marked with trailing slashes.

To obtain a mapping of slash-separated paths to values, see [`Tree.deflatePaths`](deflatePaths.html).
