---
title: More complete Map classes
---

Our goal is to make a tiny site using our `Map` subclasses, but before we can tackle that we need add some features to the classes.

## Full `Map` compatibility

Our initial `Map` subclasses implement the core `get` and `keys` methods — but at the moment our implementations don’t meet all the expectations someone would have a `Map`.

The problem is that the standard `Map` is unfortunately poorly designed when it comes to subclassing — a number of `Map` helper methods fail to respect our overridden `get` and `keys` methods.

For example, `Map` defines an `entries` method that returns the `[key, value]` pairs in a map — but that `entries` method looks directly at the internal data storage managed by `Map`. If someone calls the `entries` method on one of our custom `Map` subclasses, they’ll get an empty list.

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
  … methods go here …
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

## Maps as trees

## Read/write maps

Since most of our map classes are read-only, `SyncMap` can define its destructive methods — `delete` and `set` — to throw an exception if called. When we want to make a map explicitly read/write, we’ll override those methods.

We can make `ObjectMap` and `FileMap` read/write. (`FunctionMap` and `HtmlMap` will stay read-only.)

Here, for example, are the `ObjectMap` implementations of the destructive methods:

```js
export default class ObjectMap extends SyncMap {

  …
  
  delete(key) {
    const exists = key in this.object;
    if (exists) {
      delete this.object[key];
    }
    return exists;
  }

  set(key, value) {
    if (value === this.constructor.EMPTY) {
      this.object[key] = new this.constructor({});
    } else {
      this.object[key] = value;
    }
    return this;
  }
}
```

The `EMPTY` bit needs explanation. When writing a tree using the `Map` interface, we need a way to tell a given map node in the tree to create a new child node. We want some way to say:

```
set(key, <empty map>)
```

The catch is that, using the `Map` interface alone, there’s no universal way to create a new, empty map that will work for all `Map` subclasses. The `FileMap` constructor, for example, requires a file directory as an argument.

Our solution is a convention: a `Map` subclass has the option to define a static `EMPTY` value that can be passed as the value to `set`. If `set` receives this as the `value` to set, the caller wants to create a child node as an empty map of the same type.

Here’s what adding read/write to `FileMap` looks like:

```js
export default class FileMap extends SyncMap {

  …
  
  delete(key) {
    const destPath = path.resolve(this.dirname, key);
    try {
      fs.rmSync(destPath, { recursive: true });
      return true;
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT") {
        return false; // File or directory didn't exist
      }
      throw error;
    }
  }

  set(key, value) {
    const destPath = path.resolve(this.dirname, key);
    if (value === this.constructor.EMPTY) {
      // Create empty subdirectory
      fs.mkdirSync(destPath, { recursive: true });
    } else {
      // Ensure this directory exists before writing out the file
      fs.mkdirSync(this.dirname, { recursive: true });
      // Write file
      fs.writeFileSync(destPath, value);
    }
    return this;
  }
}
```