---
title: "@parse"
---

This is a collection of functions for parsing text formats.

<a name="json"></a>

## @parse/json(text)

Parses the indicated text as JSON using the JavaScript [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

<a name="yaml"></a>

## @parse/yaml(text)

Parses the indicated text as JSON or YAML. The parsed plain JavaScript object is returned or, if the parse fails, this returns `undefined`. This can be used to parse JSON or YAML files.

Parsing a quoted argument on the command line:

```console assert: true, path: files
$ ori @parse/yaml "'[1, 2, 3]'"
- 1
- 2
- 3
```

This is similar to the [@plain](@plain.html) function, but that can only parse JSON/YAML representing trees. In contrast, the `@parse/yaml` function can handle text representing things that aren't trees, such as arrays, dates, and numbers.
