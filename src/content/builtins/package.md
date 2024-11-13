---
title: "package: protocol"
subtitle: To reference Node.js packages installed in node_modules
---

The `package:` protocol lets you access an installed npm package by name, including by an `@`-prefixed npm organization and name.

This returns the default export(s) of the indicated npm package. You can then further traverse the exports using slash path syntax.

For example, if you install the Origami [screenshot](https://github.com/WebOrigami/extensions/tree/main/screenshot) extension using npm, you can invoke that extension's `url` screenshot function using the `package:` protocol:

```console
$ ori "package:weborigami/screenshot/url('https://example.com')" > example.png
```
