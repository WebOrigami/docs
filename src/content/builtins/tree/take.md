---
title: "take(treelike, count)"
supertitle: "tree:"
---

Returns a copy of the given tree, with the additional restriction that the new tree's `keys` method will return only (at most) the first `count` keys.

```console
$ cat letters.yaml
${ samples.ori/help/letters.yaml }$ ori take letters.yaml, 2
${ yaml take samples.ori/help/letters.yaml, 2 }
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/help/letters.yaml }
  </figure>
  <figure>
    ${ svg.js take samples.ori/help/letters.yaml, 2 }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>

See also [`deepTake`](deepTake.html).
