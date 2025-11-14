---
title: assign(target, source)
supertitle: "Tree."
---

Apply the key/values pairs from a [map-based](/async-tree/mapBasedTree.html) source tree to a map-based target tree.

If a key exists in both trees, and the values in both trees are subtrees, then the subtrees will be merged recursively. Otherwise, the value from the source tree will overwrite the value in the target tree.
