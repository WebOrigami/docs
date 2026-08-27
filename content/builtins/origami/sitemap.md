---
title: sitemap(tree, [options])
supertitle: "Origami."
---

Generates a basic [sitemap](https://en.wikipedia.org/wiki/Sitemaps) for the given [map-based tree](/async-tree/mapBasedTree.html) so that it can be more easily crawled by search engines. The `sitemap` function prepends the indicated `host` URL to all paths in the tree to generate a list of the search engine should visit.

The `options` argument can include:

- `assumeSlashKeys`: if true, the operation will skip descending into a value if the tree supports [trailing slashes](/async-tree/trailingSlash.html) and the key does not end in a trailing slash. This speeds up the operation on large trees.
- `base`: a string that will be prepended to all the paths.

## Example

If `tinySite.ori` contains:

```ori
// tinySite.ori
${ samples/help/tinySite.ori }
```

then calling `sitemap` generates:

```console
$ ori Origami.sitemap tinySite.ori, "'https://mysite.org'"
${ Origami.sitemap(samples/help/tinySite.ori, "https://mysite.org") }
```

## When to define a sitemap

Most search engines are extremely thorough at discovering well-linked content on a site, so in many cases you don't need to define a sitemap.

Consider defining a sitemap if:

- Your site's complete set of crawlable resources (including pages, images, videos, PDFs, etc.) isn't accessible by following links from your home page.
- Navigation within your site relies heavily on client-side JavaScript or form submissions.
