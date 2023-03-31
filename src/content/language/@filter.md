---
title: "@filter(graph, filter)"
---

This returns the values in the `graph` argument whose keys appear in the `filter` argument. This includes keys that appear in `filter` but not in `graph`, as long as the `graph` has a defined value for that key.

Both arguments can be any [graph variant](/core/variants.html).
