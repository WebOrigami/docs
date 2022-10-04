---
title: Function graphs
flat = node_modules/@graphorigami/pattern-intro/src/flat:
---

Having already created explorable implementations of our object and folder representations, it should be fairly quick work to create an explorable implementation of our function representation.

## Wrap the function with the Explorable interface

```{{'js'}}
// flat/fn.js

{{ flat/fn.js }}
```

Because the Explorable interface supports asynchronous functions by default, we could just as easily have the core `fn` function here be an `async` function that, for example, retrieved a resource from a server.

## Verify the explorable function

The unit tests are the same for the function as for the object and folder.

```console
$ node fn.test.js
…
# tests 3
# pass 3
# fail 0
```

And we can use our `json` utility to display this function-based graph:

```console
$ node json fn.js
{{ json flat/fn }}
```

We have now implemented three different ways to construct an explorable graph. In a bit, we'll see how they can be used together to create interesting combinations and be used for practical purposes. Before doing that, however, let's make our code a little more general-purpose and flexible.

&nbsp;

Next: [Graph classes](classes.html) »
