---
title: merge(...maps)
supertitle: "Tree."
---

Returns a tree that is the result of merging the indicated maps.

If you have two maps:

```console
$ cat data1.yaml
${ samples/help/merge/data1.yaml }$ cat data2.yaml
${ samples/help/merge/data2.yaml }
```

You can merge them into a single map:

```console
$ ori Tree.merge data1.yaml, data2.yaml
${ Origami.yaml(Tree.merge(samples/help/merge/data1.yaml, samples/help/merge/data2.yaml)) }
```

The keys of the merged map are the unique keys of the constituent maps in the order the maps are given.

When asked for a key, the merged map asks each of the constituent maps _in reverse order_ for that key. If a map returns a defined value for that key, that value is used. In this example, getting `c` returns the result from `data2.yaml`, because that is the first map (in reverse order) that defines a value for `c`.

<div class="sideBySide">
  <figure>
    ${ svg(Tree.merge(samples/help/merge/data1.yaml, samples/help/merge/data2.yaml)) }
  </figure>
  <figcaption>Merged map</figcaption>
</div>

The Origami language also supports a [spread operator](/language/expressions.html#spread-operator) that can perform the same kind of merge using `...` three periods or the `…` ellipsis character:

```console
$ ori { ...data1.yaml, ...data2.yaml }
${ Origami.yaml({
  ...samples/help/merge/data1.yaml
  ...samples/help/merge/data2.yaml
}) }
```

The merge operation is shallow; for a deep merge operation, see [`deepMerge`](deepMerge.html).
