---
title: "@inline(text)"
---

Treats `text` as an Origami template, evaluating any Origami expressions found inside `\$\{`…`}` placeholders in the `text`. This operation preserves any front matter in the document.

```console
$ cat inline.md
---
name: world
---
Hello, \$\{ name }!
$ ori @inline inline.md
---
name: world
---
Hello, world!
```

Among other things, you can use `@inline` to include one document in another. For example, you can incorporate an HTML fragment from one document into HTML defined in another document.

```console
$ cat page.html
<html>
  <body>
\$\{ fragment.html }
  </body>
</html>
$ cat fragment.html
    <p>Hello, world.</p>
$ ori @inline page.html
<html>
  <body>
    <p>Hello, world.</p>
  </body>
</html>
```
