---
title: Introduction to async trees
numberHeadings: true
---

_DRAFT_

## Defining an async tree directly

The `samples` folder contains a JavaScript file `direct.js` that defines a tree by implementing the `get` and `keys` methods directly.

```js
// direct.js

// Define a set of greetings directly in async tree form.
export default {
  // Get the value of a given key.
  async get(key) {
    return `Hello, \${key}.`;
  },

  // Return this tree node's keys.
  async keys() {
    return ["Alice", "Bob", "Carol"];
  },
};
```

You can use the ori tool to load and display the above tree:

```console
$ ori direct.js/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

## Wrapping a plain JavaScript object

```js
// object.js

import { ObjectTree } from "@weborigami/origami";

// Create an async tree for an in-memory object.
export default new ObjectTree({
  Alice: "Hello, Alice. [from an object]",
  Bob: "Hello, Bob. [from an object]",
  Carol: "Hello, Carol. [from an object]",
});
```

```console
$ ori object.js/
Alice: Hello, Alice. [from an object]
Bob: Hello, Bob. [from an object]
Carol: Hello, Carol. [from an object]
```

## Wrapping a function

```js
// function.js

import { FunctionTree } from "@weborigami/origami";

// Create an async tree for a function with a domain.
export default new FunctionTree(
  (key) => `Hello, \${key}. [from a function]`,
  ["Alice", "Bob", "Carol"]
);
```

```console
$ ori function.js/
Alice: Hello, Alice. [from a function]
Bob: Hello, Bob. [from a function]
Carol: Hello, Carol. [from a function]
```

## Transforming a tree

## Serving a tree

## Serving a tree with Express

## Composing multiple trees together

## Caching a tree

## Copying a tree to files
