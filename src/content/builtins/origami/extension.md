---
title: extension
---

This is a collection of functions for working with file extensions.

## extname(path)

This behaves the same as the [path.extname()](https://nodejs.org/api/path.html#pathextnamepath) in Node.js. It returns the extension of the given file name or path.

```console
$ ori "extension/extname('foo.html')"
${ extension/extname('foo.html') }
```

`extname` ignores trailing slashes:

```console
$ ori "extension/extname('https://example.com/data.json/')"
${ extension/extname('https://example.com/data.json/') }
```

If a file has multiple extensions, `extname` returns just the last one:

```console
$ ori "extension/extname('index.ori.html')"
${ extension/extname('index.ori.html') }
```

## match(key, ext)

If the `key` ends in the given extension, this returns the base name without the extension; otherwise this returns `null`.

```console
$ ori "extension/match('index.md', '.html')"
${ extension/match('index.md', '.html') }
$ ori "extension/match('index.html', '.html')"
${ extension/match('index.html', '.html') }
```

Trailing slashes are ignored for this comparison.

`match` supports a more liberal interpretation of "extension" than `extname` does. A file name like `index.ori.html` ends in a multi-part extension. `extname` will return just the last `.html` part, but `match` can be used to match against the full multi-part `.ori.html` extension.

```console
$ ori "extension/match('index.ori.html', '.ori.html')"
${ extension/match('index.ori.html', '.ori.html') }
```

## replace(key, ext1, ext2)

Return `key` with the extension `ext1` (if it exists) replaced by extension `ext2`. If `key` doesn't end in the extension, it is returned unchanged.

```console
$ ori "extension/replace('index.md', '.md', '.html')"
${ extension/replace('index.md', '.md', '.html') }
```

Like `match`, `replace` supports multi-part extensions like `.ori.html`.

This is appropriate when handling a single file. If you are replacing extensions on a set of files, use the [`extension`](/builtins/tree/map.html#transforming-extensions) option of the [`map`](/builtins/tree/map.html) builtin.
