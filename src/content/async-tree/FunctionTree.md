---
title: FunctionTree
subtitle: Wraps a function and a domain as an async tree
---

## Usage

```js
import { FunctionTree } from "@weborigami/origami";

// Wrap an object to create an async tree.
const tree = new FunctionTree({
  (key) => `Hello, ${key}.`,
  ["Alice", "Bob", "Carol"]
});
```

The [ori](/ori) tool will display the contents of the resulting `FunctionTree`.

```console
$ ori function.js/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

A rough implementation of the core interface methods in `FunctionTree` is:

```js
// Rough implementation
class FunctionTree {
  constructor(fn, domain = []) {
    this.fn = fn;
    this.domain = domain;
  }

  // Return the value for a given key.
  async get(key) {
    return this.fn(key);
  }

  // Return the function's domain as its keys.
  async keys() {
    return this.domain;
  }
}
```

Unlike async tree classes like [ObjectTree](ObjectTree.html), an `FunctionTree` can often accept keys which it does not make public in its `keys` iterator. The sample `FunctionTree` defined above exposes only three keys ("Alice", "Bob", "Carol"), but will actually accept any key.

```console
$ ori @tree/keys function.js/
- Alice
- Bob
- Carol
$ ori function.js/David
Hello, David.
```

{{ templates/class.orit(api.ori/FileTree.yaml/exports/0) }}
