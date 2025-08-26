---
title: "Tree namespace"
subtitle: Work with trees
---

This is a collection of functions for working with asynchronous trees.

For example, `Tree` exposes a method [`isTreelike`](isTreelike.html) that tests whether a given object is a tree or can be coerced to one. You can invoke this method via `Tree.isTreelike`:

```console
$ ori Tree.isTreelike 5
${ Tree.isTreelike(5) + "\n" }
$ ori Tree.isTreelike { name: "Alice" }
${ Tree.isTreelike({ name: "Alice" }) + "\n" }
```

## Commands by name

${ src/templates/commandList.ori/Tree }
