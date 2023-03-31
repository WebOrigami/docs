---
title: "@crawl(graph, [baseHref])"
---

Crawls the indicated graph, following references in HTML pages, CSS stylesheets, and JavaScript files to additional resources, in order to build a more complete graph. You can use this to crawl an existing website and then browse or copy the resulting crawled graph.

The `graph` parameter is typically a [SiteGraph](/core/SiteGraph.html). A convenient way to wrap an existing site is with the `graphHttps` protocol (or `graphHttp` as appropriate) in a URL.

For example, to copy the original [Space Jam](https://www.spacejam.com/1996/) website to a local folder called `snapshot`, you can write:

```console
$ ori "@copy(@crawl(graphhttps://www.spacejam.com/1996/), @files/snapshot)"
```

Crawling is a network-intensive operation, so a command like the one above can take a long time (on the order of minutes) to complete.
