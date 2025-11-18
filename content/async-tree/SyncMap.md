---
title: SyncMap class
subtitle: A base class for custom Map subclasses
---

To support the use of [`Map` as an interface](interface.html), the `async-tree` library provides a base class called `SyncMap`. `SyncMap` is designed as a drop-in replacement for `Map`, and avoids a number of problems with extending `Map` directly; see below.

As its name suggests, all of the members of `SyncMap` are synchronous; for an asynchronous version, see [`AsyncMap`](./AsyncMap.html).

## Problems extending the standard `Map` class

The interface for `Map` is straightforward, so it would be nice to subclass `Map` to create new classes that behave just like `Map` and can be used anywhere `Map` can be used. Unfortunately, the standard `Map` class has a number of limitations that make it cumbersome to extend.

### `Map` built-in members don’t respect overridden methods

The `Map` class members can be divided into two categories:

1. **Core methods** that uniquely define the behavior of a map: `delete()`, `get()`, `keys()`, `set()`
2. **Helper properties and methods** that can be defined in terms of the core methods: `clear()`, `entries()`, `forEach()`, `has()`, `size`, `values()`, and `[Symbol.iterator]()`.

It would be nice if the helper members were actually defined in terms of the core methods, so that overriding a core method would automatically affect the behavior of the helper members.

For example, the [`clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) helper method erases everything in the `Map`. It would ideally be defined in terms of the core methods `keys()` and `delete()`. Similarly, the [`entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) helper method returns the `[key, value]` pairs of the map, and would ideally be defined in terms of the core methods `keys()` and `get()`.

Sadly, the `Map` helper members are hard-coded to work directly with the class’s internal data representation. Subclassing `Map` then requires boilerplate code to maintain baseline expectations.

For comparison, the Python language provides a [`Mapping` abstract base class](https://docs.python.org/3/library/collections.abc.html#collections-abstract-base-classes) that is much more helpful than JavaScript's `Map`. When you inherit from `Mapping`, you only need to define a small set of core methods, and the base class uses your definitions to provide the remaining methods.

### `Map` methods fail when the prototype chain is extended

JavaScript generally allows you to extend an object’s [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain). This lets you, for example, create a variation of an original object that has some extra properties.

```js
const x = { a: 1 };
const y = Object.create(x); // y extends x
y.b = 2;

x.a; // 1
x.b; // undefined, x was unaffected by y's change

y.a; // 1, inherited from x
y.b; // 2, extra property
```

Generally speaking, almost everywhere in JavaScript where you can use an object like `x`, you can call `Object.create()` to create a new object `y` and substitute that instead.

However, the standard `Map` breaks this useful behavior.

```js
const m = new Map([["a", 1]]);
m.get("a"); // 1

const n = Object.create(m); // n extends m
n.get("a"); // TypeError: get method called on incompatible Object
```

The problem is that the standard `Map` methods specifically check that the object they’re applied to was created with a `Map` constructor. This limits the ways in which a `Map` can be used.

### A `Map` is always read/write

There are cases where a read-only version of a `Map` would be desirable, but there is no standard way to create such a `Map` and communicate the map’s read-only nature to consumers.

## Fixing the problems in `Map`

The `SyncMap` class is a subclass of `Map` that fixes the above problems to create a better base class for creating custom maps.

- Helper methods are defined in terms of core methods. For example, the `entries()` method is defined in terms of `keys()` and `get()` as sketched earlier.
- Instances inheriting from `SyncMap` can have their prototype chain extended via `Object.create()` and methods like `get()` will still work as expected.
- `SyncMap` defines a `readOnly` property which, if true, indicates the map’s destructive `delete()` or `set()` methods should not be called.

### Helper methods defined in terms of core methods

If you override the core map methods, the `SyncMap` helper methods take advantage of them.

For example, `clear()` is essentially calling the core methods `keys()` and `delete()`:

```js
clear() {
  for (const key of this.keys()) {
    this.delete(key);
  }
}
```

Similarly, `entries()` is essentially calling `keys()` and `get()`:

```js
*values() {
  for (const key of this.keys()) {
    yield this.get(key);
  }
}
```

We can see these methods at work in a toy `SyncMap` subclass for a map of greetings:

```js
class GreetingsMap extends SyncMap {
  get(key) {
    return `Hello, \${ key }!`;
  }

  *keys() {
    yield* ["Alice", "Bob", "Carol"];
  }
}

const m = new GreetingsMap();
m.entries();
// ["Alice", "Hello, Alice!"], ["Bob", "Hello, Bob!"], ["Carol", "Hello, Carol!"]]
```

### Prototype chain extension

Unlike a standard `Map`, a `SyncMap` can have its prototype chain extended:

```js
const m = new SyncMap([["a", 1]]);
m.get("a"); // 1

const n = Object.create(m);
n.get("a"); // 1 as expected -- no more TypeError
```

### Read-only maps

`SyncMap` defines a `readOnly` property that you can inspect to determine whether a map supports writes. The `readOnly` property will be `true` if the class’s `get()` method has been overridden but `delete()` and `set()` have not.

```js
class MyMap extends SyncMap {
  get(key) {
    return super.get(key);
  }
}

const m = new MyMap();
m.readOnly; // true
```

To definitively indicate that a `SyncMap` subclass is read/write, provide implementations of the `delete()` and `set()` methods — even if all those methods do is call their `super` methods.

## Maps backed by data sources

One important use for `SyncMap` is to create `Map`-compatible objects that are backed by existing data from some source. For example, the `FileMap` class creates a `SyncMap` (and so a `Map`) backed by file system folders and files; the `FunctionMap` class is based by a function and an optional domain.

These `SyncMap` subclasses will create the internal key/value data stored used by `Map` but will not use it. That overhead is the price paid for the condition `SyncMap instanceof Map` to be true.

### Separation of keys and values

One ramification of defining maps based on data elsewhere is that there may not always be a tight relationship between the sizes of the map’s keys and values.

For example, consider the `GreetingsMap` shown earlier:

```js
class GreetingsMap extends SyncMap {
  get(key) {
    return `Hello, \${ key }!`;
  }

  *keys() {
    yield* ["Alice", "Bob", "Carol"];
  }
}
```

This map exposes a fixed number of keys, but the `get()` method will actually return a defined value for an infinite number of keys.

```js
const m = new GreetingsMap();

m.has("Alice"); // true
m.get("Alice"); // "Hello, Alice!"

m.has("Dave"); // false, not a defined key
m.get("Dave"); // "Hello, Dave!"
```

In certain circumstances, such a map can be very useful.

To account for this potential disconnect between keys and values, the map helper methods in `SyncMap` have the following default behavior:

- `clear()`, `entries()`, `forEach()`, `values()`, and `[Symbol.iterator]()` loop over the result of `keys()`.
- `has(key)` returns `true` as long as the given `key` appears in the result of `keys()`. As shown above, the map might still return a value for a `key` even when `has(key)` is `false`.
- `size` returns the number of keys returned by `keys()`. The `get()` might actually return more values than that size would suggest.

## Limitations

`SyncMap` can be generally used as a drop-in replacement for `Map`. One situation where `SyncMap` will not work as expected is with the JavaScript function [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone). `structuredClone` will accept a `Map` object but will directly accesses a map's built-in storage. If you pass a `SyncMap` to `structuredClone`, the function will not call your `get()` or `keys()` methods, and the cloned result will be an empty `Map`.

## API

${ src/templates/class.ori(api/drivers/SyncMap.yaml/exports/0) }
