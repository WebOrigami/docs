---
title: builtins
supertitle: "origami:"
---

`builtins` returns a tree of the complete set of Origami built-in functions.

Because all builtins are always in scope, it's unlikely you will need to reference `builtins` directly.

One theoretical use for `builtins` would be if you have a string holding the name of a desired builtin and want to obtain the corresponding function. E.g., you can obtain a reference to the [`keys`](/builtins/tree/keys.html) builtin with:

```
builtins("keys")
```
