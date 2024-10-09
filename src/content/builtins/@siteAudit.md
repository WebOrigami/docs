---
title: "@siteAudit(tree)"
---

This audits the site defined by the given tree for broken internal links. It first crawls the site using [@crawl](@crawl.html), then reports back any errors.

Currently, the audit only checks for links that point to internal files of the following types:

- `.css`
- `.html`
- `.js`
- `.xhtml`
- `sitemap.xml`

The crawler does not currently verify links to internal resources of other types, such as images. It also does not verify links to external pages and resources outside the site being audited.

## Auditing an Origami site

You can give `@siteAudit` the top-level file that defines your site's root.

Example: a `brokenLinks.ori` file contains a tiny site with an `index.html` page that links to pages `a.html` and `b.html`:

```ori
// brokenLinks.ori
${ samples.ori/help/brokenLinks.ori }
```

```console
$ ori @siteAudit brokenLinks.ori
${ @yaml @siteAudit samples.ori/help/brokenLinks.ori }
```

Here `@siteAudit` reports that `index.html` has a link to a non-existent page `b.html`.

Because Origami treats all trees equally, you can also audit a folder of HTML pages. For example, if you're using `@copy` to [build your site](/builtins/@copy.html#copy-to-build), you could audit the build output folder:

```console
$ ori @siteAudit build
```

Auditing a site directly (via the `.ori` example above) lets you audit it without having to build it first.

## Auditing a live site

Using Origami's `tree:` protocol, you can treat a live site as a traversable tree that `@siteAudit` can audit.

Example: The venerable [Space Jam](https://www.spacejam.com/1996/) web site has hundreds of pages which, despite being written by hand, contain very few broken internal links. As of this writing (October 2024), an audit of that site produces the following:

```console
$ ori @siteAudit tree://www.spacejam.com/1996/
cmp/lineup/lineupnoframes.html:
  - cmp/lineup/triviaframes.html
cmp/lineup/quiz6.html:
  - cmp/lineup/quiz6b.html
  - cmp/lineup/quiz6d.html
```

The audit shows that, for example, the [quiz6.html](https://www.spacejam.com/1996/cmp/lineup/quiz6.html) page in the site's Trivia Quiz contains two broken links.
