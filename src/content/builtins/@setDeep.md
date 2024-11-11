---
title: "setDeep(target, source)"
---

Recursively applies updates from the `source` tree to the `target` tree.

The `target` tree must support the `set` method in the [AsyncTree interface](/async-tree/interface.html). The only types of trees defined in the [async-tree](/async-tree) library that provides such support are [ObjectTree](/async-tree/ObjectTree.html) and [FileTree](/async-tree/FileTree.html).
