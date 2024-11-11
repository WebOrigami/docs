---
title: "inline(text)"
supertitle: "text:"
---

Treats `text` as an Origami template, evaluating any Origami expressions found inside `\$\{`…`}` placeholders in the `text`. This operation preserves any front matter in the document.

If `inline.md` contains:

```md
---
name: world
supertitle: "text:"
---

Hello, \$\{ name }!
```

Then invoking inline with this file produces:

```console
$ ori inline inline.md
---
name: world
---
Hello, world!
```

Among other things, you can use `inline` to include one document in another. For example, you can incorporate an HTML fragment from one document into HTML defined in another document.

```html
<!-- page.html -->
<html>
  <body>
    \$\{ fragment.html }
  </body>
</html>
```

```html
<!-- fragment.html -->
<p>Hello, world.</p>
```

```console
$ ori inline page.html
<html>
  <body>
    <p>Hello, world.</p>
  </body>
</html>
```
