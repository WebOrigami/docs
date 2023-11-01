---
title: "@crawl(tree, [baseHref])"
---

Crawls the indicated tree, following references in HTML pages, CSS stylesheets, and JavaScript files to additional resources, in order to build a more complete tree. You can use this to crawl an existing website and then browse or copy the resulting crawled tree.

The `tree` parameter is typically a [SiteTree](/async-tree/SiteTree.html). A convenient way to wrap an existing site is with the `treeHttps` protocol (or `treeHttp` as appropriate) in a URL.

For example, to copy the original [Space Jam](https://www.spacejam.com/1996/) website to a local folder called `snapshot`, you can write:

```console
$ ori "@copy(@crawl(treehttps://www.spacejam.com/1996/), @files/snapshot)"
```

Crawling is a network-intensive operation, so a command to crawl a site like the (surprisingly large!) site above can take a long time to complete -- on the order of minutes.
