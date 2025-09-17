---
title: mapReduce(tree, mapFn, reduceFn)
supertitle: "Tree."
---

Maps and reduces a tree to a single value.

- The `mapFn`, if provided, will be invoked to map individual leaf values in the tree. The signature of this function is `(value, key, tree)` (the same as for the `value` function in [`Tree.map`](map.html).). If the `mapFn` is null, values will be used as is.
- For each level of the tree, the `reduceFn` will be called with the mapped values. Its signature is `(values, keys, tree)`. The result of this function is used as the result of reducing this branch of the tree.

Example: A file has population data in a tree structure that does not have a consistent depth:

```yaml
# census.yaml
${ samples/help/census.yaml }
```

You can use `mapReduce` to distill this to a single total population number:

```ori
// population.ori
${ samples/help/population.ori }
```

Here the population number will be used as is, so the `mapFn` parameter will be `null`. The `reduceFn` will be called with an array of values and keys for each level of the tree. The `reduceFn` above uses the JavaScript array [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to add up the numbers in the array.

```console
$ ori population.ori/
${ Origami.yaml(samples/help/population.ori/) + "\n" }
```
