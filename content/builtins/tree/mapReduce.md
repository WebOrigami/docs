---
title: mapReduce(tree, valueFn, reduceFn)
supertitle: "Tree."
---

Maps and reduces a [map-based tree](/async-tree/mapBasedTree.html) to a single value. See also [`Tree.reduce`](reduce.html).

- The `valueFn` will be invoked to map individual leaf values in the tree. The signature of this function is `(value, key, tree)` (the same as for the `value` function in [`Tree.map`](map.html).).
- For each level of the tree, the `reduceFn` will be called with the mapped values. Its signature is `(values, keys, tree)`. The result of this function is used as the result of reducing this branch of the tree.
