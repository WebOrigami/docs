---
title: "@naturalOrder"
---

Instructs the [@sort](@sort.html) builtin to use [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order) when comparing strings.

For example, consider a collection of unsorted file names:

```yaml
# unicodeSort.yaml
file2: File Two
file10: File Ten
file1: File One
```

Sorting these with `@sort` sorts strings by their Unicode character values, which leads to a result that is surprising to most people:

```console
$ ori @sort unicodeSort.yaml
${ @yaml @sort(samples.ori/help/unicodeSort.yaml) }
```

The problem is that sorting by character values puts `1` before `2` — but people read a `1` and `0` as the number 10, and expect that to come after the number `2`.

If you would like to have strings that contain numbers sorted in (increasing) order of number value, you can pass `@naturalOrder` as the `compare` option:

```console
$ ori @sort unicodeSort.yaml, { compare: @naturalOrder }
${ @yaml @sort(samples.ori/help/unicodeSort.yaml, { compare: @naturalOrder }) }
```
