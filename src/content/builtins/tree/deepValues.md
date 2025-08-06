---
title: deepValues(tree)
supertitle: "Tree."
---

Return the in-order exterior values of the tree as a flat array. This is a deep version of the [`values`](values.html) built-in function.

```console
$ cat greetings.yaml
${ samples.jse/help/greetings.yaml }$ ori Tree.deepValues greetings.yaml
${ Origami.yaml(Tree.deepValues(samples.jse/help/greetings.yaml)) }
```

<div class="sideBySide">
  <figure>
    ${ svg.js(samples.jse/help/greetings.yaml) }
  </figure>
  <figure>
    ${ svg.js(Tree.deepValues(samples.jse/help/greetings.yaml)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result</figcaption>
</div>

If you want to limit the number of results, see [`deepTake`](deepTake.html).
