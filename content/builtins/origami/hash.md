---
title: hash(data)
supertitle: "Origami."
---

Returns a hexadecimal string representing a hash of the given data, which can either be `Uint8Array` or something that can be converted to a string.

This can be useful in situations where you want to capture an extremely concise characterization of some data to, for example, later detect whether it has changed. If two data have the same hash, it is statistically probably that they're the same data.

```console
$ ori Origami.hash/hello
${ Origami.hash("hello") }

$ ori Origami.hash/hello!
${ Origami.hash("hello!") }

$ ori Origami.hash/hello
${ Origami.hash("hello") }

```

Here the middle input string is slightly different and so produces a (very different) hash string. The first and last inputs are the same, so they produce the same hash string.
