---
title: Full Map compatibility
---

Before we make a little site using our `Map` subclasses, we need to finish their implementation. Our initial `Map` subclasses implement the core `get` and `keys` methods — but at the moment they don’t meet all the expectations someone would have a `Map`.

The standard `Map` is unfortunately unhelpful when it comes to subclassing — a number of `Map` helper methods fail to respect our overridden `get` and `keys` methods.

For example, `Map` defines an `entries` method that returns the `[key, value]` pairs in a map, but that `entries` method looks directly at the internal data storage managed by `Map`. If someone calls the `entries` method on one of our custom `Map` subclasses, they’ll get an empty list.

```js
const map = new ObjectMap({
  "post1.md": "This is **post 1**.",
  "post2.md": "This is **post 2**.",
  "post3.md": "This is **post 3**.",
});

map.entries(); // empty array
```

We can fix this by overriding the `Map` helper methods so that they call `get` or `keys` where appropriate.

Happily, we’ll only need to do this once. We can define a general-purpose base class that extends `Map` and defines more consistent implementations of `entries` and other helper methods. We’ll call this base class `SyncMap` to distinguish it from an asynchronous version we’ll look at later.

As an example, the `entries` method of `SyncMap` looks like:

```js
// Override entries() method to call overridden get() and keys()
*entries() {
  for (const key of this.keys()) {
    const value = this.get(key);
    yield [key, value];
  }
}
```

This calls the map’s custom `keys` methods to loop through the keys. For each key, it calls `get` to obtain the corresponding value for that key. It then yields that `[key, value]` pair.

We can then update all of our map classes to extend `SyncMap` instead of directly extending `Map`. For example, our `ObjectMap` class can be defined as:

```js
import SyncMap from "./SyncMap.js";

export default class ObjectMap extends SyncMap {
  …
}
```

Now when someone instantiates `ObjectMap`, they can call `entries` to get the map’s list of `[key, value]` pairs.

```js
const map = new ObjectMap({
  "post1.md": "This is **post 1**.",
  "post2.md": "This is **post 2**.",
  "post3.md": "This is **post 3**.",
});

map.entries(); // [["post1.md", "This is **post 1**."], … etc.]
```

&nbsp;

Next: [Trees of maps](trees.html) »
