---
title: crawl(tree, [baseHref])
supertitle: "site:"
---

Crawls the indicated live site and returns the complete tree of reachable resources. This includes following links and references in HTML pages, CSS stylesheets, and JavaScript files.

(If you already have a specific set of known resources you want to fetch from a site, you can [extract specific resources from a site](/language/idioms.html#extract-specific-resources-from-a-site).)

## Crawl an existing site

You can use `crawl` to crawl an existing website and copy the resulting crawled tree for local inspection.

In this case, the `tree` parameter is typically a [SiteTree](/async-tree/SiteTree.html). A convenient way to wrap an existing site is with the `httpstree` protocol (or `httptree` for non-secure HTTP sites) in a URL.

For example, you can copy the original [Space Jam](https://www.spacejam.com/1996/) website to a local folder called `spacejam` via:

```console
$ ori "copy crawl(httpstree://www.spacejam.com/1996/), files:spacejam"
```

On a machine that doesn't have Origami installed, you can invoke `ori` via npm's `npx` command:

```console
$ npx ori "copy crawl(httpstree://www.spacejam.com/1996/), files:spacejam"
```

Crawling is a network-intensive operation, so a command to crawl a site like the (surprisingly large!) site above can take a long time to complete -- on the order of minutes.

## Broken links

If the crawl operation finds links to internal references that do not exist, it will return those in a `crawl-errors.json` entry at the top level of the returned tree.

You can also use the related [`audit`](audit.html) builtin to audit a site for broken internal links.
