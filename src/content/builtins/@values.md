---
title: "values([treelike])"
---

Returns an array of the top-level values in the tree.

```console
$ cat letters.yaml
${ samples.ori/help/letters.yaml }$ ori values letters.yaml
${ yaml values samples.ori/help/letters.yaml }
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/help/letters.yaml }
  </figure>
  <figure>
    ${ svg.js values samples.ori/help/letters.yaml }
  </figure>
  <figcaption>Input tree with string keys</figcaption>
  <figcaption>Values as an array</figcaption>
</div>

See also [`keys`](keys.html).
