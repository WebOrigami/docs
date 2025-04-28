---
title: crawl(tree, [baseHref])
supertitle: "site:"
---

Crawls the indicated live site and returns the complete tree of reachable resources.

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

### Starting points

A crawl begins by looking for any of:

- `/`
- `/index.html`
- `robots.txt`
- `sitemap.xml`

From these starting points, the crawler will follow links to additional resources.

### Broken links

If the crawl operation finds links to internal references that do not exist, it will return those in a `crawl-errors.json` entry at the top level of the returned tree.

If you just want to check a site for broken links, see the related [`site:audit`](audit.html) builtin.

## Supported reference types

The crawler analyzes the following types of files:

- HTML files
- CSS files
- JavaScript modules
- Image maps
- Sitemap files
- `robots.txt`

In HTML, the crawler finds references to other pages and resources by examining:

- `href` attributes in elements: `<a>`, `<area>`, `<image>`, `<filter>`, `<link>`, `<mpath>`, `<pattern>`, `<use>`. (The crawler currently cannot find paths in SVG elements with mixed-case names: `<feImage>`, `<linearGradient>`, `<radialGradient>`, or `<textPath>`.)
- `src` attributes in elements: `<audio>`, `<embed>`, `<frame>`, `<iframe>`, `<img>`, `<input>`, `<script>`, `<source>`, `<track>`, `<video>`
- `srcset` attributes of `<img>` and `<source>` elements
- `poster` attributes of `<video>` elements
- `data` attributes of `<object>` elements
- `background` attributes of `<body>` elements
- `content` attributes of `<meta>` elements with a `property` attribute ending in `:image` (like `og:image`)
- CSS in `<style>` elements or `style` attributes
- JavaScript in `<script>` elements with a `type` attribute of `"module"`

In JavaScript, the crawler finds references in:

- `import` statements (not dynamic `import` calls)
- `export` statements

In CSS, the crawler finds references in:

- `@font-face` declarations
- `@import` declarations
- `@namespace` declarations
- `url()` functions
- `image()`, `image-set()`, and `cross-fade()` functions
