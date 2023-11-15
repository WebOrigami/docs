---
title: "@builtins"
---

`@builtins` returns a tree of the complete set of Web Origami's built-in functions.

The built-in functions are already prefixed with `@` signs to reduce the chance of a name collision, but the `@builtins` tree lets you further disambiguate between a local file or function of yours whose name happens to start with a `@`.

For example, if your project happens to contain a folder called `@map`, then using `@map` in a local formula will reference the local folder instead of the `@map` built-in function. To reference the built-in `map`, you can write `@builtins/@map`.
