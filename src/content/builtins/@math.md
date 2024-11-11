---
title: "math"
---

A collection of functions for basic arithmetic. These are provided as a stopgap measure until the Origami language can handle basic math operations:

- `math/add(a, b, …)` — adds the indicated numbers
- `math/subtract(a, b)` — returns `a` minus `b`.
- `math/multiply(a, b, …)` — multiples the indicated numbers
- `math/divide(a, b)` — returns `a` divided by `b`.

Any string values passed to these functions are parsed as numbers before doing the math.

Example: Arrays in Origami (and JavaScript) use zero-based indices. If you wanted to add 1 to these indices to create a numbered list of strings, you could do:

```ori
// sections.ori
${ samples.ori/help/sections.ori }
```

This outputs:

```console
$ ori sections.ori/
${ yaml samples.ori/help/sections.ori/ }
```
