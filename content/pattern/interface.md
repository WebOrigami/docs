---
title: The Map interface
---

The last section noted that, in the context of our markdown-to-HTML problem, it's possible to conceptualize the markdown content as a tree:

<figure>
  ${ svg({
    Alice.md: "Hello, **Alice**.",
    Bob.md: "Hello, **Bob**.",
    Carol.md: "Hello, **Carol**.",
  }) }
  <figcaption>The markdown documents as a tree</figcaption>
</figure>

This section introduces an interface suitable for working with such a tree, regardless of its underlying data representation.

## The standard `Map` class

Let's identify a minimal interface sufficient to define a wide variety of trees:

- A method which produces the keys of the tree. In the tree above, the keys are `Alice.md`, `Bob.md`, and `Carol.md`. The keys will often be strings, but don't have to be strings.
- A method which gets the value for a given key. If we ask the above tree for `Alice.md`, we want to get back `Hello, \*\*Alice\*\*.` Here the value we get is text, but like the keys, the values can be of any data type.

The standard JavaScript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class provides such an interface. We can subclass `Map` to create a custom class that behaves generally like `Map`, but is backed by data stored in different ways.

Subclassing `Map` includes some complexities, but the basic shape of the code will look like:

```js
class MyMap extends Map {
  get(key) {
    // Return the value of the given key
  }

  *keys() {
    // Yield the available keys
  }
}
```

The `get()` method is fairly straightforward: if we call `get("Alice.md")`, we want to get back `Hello, \*\*Alice\*\*.`

The `keys` method is slightly more exotic, as it returns an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol): an object that can produce a sequence of values.

- The simplest way to create an iterator is writing a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
- The simplest way to consume an iterator is to pass it to [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), which will enumerate the values produced by the iterator and return those as an array.

## Create a map from an object

Of the three data representations we looked at previously, the in-memory JavaScript object was perhaps the simplest, so let's first look at defining a `Map` subclass that's backed directly by data stored in an object:

```js
/* src/map/ObjectMap.js */

${ pattern/map/ObjectMap.js }
```

We can then instantiate this `ObjectMap` class to wrap an object containing the markdown data:

```${'js'}
/* src/map/object.js */

${ pattern/map/object.js }
```

For now, this wrapper can only handle a flat object — later we'll extend this to handle hierarchical objects.

## Test the object map

The first thing we can do with this object-based map is programmatically verify that its methods conform to the expectations of the `Map` class:

```${'js'}
/* src/map/object.test.js */

${ pattern/map/object.test.js }
```

<span class="tutorialStep"></span> From inside the `src/map` directory, run these tests to see that all test pass:

```console
$ cd ../map
$ node object.test.js
…
# tests 3
# pass 3
# fail 0
```

&nbsp;

Next: [Display a map](display.html) »
