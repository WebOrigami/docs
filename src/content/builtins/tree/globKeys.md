---
title: globKeys(tree)
supertitle: "tree:"
---

Treats the keys of `tree` as simple [glob](<https://en.m.wikipedia.org/wiki/Glob_(programming)>) patterns. The following patterns are supported:

- `*` matches anything
- `?` matches a single character

```console
$ cat globKeys.yaml
${ samples.ori/help/globKeys.yaml }$ ori "globKeys(globKeys.yaml)/foo.jpg"
false
$ ori "globKeys(globKeys.yaml)/foo.txt"
true
```

This can be used, for example, in conjunction with [`tree:filter`](filter.html#filter-with-globs-and-regular-expressions) to filter values based on glob patterns.
