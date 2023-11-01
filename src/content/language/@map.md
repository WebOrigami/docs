---
title: "@map"
---

This is a collection of functions for transforming trees.

<a name="keys"></a>

## @map/keys(tree, [keyFn])

Returns a new tree that replaces the original keys with mapped keys, obtained by invoking the `keyFn` function for each value in the original tree. If the `keyFn` is omitted, the value itself becomes its own key.

```console assert: true, path: files
$ ori team.yaml
- name: Alice
- name: Bob
- name: Carol
$ ori @map/keys team.yaml, =name
Alice:
  name: Alice
Bob:
  name: Bob
Carol:
  name: Carol
```

<a name="values"></a>

## @map/values(tree, mapFn, [options])

Returns a new tree whose values are the result of invoking the `mapFn` function for each value in the original tree.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori uppercase.js
export default (x) => x.toString().toUpperCase();
$ ori @map/values greetings.yaml, uppercase.js
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Carol: HELLO, CAROL.
```

Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `map` function does not do any mapping work upon invocation — it only does the work when someone requests the mapped tree's keys or values.

The `mapFn` mapping function is typically a JavaScript function, but can be any [treelike object](/async-tree/treelike.html). For example, you can use a second [tree as a map](/cli/intro.html#use-a-tree-as-a-map).

Available `options` include:

- `deep`: If `false` (the default), this only maps the top-level values in the tree. If `true`, this maps values at all levels of the tree.
- `extension`: See below.
- `getValue`: If `true` (the default), this gets values from the inner tree before passing them to the `mapFn`. If `false`, the `mapFn` is invoked with an `undefined` argument. In cases where you want to map all the values to, say, a constant value, this avoids the unnecessary cost of getting the values from the inner tree.

Mapping values often changes the type of the data, and it is useful to be able to reflect that change in type in file extensions. The `extension` option takes the form of a string that indicates which keys the map will affect, and whether or how those keys will change:

- `extension:"md"` restricts the map to only apply to keys ending in `.md`
- `extension:"->html"` adds the `.html` extension to the keys in the result
- `extension:"md->html"` only applies the map to keys ending in `.md`, and adds the `.html` extension to keys in the result

In place of the `->` text, you can alternatively write a Unicode `→` Rightwards Arrow, as in `{ extension: "md→html" }`. You can optionally include the `.` in extensions: `{ extension: ".md" }`.
