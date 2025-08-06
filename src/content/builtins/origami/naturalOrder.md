---
title: naturalOrder
supertitle: "Origami."
---

Instructs the [`sort`](/builtins/tree/sort.html) builtin to use [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order) when comparing strings.

For example, consider a collection of unsorted file names:

```yaml
# unicodeSort.yaml
file9: File Nine
file7: File Seven
file10: File Ten
file8: File Eight
```

Sorting these with `sort` sorts strings by their Unicode character values, which leads to a result that is surprising to most people:

```console
$ ori sort unicodeSort.yaml
${ Origami.yaml(Tree.sort(samples.jse/help/unicodeSort.yaml)) }
```

The problem is that sorting by character values puts a `1` character before a `7` — but people read a `1` and `0` as the number 10, and expect that to come after the number 9.

If you would like to have strings that contain numbers sorted in (increasing) order of number value, you can pass `naturalOrder` as the `compare` option:

```console
$ ori sort unicodeSort.yaml, { compare: naturalOrder }
${ Origami.yaml(Tree.sort(samples.jse/help/unicodeSort.yaml, { compare: naturalOrder })) }
```
