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

map.entries(); // empty array ☹️
```

We can fix this by overriding the `Map` helper methods so that they call `get` or `keys` where appropriate.

Happily, we’ll only need to do this once. We can define a general-purpose base class that extends `Map` and defines more consistent implementations of `entries` and other helper methods. We’ll call this base class `SyncMap` to distinguish it from an asynchronous version we’ll look at later.

As an example, the definition of `SyncMap` and its `entries()` method looks like:

```js
/* src/site/SyncMap.js */

export default class SyncMap extends Map {

  // Override entries() method to call overridden get() and keys()
  *entries() {
    for (const key of this.keys()) {
      const value = this.get(key);
      yield [key, value];
    }
  }

  …
}
```

This calls the map’s custom `keys` methods to loop through the keys. For each key, it calls `get` to obtain the corresponding value for that key. It then yields that `[key, value]` pair.

We can then update all of our map classes to extend `SyncMap` instead of directly extending `Map`. For example, the declaration of our `ObjectMap` class can be updated as follows, leaving everything else the same:

```js
/* src/site/ObjectMap.js */

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

We can create an expanded suite of tests that cover more of the `Map` interface.

<span class="tutorialStep"></span> From inside the `src/site` directory, confirm that our enhanced `ObjectMap` passes the expanded test suite:

```console
$ cd ../site
$ node object.test.js
▶ ObjectMap
  ✔ get (0.292541ms)
  ✔ keys (0.304ms)
  ✔ entries (0.075416ms)
  ✔ forEach (0.0825ms)
  ✔ has (0.066042ms)
  ✔ size (0.04675ms)
  ✔ Symbol.iterator (0.072667ms)
  ✔ values (0.061ms)
✔ ObjectMap (1.429834ms)
ℹ tests 8
ℹ suites 1
ℹ pass 8
ℹ fail 0
…
```

We can likewise update `FileMap`, `FunctionMap`, and `HtmlMap` to derive from `SyncMap`. All those classes will now be fully `Map`-compatible.

&nbsp;

Next: [Trees of maps](trees.html) »
