---
title: merge(...trees)
supertitle: "Tree."
---

Returns a tree that is the result of merging the indicated trees.

If you have two trees:

```console
$ cat tree1.yaml
${ samples.ori/help/merge/tree1.yaml }$ cat tree2.yaml
${ samples.ori/help/merge/tree2.yaml }
```

You can merge them into a single tree:

```console
$ ori Tree.merge tree1.yaml, tree2.yaml
${ Origami.yaml(Tree.merge(samples.ori/help/merge/tree1.yaml, samples.ori/help/merge/tree2.yaml)) }
```

The keys of the merged tree are the unique keys of the constituent trees in the order the trees are given.

When asked for a key, the merged tree asks each of the constituent trees _in reverse order_ for that key. If a tree returns a defined value for that key, that value is used. In this example, getting `c` returns the result from `tree2.yaml`, because that is the first tree (in reverse order) that defines a value for `c`.

<div class="sideBySide">
  <figure>
    ${ svg.js(Tree.merge(samples.ori/help/merge/tree1.yaml, samples.ori/help/merge/tree2.yaml)) }
  </figure>
  <figcaption>Merged tree</figcaption>
</div>

The Origami language also supports a [spread operator](/language/syntax.html#spread-operator) that can perform the same kind of merge using `...` three periods or the `…` ellipsis character:

```console
$ ori { ...tree1.yaml, ...tree2.yaml }
${ Origami.yaml({
  ...samples.ori/help/merge/tree1.yaml
  ...samples.ori/help/merge/tree2.yaml
}) }
```

The merge operation is shallow; for a deep merge operation, see [`deepMerge`](deepMerge.html).
