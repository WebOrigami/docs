---
title: deepText(tree)
supertitle: "Tree."
---

Concatenates the text values of the [map-based tree](/async-tree/mapBasedTree.html).

```yaml
// greetings.yaml
${ samples/cli/greetings.yaml }
```

```console
$ ori Tree.deepText greetings.yaml
${ Tree.deepText(samples/cli/greetings.yaml) + "\n" }
```
