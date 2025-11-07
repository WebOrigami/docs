---
title: Writable maps
---

Since most of our map classes are read-only, our `SyncMap` base class defines the destructive `delete` and `set` methods to throw an exception if called. To make a map explicitly read/write, we override those methods to update the data source backing the map.

## Writable ObjectMap

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

Per the standard, the [`Map.prototype.delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) method return `true` if the value was removed, `false` if not. Likewise, the standard definition of [`Map.prototype.set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) is to return the map itself.

### Creating a new child node

The `EMPTY` bit in `set` above needs explanation. When writing a tree using the `Map` interface, we need some way to tell a given map node in the tree to create a new, empty child node:

```
set(key, <empty map>)
```

But using the `Map` interface alone, there’s no universal way to create a new, empty map that will work for all `Map` subclasses. The `FileMap` constructor, for example, requires a file directory as an argument.

Our solution is a convention: a `Map` subclass has the option to define a static `EMPTY` value that can be passed as the value to `set`. If `set` receives this as the `value`,it creates a child node as an empty map of the same type. We can define `EMPTY` in the `SyncMap` base class to make that available to subclasses like `ObjectMap`.

## Writable FileMap

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

As discussed above, calling `FileMap` `set` with an `EMPTY` value creates an empty subdirectory.

This completes our map-based foundation classes. We can now use these to build a site.

&nbsp;

Next: [Index pages](indexPages.html) »
