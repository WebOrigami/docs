---
title: "@sort(treelike, [options])"
---

Returns a copy of the indicated [treelike object](/async-tree/treelike.html) with the keys sorted. The sort is performed with the default lexicographic Unicode sort order provided by JavaScript's [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.

```console
$ cat capitals.yaml
${ samples.ori/help/capitals.yaml }$ ori @sort capitals.yaml
${ @yaml @sort samples.ori/help/capitals.yaml }
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/help/capitals.yaml }
  </figure>
  <figure>
    ${ svg.js @sort samples.ori/help/capitals.yaml }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>By default @sort sorts by key</figcaption>
</div>

If a `keyFn` parameter is supplied, this evaluates that function for each tree key to determine a sort key. The sort key must support comparison via the JavaScript `<` (less than) and `>` (greater than) operators.

```console
$ cat capitals.yaml
Japan: Tokyo
Turkey: Ankara
Australia: Canberra
Spain: Madrid
$ ori @sort capitals.yaml, =_
Turkey: Ankara
Australia: Canberra
Spain: Madrid
Japan: Tokyo
```

The underscore in the `=_` function above refers to the value being sorted (as opposed to the key).
