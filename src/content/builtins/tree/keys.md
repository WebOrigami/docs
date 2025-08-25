---
title: keys([tree])
supertitle: "Tree."
---

Returns an array of the top-level keys in the indicated tree.

```console
$ cat letters.yaml
${ samples/help/letters.yaml }$ ori keys letters.yaml
${ Origami.yaml(Tree.keys(samples/help/letters.yaml)) }
```

<div class="sideBySide">
  <figure>
    ${ svg(samples/help/letters.yaml) }
  </figure>
  <figure>
    ${ svg(Tree.keys(samples/help/letters.yaml)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Keys as an array</figcaption>
</div>

See also [`values`](values.html).
