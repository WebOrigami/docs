---
title: "@tree"
---

This is a collection of functions for working with asynchronous trees, directly exposing the methods of the [Tree](/async-tree/Tree.html) object in the [async-tree](/async-tree) library.

For example, `Tree` exposes a method `isTreelike` that tests whether a given object is a tree or can be coerced to one. You can invoke this method via `@tree/isTreelike`:

```console
$ ori @tree/isTreelike 5
${ @string @tree/isTreelike(5) }
$ ori @tree/isTreelike { name: "Alice" }
${ @tree/isTreelike({ name: "Alice" }) }
```
