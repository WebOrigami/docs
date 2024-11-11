---
title: "reverse(treelike)"
supertitle: "tree:"
---

Reverses the order of keys in the tree.

```console
$ cat letters.yaml
${ samples.ori/help/letters.yaml }
$ ori reverse letters.yaml
${ yaml reverse samples.ori/help/letters.yaml }
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/help/letters.yaml }
  </figure>
  <figure>
    ${ svg.js reverse samples.ori/help/letters.yaml }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>With reversed keys</figcaption>
</div>

After sorting by date with [`sort`](sort.html), it can be useful to `reverse` that order to get things in reverse chronological order.

`reverse` only affects the keys at the top level of the tree. For a deep version that affects all levels of a tree, use [`deepReverse`](deepReverse.html)
