---
title: stdin()
supertitle: "origami:"
---

Returns the complete contents of the standard input stream. This lets you pipe data into JavaScript functions:

```console
$ ori uppercase.js
export default (x) => x.toString().toUpperCase();
$ echo This is input from the shell | ori uppercase.js stdin/
THIS IS INPUT FROM THE SHELL
```
