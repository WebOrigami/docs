---
title: sitemap(tree, host)
supertitle: "Origami."
---

Generates a basic [sitemap](https://en.wikipedia.org/wiki/Sitemaps) for the given [map-based tree](/async-tree/mapBasedTree.html) so that it can be more easily crawled by search engines. The `sitemap` function prepends the indicated `host` URL to all paths in the tree to generate a list of the search engine should visit.

Example: if `tinySite.ori` contains:

```ori
// tinySite.ori
${ samples/help/tinySite.ori }
```

then calling `sitemap` generates:

```console
$ ori Origami.sitemap tinySite.ori, "'https://mysite.org'"
${ Origami.sitemap(samples/help/tinySite.ori, "https://mysite.org") }
```

Note: If the indicated tree supports the [`trailingSlashKeys`](/async-tree/mapBasedTree.html#trailingslashkeys-property) property, the `Tree.sitemap` operation will only descend into child nodes whose keys are marked with trailing slashes.

## When to define a sitemap

Most search engines are extremely thorough at discovering well-linked content on a site, so in many cases you don't need to define a sitemap.

Consider defining a sitemap if:

- Your site's complete set of crawlable resources (including pages, images, videos, PDFs, etc.) isn't accessible by following links from your home page.
- Navigation within your site relies heavily on client-side JavaScript or form submissions.
