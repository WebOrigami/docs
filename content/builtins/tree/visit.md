---
title: visit(tree)
supertitle: "Tree."
---

The `Tree.visit` builtin traverses the entire given `tree`, retrieving each value but then throwing it away.

This is useful, for example, in conjunction with [`Tree.cache`](cache.html) to force the population of a local cache with generated or downloaded resources. See that builtin for an example of using `Tree.visit`.
