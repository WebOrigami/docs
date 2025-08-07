---
title: audit(tree)
supertitle: "Dev."
---

This audits the site defined by the given tree for broken internal links. It first crawls the site using the same crawler as [`crawl`](crawl.html); see that page for details on what kinds of files and references are crawled.

- The audit only verifies links to internal pages and resources. It does not verify links to external pages and resources, i.e., outside the site being audited.
- The audit process currently ignores errors. If, when attempting to retrieve a given resource, an error is generated, that resource will be skipped.
- A link to a page is considered valid if the page exists; if a link includes an anchor, the audit does not confirm that the specific anchor exists on that page. E.g., a link to `foo.html#example` is valid if `foo.html` exists, regardless of whether that page has an `#example` anchor.
- Links to `foo`, `foo/`, and `foo/index.html` are considered equal.
- The audit process is unaware of any redirects you may have configured for your web server. For example, you might configure a web host with redirects that arrange for other kinds of equivalence so that `foo/` and `foo.html` are equivalent. But `audit` will consider those to be different paths.

## Auditing an Origami site

You can give `audit` the top-level file that defines your site's root.

Example: a file contains a tiny site with an `index.html` page that links to page `a.html` that links to `b.html`:

```ori
// hasMissingPage.ori
${ samples.jse/help/hasMissingPage.jse }
```

```console
$ ori audit hasMissingPage.ori
${ Origami.yaml(Dev.audit(samples.jse/help/hasMissingPage.jse)) }
```

Here `audit` reports that `a.html` has a link to a non-existent page `b.html`.

Because Origami treats all trees equally, you can also audit a folder of HTML pages. For example, if you're using `copy` to [build your site](/builtins/dev/copy.html#copy-to-build), you could audit the build output folder:

```console
$ ori audit build
```

Auditing a site directly (via the `.ori` example above) lets you audit it without having to build it first.

## Auditing a live site

Using Origami's [`httpstree:`](/builtins/protocol/httpstree.html) protocol, you can treat a live site as a traversable tree that `audit` can audit.

Example: The venerable [Space Jam](https://www.spacejam.com/1996/) web site has hundreds of pages which, despite being written by hand, contain very few broken internal links. As of this writing (April 2025), an audit of that site produces the following:

```console
$ ori audit httpstree://www.spacejam.com/1996/
cmp/junior/juniornoframes.html:
  - bin/junior.map><img src=
cmp/lineup/lineupnoframes.html:
  - cmp/lineup/triviaframes.html
cmp/lineup/quiz6.html:
  - cmp/lineup/quiz6b.html
  - cmp/lineup/quiz6d.html
```

The audit shows that, for example, the [quiz6.html](https://www.spacejam.com/1996/cmp/lineup/quiz6.html) page in the site's Trivia Quiz contains two broken links, and the [juniornoframes.html](https://www.spacejam.com/1996/cmp/junior/juniornoframes.html) page has an `<a>` element whose `href` is missing a closing quote.
