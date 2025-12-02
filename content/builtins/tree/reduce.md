---
title: reduce(tree, reduceFn)
supertitle: "Tree."
---

Reduces a [map-based tree](/async-tree/mapBasedTree.html) to a single value. See also [`Tree.mapReduce`](mapReduce.html), which simultaneously maps values.

For each interior node of the tree, the `reduceFn` will be called to reduce that node. Its signature is `(node, tree)`, where the `node` is a map. The result of this function is used in place of that node when reducing the parent node; work proceeds towards the root of the tree.

Example: A file has population data in a tree structure that does not have a consistent depth:

```yaml
# census.yaml
${ samples/help/census.yaml }
```

You can use `reduce` to distill this to a single total population number:

```ori
// population.ori
${ samples/help/population.ori }
```

The `reduceFn` will be called on each node of the tree. Here the `reduceFn` calls the JavaScript array [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to add up the numbers that are the node's values.

```console
$ ori population.ori/
${ Origami.yaml(samples/help/population.ori/) + "\n" }
```
