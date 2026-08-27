---
title: paths(tree, [options])
supertitle: "Tree."
---

Returns an array of slash-separated paths for all values in the [map-based tree](/async-tree/mapBasedTree.html).

The `options` argument can include:

- `assumeSlashKeys`: if true, the operation will skip descending into a value if the tree supports [trailing slashes](/async-tree/trailingSlash.html) and the key does not end in a trailing slash. This speeds up the operation on large trees.
- `base`: a string that will be prepended to all the paths.

## Example

```console
$ ori greetings.yaml
${ samples/help/greetings.yaml }$ ori Tree.paths greetings.yaml
${ Origami.yaml(Tree.paths(samples/help/greetings.yaml)) }
```

To obtain a mapping of slash-separated paths to values, see [`Tree.deflatePaths`](deflatePaths.html).
