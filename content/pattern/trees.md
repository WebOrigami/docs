---
title: Trees of maps
---

A map is effectively a flat list, but we can organize them into hierarchical tree structures to represent data sources like the file system or software artifacts like sites.

This is easily accomplished by having the value in a `Map` be another `Map`. We'll need to make a few modifications to our map classes to handle this.

## Object trees

We can update the `get` method in `ObjectMap` so that, if the value being returned in another plain object and not already a `Map`, we wrap that object in another `ObjectMap`.

```${'js'}
/* src/map/ObjectMap.js */

  get(key) {
    const value = this.object[key];
    return typeof value === "object" && !(value instanceof Map)
      ? new this.constructor(value)
      : value;
  }
```

Instead of creating new instances with `new ObjectMap`, we use `new this.constructor`. The former could work in this tutorial, but the latter is more future-proof because it supports subclassing. If you ever were to subclass `ObjectMap`, you'd want that subclass to return new instances of the same subclass, not `ObjectMap`.

## File trees

We do something very similar in `FileMap.js`. We check to see whether the requested key corresponds to a subdirectory and, if so, wrap that in its own `FileMap` before returning it.

```${'js'}
/* src/map/FileMap.js */

  get(key) {
    const filePath = path.resolve(this.dirname, key);
    let stats;
    try {
      stats = fs.statSync(filePath);
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT" /* File not found */) {
        return undefined;
      }
      throw error;
    }

    return stats.isDirectory()
      ? new this.constructor(filePath) // Return subdirectory as a tree
      : fs.readFileSync(filePath); // Return file contents
  }
```

This lets us support arbitrarily deep subfolders.

## Function trees

The `FunctionMap` class itself doesn't need to be updated to support function-backed trees. Instead, a function being wrapped could simply return values that are maps.

## Tree transformations

We can update a transformation like `HtmlMap` so that it can transform a tree. If the `get` method obtains a value from the source map, it checks to see whether that value is itself a map, i.e., a child node in the tree. If so, the transformation applies itself to that value before returning it.

```${'js'}
/* src/map/transform.js */

  get(key) {
    const sourceKey = key.replace(/\.html$/, ".md");
    const sourceValue = this.source.get(sourceKey);
    const resultValue =
      sourceValue && key.endsWith(".html")
        ? marked(sourceValue.toString())
        : sourceValue instanceof Map
        ? new this.constructor(sourceValue)
        : undefined;
    return resultValue;
  }
```

We're almost done enhancing our map classes to make a site, but have one more modification to make.

&nbsp;

Next: [Writable maps](writable.html) »
