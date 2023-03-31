---
title: "@watch([graph], [expression])"
---

Returns a graph that will be the result of executing the indicated `expression` in the context of the indicated `graph`.

This also watches the `graph` for `change` events. Currently, [FilesGraph](/core/FilesGraph.html) is the only type of graph that supports `change` events. If a `change` event is raised, the `expression` is reevaluated to obtain a new result graph. Subsequent references to the `watch()` result will access the new graph.

This can be used to serve a virtual folder, reevaluating its definition whenever the containing real folder changes.

```console
$ ori @serve @watch src, =site.graph/public
```
