---
title: AsyncMap
subtitle: Asynchronous version of standard Map class
---

This is an asynchronous analogue of the standard JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class.

`AsyncMap` can serve as the foundation for custom `Map`-like classes that represent high-latency resources, such as server data or data which is slow to compute, which are accessed with asynchronous calls. For a synchronous version of this class, see [`SyncMap`](./SyncMap.html).

The methods and properties of `AsyncMap` all generally behave like their counterparts in `Map`, with the significant difference that they are all asynchronous.

### Async iterators

The standard `Map` class includes a number of methods that return an [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator):

- `entries`
- `keys`
- `values`
- `[Symbol.Iterator]`

In `AsyncMap`, all of these methods return an [`AsyncIterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator). Moreover, where `Map` uses `[Symbol.Iterator]`, `AsyncMap` uses `[Symbol.asyncIterator]` instead.

Async iterators (marked with a `*` in the API documentation below) yield a sequence of values. To convert an async iterator to a synchronous form, such as an `Array`, it is generally necessary to use a JavaScript [`for await..of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loop:

```js
const m = new ExplorableSiteMap("https://weborigami.org");

// Collect all the keys from the top level of the site
const keys = [];
for await (const key of m.keys()) {
  keys.push(key);
}
```

For reference: JavaScript allows regular synchronous `Iterator` instances, such as those returned by the regular `Map` methods, to be used as the target for a `for await..of` loop. This allows you to write code such as the above loop that will work with either a `Map` or `AsyncMap`.

## API

${ src/templates/class.ori(api/drivers/AsyncMap.yaml/exports/0) }
