---
title: "@serve([graph], [port])"
---

Starts a local web server to serve the contents of `graph`.

If no `graph` is supplied, `serve` uses the current graph (from the command line, that will be the current folder). To serve the current folder:

```console
$ ori @serve
Server running at http://localhost:5000
```

The server translates requests for a web route like `a/b/c` into a traversal of the graph, traversing the keys `a`, `b`, and `c`, then returning the value from that point in the graph.
