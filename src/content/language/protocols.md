---
title: Protocols in Origami URLs
---

Origami implements support for a number of standard and custom protocols in URLs.

## explore:

If a site supports the [JSON Keys](/async-tree/jsonKeys.html) protocol, then you can use `explore:` to traverse the site and work with it like any tree of content. See that page for an example.

## http:

Like `https:` (below) but for non-secure URLs.

## https:

The standard `https:` protocol at the start of a URL lets Origami know you want to fetch that resource via HTTPS.

```console
$ ori https://example.com
```

will retrieve the HTML page at that URL and display it.

## new:

The `new:` protocol lets you construct an instance of a JavaScript class. It expects a path to a class constructor and returns a function which will instantiate that class via the JavaScript `new` keyword.

```console
$ ori "new:Date('2025-12-31')"
${ yaml new:Date('2025-12-31') }
```

## package:

This lets you access an installed npm package by name, including by an `@`-prefixed npm organization and name.

This returns the default export(s) of the indicated npm package. You can then further traverse the exports using slash path syntax.

For example, if you install the Origami [screenshot](https://github.com/WebOrigami/extensions/tree/main/screenshot) extension using npm, you can invoke that extension's `url` screenshot function using the `package:` protocol:

```console
$ ori "package:weborigami/screenshot/url('https://example.com')" > example.png
```

## tree:

The `tree:` protocol lets you treat a standard website as a tree. In most cases you will not be able to get the keys of that tree, but you will be able to get known resources from that tree.

One use for this protocol is to create a tree that can be crawled by the [`crawl`](/builtins/crawl.html) or [`siteAudit`](/builtins/siteAudit.html) builtins. For an example, see [Auditing a live site](/builtins/siteAudit.html#auditing-a-live-site).

The `tree:` protocol assumes a site supports HTTPS. For HTTP sites, use `treehttp:`. (If you want to emphasize the use of HTTPS, `treehttps:` is available as an alias for `tree:`.)
