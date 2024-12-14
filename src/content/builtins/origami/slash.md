---
title: slash
supertitle: "origami:"
---

This is a collection of functions for working with [trailing slashes](/async-tree/interface.html#trailing-slash-convention), which are commonly used in Origami keys to indicate that the value for that key is a subtree. For example, the key for a subfolder `content` may be given as `content/`.

These `slash` functions can be useful when working inside a [`map`](/builtins/tree/map.html) that operates over the top level of a folder.

Example: The [Cherokee Myths](https://cherokee-myths.netlify.app/) sample site organizes a set of stories by topic into chapter folders. The folder for stories about birds is called "Birds". A [template that generates a table of contents](https://github.com/WebOrigami/cherokee-myths/blob/main/src/toc.ori) produces an HTML fragment for each chapter folder like:

```
map(stories, (chapterStories, chapterKey) => `
  <h2>`\${ slash/remove(chapterKey) }</h2>
`)
```

The keys for the chapter folders will have trailing slashes like "Birds/". The `slash/remove` function removes the slash so the folder name can be used for a heading: `<h2>Birds</h2>`.

## add(key)

Returns the given key, adding a trailing slash if it doesn't already have one. If the key is not a string, it is returned unmodified.

```console
$ ori "slash/add('folder')"
${ slash/add('folder/') + "\n" }
$ ori "slash/add('folder/')"
${ slash/add('folder/') + "\n" }
```

## has(key)

Returns true if the key ends in a trailing slash. If the key is not a string, this returns `false`.

```console
$ ori "slash/has('file.txt')"
${ (slash/has('file.txt') ? "true" : "false") + "\n" }
$ ori "slash/has('folder/')"
${ slash/has('folder/') + "\n" }
```

## remove(key)

Returns the given key, removing a trailing slash if it has one. If the key is not a string, it is returned unmodified.

```console
$ ori "slash/remove('file.txt')"
${ slash/remove('file.text') + "\n" }
$ ori "slash/remove('folder/')"
${ slash/remove('folder/') + "\n" }
```

## toggle(key, [force])

Given only a key, this will add a trailing slash if the key doesn't have one or remove if it does. Given a truthy value for the `force` parameter, this will behave like `add()` above. Given a falsy value for `force`, this behaves like `remove()` above.

```console
$ ori "slash/toggle('data')"
${ slash/toggle('data') + "\n" }
$ ori "slash/toggle('data/')"
${ slash/toggle('data/') + "\n" }
$ ori "slash/toggle('data', true)"
${ slash/toggle('data', true) + "\n" }
$ ori "slash/toggle('data/', false)"
${ slash/toggle('data/', false) + "\n" }
```

This can be useful for having one key add or remove a trailing slash to match a second key.

```console
$ ori "slash/toggle('a', slash/has('b'))"
${ slash/toggle('a', slash/has('b')) + "\n" }
$ ori "slash/toggle('a', slash/has('b/'))"
${ slash/toggle('a', slash/has('b/')) + "\n" }
```
