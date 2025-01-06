---
title: globKeys(tree)
supertitle: "tree:"
---

Treats the keys of `tree` as simple [glob](<https://en.m.wikipedia.org/wiki/Glob_(programming)>) patterns. The following patterns are supported:

- `*` matches any text
- `?` matches a single character
- `**` matches any level of a tree

```console
$ cat globKeys.yaml
${ samples.ori/help/globKeys.yaml }$ ori "globKeys(globKeys.yaml)/foo.jpg"
false
$ ori "globKeys(globKeys.yaml)/foo.txt"
true
```

## Filtering

`globKeys` can be used in conjunction with [`tree:filter`](filter.html#filter-with-globs-and-regular-expressions) to filter values based on glob patterns.

This Origami function accepts a tree, then applies a `filter` using `globKeys` to return just the values whose keys have image file extensions:

```ori
// images.ori

${ samples.ori/help/images.ori }
```

This would typically be applied to a tree of files, but for demonstration purposes a YAML file can simulate a small set of files:

```yaml
# files.yaml
${ samples.ori/help/files.yaml }
```

Applying the filter to the data gives:

```console
$ ori images.ori files.yaml
${ yaml(samples.ori/help/images.ori(samples.ori/help/files.yaml)) }
```
