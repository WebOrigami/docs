---
title: FunctionTree
subtitle: Wraps a function and a domain as an async tree
---

## Usage

```js
${ samples.ori/help/function.js }
```

The [ori](/cli) tool will display the contents of the resulting `FunctionTree`.

```console
$ ori function.js/
${ @yaml samples.ori/help/function.js/ }
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
$ ori @keys function.js/
${ @yaml @keys samples.ori/help/function.js/ }$ ori function.js/David
${ samples.ori/help/function.js/David }
```

${ templates/class.ori(api.ori/FunctionTree.yaml/exports/0) }
