---
title: "@watch([treelike], [expression])"
---

Returns a tree that will be the result of executing the indicated `expression` in the context of the indicated `tree`.

This also watches the `tree` for `change` events. Currently, [FileTree](/async-tree/FileTree.html) is the only type of tree that supports `change` events. If a `change` event is raised, the `expression` is reevaluated to obtain a new result tree. Subsequent references to the `watch()` result will access the new tree.

This can be used to serve a virtual folder, reevaluating its definition whenever the containing real folder changes.

```console
$ ori @serve @watch src, =site.ori/public
```
