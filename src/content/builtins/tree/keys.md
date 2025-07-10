---
title: keys([tree])
supertitle: "tree:"
---

Returns an array of the top-level keys in the indicated tree.

```console
$ cat letters.yaml
${ <samples.jse/help/letters.yaml> }$ ori keys letters.yaml
${ Origami.yaml(Tree.keys(<samples.jse/help/letters.yaml>)) }
```

<div class="sideBySide">
  <figure>
    ${ <svg.js>(<samples.jse/help/letters.yaml>) }
  </figure>
  <figure>
    ${ <svg.js>(Tree.keys(<samples.jse/help/letters.yaml>)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Keys as an array</figcaption>
</div>

See also [`values`](values.html).
