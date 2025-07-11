---
title: globKeys(tree)
supertitle: "Tree."
---

Treats the keys of `tree` as simple [glob](<https://en.m.wikipedia.org/wiki/Glob_(programming)>) patterns. The following patterns are supported:

- `*` matches any text
- `?` matches a single character
- `**` matches any level of a tree

```console
$ cat globKeys.yaml
${ <samples.jse/help/globKeys.yaml> }$ ori "globKeys(globKeys.yaml)/foo.jpg"
false
$ ori "globKeys(globKeys.yaml)/foo.txt"
true
```

## Masking

`globKeys` can be used in conjunction with [`Tree.mask`](mask.html#mask-with-globs-and-regular-expressions) to include or include values based on glob patterns.

This Origami function accepts a tree, then applies a `mask` using `globKeys` to return just the values whose keys have image file extensions:

```ori
// images.ori

${ <samples.jse/help/images.ori> }
```

This would typically be applied to a tree of files, but for demonstration purposes a YAML file can simulate a small set of files:

```yaml
# files.yaml
${ <samples.jse/help/files.yaml> }
```

Applying the mask to the data gives:

```console
$ ori images.ori files.yaml
${ Origami.yaml(<samples.jse/help/images.ori>(<samples.jse/help/files.yaml>)) }
```
