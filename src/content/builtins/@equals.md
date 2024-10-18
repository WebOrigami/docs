---
title: "@equals(a, b)"
---

This returns `true` if `a` and `b` are [strictly equal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality).

This can be useful, for example, in templates:

```ori
// earth.ori
${ samples.ori/templates/earth.ori }
```

```console
$ ori earth.ori/GB
${ samples.ori/templates/earth.ori/GB }
$ ori earth.ori/US
${ samples.ori/templates/earth.ori/US }
```
