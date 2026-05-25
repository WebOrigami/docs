---
title: randomsFrom(data)
supertitle: "Origami."
---

This is similar to [`Origami.randomFrom`](randomFrom.html), but where that function returns a single random integer based on the data, `randomsFrom` returns a _function_. Calling the function repeatedly will return a sequence of random integers based on the data.

You can pass the result of `randomsFrom` to the `randoms` argument of [`Tree.shuffle`](/builtins/tree/shuffle.html) to shuffle a maplike object (e.g., an array) in a random but stable way that depends on the input data.
