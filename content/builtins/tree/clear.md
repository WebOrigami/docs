---
title: clear(map)
supertitle: "Tree."
---

This removes all values from the given map and then returns the empty map.

This is commonly used when copying an Origami site definition to static files to clear out the contents of a `build` folder:

```console
$ ori copy src/site.ori, clear files:build
```

The `clear` command erases everything the `build` folder, then returns the empty `build` folder. This is then used as the target of the [`copy`](/builtins/dev/copy.html) operation.
