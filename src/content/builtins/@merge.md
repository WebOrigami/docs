---
title: "@merge(...treelikes)"
---

Returns a tree that is the result of merging the indicated trees.

If you have two trees:

```console
$ cat tree1.yaml
${ samples.ori/help/merge/tree1.yaml }$ cat tree2.yaml
${ samples.ori/help/merge/tree2.yaml }
```

You can merge them into a single tree. When asked for a key, the merged tree asks each of the constituent trees in turn for that key; the first defined result is returned. In this example, getting `c` returns the result from `tree1.yaml`, because that is the first tree that defines a value for `c`.

```console
$ ori @merge tree1.yaml, tree2.yaml
${ @yaml @merge samples.ori/help/merge/tree1.yaml, samples.ori/help/merge/tree2.yaml }
```

<div class="sideBySide">
  <figure>
    ${ svg.js @merge samples.ori/help/merge/tree1.yaml, samples.ori/help/merge/tree2.yaml }
  </figure>
  <figcaption>Merged tree</figcaption>
</div>

The merge operation is shallow; for a deep merge operation, see [@deepMerge](@deepMerge.html).
