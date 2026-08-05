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

If you pass `Origami.inline` plain text, or file downloaded from a network location, you will need to manually indicate the implied `parent` folder via an option:

```ori
Origami.inline(text, { parent: path/to/folder })
```

This evaluates any expressions in `text` as if the text were a file in the given folder.

## Escaping template substitutions in the text

Suppose you have a document that discusses JavaScript, Origami, or other language that uses the `${ }` syntax for template substitutions. `Origami.inline` would normally interpret those, but you can prevent that by escaping the `$` with a backslash: `\${ }`.
