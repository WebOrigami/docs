---
title: inline(text, [options])
supertitle: "Origami."
---

Treats `text` as an Origami template, evaluating any Origami expressions found inside `\$\{`…`}` placeholders in the `text`. This operation preserves any front matter in the document.

If `inline.md` contains:

```md
---
name: world
---

Hello, \$\{ name }!
```

Then invoking inline with this file produces:

```console
$ ori Origami.inline inline.md
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
$ ori Origami.inline page.html
<html>
  <body>
    <p>Hello, world.</p>
  </body>
</html>
```

## Specifying the scope for the expressions

To resolve any file references in the expressions found in the document, Origami uses a [scope](/language/scope.html) that requires identifying the real or implied `parent` folder for the document.

If you pass `Origami.inline` a file by reference, the default `parent` folder will be the file system folder that contains that file:

```ori
Origami.inline(path/to/file)
```

If you pass `Origami.inline` plain text, you will need to manually indicate the `parent` folder via an option:

```ori
Origami.inline(text, { parent: path/to/folder })
```
