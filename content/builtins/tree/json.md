---
title: json(tree)
supertitle: "Tree."
---

Render the contents of the tree in JSON format.

The ori tool uses YAML as its default output format, so you can use the `json` function to reformat the output as JSON:

```console
$ ori greetings.yaml
${ samples/cli/greetings.yaml }$ ori Tree.json greetings.yaml
${ Tree.json(samples/cli/greetings.yaml) + "\n" }
```

See also the more general [`Origami.json`](/builtins/origami/json.html), which can render objects to JSON that aren't trees.
