---
title: "@cache"
---

This is a collection of functions for creating trees that act as caches.

<a name="tree"></a>

## @cache/tree(tree, [cache], [filter])

Caches values from `tree`. If a `cache` is provided, the cached values will be stored in that tree; if no `cache` is provided, the values will be stored in an in-memory tree.

If a `filter` is provided, only keys matching the filter will have their values cached.

<a name="site"></a>

## @cache/site([site tree])

Caches fetch requests from a site tree.
