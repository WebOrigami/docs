---
title: Map-like objects
---

Many features in the async-tree library and the [Origami expression language](/language/) built-in functions accept arguments that are _map-like_ objects.

A map-like object is one that is any of the following:

1. A JavaScript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object
1. An [`AsyncMap`](AsyncMap.html) object (an asynchronous variant of `Map`)
1. An object with the same interface as `Map` or `AsyncMap`: it may be of a different class, but nevertheless has the same methods and properties
1. A JavaScript `Array` instance
1. A JavaScript function
1. A JavaScript `Iterator` instance
1. A JavaScript `Set` instance
1. A plain JavaScript object created with [object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals) syntax, `new Object()`, or `Object.create(null)`.

The easiest way for you to write a function that can accept any map-like object as a parameter is to pass that parameter to [Tree.from()](Tree.html#from). The `from()` function considers the types above and, if the input matches one of the above types, returns a `Map` or `AsyncMap` object. If necessary, `from()` will wrap the input with a map class like [ObjectMap](ObjectMap.html).

```js
async function manipulateTree(maplike) {
  const map = Tree.from(maplike);
  if (map) {
    /* `map` is a sync or async map */
  }
}
```

Note: the [`Tree.from`](from.html) method accepts any JavaScript object, but the helper function [`Tree.isMaplike`](/builtins/tree/isMaplike.html) returns `false` for an object that isn't one of the types listed above.
