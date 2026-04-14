---
title: xmlDom(xml)
supertitle: "Origami."
---

This parses the given XML text into a DOM structure, which it returns as a plain JavaScript object. This object has the same format used by the related [`Origami.htmlDom`](htmlDom.html) builtin.

## Example

Suppose you have an [OPML](https://en.wikipedia.org/wiki/OPML) document called `blogs.opml` that lists a set of blogs in XML format:

```xml
${ samples/help/xmlDom/blogs.opml }
```

You can use `xmlDom` to parse this into a plain JavaScript object. In YAML form, the output will be:

```yaml
${ Origami.yaml(Origami.xmlDom(samples/help/xmlDom/blogs.opml)) }
```

You could use this data, for example, to render a [blogroll](https://indieweb.org/blogroll) to suggest blogs your own readers might be interested in. The following Origami template document renders the above OPML file as HTML:

```ori
${ samples/help/xmlDom/blogroll.ori.html }
```

Running this produces a list of links for the blogs:

```console
$ ori "blogroll.ori.html()"
${ samples/help/xmlDom/blogroll.ori.html() }
```
