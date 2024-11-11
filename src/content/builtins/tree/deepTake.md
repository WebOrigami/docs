---
title: "deepTake(treelike, count)"
supertitle: "tree:"
---

Traverses deeply inside the tree, returning the first `count` values. This is essentially a deep version of [`take`](take.html) or a constrained version of [`deepValues`](deepValues.html).

```console
$ cat greetings.yaml
${ samples.ori/help/greetings.yaml }$ ori deepTake greetings.yaml, 5
${ yaml deepTake samples.ori/help/greetings.yaml, 5 }
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/help/greetings.yaml }
  </figure>
  <figure>
    ${ svg.js deepTake samples.ori/help/greetings.yaml, 5 }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>
