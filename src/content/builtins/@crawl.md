---
title: "@crawl(tree, [baseHref])"
---

Crawls the indicated tree and returns the complete tree of reachable resources. This includes following links and references in HTML pages, CSS stylesheets, and JavaScript files.

## Crawl an existing site

You can use `@crawl` to crawl an existing website and copy the resulting crawled tree for local inspection.

In this case, the `tree` parameter is typically a [SiteTree](/async-tree/SiteTree.html). A convenient way to wrap an existing site is with the `tree` protocol (or `treehttp` for non-secure HTTP sites) in a URL.

For example, you can copy the original [Space Jam](https://www.spacejam.com/1996/) website to a local folder called `spacejam` via:

```console
$ ori "@copy @crawl(tree://www.spacejam.com/1996/), @files/spacejam"
```

Crawling is a network-intensive operation, so a command to crawl a site like the (surprisingly large!) site above can take a long time to complete -- on the order of minutes.

Shorthand: If the first parameter to `@crawl` is a string, it will be interpreted as the host of an HTTPS site, so in cases where you want to crawl the top level of a domain like `example.com`, you can use a simpler form:

```console
$ ori @copy @crawl/example.com, @files/example
```

## Broken links

If the crawl operation finds links to internal references that do not exist, it will return those in a `crawl-errors.json` entry at the top level of the returned tree.

You can also use the related [@siteAudit](@siteAudit.html) builtin to audit a site for broken internal links.
