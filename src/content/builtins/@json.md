---
title: "@json(object)"
---

Render the contents of the object in JSON format.

The ori tool uses YAML as its default output format, so you can use the `@json` function to reformat the output as JSON:

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @json greetings.yaml
{
  "Alice": "Hello, Alice.",
  "Bob": "Hello, Bob.",
  "Carol": "Hello, Carol."
}
```
