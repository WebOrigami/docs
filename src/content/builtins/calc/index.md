---
title: "calc: namespace"
subtitle: Perform math and logical operations
---

A collection of functions for basic math and logic. These are provided as a stopgap measure until the Origami language can handle basic math operations.

Any string values passed to the math functions are parsed as numbers before doing the math.

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
