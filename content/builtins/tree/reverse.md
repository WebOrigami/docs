---
title: reverse(tree)
supertitle: "Tree."
---

Reverses the order of keys in the tree.

```console
$ cat letters.yaml
${ samples/help/letters.yaml }
$ ori Tree.reverse letters.yaml
${ Origami.yaml(Tree.reverse(samples/help/letters.yaml)) + "\n" }
```

<div class="sideBySide">
  <figure>
    ${ svg(samples/help/letters.yaml) }
  </figure>
  <figure>
    ${ svg(Tree.reverse(samples/help/letters.yaml)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>With reversed keys</figcaption>
</div>

After sorting by date with [`sort`](sort.html), it can be useful to `reverse` that order to get things in reverse chronological order.

`reverse` only affects the keys at the top level of the tree. For a deep version that affects all levels of a tree, use [`deepReverse`](deepReverse.html)
