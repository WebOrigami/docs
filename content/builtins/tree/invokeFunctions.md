---
title: invokeFunctions(map)
supertitle: "Tree."
---

Returns a new map where any function values in the source [map-like](/async-tree/maplike.html) object are evaluated.

It can be helpful to define a map-like object where some or all of the values may be functions. For example, a JavaScript file may define a mixture of string and function values:

```ori
// fns.js
${ samples/help/fns.js }
```

The use of functions like this lets some values be calculated lazily.

By default, if you ask the ori [CLI](/cli) to display this object, it implicitly evaluates any functions:

```console
$ ori fns.js/
${ Origami.yaml(samples/help/fns.js/) }
```

But there may be situations where you want to explicitly trigger this evaluation so that you can pass such an object to code that is not expecting function values.

The above output makes it look like all the values are strings, but if you, for example, try to call `toString` on them, you can see that one of the values is a function (which has been directly converted to a string):

```console
$ ori "Tree.map(fns.js, (value) => value.toString())"
${ Origami.yaml(Tree.map(samples/help/fns.js, (value) => value.toString())) }
```

If you apply `Tree.invokeFunctions` to the map, it will trigger the evaluation of any functions. Now the string values look correct:

```console
$ ori "Tree.map(Tree.invokeFunctions(fns.js), (value) => value.toString())"
${ Origami.yaml(Tree.map(Tree.invokeFunctions(samples/help/fns.js), (value) => value.toString())) }
```
