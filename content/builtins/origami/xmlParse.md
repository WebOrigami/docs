---
title: xmlParse(xml)
supertitle: "Origami."
---

This parses the given XML text into a DOM structure, which it returns as a plain JavaScript object. This object has the same format used by the related [`Origami.htmlParse`](htmlParse.html) builtin. See also support for [XML files](/language/fileTypes.html#xml-files).

## Example

Suppose you have an [OPML](https://en.wikipedia.org/wiki/OPML) document called `blogs.opml` that lists a set of blogs in XML format:

```xml
${ samples/help/xmlParse/blogs.opml }
```

You can use `xmlParse` to parse this into a plain JavaScript object. In YAML form, the output will be:

```yaml
${ Origami.yaml(Origami.xmlParse(samples/help/xmlParse/blogs.opml)) }
```

You could use this data, for example, to render a [blogroll](https://indieweb.org/blogroll) to suggest blogs your own readers might be interested in. The following Origami template document calls the `Origami.xmlParse` function to convert the XML text to a plain object, which is then rendered as HTML:

```ori
${ samples/help/xmlParse/blogroll.ori.html }
```

Running this produces a list of links for the blogs:

```console
$ ori "blogroll.ori.html()"
${ samples/help/xmlParse/blogroll.ori.html() }
```
