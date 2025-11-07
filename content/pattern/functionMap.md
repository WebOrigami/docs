---
title: Function maps
---

Having already created implementations of our object-based and folder-based maps, it should be fairly quick work to create a map implementation of our function representation.

## Wrap a function with a `Map`

To create a function-based map, we'll need two things: 1) a function that can produce a value for a given key, and 2) an array of keys defining a representative domain over which the function is valid.

```js
/* src/map/FunctionMap.js */

${ pattern/map/FunctionMap.js }
```

We can use this `FunctionMap` class as follows:

```js
/* src/map/fn.js */

${ pattern/map/fn.js }
```

The earlier object-based and files-based maps are "real" in that the data is stored persistently in the real world. But the function-based map above is virtual from the start — the complete data is not stored persistently, and is only available when code is running.

Note that a map's `keys` method doesn't have to return every key the map can actually handle. The map above defines three representative keys, but the `get` method will actually accept any key ending in `.md`. If we ask for `post4.md`, we will get back `This is \**post 4**.` That flexibility can be useful, but if not desired, the `get` method could reject requests for keys outside the stated domain.

## Verify the function map

<span class="tutorialStep"></span> From inside the `src/map` directory, run the unit tests for the function-based map. These are the same tests as for the object and folder maps.

```console
$ node fn.test.js
…
# tests 3
# pass 3
# fail 0
```

<span class="tutorialStep"></span> Use our `json` utility to display this function-based map:

```console
$ node json fn.js
${ Tree.json(pattern/map/fn.js) + "\n" }
```

You can think of a function map as a function that can provide a sample output set. Here the core `fn` function can actually handle more keys that the map exposes in its `keys`, which we can take advantage of later.

We can apply our markdown-to-HTML transformation to this virtual map to create a new virtual map of HTML.

```${'js'}
/* src/map/htmlFn.js */

${ pattern/map/htmlFn.js }
```

<span class="tutorialStep"></span> View the HTML translation of the markdown files in the virtual map implied by the function.

```console
$ node json htmlFn.js
${ Tree.json(pattern/map/htmlFn.js) + "\n" }
```

We have now implemented four different ways to construct a map based on: 1) an object, 2) a folder, 3) a function, 4) another map.

In a bit, we'll see how they can be used together to create interesting combinations and be used for practical purposes. Before doing that, however, let's make our code a little more general-purpose and flexible.

&nbsp;

Next: [Full compatibility](compatibility.html) »
