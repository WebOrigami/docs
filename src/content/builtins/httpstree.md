---
title: "httpstree: protocol"
subtitle: Treat an HTTPS website as a tree
---

This lets you retrieve resources from an existing website by treating it as a tree.

```console
$ ori "(httpstree://example.com)/index.html"
… displays contents of https://example.com/index.html …
```

One use for `httpstree:` is passing a site to [`crawl`](dev/crawl.html) to crawl a site.
