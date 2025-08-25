---
title: "package: protocol"
subtitle: Reference Node.js packages installed in node_modules
---

The `package:` protocol lets you access an installed npm package by name. The package name can be a single string name, or a two part name with an npm organization and a package name.

This returns the default export(s) of the indicated npm package. You can then further traverse the exports using slash path syntax.

For example, if you install the Origami [@weborigami/screenshot](https://github.com/WebOrigami/extensions/tree/main/screenshot) extension using npm, you can invoke that extension's `url` screenshot function using the `package:` protocol:

```console
$ ori "package:@weborigami/screenshot/url('https://example.com')" > example.png
```
