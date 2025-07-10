---
title: extension
---

This is a collection of functions for working with file extensions.

## extname(path)

This behaves the same as the [path.extname()](https://nodejs.org/api/path.html#pathextnamepath) in Node.js. It returns the extension of the given file name or path.

```console
$ ori "extension/extname('foo.html')"
${ Origami.extension.extname('foo.html') + "\n" }
```

`extname` ignores trailing slashes:

```console
$ ori "extension/extname('https://example.com/data.json/')"
${ Origami.extension.extname('https://example.com/data.json/') + "\n" }
```

If a file has multiple extensions, `extname` returns just the last one:

```console
$ ori "extension/extname('index.ori.html')"
${ Origami.extension.extname('index.ori.html') + "\n" }
```

## match(key, ext)

If the `key` ends in the given extension, this returns the base name without the extension; otherwise this returns `null`.

```console
$ ori "extension/match('index.md', '.html')"
${ Origami.extension.match('index.md', '.html') + "\n" }
$ ori "extension/match('index.html', '.html')"
${ Origami.extension.match('index.html', '.html') + "\n" }
```

Trailing slashes are ignored for this comparison.

`match` supports a more liberal interpretation of "extension" than `extname` does. A file name like `index.ori.html` ends in a multi-part extension. `extname` will return just the last `.html` part, but `match` can be used to match against the full multi-part `.ori.html` extension.

```console
$ ori "extension/match('index.ori.html', '.ori.html')"
${ Origami.extension.match('index.ori.html', '.ori.html') + "\n" }
```

## replace(key, ext1, ext2)

Return `key` with the extension `ext1` (if it exists) replaced by extension `ext2`. If `key` doesn't end in the extension, it is returned unchanged.

```console
$ ori "extension/replace('index.md', '.md', '.html')"
${ Origami.extension.replace('index.md', '.md', '.html') + "\n" }
```

Like `match`, `replace` supports multi-part extensions like `.ori.html`.

This is appropriate when handling a single file. If you are replacing extensions on a set of files, use the [`extension`](/builtins/tree/map.html#transforming-extensions) option of the [`map`](/builtins/tree/map.html) builtin.
