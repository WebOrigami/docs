---
title: htmlDom(html)
supertitle: "Origami."
---

This parses the given HTML text into a DOM structure, which it returns as a plain JavaScript object. This object has the same format used by the related [`Origami.xmlDom`](xmlDom.html) builtin.

Given the following HTML file, `adams.html`:

```html
${ samples/help/adams.html }
```

Passing this to `Origami.htmlDom` returns the document structure as a plain object. In the console this will render by default in YAML form:

```console
$ ori Origami.htmlDom adams.html
${ Origami.yaml(Origami.htmlDom(samples/help/adams.html)) }
```
