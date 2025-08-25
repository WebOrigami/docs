---
title: assign(target, source)
supertitle: "Tree."
---

Apply the key/values pairs from the source tree to the target tree.

If a key exists in both trees, and the values in both trees are subtrees, then the subtrees will be merged recursively. Otherwise, the value from the source tree will overwrite the value in the target tree.
