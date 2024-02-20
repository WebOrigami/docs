---
title: "@sort(treelike, [keyFn])"
---

Returns a copy of the indicated [treelike object](/async-tree/treelike.html) with the keys sorted. The sort is performed with the default lexicotree Unicode sort order provided by JavaScript's [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.

```console
$ cat capitals.yaml
Japan: Tokyo
Turkey: Ankara
Australia: Canberra
Spain: Madrid
$ ori @sort capitals.yaml
Australia: Canberra
Japan: Tokyo
Spain: Madrid
Turkey: Ankara
```

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
