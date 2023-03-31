---
title: "@globs(graph)"
---

Treats the keys of `graph` as simple [glob](<https://en.m.wikipedia.org/wiki/Glob_(programming)>) patterns. The following patterns are supported:

- `*` matches anything
- `?` matches a single character

```console
$ cat globs.yaml
{{ client/samples/help/globs.yaml }}
$ ori "@globs(globs.yaml)/foo.jpg"
false
$ ori "@globs(globs.yaml)/foo.txt"
true
```

This can be used, for example, in conjunction with [`filter`](#filter) to filter values based on glob patterns.