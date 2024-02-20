---
title: "@merge(...treelikes)"
---

Returns a tree that is the result of merging the indicated trees.

```console
$ cat tree1.yaml
a: The letter A
b: The letter B
c: The letter C
$ cat tree2.yaml
c: This won't appear in the merge
d: The letter D
e: The letter E
$ ori @merge tree1.yaml, tree2.yaml
a: The letter A
b: The letter B
c: The letter C
d: The letter D
e: The letter E
```

When asked for a key, the merged tree asks each of the constituent trees in turn for that key; the first defined result is returned. In the example above, getting `c` returns the result from `tree1.yaml`, because that is the first tree that defines a value for `c`.

The merge operation is shallow; for a deep merge operation, see [@mergeDeep](@mergeDeep.html).
