---
title: Origami template documents
subtitle: Text files with embedded Origami expressions
---

Template documents represent a middle ground between [documents](documents.html) that can contain some data in front matter and Origami files that contain [templates](templates.html).

- A template document file is identified with two extensions, where the second-to-last extension is `.ori`, like `index.ori.html` or `about.ori.md`.
- When you ask Origami to evaluate such a file, it will implicitly inline the results of any Origami expressions inside the file.

A template document is appropriate when you have a long template that may need portions of embedded or attached code. (For brevity, some of the samples shown below have very short templates.)

## Example

This template document is called `inline.ori.html`:

```html
${ samples.ori/templateDocuments/inline.ori.html }
```

Substitutions inside a template document are full Origami expressions so, among other things, they can reference other documents. In this case, the above template includes an embedded Origami expression that references a separate file, `inline.css`:

```css
/* inline.css */
${ samples.ori/templateDocuments/inline.css }
```

If you have ask Origami to evaluate `inline.ori.html`, it will return the text with the results of all expressions inline:

```console
$ ori inline.ori.html/
${ samples.ori/templateDocuments/inline.ori.html() }
```

## Accepting an argument

By default, a template document can be called as a function with one argument referenced with a `_` underscore.

```html
<!-- bold.ori.html -->
${ samples.ori/templateDocuments/bold.ori.html }
```

When called as a function, any value passed to this template will be incorporated into the output:

```console
$ ori "bold.ori.html('Hooray')"
${ samples.ori/templateDocuments/bold.ori.html("Hooray") }
```

## Front matter

Like other text documents, a template document can include [front matter](documents.html#document-objects) at the top of the document, enclosed in lines of `---` three hyphens.

By default, front matter is treated as YAML (including JSON). This can be used to define additional data. The template's body text will be evaluated and added to the data as a `@text` property.

Alternatively, front matter can be an [Origami expression](documents.html#origami-front-matter). This will generally be a function, function call, or an object literal; see below for examples.

## Defining the value of the template document

By default, the result of invoking a template document will be template's body text with the values of all embedded Origami expressions inlined.

You can arrange for some other result by placing an Origami expression in the document's front matter. If Origami front matter is present, that will be evaluated and returned as the result of invoking the template document.

Within this front matter, you can invoke the template's body text as `@template`.

Example: a website defines its "About" page as a template document called `about.ori.html`:

```html
${ samples.ori/templateDocuments/baseTemplate/about.ori.html }
```

The front matter of this document is an Origami expression that will be evaluated and returned as the result of the template document.

In this case, the expression invokes the template's body text via `@template`, then passes that to a base `page.ori.html` template defined separately:

```html
${ samples.ori/templateDocuments/baseTemplate/page.ori.html }
```

When you ask for the value of `about.ori.html`, that in turn calls `page.ori.html`:

```console
$ ori about.ori.html/
${ samples.ori/templateDocuments/baseTemplate/about.ori.html/ }
```

## Returning a function

To define your template document as a more complex function — e.g., one that accepts multiple arguments, or that calls other functions — define a function in the front matter.

This `link.ori.html` template accepts `href` and `text` parameters to return an HTML link:

```html
${ samples.ori/templateDocuments/link.ori.html }
```

The value of the `href` and `link` parameters are in scope for expressions in the template body.

```console
$ ori "link.ori.html('https://weborigami.org', 'Web Origami')"
${ samples.ori/templateDocuments/link.ori.html('https://weborigami.org', 'Web Origami') + "\n" }
```

## Returning an object

Sometimes a template is primarily body text but the result should include some calculated data.

This can be achieved using the above principle of placing an Origami expression in the front matter. In this case, the front matter can define an object using an [object literal](syntax.html#object-literals).

If `calcs.ori.md` contains:

```ori
${ samples.ori/templateDocuments/calcs.ori.md }
```

then invoking this returns an object:

```console
$ ori calcs.ori.md
${ yaml(samples.ori/templateDocuments/calcs.ori.md/) }
```

## Behavior within a `map`

When used inside a [`tree:map`](/builtins/tree/map.html) function, a template document will provide a default `key` function to the map. This `key` function will add the template document's last extension to keys in the map's output.

For example, this template is called `movie.ori.html`, so it will add `.html` to keys in a map.

```html
<!-- movie.ori.html -->
${ samples.ori/templateDocuments/movies/movie.ori.html }
```

When applied to this data:

```yaml
# movies.yaml
${ samples.ori/templateDocuments/movies/movies.yaml }
```

the values will end up with `.html` extensions:

```console
$ ori map movies.yaml, movie.ori.html
${ yaml(
  map(
    samples.ori/templateDocuments/movies/movies.yaml
    samples.ori/templateDocuments/movies/movie.ori.html
  )
) }
```

You can override this behavior by providing a `key` function to the map.
