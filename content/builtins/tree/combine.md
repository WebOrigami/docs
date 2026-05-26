---
title: combine(tree1, tree2, combineFn)
supertitle: "Tree."
---

This returns the result of applying the function `combineFn` to the values in the two
[map-based trees](/async-tree/mapBasedTree.html). This can be used to combine or compare values in the trees.

The function will be called for each pairwise combination of values at a given path in the trees. If one tree has a value for a key but the other does not, the passed value will be `undefined`. The result of `Tree.combine` will be the combined results of calling `combineFn`. If `combineFn` itself returns `undefined`, no value will be included in the result.

The [`Dev.changes`](/builtins/dev/changes.html) command uses this `Tree.combine` function to compare a new tree with an old one.

## Example

As a demonstration, suppose you want to concatenate the corresponding values in two trees that are both defined in YAML files.

```yaml
# 1.yaml
${ samples/help/combine/1.yaml }
```

```yaml
# 2.yaml
${ samples/help/combine/2.yaml }
```

A sample function takes two values and combines them:

```ori
// combine.ori
${ samples/help/combine/combine.ori }
```

Call `Tree.combine` combines the values in the two files:

```console
$ ori Tree.combine 1.yaml, 2.yaml, combine.ori
${ Origami.yaml(
  Tree.combine(
    samples/help/combine/1.yaml
    samples/help/combine/2.yaml
    samples/help/combine/combine.ori
  )
) }
```
