---
title: The AsyncTree interface
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

## AsyncTree

Let's identify a minimal interface sufficient to define a wide variety of trees. This interface, which we'll call the AsyncTree interface, has two parts:

- A method which produces the keys of the tree. In the tree above, the keys are `Alice.md`, `Bob.md`, and `Carol.md`. The keys will often be strings, but don't have to be strings.
- A method which gets the value for a given key. If we ask the above tree for `Alice.md`, we want to get back `Hello, **Alice**.` Here the value we get is text, but like the keys, the values can be of any data type.

In code, an implementation of the AsyncTree interface looks like this:

```js
// An async tree of key-value dictionaries
const tree = {
  // Get the value of a given key.
  async get(key) { ... }

  // Iterate over this tree node's keys.
  async keys() { ... }
}
```

Notes:

- The `keys` method must return an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol): an object that can produce a sequence of values. The simplest way to meet this requirement is to a JavaScript `Array` or `Set`, which provide built-in support for the iterator protocol.

- Both functions in the `Explorable` interface are marked with the [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) keyword, indicating that they are asynchronous functions. In practice, the functions may return immediately, but they have the potential, at least, to do work that will require a bit of time: retrieving data from the file system, accessing data from a network, or performing long calculations.

- The `keys` method does _not_ have to return all the keys supported by `get`! There may be keys that `get` can handle that the `keys` will not include. This turns out to be useful in a number of situations.

- An async tree's `get` method is expected to return `undefined` if the key is not present in the tree.

## Apply the AsyncTree interface to the object

Of the three data representations we looked at previously, the in-memory JavaScript object was perhaps the simplest, so let's first look at applying the AsyncTree interface to a JavaScript object:

```${'js'}
/* src/flat/object.js */

${ pattern.ori/flat/object.js }
```

This module exports an async tree that wraps the JavaScript object containing the markdown data. For now, this wrapper can only handle a flat object — later we will extend this to handle hierarchical objects.

## Test the object tree

The first thing we can do with this object tree is programmatically verify it implements the AsyncTree interface.

```${'js'}
/* src/flat/object.test.js */

${ pattern.ori/flat/object.test.js }
```

<span class="tutorialStep"></span> From inside the `src/flat` directory, run these tests to see that all test pass:

```console
$ cd ../flat
$ node object.test.js
…
# tests 3
# pass 3
# fail 0
```

&nbsp;

Next: [Display a tree](display.html) »
