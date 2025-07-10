---
title: sitemap(tree, host)
supertitle: "site:"
---

Generates a basic [sitemap](https://en.wikipedia.org/wiki/Sitemaps) for the given tree so that it can be more easily crawled by search engines. The `sitemap` function prepends the indicated `host` URL to all paths in the tree to generate a list of the search engine should visit.

Example: if `tinySite.ori` contains:

```ori
// tinySite.ori
${ <samples.jse/help/tinySite.ori> }
```

then calling `sitemap` generates:

```console
$ ori sitemap tinySite.ori, "'https://mysite.org'"
${ Origami.sitemap(<samples.jse/help/tinySite.ori>, "https://mysite.org") }
```
