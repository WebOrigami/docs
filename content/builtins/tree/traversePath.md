---
title: traversePath(tree, path)
supertitle: "Tree."
---

This traverses a [map-based tree](/async-tree/mapBasedTree.html) using the slash-separated keys in the string `path`. Keys before the last key will follow the [trailing slash convention](/async-tree/trailingSlash.html).

Example: Given the `path` “posts/2026/hello.html”, this traverses the tree using the keys “posts/”, "2026/", and “hello.html”, then returns the resulting value.
