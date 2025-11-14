---
title: explore
supertitle: "Dev."
---

Returns a web page that lets you explore the scope at a current point in a tree.

This is intended to be used in conjunction with the [`debug`](debug.html) command, which lets you invoke Origami commands in the browser. When serving a tree with `debug`, you can then browse to a route like

```
http://localhost:5000/path/to/something/!explore
```

to explore the scope available at that specific point in the site tree.
