---
title: htmlDom(html)
supertitle: "Origami."
---

This parses the given HTML text into a [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) structure. A common use for doing this is to scrape content from a downloaded HTML file.

Given the following HTML file, `adams.html`:

```html
${ samples/help/adams.html }
```

You can directly extract content from this file using DOM methods:

```console
$ ori "Origami.htmlDom(adams.html).querySelector('cite').textContent"
${ Origami.htmlDom(samples/help/adams.html).querySelector('cite').textContent }

```

See also [`Origami.domObject`](domObject.html) for converting DOM to a plain JavaScript object, or [`Origami.xmlDom`](xmlDom.html) for parsing XML documents.
