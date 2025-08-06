---
title: slug(text)
supertitle: "Origami."
---

Generates a [slug](https://developer.mozilla.org/en-US/docs/Glossary/Slug) for the given text. This is commonly done to convert, for example, a blog page title into an ID for that post.

In converting the text to a slug, `slug` will:

- Convert text to lowercase
- Convert spaces to dashes
- Remove special characters except dashes, letters, numbers, and periods

Example: if `post1.html` contains:

```html
${ samples.jse/templates/posts/post1.html }
```

Then the `title` can converted to a slug with:

```console
$ ori Origami.slug post1.html/title
${ Origami.slug(samples.jse/templates/posts/post1.html/title) + "\n" }
```

`slug` does not assume a particular file extension. If you wish to add an extension, you can use, for example, a template literal.
