---
title: "clean(tree)"
---

This removes all values from the given tree and then returns the empty tree.

This is commonly used when copying an Origami site definition to static files to clear out the contents of a `build` folder:

```console
$ ori copy src/site.ori, clean files/build
```

The `clean` command erases everything the `build` folder, then returns the empty `build` folder. This is then used as the target of the [`copy`](copy.html) operation.
