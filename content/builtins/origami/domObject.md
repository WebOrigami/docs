---
title: domObject(dom)
supertitle: "Origami."
---

This accepts as input a [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) structure such as that produced by [`htmlDom`](htmlDom.html) or [`xmlDom`](xmlDom.html), or obtained by unpacking an [XML file](/language/fileTypes.html#xml-files).

The function returns a plain object representation of the DOM input. A common reason for doing this is to apply a [template](/language/templates.html) to the data in the HTML or XML document.

- If an element node contains only text nodes, the text will be returned as a `text` property of the element.
- Runs of leading and trailing whitespace in text nodes is collapsed to a single space character.

Example: if `feed.xml` contains

```xml
${ samples/help/feed.xml }
```

then this file can be read (and implicitly unpacked) and passed to `Origami.domObject`:

```console
$ ori Origami.domObject feed.xml
${ Origami.yaml(Origami.domObject(samples/help/feed.xml)) }
```
