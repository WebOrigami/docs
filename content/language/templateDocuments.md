---
title: Origami template documents
subtitle: Text files with embedded Origami expressions
---

Template documents represent a middle ground between [documents](documents.html) that can contain some data in front matter and Origami files that contain [templates](templates.html).

- A template document file is identified with two extensions, where the second-to-last extension is `.ori`, like `index.ori.html` or `about.ori.md`.
- When you ask Origami to evaluate such a file, it will implicitly inline the results of any Origami expressions inside the file.

A template document is appropriate when you have a long template that may need portions of embedded or attached code. (For brevity, some of the samples shown below have very short templates.)

There are three different kinds of template documents:

1. Text with embedded substitutions
2. Body text with YAML front matter
3. Body text with Origami front matter

These largely work the same, but with some differences described below.

## Text with embedded substitutions

This template document is called `inline.ori.html`:

```html
${ samples/templateDocuments/inline.ori.html }
```

Substitutions inside a template document are full Origami expressions so, among other things, they can reference other documents. The above template includes an embedded Origami expression that references a separate file, `inline.css`.

```css
/* inline.css */
${ samples/templateDocuments/inline.css }
```

The result of the `inline.ori.html` template is a function that returns a string. (The function can accept a single parameter; see below.)

If you have ask Origami to evaluate the template, it will call that function and return the resulting text. The text will contain the results of all the expressions in the document.

In this example, evaluating the function inlines the referenced CSS file:

```console
$ ori inline.ori.html/
${ samples/templateDocuments/inline.ori.html/ }
```

### Escaping substitutions

You can generally put any text in a template document outside of a substitution and the text will be included as is. Unlike template literal expressions in an Origami (or JavaScript) program, template document text may contain embedded `` ` `` backticks; they will be included directly in the output.

One catch arises in a situation where your document text discusses JavaScript or Origami templates. If you want the plain text to include a template substitution, escape the `$` with a backslash, like `\\$\{ \}`, to avoid having the substitution interpreted.

### Accepting an argument

By default, a template document like this can be called as a function with one argument referenced with a `_` underscore.

```html
<!-- bold.ori.html -->
${ samples/templateDocuments/bold.ori.html }
```

When called as a function, any value passed to this template will be incorporated into the output:

```console
$ ori "bold.ori.html('Hooray')"
${ samples/templateDocuments/bold.ori.html("Hooray") }
```

Such templates behave like simple components. You can use them decompose the construction of complex documents into smaller pieces that are easier to understand.

## Body text with YAML front matter

Like other text [documents](documents.html), a template document can include YAML front matter at the top of the document, enclosed in lines of `---` three hyphens.

Suppose `shopping.ori.html` contains:

```html
${ samples/templateDocuments/shopping.ori.html }
```

The front matter is treated as [YAML](https://en.wikipedia.org/wiki/YAML). This can be used to define additional data — here, a list.

The front matter data is available to expressions in the body text, so the expression in the body text can reference the `list`:

```console
$ ori shopping.ori.html/
${ Origami.yaml(samples/templateDocuments/shopping.ori.html/) }
```

The result of the template is a plain object containing all of the front matter data, plus a `_body` property with the result of evaluating the body text.

## Body text with Origami front matter

Alternatively, front matter can be an [Origami expression](documents.html#origami-front-matter) that returns a function, function call, object literal, etc.

### Defining the value of the template document

If Origami front matter is present, that will be evaluated and returned as the result of invoking the template document. Within this front matter, you can invoke the template's body text as `_template`.

Example: a site defines its "About" page as a template document called `about.ori.html`:

```html
${ samples/templateDocuments/baseTemplate/about.ori.html }
```

The front matter of this document is an Origami expression that will be evaluated and returned as the result of the template document.

In this case, the expression invokes the template's body text via `_template`, then passes that to a base `page.ori.html` template defined separately:

```html
${ samples/templateDocuments/baseTemplate/page.ori.html }
```

When you ask for the value of `about.ori.html`, that in turn calls `page.ori.html`:

```console
$ ori about.ori.html/
${ samples/templateDocuments/baseTemplate/about.ori.html/ }
```

### Returning an object

Sometimes a template is primarily body text but the result should include some calculated data.

This can be achieved using the above principle of placing an Origami expression in the front matter. In this case, the front matter can define an object using an [object literal](expressions#object-literals).

If `calcs.ori.md` contains:

```
${ samples/templateDocuments/calcs.ori.md }
```

then invoking this returns an object:

```console
$ ori calcs.ori.md/
${ Origami.yaml(samples/templateDocuments/calcs.ori.md/) }
```

### Returning a function

To define your template document as a more complex function — e.g., one that accepts multiple arguments, or that calls other functions — define a function in the front matter.

This `link.ori.html` template accepts `href` and `text` parameters to return an HTML link:

```html
${ samples/templateDocuments/link.ori.html }
```

The value of the `href` and `link` parameters are in scope for expressions in the template body.

```console
$ ori "link.ori.html('https://weborigami.org', 'Web Origami')"
${ samples/templateDocuments/link.ori.html('https://weborigami.org', 'Web Origami') + "\n" }
```

## Behavior within a `map`

When used inside a [`Tree.map`](/builtins/tree/map.html) function, a template document will provide a default `key` function to the map. This `key` function will add the template document's last extension to keys in the map's output.

For example, this template is called `movie.ori.html`, so it will add `.html` to keys in a map.

```html
<!-- movie.ori.html -->
${ samples/templateDocuments/movies/movie.ori.html }
```

When applied to this data:

```yaml
# movies.yaml
${ samples/templateDocuments/movies/movies.yaml }
```

the resulting keys have `.html` extensions:

```console
$ ori Tree.map movies.yaml, movie.ori.html
${ Origami.yaml(
  Tree.map(
    samples/templateDocuments/movies/movies.yaml
    samples/templateDocuments/movies/movie.ori.html
  )
) }
```

You can override this behavior by explicitly providing a `key` option to `Tree.map`.
