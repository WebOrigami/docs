---
title: regExpKeys(tree)
supertitle: "Tree."
---

Treats the string keys of `tree` as [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

```ori
// regExpKeys.ori
${ <samples.jse/help/regExpKeys.ori> }
```

This can be used to match against the regular expressions:

```console
$ ori regExpKeys.ori/abc
${ Origami.yaml(<samples.jse/help/regExpKeys.ori/abc>) }
$ ori regExpKeys.ori/123
${ Origami.yaml(<samples.jse/help/regExpKeys.ori/123>) }
$ ori regExpKeys.ori/__
${ Origami.yaml(<samples.jse/help/regExpKeys.ori/__>) }
```

You can use `regExpKeys` with [`Tree.mask`](mask.html#mask-with-globs-and-regular-expressions) to mask values based on regular expression matches.
