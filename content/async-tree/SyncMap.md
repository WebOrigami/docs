---
title: SyncMap class
subtitle: A base class for custom Map subclasses
---

The standard JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class is a general-purpose utility class for associating any kind of value with any kind of key.

*** example ***

The interface for `Map` is reasonable, and it would be nice to subclass `Map` to create new classes that behave just like `Map` and can be used anywhere `Map` can be used.

## Problems with the standard `Map` class

Unfortunately, the standard JavaScript `Map` class has a number of limitations that make it cumbersome to subclass or work with.

### `Map` built-in methods don’t respect overridden methods

The `Map` class methods can be divided into two categories:

1. **Core methods** that uniquely define the behavior of a map: `delete()`, `get()`, `keys()`, `set()`
2. **Helper methods** that can be defined in terms of the core methods: `clear()`, `forEach()`, `has()`, `values()`

It would be nice if the helper methods were actually defined in terms of the core methods, so that overriding a core method would automatically affect the behavior of a helper method.

For example, the [`clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) helper method erases everything in the `Map`. It could helpfully be defined in terms of the core methods `keys()` and `delete()`:

```js
clear() {
  for (const key of this.keys()) {
    this.delete(key);
  }
}
```

Similarly, the [`entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) helper method returns the `[key, value]` pairs of the map, and could helpfully be defined in terms of the core methods `keys()` and `get()`:

```js
*values() {
  for (const key of this.keys()) {
    yield this.get(key);
  }
}
```

### `Map` methods fail when the prototype chain is extended

JavaScript generally allows you to extend an object’s [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain). This lets you, for example, create a variation of an original object that has some extra properties.

```js
const x = { a: 1 };
const y = Object.create(x); // y extends x
y.b = 2;

x.a // 1
x.b // undefined, x was unaffected by y's change

y.a // 1, inherited from x
y.b // 2, extra property
```

Generally speaking, almost everywhere in JavaScript where you can use an object like `x`, you can call `Object.create()` and substitute that instead.

However, the standard `Map` breaks this.

```js
const m = new Map([["a", 1]]);
m.get("a") // 1

const n = Object.create(m);
n.get("a") // TypeError: get method called on incompatible Object
```

The problem is that the standard `Map` methods specifically check to makes sure that the object they’re applied to was created with a `Map` constructor.

This limits the ways in which a `Map` can be used.

## A `Map` is always read/write

There are many cases where a read-only version of a `Map` would be desirable, but there is no standard way to create such a `Map`.
