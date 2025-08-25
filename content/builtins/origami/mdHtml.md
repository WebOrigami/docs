---
title: mdHtml(markdown)
supertitle: "Origami."
---

Treats the text of its argument as [markdown](https://github.github.com/gfm/) (GitHub-flavored) and translates it to HTML.

Any front matter in the markdown will be preserved at the top of the HTML output.

```console
$ ori "Origami.mdHtml('# Hello, world')"
${ Origami.mdHtml('# Hello, world') }
```
