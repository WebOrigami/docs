---
title: "@filter(tree, filter)"
---

This returns the values in the `tree` argument whose keys appear in the `filter` argument. This includes keys that appear in `filter` but not in `tree`, as long as the `tree` has a defined value for that key.

Both arguments can be any [treelike object](/core/treelike.html).
