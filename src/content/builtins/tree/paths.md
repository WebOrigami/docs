---
title: paths(tree)
supertitle: "Tree."
---

Returns an array of slash-separated paths for all values in the tree.

```console
$ ori greetings.yaml
${ samples.ori/help/greetings.yaml }$ ori Tree.paths greetings.yaml
${ Origami.yaml(Tree.paths(samples.ori/help/greetings.yaml)) }
```
