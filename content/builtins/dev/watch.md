---
title: watch(tree, expression)
supertitle: "Dev."
---

Watches a given [map-based tree](/async-tree/mapBasedTree.html) for changes.

When first called, this evaluates the `expression`, which should return a tree that can be served. That tree is essentially an indirect reference. If anything in the source tree changes, the expression is reevaluated and the indirect reference will be updated to point to the new result.

This watches the source tree for `change` events. Currently, [FileMap](/async-tree/FileMap.html) is the only type of tree that supports `change` events. If a `change` event is raised, the `expression` is reevaluated to obtain a new result tree. Subsequent references to the `watch()` result will access the new tree.

This can be used to serve a virtual folder, reevaluating its definition whenever the containing real folder changes.

```console
$ ori serve watch src, =debug src/site.ori
```

Calling `serve` this way will ensure that changes you make to Origami files and other data will be reflected when you refresh your browser.

Note: `watch` will not reload JavaScript files. If you edit any JavaScript files used in the construction of your site, you will need to restart the server to see those changes in the browser.
