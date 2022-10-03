---
title: Hands-on intro to explorable graphs
numberHeadings: true
---

_This introduction is still in draft form._

## Defining an explorable graph directly

The `samples` folder contains a JavaScript file `direct.js` that defines a graph by implementing the `Symbol.asyncIterator` and `get` methods directly.

```js
// direct.js

// Define a set of greetings directly in explorable graph form.
export default {
  // Iterate over this graph node's keys.
  async *[Symbol.asyncIterator]() {
    yield* ["Alice", "Bob", "Carol"];
  },

  // Get the value of a given key.
  async get(key) {
    return `Hello, ${key}.`;
  },
};
```

You can use the ori tool to load and display the above graph:

```console
$ ori direct
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

## Wrapping a plain JavaScript object

```js
// object.js

import { ObjectGraph } from "@graphorigami/origami";

// Create an explorable in-memory object.
export default new ObjectGraph({
  Alice: "Hello, Alice. [from an object]",
  Bob: "Hello, Bob. [from an object]",
  Carol: "Hello, Carol. [from an object]",
});
```

```console
$ ori object
Alice: Hello, Alice. [from an object]
Bob: Hello, Bob. [from an object]
Carol: Hello, Carol. [from an object]
```

## Wrapping a function

```js
// function.js

import { FunctionGraph } from "@graphorigami/origami";

// Create an explorable function with a domain.
export default new FunctionGraph(
  (key) => `Hello, ${key}. [from a function]`,
  ["Alice", "Bob", "Carol"]
);
```

```console
$ ori function
Alice: Hello, Alice. [from a function]
Bob: Hello, Bob. [from a function]
Carol: Hello, Carol. [from a function]
```

## Transforming a graph

## Serving a graph

## Serving a graph with Express

## Composing multiple graphs together

## Caching a graph

## Copying a graph to files
