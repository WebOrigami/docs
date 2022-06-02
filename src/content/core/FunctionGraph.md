---
title: FunctionGraph
---

`FunctionGraph` is a class that can wrap a JavaScript function and an optional domain for that function to create an graph that implements the [Explorable](Explorable.html) interface.

```js
import { FunctionGraph } from "@explorablegraph/explorable";

// Wrap an object to create an explorable graph.
const graph = new FunctionGraph({
  (key) => `Hello, ${key}.`,
  ["Alice", "Bob", "Carol"]
});
```

The [ori](/ori) tool will display the contents of the resulting `FunctionGraph`.

```console
$ ori function
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

A rough implementation of the core interface methods in the `FunctionGraph` [implementation](https://github.com/ExplorableGraph/explorable/blob/main/src/core/FunctionGraph.js) are:

```js
// Rough implementation
class FunctionGraph {
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

Unlike explorable classes like [ObjectGraph](ObjectGraph.html), an `FunctionGraph` can often accept keys which it does not make public in its `asyncIterator`. The sample `FunctionGraph` defined above exposes only three keys ("Alice", "Bob", "Carol"), but will actually accept any key.

```console
$ ori keys function
- Alice
- Bob
- Carol
$ ori function/David
Hello, David.
```
