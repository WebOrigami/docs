---
title: "@cache"
---

This is a collection of functions for creating graphs that act as caches.

<a name="graph"></a>

## @cache/graph(graph, [cache], [filter])

Caches values from `graph`. If a `cache` is provided, the cached values will be stored in that graph; if no `cache` is provided, the values will be stored in an in-memory graph.

If a `filter` is provided, only keys matching the filter will have their values cached.

<a name="site"></a>

## @cache/site([site graph])

Caches fetch requests from a site graph.
