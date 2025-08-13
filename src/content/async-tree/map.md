---
title: map(tree, options)
subtitle: Transform the keys and/or values of a tree
---

JavaScript function underlying the [`Tree.map`](/builtins/tree/map.html) builtin, with the same parameters and effects. See that page for complete details.

## JavaScript usage

If the second argument to `map` is a function, that function will be used to map the values of the input tree.

```js
${ samples.ori/js/mapValues.js }
```

The above module exports this data:

```
${ Origami.yaml(samples.ori/js/mapValues.js/) }
```
