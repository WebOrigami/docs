---
title: "Tree namespace"
subtitle: Work with trees
---

This is a collection of functions for working with asynchronous trees.

For example, `Tree` exposes a method [`isMap`](isMap.html) that tests whether a given object is a map or can be coerced to one. You can invoke this method via `Tree.isMap`:

```console
$ ori Tree.isMap 5
${ Tree.isMap(5) + "\n" }
$ ori Tree.isMap { name: "Alice" }
${ Tree.isMap({ name: "Alice" }) + "\n" }
```

## Commands by name

${ src/templates/commandList.ori/Tree }
