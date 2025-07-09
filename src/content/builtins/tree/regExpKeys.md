---
title: regExpKeys(tree)
supertitle: "tree:"
---

Treats the string keys of `tree` as [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

```ori
// regExpKeys.ori
${ <samples.jse/help/regExpKeys.ori> }
```

This can be used to match against the regular expressions:

```console
$ ori regExpKeys.ori/abc
${ yaml samples.jse/help/regExpKeys.ori/abc }
$ ori regExpKeys.ori/123
${ yaml samples.jse/help/regExpKeys.ori/123 }
$ ori regExpKeys.ori/__
${ yaml samples.jse/help/regExpKeys.ori/__ }
```

You can use `regExpKeys` with [`tree:mask`](mask.html#mask-with-globs-and-regular-expressions) to mask values based on regular expression matches.
