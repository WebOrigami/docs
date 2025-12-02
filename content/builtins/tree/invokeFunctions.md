---
title: invokeFunctions(map)
supertitle: "Tree."
---

Returns a new map where any function values in the source [map-like](/async-tree/maplike.html) object are evaluated.

It can be helpful to define a map-like object where some or all of the values may be functions.

```ori
// fns.ori
${ samples/help/fns.ori }
```

By default, if you ask the ori [CLI](/cli) to display this object, it implicitly evaluates any functions:

```console
$ ori fns.ori/
${ Origami.yaml(samples/help/fns.ori/) }
```

There may be situations where you want to explicitly trigger this evaluation so that you can pass such an object to code that is not expecting function values.

For example, the above output makes it look like all the values are strings, but if you directly ask for, say, a value's constructor, you can see that one of them is a function:

```console
$ ori "Tree.map(fns.ori, (value) => value.constructor.name)"
${ Origami.yaml(Tree.map(samples/help/fns.ori, (value) => value.constructor.name)) }
```

If you apply `Tree.invokeFunctions` to the map, it will trigger the evaluation of any functions.

```console
$ ori "Tree.map(Tree.invokeFunctions(fns.ori), (value) => value.constructor.name)"
${ Origami.yaml(Tree.map(Tree.invokeFunctions(samples/help/fns.ori), (value) => value.constructor.name)) }
```
