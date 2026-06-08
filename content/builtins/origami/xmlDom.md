---
title: xmlDom(xml)
supertitle: "Origami."
---

Parses the given XML text and returns the resulting [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) structure.

When working with an [XML file](/language/fileTypes.html#xml-files) with a `.xml` extension, Origami will automatically unpack the file into DOM, so you wouldn't need to apply this `xmlDom` function to the file. Rather, this function is useful when transforming XML obtained from other types of files.

Example: `xmlDom` can be used to process a `.opml` file into DOM. If `blogs.opml` contains:

```xml
${ samples/help/xmlParse/blogs.opml }
```

This can be converted to DOM via `Origami.xmlDom`, and then further converted to a plain JavaScript object via [`Origami.domObject`](domObject.html):

```console
$ ori Origami.domObject Origami.xmlDom blogs.opml
${ Origami.yaml(Origami.domObject(Origami.xmlDom(samples/help/xmlParse/blogs.opml))) }
```
