---
title: "@treeHttps(domain, [...keys])"
---

Returns a new [SiteTree](/async-tree/SiteTree.html) for the indicated `domain`. If `keys` are supplied, this traverses the keys and returns the resulting value. This lets you retrieve resources from an existing website by treating it as a tree.

Origami also supports `tree:` as a shorthand for `treehttps:`.

You won't normally call this function directly. Instead, you can specify the custom `tree:` or `treehttps:` protocol in a URL wherever you want to tree the site as a tree.

```console
$ ori "(tree://example.com)/index.html"
… displays contents of https://example.com/index.html …
```

One use for `tree:` is passing a site to [@crawl](@crawl.html) to crawl a site.
