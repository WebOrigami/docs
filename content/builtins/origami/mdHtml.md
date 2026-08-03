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

See also [`Origami.mdOutline`](mdOutline.html) for extracting the outline structure of a markdown document.

## Supported markdown

The `Origami.mdHtml` command supports Github-Flavored Markdown, a strict superset of [CommonMark](https://spec.commonmark.org) that includes:

- Automatic translation of links like https://example.com
- Strikethrough: `~mistake~` becomes ~mistake~
- [Tables](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)
- [Footnotes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes)
- [Task lists](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#task-lists)
- Syntax highlighting of programming code in code blocks
- Creation of heading IDs: `# Hello, world!` generates: `<h1 id="hello-world">Hello, world!</h1>`

(Origami does not support GitHub-Flavored Markdown features that are specific to the GitHub service, including GitHub-style alert blocks and auto-linking to GitHub user profiles, GitHub issues, or GitHub pull requests.)

`Origami.mdHtml` includes typographic support for:

- Smart quotes: `"Yes"` and `'No'` become "Yes" and 'No'.
- En-dashes: `--` becomes --
- Em-dashes: `---` becomes ---
- Ellipsis: `...` becomes ...
