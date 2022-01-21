---
title: ExplorableFunction
path: /core/ExplorableFunction.html
---

`ExplorableFunction` is a class that can wrap a JavaScript function and an optional domain for that function to create an graph that implements the [Explorable](Explorable.html) interface.

```js
import { ExplorableFunction } from "@explorablegraph/explorable";

// Wrap an object to create an explorable graph.
const graph = new ExplorableFunction({
  (key) => `Hello, ${key}.`,
  ["Alice", "Bob", "Carol"]
});
```

The [pika](/pika) tool will display the contents of the resulting `ExplorableFunction`.

```console
$ pika function
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

A rough implementation of the core interface methods in the `ExplorableFunction` [implementation](https://github.com/ExplorableGraph/explorable/blob/main/src/core/ExplorableFunction.js) are:

```js
// Rough implementation
class ExplorableFunction {
  constructor(fn, domain = []) {
    this.fn = fn;
    this.domain = domain;
  }

  // Yield the function's domain as its keys.
  async *[Symbol.asyncIterator]() {
    yield* this.domain;
  }

  // Return the value for a given key.
  async get(key) {
    return this.fn(key);
  }
}
```

Unlike explorable classes like [ExplorableObject](ExplorableObject.html), an `ExplorableFunction` can often accept keys which it does not make public in its `asyncIterator`. The sample `ExplorableFunction` defined above exposes only three keys ("Alice", "Bob", "Carol"), but will actually accept any key.

```console
$ pika keys function
- Alice
- Bob
- Carol
$ pika function/David
Hello, David.
```
