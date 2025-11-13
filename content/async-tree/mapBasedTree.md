---
title: Map-based trees
---

You can construct tree structures using objects that support the [Map interface](interface.html). This is useful when representing hierarchical storage systems like the file system, or when building the tree for a software artifact like a site.

As an example, this small YAML document describes a tiny site with a home page, and a nested about area that has its own `index.html` page:

```yaml
index.html: "Home page"
about:
  index.html: "About us"
```

Both the top-level object and the nested `about` object are [map-like](maplike.html), so we can treat them both as `Map` instances. The top-level map will have the nested `about` map as a value, resulting in a tree structure:

<figure>
${ svg({
  index.html: "Home page"
  about: {
    index.html: "About us"
  }
}) }
</figure>

When working with a tree like this, you will often hold a reference to its root node. Depending on what you want to do, you can think about that node as a map (because it has keys and values) or as a tree (because it some deeper structure).
