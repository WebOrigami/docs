---
title: ExplorableObject
---

`ExplorableObject` is a class that can wrap a plain JavaScript object to create an explorable object.

```js
import { ExplorableObject } from "@explorablegraph/explorable";

// Wrap an object to create an explorable graph.
const graph = new ExplorableObject({
  Alice: "Hello, Alice.",
  Bob: "Hello, Bob.",
  Carol: "Hello, Carol.",
});
```

The [ori](/ori) tool will display the contents of the resulting `ExplorableObject`.

```console
$ ori object
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

The core interface methods of the `ExplorableObject` [implementation](https://github.com/ExplorableGraph/explorable/blob/main/src/core/ExplorableObject.js) are:

```js
// Rough implementation
class ExplorableObject {
  constructor(object) {
    this.object = object;
  }

  // Yield the object's keys
  async *[Symbol.asyncIterator]() {
    yield* Object.keys(this.object);
  }

  // Return the value for the given key.
  async get(key) {
    let value = this.object[key];
    if (isPlainObject(value)) {
      // Wrap a returned plain object as an ExplorableObject.
      value = Reflect.construct(this.constructor, [value]);
    }
    return value;
  }
}
```

As shown, the graph's keys are the keys of the wrapped object, and asking the graph for the value of a key delegates the request to the inner object. If the value of a key is a plain object, that object is wrapped by an ExplorableObject before being returned.
