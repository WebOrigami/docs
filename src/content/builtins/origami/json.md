---
title: json(object)
supertitle: "origami:"
---

Render the contents of the object in JSON format.

The ori tool uses YAML as its default output format, so you can use the `json` function to reformat the output as JSON:

```console
$ ori greetings.yaml
${ <samples.jse/cli/greetings.yaml> }$ ori json greetings.yaml
${ Tree.json(<samples.jse/cli/greetings.yaml>) + "\n" }
```
