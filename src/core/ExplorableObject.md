---
title: ExplorableObject
path: /core/ExplorableObject.html
---

`ExplorableObject` is a class provides a convenient wrapper around plain JavaScript objects.

```js
import { ExplorableObject } from "@explorablegraph/explorable";

// Wrap an object to create an explorable graph.
const graph = new ExplorableObject({
  Alice: "Hello, Alice.",
  Bob: "Hello, Bob.",
  Carol: "Hello, Carol.",
});
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
    if (isPlainObject(value) && !(value instanceof this.constructor)) {
      value = Reflect.construct(this.constructor, [value]);
    }
    return value;
  }
}
```

As shown, the graph's keys are the keys of the wrapped object, and asking the graph for the value of a key delegates the request to the wrapped object. The `isPlainObject` check ensures that any returned sub-object value will itself be wrapped in an instance of `ExplorableObject`.
