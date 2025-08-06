---
title: serve([tree], [port])
supertitle: "Dev."
---

Starts a local web server to serve the contents of `tree`.

If no `tree` is supplied, `serve` uses the current tree (from the command line, that will be the current folder). To serve the current folder:

```console
$ ori serve
Server running at http://localhost:5000
```

The server translates requests for a web route like `a/b/c` into a traversal of the tree, traversing the keys `a`, `b`, and `c`, then returning the value from that point in the tree.

Note: Instead of using Origami's built-in server, you can also use Origami as middleware for server frameworks such as [Express](https://expressjs.com/). This allows you to define a tree of site resources using Origami, then incorporate that into your server as the site's top level or a branch of site. See [express-demo](https://github.com/WebOrigami/express-demo) for an example.
