---
title: apply(source, target)
supertitle: "Tree."
---

Copies all key and values from a [map-based](/async-tree/mapBasedTree.html) source tree to a map-based target tree.

If a key exists in both trees, and the values in both trees are subtrees, then the subtrees will be merged recursively. Otherwise, the value from the source tree will overwrite the value in the target tree. This operation leaves alone any keys in the target tree that aren't mentioned in the source tree.

See also [`Tree.applyChanges`](applyChanges.html), which compares the two trees and applies only the changes.

## Example

A `build` folder contains a tiny set of files:

```console
$ ori build
${ Origami.yaml(samples/help/publish/site1.ori) }
```

An Origami file contains a tree of changes to be applied:

```ori
// changes.ori
${ samples/help/publish/changes.ori }
```

After the `Tree.apply` command, the `build` folder now reflects the changes:

```console
$ ori Tree.apply changes.ori, build
$ ori build
${ Origami.yaml(
  Tree.apply(
    samples/help/publish/changes.ori
    Tree.clone(samples/help/publish/site1.ori)
  )
) }
```
