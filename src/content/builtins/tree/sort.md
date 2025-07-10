---
title: sort(tree, [options])
supertitle: "tree:"
---

Returns a copy of the indicated [treelike object](/async-tree/treelike.html) with the keys sorted. The sort is performed with the default lexicographic Unicode sort order provided by JavaScript's [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.

```console
$ cat capitals.yaml
${ <samples.jse/help/capitals.yaml> }$ ori sort capitals.yaml
${ Origami.yaml(Tree.sort(<samples.jse/help/capitals.yaml>)) }
```

<div class="sideBySide">
  <figure>
    ${ <svg.js>(<samples.jse/help/capitals.yaml>) }
  </figure>
  <figure>
    ${ <svg.js>(Tree.sort(<samples.jse/help/capitals.yaml>)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>With keys sorted</figcaption>
</div>

## Options

The `sort` built-in takes an optional `options` argument. This can take the form of an object containing any or all of:

- `compare`. A function that compares two arguments. This uses the same definition as the JavaScript [Array sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description) method. If omitted, items are converted to strings and sorted as strings.
- `sortKey`. A function evaluated for each entry in the tree to determine a sort key. See below.

The default `compare` function sorts text strings by their Unicode character values. If you are sorting things for display to end users, consider using [`naturalOrder`](/builtins/origami/naturalOrder.html) as the `compare` function.

As a shorthand, if you supply a function as the second argument to `sort`, it will be used as the `sortKey` function.

To reverse the sort order, apply `sort` and then [`reverse`](reverse.html).

## Sort keys

As shown in the example above, by default `sort` sorts a tree by its keys. You can supply a `sortKey` option that returns a different value that the tree should be sorted by. This function will be called with three arguments: the value being considered, the key for that value, and the tree being sorted. You don't have to use all three arguments.

```console
$ cat capitals.yaml
${ <samples.jse/help/capitals.yaml> }$ ori "sort capitals.yaml, (value, key, tree) => value"
${ Origami.yaml(Tree.sort(<samples.jse/help/capitals.yaml>, (capital) => capital)) }
```

<div class="sideBySide">
  <figure>
    ${ <svg.js>(<samples.jse/help/capitals.yaml>) }
  </figure>
  <figure>
    ${ <svg.js>(Tree.sort(<samples.jse/help/capitals.yaml>, (capital) => capital)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>With values sorted</figcaption>
</div>
