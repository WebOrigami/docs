---
title: Function graphs
flat = node_modules/pattern-intro/src/flat:
---

Having already created explorable implementations of our object and folder representations, it should be fairly quick work to create an explorable implementation of our function representation.

## Wrap the function with the Explorable interface

```{{'js'}}
/* src/flat/fn.js */

{{ flat/fn.js }}
```

Because the Explorable interface supports asynchronous functions by default, we could just as easily have the core `fn` function here be an `async` function that, for example, retrieved a resource from a server.

## Verify the explorable function

<span class="tutorialStep"></span> From inside the `src/flat` directory, run the unit tests for the function-based explorable graph. These are the same tests as for the object and folder graphs.

```console
$ node fn.test.js
…
# tests 3
# pass 3
# fail 0
```

<span class="tutorialStep"></span> Use our `json` utility to display this function-based graph:

```console
$ node json fn.js
{{ json flat/fn }}
```

You can think of an explorable function as a function that can provide a sample output set. Here the core function can handle more keys

We have now implemented three different ways to construct an explorable graph. In a bit, we'll see how they can be used together to create interesting combinations and be used for practical purposes. Before doing that, however, let's make our code a little more general-purpose and flexible.

&nbsp;

Next: [Graph classes](classes.html) »
