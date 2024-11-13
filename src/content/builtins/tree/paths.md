---
title: paths(tree)
supertitle: "tree:"
---

Returns slash-separated paths for all values in the tree.

```console
$ ori greetings.yaml
${ samples.ori/help/greetings.yaml }$ ori paths from greetings.yaml, { deep: true }
${ yaml paths from samples.ori/help/greetings.yaml, { deep: true } }
```

For the time being, YAML files are treated as shallow trees, so to get the paths of the YAML file as a deep tree, it's necessary to call [`from`](from.html) with the `deep` option set to `true`.
