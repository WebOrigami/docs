---
title: htmlEscape(text)
---

Escapes HTML entities in the text.

```console
$ ori "htmlEscape('<div>Hello</div>')"
${ Origami.htmlEscape("<div>Hello</div>") }

```

One use for this is to deliberately render visible HTML in the text of a template for an HTML page, for example a page that talks about writing HTML. Another use is preventing potential script injection in text from an external source.
