---
title: deepValues(tree)
supertitle: "Tree."
---

Return the in-order exterior values of the [map-based tree](/async-tree/mapBasedTree.html) as a flat array. This is a deep version of the [`values`](values.html) built-in function.

```console
$ cat greetings.yaml
${ samples/help/greetings.yaml }$ ori Tree.deepValues greetings.yaml
${ Origami.yaml(Tree.deepValues(samples/help/greetings.yaml)) }
```

<div class="sideBySide">
  <figure>
    ${ svg(samples/help/greetings.yaml) }
  </figure>
  <figure>
    ${ svg(Tree.deepValues(samples/help/greetings.yaml)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>

If you want to limit the number of results, see [`deepTake`](deepTake.html).
