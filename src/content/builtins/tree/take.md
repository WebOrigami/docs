---
title: take(tree, count)
supertitle: "tree:"
---

Returns a copy of the given tree, with the additional restriction that the new tree's `keys` method will return only (at most) the first `count` keys.

```console
$ cat letters.yaml
${ <samples.jse/help/letters.yaml> }$ ori take letters.yaml, 2
${ Origami.yaml(Tree.take(<samples.jse/help/letters.yaml>, 2)) }
```

<div class="sideBySide">
  <figure>
    ${ <svg.js>(<samples.jse/help/letters.yaml>) }
  </figure>
  <figure>
    ${ <svg.js>(Tree.take(<samples.jse/help/letters.yaml>, 2)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>

See also [`deepTake`](deepTake.html).
