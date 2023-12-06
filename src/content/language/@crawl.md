---
title: "@crawl(tree, [baseHref])"
---

Crawls the indicated tree, following links and references in HTML pages, CSS stylesheets, and JavaScript files to construct and return the complete tree of reachable resources.

## Crawl an existing site

You can use `@crawl` to crawl an existing website and copy the resulting crawled tree for local inspection.

In this case, the `tree` parameter is typically a [SiteTree](/async-tree/SiteTree.html). A convenient way to wrap an existing site is with the `tree` protocol (or `treehttp` for non-secure HTTP sites) in a URL.

For example, you can copy the original [Space Jam](https://www.spacejam.com/1996/) website to a local folder called `spacejam` via:

```console
$ ori "@copy(@crawl(tree://www.spacejam.com/1996/), @files/spacejam)"
```

Crawling is a network-intensive operation, so a command to crawl a site like the (surprisingly large!) site above can take a long time to complete -- on the order of minutes.

## Check an Origami site for broken links

If the crawl operation finds references that do not exist, it will return those in a `crawl-errors.json` entry at the top level of the returned tree. You can use this to crawl a site you're creating in Origami to find broken links.

Give `@crawl` a reference to the `.ori` or `.js` file that defines your site's root. For example, if you define your site in a file `src/site.ori`:

```console
$ ori "@copy(@crawl(src/site.ori), @files/crawl)
```

Then inspect the local file `crawl/crawl-errors.json` (if it exists) for paths that were referenced by pages in your site but which your site does not actually define.
