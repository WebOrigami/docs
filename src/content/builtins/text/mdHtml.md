---
title: "mdHtml(markdown)"
supertitle: "text:"
---

Treats the text of its argument as [markdown](https://github.github.com/gfm/) (GitHub-flavored) and translates it to HTML.

Any front matter in the markdown will be preserved at the top of the HTML output.

```console
$ ori "mdHtml '# Hello, world'"
<h1 id="hello-world">Hello, world</h1>
```
