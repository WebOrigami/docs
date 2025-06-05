---
title: Function trees
---

Having already created implementations of our object-based and folder-based async trees, it should be fairly quick work to create an async tree implementation of our function representation.

## Wrap a function with the AsyncTree interface

To create a function-based tree, we'll need two things: 1) a function that can produce a value for a given key, and 2) an array of keys defining a representative domain over which the function is valid.

```${'js'}
/* src/flat/fn.js */

${ pattern.jse/flat/fn.js }
```

Because the AsyncTree interface supports asynchronous functions by default, we could just as easily have the core `fn` function here be an `async` function that, for example, retrieved a resource from a server.

The earlier object-based and files-based async trees are "real" in that the data is stored persistently in the real world. But the function-based tree above is virtual from the start — the complete data is not stored persistently, and is only available when code is running.

As noted in the original definition of the AsyncTree interface, an async tree's `keys` method is _not_ required to return all of the keys the tree can handle. The `keys` for the function tree above returns three representative keys, but the `get` method will actually accept any key ending in `.md`.

## Verify the function tree

<span class="tutorialStep"></span> From inside the `src/flat` directory, run the unit tests for the function-based async tree. These are the same tests as for the object and folder trees.

```console
$ node fn.test.js
…
# tests 3
# pass 3
# fail 0
```

<span class="tutorialStep"></span> Use our `json` utility to display this function-based tree:

```console
$ node json fn.js
${ json(pattern.jse/flat/fn.js) + "\n" }
```

You can think of a function tree as a function that can provide a sample output set. Here the core `fn` function can actually handle more keys that the tree exposes in its `keys`, which we can take advantage of later.

We can apply our markdown-to-HTML transformation to this virtual tree to create a new virtual tree of HTML.

```${'js'}
/* src/flat/htmlFn.js */

${ pattern.jse/flat/htmlFn.js }
```

<span class="tutorialStep"></span> View the HTML translation of the markdown files in the virtual tree implied by the function.

```console
$ node json htmlFn.js
${ json(pattern.jse/flat/transform.js(tree:from pattern.jse/flat/htmlFn.js)) + "\n" }
```

We have now implemented three different ways to construct an async tree. In a bit, we'll see how they can be used together to create interesting combinations and be used for practical purposes. Before doing that, however, let's make our code a little more general-purpose and flexible.

&nbsp;

Next: [Tree classes](classes.html) »
