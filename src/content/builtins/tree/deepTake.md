---
title: deepTake(tree, count)
supertitle: "tree:"
---

Traverses deeply inside the tree, returning the first `count` values. This is essentially a deep version of [`take`](take.html) or a constrained version of [`deepValues`](deepValues.html).

```console
$ cat greetings.yaml
${ <samples.jse/help/greetings.yaml> }$ ori deepTake greetings.yaml, 5
${ Origami.yaml(Tree.deepTake(<samples.jse/help/greetings.yaml>, 5)) }
```

<div class="sideBySide">
  <figure>
    ${ <svg.js>(<samples.jse/help/greetings.yaml>) }
  </figure>
  <figure>
    ${ <svg.js>(Tree.deepTake(<samples.jse/help/greetings.yaml>, 5)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>
