---
title: "@take(treelike, n)"
---

Returns a copy of the given tree, with the additional restriction that the new tree's `keys` method will return only (at most) the first `n` keys.

```console
$ cat letters.yaml
a: The letter A
b: The letter B
c: The letter C
$ ori @take letters.yaml, 2
a: The letter A
b: The letter B
```
