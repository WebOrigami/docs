---
title: "@yaml(object)"
---

Render the contents of the object in YAML format.

The ori tool uses YAML as its default output format, so you won't often need to invoke the `yaml` function yourself from the command line. One occasion to use it would be to convert a JSON file to YAML.

```console assert: true, path: files
$ ori letters.json
{
  "a": "The letter A",
  "b": "The letter B",
  "c": "The letter C"
}
$ ori @yaml letters.json
a: The letter A
b: The letter B
c: The letter C
```
