---
title: watch([tree], [expression])
supertitle: "dev:"
---

Returns a tree that will be the result of executing the indicated `expression` in the context of the indicated `tree`.

This also watches the `tree` for `change` events. Currently, [FileTree](/async-tree/FileTree.html) is the only type of tree that supports `change` events. If a `change` event is raised, the `expression` is reevaluated to obtain a new result tree. Subsequent references to the `watch()` result will access the new tree.

This can be used to serve a virtual folder, reevaluating its definition whenever the containing real folder changes.

```console
$ ori serve watch src, =site.ori/public
```

Calling `serve` this way will ensure that changes you make to Origami files and other data will be reflected when you refresh your browser.

Note: `watch` will not reload JavaScript files. If you edit any JavaScript files used in the construction of your site, you will need to restart the server to see those changes in the browser.
