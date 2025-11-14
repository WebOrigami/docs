---
title: take(map, count)
supertitle: "Tree."
---

Returns a copy of the given [map-like](/async-tree/maplike.html) object, with the additional restriction that the new map's `keys` method will return only (at most) the first `count` keys.

```console
$ cat letters.yaml
${ samples/help/letters.yaml }$ ori Tree.take letters.yaml, 2
${ Origami.yaml(Tree.take(samples/help/letters.yaml, 2)) }
```

<div class="sideBySide">
  <figure>
    ${ svg(samples/help/letters.yaml) }
  </figure>
  <figure>
    ${ svg(Tree.take(samples/help/letters.yaml, 2)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>

See also [`deepTake`](deepTake.html).
