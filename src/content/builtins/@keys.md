---
title: "keys([treelike])"
---

Returns an array of the top-level keys in the indicated tree.

```console
$ cat letters.yaml
${ samples.ori/help/letters.yaml }$ ori keys letters.yaml
${ yaml keys samples.ori/help/letters.yaml }
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/help/letters.yaml }
  </figure>
  <figure>
    ${ svg.js keys samples.ori/help/letters.yaml }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Keys as an array</figcaption>
</div>

See also [`values`](values.html).
