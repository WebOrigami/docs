---
title: "mdOutline(markdown)"
subitle: "Origami."
---

This returns an object representing the structure of the [markdown](https://github.github.com/gfm/) document according to its headings.

- The object's keys will be the document's headings in order.
- The object's values will be the text of those sections or, if the section has its own headings, a subobject for that portion of the document.
- For a given section that has subheadings, any text that appears before the first subheading is included in an initial `_text` property for that section.

Example: Suppose the markdown document `headings.md` contains various headings:

```md
${ samples/help/headings.md }
```

The outline of this document looks like:

```console
$ ori Origami.mdOutline headings.md
${ Origami.yaml(Origami.mdOutline(samples/help/headings.md)) }
```

A common use for an outline is to render the outline's keys as navigation links. For example, the following template converts an outline to a list of links for the top-level headings:

```ori
${ samples/help/headings.ori }
```

Applying this to the outline:

```console
$ ori headings.ori Origami.mdOutline headings.md
${ samples/help/headings.ori(Origami.mdOutline(samples/help/headings.md)) }
```

See also [`Origami.mdHtml`](mdHtml.html) for translating a markdown document to HTML.
