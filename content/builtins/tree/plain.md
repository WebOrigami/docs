---
title: plain(tree)
supertitle: "Tree."
---

Converts a tree of sync or async maps into a synchronous plain JavaScript object or array. A common use for `Tree.plain` is to convert a tree into a form that you can pass to a JavaScript function expecting a plain JavaScript object or array.

- The supplied argument can be any [map-like object](/async-tree/maplike.html) such as a JSON/YAML file, file system folder, etc. If omitted, `plain` converts the current tree — in the command line, this will be the current folder — to a plain JavaScript object.
- The result's keys will be the tree's keys cast to strings. Any trailing slashes in keys will be removed.
- Any tree value that is itself a tree will be recursively converted to a plain object or array.

## Array-like trees

An array-like tree is one whose keys are all integers and fill the range 0..length-1. If you pass an array-like tree to `Tree.plain`, the result will be a JavaScript array, even if the tree was originally defined as an object.

```console
$ ori "{ 0: 'a', 1: 'b', 2: 'c' }"
${ Origami.yaml({ 0: 'a', 1: 'b', 2: 'c' }) }
```

The order of the keys will determine the order of the values in the array -- but the numeric value of the
keys will be ignored.

This is done because functions like [`Tree.reverse`](/builtins/tree/reverse.html) and [`Tree.sort`](/builtins/tree/sort.html) manipulate the order of keys but don't change the numeric values of those keys:

```console
$ ori Tree.keys "{ 0: 'a', 1: 'b', 2: 'c' }"
${ Origami.yaml(Tree.keys({ 0: 'a', 1: 'b', 2: 'c' })) }
$ ori Tree.keys Tree.reverse "{ 0: 'a', 1: 'b', 2: 'c' }"
${ Origami.yaml(Tree.keys(Tree.reverse({ 0: 'a', 1: 'b', 2: 'c' }))) }
```

Because this tree is array-like, `Tree.plain` will convert it to an array. The array values will follow the tree order, ignoring the specific numeric value of the keys.

```console
$ ori Tree.plain Tree.reverse "{ 0: 'a', 1: 'b', 2: 'c' }"
${ Origami.yaml(Tree.plain(Tree.reverse({ 0: 'a', 1: 'b', 2: 'c' }))) }
```

When the Origami [CLI](/cli) displays the result of an expression, it uses `Tree.plain` to convert the result to a plain object/array, so the use of `Tree.plain` in the CLI is generally unnecessary:

```console
$ ori Tree.reverse "{ 0: 'a', 1: 'b', 2: 'c' }"
${ Origami.yaml(Tree.reverse({ 0: 'a', 1: 'b', 2: 'c' })) }
```
