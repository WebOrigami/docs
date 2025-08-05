---
title: values([tree])
supertitle: "Tree."
---

Returns an array of the top-level values in the tree.

```console
$ cat letters.yaml
${ samples.jse/help/letters.yaml }$ ori values letters.yaml
${ Origami.yaml(Tree.values(samples.jse/help/letters.yaml)) }
```

<div class="sideBySide">
  <figure>
    ${ svg.js(samples.jse/help/letters.yaml) }
  </figure>
  <figure>
    ${ svg.js(Tree.values(samples.jse/help/letters.yaml)) }
  </figure>
  <figcaption>Input tree with string keys</figcaption>
  <figcaption>Values as an array</figcaption>
</div>

See also [`keys`](keys.html).
