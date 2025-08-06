---
title: json(object)
supertitle: "Tree."
---

Render the contents of the object in JSON format.

The ori tool uses YAML as its default output format, so you can use the `json` function to reformat the output as JSON:

```console
$ ori greetings.yaml
${ samples.jse/cli/greetings.yaml }$ ori Tree.json greetings.yaml
${ Tree.json(samples.jse/cli/greetings.yaml) + "\n" }
```
