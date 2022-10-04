---
title: The Explorable graph interface
flat = node_modules/pattern-intro/src/flat:
---

The last section noted that, in the context of our markdown-to-HTML problem, it's possible to conceptualize the markdown content as a graph:

<figure>
  {{ svg flat/markdown }}
  <figcaption>The markdown documents as a graph</figcaption>
</figure>

This section introduces an interface suitable for working with such a graph, regardless of its underlying data representation.

## The Explorable interface

Let's identify a minimal interface sufficient to define a wide variety of graphs. This interface, which we'll call the Explorable interface, has two parts:

- A method which produces the keys of the graph. In the graph above, the keys are `Alice.md`, `Bob.md`, and `Carol.md`. The keys will often be strings, but don't have to be strings.
- A method which gets the value for a given key. If we ask the above graph for `Alice.md`, we want to get back `Hello, **Alice**.` Here the value we get is text, but like the keys, the values can be of any data type.

In code, an implementation of the Explorable interface looks like this:

```js
// An explorable graph
const graph = {
  // Iterate over this graph node's keys.
  async *[Symbol.asyncIterator]() { ... }

  // Get the value of a given key.
  async get(key) { ... }
}
```

Some notes:

- The [Symbol.asyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) reference is what is called a "well-known symbol" in JavaScript: a symbol that has special meaning to the JavaScript engine. In this case, the symbol lets you easily iterate over a graph node's set of keys asynchronously using a [for await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loop.

- The asterisk (`*`) before the `Symbol.asyncIterator` indicates that the function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator): a function that can be repeatedly invoked to return the next result in a sequence. The sequence can be potentially infinite in length.

- All of the functions in the `Explorable` interface are marked with the [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) keyword, indicating that they are asynchronous functions. In practice, the functions may return immediately, but they have the potential, at least, to do work that will require a bit of time: retrieving data from the file system, accessing data from a network, or performing long calculations.

- An Explorable graph's `get` method is expected to return `undefined` if the key is not present in the graph.

- The `asyncIterator` does _not_ have to return all supported keys! There may be keys that `get` can handle that the `asyncIterator` will not include. This is useful in a number of situations.

## Apply the Explorable interface to the object

Of the three data markdown representations we looked at previously, the in-memory JavaScript object was perhaps the simplest, so let's first look at applying the Explorable interface to a JavaScript object:

```{{'js'}}
/* src/flat/object.js */

{{ flat/object.js }}
```

This module exports an explorable graph wrapper around the object. For now, this wrapper can only handle a flat object — later we handle a hierarchical object.

## Test the object graph

The first thing we can do with this explorable object is programmatically verify it implements the Explorable interface.

```{{'js'}}
/* src/flat/object.test.js */

{{ flat/object.test.js }}
```

<span class="tutorialStep"></span> From inside the `src/flat` directory, run these tests to see that all test pass:

```console
$ node object.test.js
…
# tests 3
# pass 3
# fail 0
```

&nbsp;

Next: [Display a graph](display.html) »
