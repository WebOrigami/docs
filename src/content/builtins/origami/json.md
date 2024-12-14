---
title: json(object)
supertitle: "origami:"
---

Render the contents of the object in JSON format.

The ori tool uses YAML as its default output format, so you can use the `json` function to reformat the output as JSON:

```console assert: true, path: files
$ ori greetings.yaml
${ samples.ori/cli/greetings.yaml }$ ori json greetings.yaml
${ json(samples.ori/cli/greetings.yaml) + "\n" }
```
