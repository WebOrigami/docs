---
title: extension
---

Return `filename` with the extension `ext1` (if it exists) replaced by extension `ext2`.

```console
$ ori "extension/replace('index.md', '.md', '.html')"
${ extension/replace('index.md', '.md', '.html') }
```

This is appropriate when handling a single file. If you are replacing extensions on a set of files, use the [`extensions`](/builtins/tree/map.html#transforming-extensions) option of the [`map`](/builtins/tree/map.html) builtin.
