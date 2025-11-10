---
title: Writable maps
---

Since most of our map classes are read-only, our `SyncMap` base class defines the destructive `delete` and `set` methods to throw an exception if called. To make a map explicitly read/write, we override those methods to update the data source backing the map.

## Writable ObjectMap

Here, for example, are the `ObjectMap` implementations of the destructive methods:

```js
/* src/site/ObjectMap.js */

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
    this.object[key] = value;
    return this;
  }
}
```

Per the standard, the [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) method returns `true` if the value was removed, `false` if not. Likewise, the standard definition of [`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) is to return the map itself.

## Writable FileMap

Here’s what adding read/write to `FileMap` looks like:

```js
/* src/site/FileMap.js */

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
    // Is the value an empty plain object?
    const isEmptyObject =
      Object.getPrototypeOf(value) === Object.prototype &&
      Object.keys(value).length === 0;
    if (isEmptyObject) {
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

## Creating a new child node

As discussed earlier, we will use instances of our `Map` classes as nodes in a tree. In a short while we'll look at a general tree operation that copies one tree into another. That requires the ability to create a new, empty `Map` as a child of an existing `Map`. We need some way to write:

```
set(key, <empty map of the same type>)
```

But using the `Map` interface alone, there’s no universal way to create a new, empty map that will work for all `Map` subclasses. The `FileMap` constructor, for example, requires a file directory as an argument.

Our solution here is a convention: if `set()` receives an empty, plain object as the `value`, it creates a child node as an empty map of the same type. For `ObjectMap` that behavior will fall out by default, but for `FileMap` we have `set()` check if the `value` is an empty object. If so, it creates an empty subdirectory with the name supplied as the `key`.

This completes our `Map`-based foundation classes. We can now use these to build a site.

&nbsp;

Next: [Index pages](indexPages.html) »
