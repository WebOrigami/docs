---
title: values([tree])
supertitle: "Tree."
---

Returns an array of the top-level values in the tree.

```console
$ cat letters.yaml
${ samples/help/letters.yaml }$ ori Tree.values letters.yaml
${ Origami.yaml(Tree.values(samples/help/letters.yaml)) }
```

<div class="sideBySide">
  <figure>
    ${ svg(samples/help/letters.yaml) }
  </figure>
  <figure>
    ${ svg(Tree.values(samples/help/letters.yaml)) }
  </figure>
  <figcaption>Input tree with string keys</figcaption>
  <figcaption>Values as an array</figcaption>
</div>

See also [`keys`](keys.html).
