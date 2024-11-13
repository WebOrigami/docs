---
title: mapReduce(tree, mapFn, reduceFn)
supertitle: "tree:"
---

Maps and reduces a tree to a single value.

If a `mapFn` is provided, it will be invoked to convert each value to a mapped value; otherwise, values will be used as is.

When the values have been obtained, all the values and keys will be passed to the `reduceFn`, which should consolidate those into a single result.
