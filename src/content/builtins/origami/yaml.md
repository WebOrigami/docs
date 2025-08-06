---
title: yaml(object)
supertitle: "Origami."
---

Render the contents of the object in [YAML](https://en.wikipedia.org/wiki/YAML) format.

The ori tool uses YAML as its default output format, so you won't often need to invoke the `yaml` function yourself from the command line. One occasion to use it would be to convert a JSON file to YAML.

```console
$ ori letters.json
{
  "a": "The letter A",
  "b": "The letter B",
  "c": "The letter C"
}
$ ori yaml letters.json
a: The letter A
b: The letter B
c: The letter C
```

For parsing YAML, see [`yamlParse`](yamlParse.html).
