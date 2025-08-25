---
title: deepTake(tree, count)
supertitle: "Tree."
---

Traverses deeply inside the tree, returning the first `count` values. This is essentially a deep version of [`take`](take.html) or a constrained version of [`deepValues`](deepValues.html).

```console
$ cat greetings.yaml
${ samples/help/greetings.yaml }$ ori Tree.deepTake greetings.yaml, 5
${ Origami.yaml(Tree.deepTake(samples/help/greetings.yaml, 5)) }
```

<div class="sideBySide">
  <figure>
    ${ svg(samples/help/greetings.yaml) }
  </figure>
  <figure>
    ${ svg(Tree.deepTake(samples/help/greetings.yaml, 5)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>
