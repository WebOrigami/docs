---
title: "or(...values)"
supertitle: "calc:"
---

Returns the first truthy value: a value that isn't `false`, `null`, `undefined`, or any of the other similar values in JavaScript.

This can be useful in situations like [templates](/language/templates.html) to provide a default value for a field that may or may not be present in an input document.

Example: a blog post template uses `or` to define a default title.

```console
$ ori blostPost.ori
${ samples.ori/templates/blogPost.ori }
```

If a blog post defines a `title`, that title is preferred:

```console
$ cat posts/post1.html
${ samples.ori/templates/posts/post1.html }
$ ori blogPost.ori posts/post1.html
${ samples.ori/templates/blogPost.ori samples.ori/templates/posts/post1.html }
```

But if a post fails to define a `title`, the template's default title is used:

```console
$ cat posts/post2.html
${ samples.ori/templates/posts/post2.html }
$ ori blogPost.ori posts/post2.html
${ samples.ori/templates/blogPost.ori samples.ori/templates/posts/post2.html }
```
