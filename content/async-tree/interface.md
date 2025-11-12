---
title: Using Map as an interface
---

The standard JavaScript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class is a general-purpose utility class for associating any kind of value with any kind of key.

```js
const primes = new Map();
primes.set(3, true);
primes.set(4, false);

primes.get(3); // true
primes.get(4); // false
```

Uses for `Map` overlap somewhat with uses for plain objects and arrays. Unlike those types of objects, you can extend the `Map` class to override its basic operations like `get()`.

This lets you create a custom class that looks and works like `Map`, but whose internal implementation may be quite different. This uses the `Map` class as an interface: a defined set of consistently-named methods and properties that meet specific expectations.

## Example

It's possible, for example, to create a `Map` subclass that wraps the active set of environment variables using Node's [`process.env`](https://nodejs.org/api/process.html#processenv) API.

```js
${ samples/help/EnvMap.js }
```

This lets you retrieve an environment variable using a `get()` call:

```js
const m = new EnvMap();
m.get("PATH"); // returns the user's current PATH variable
```

Note that this sample `Map` subclass isn't copying data into a `Map` — it's wrapping an existing set of data as a `Map`. This bypasses the `Map` class' built-in storage system to retrieve data directly from the environment.

## Advantages of `Map`

Using the `Map` class as an interface makes it possible to create a set of useful, general purpose operations that can process data represented in a wide variety of ways: filtering, grouping, sorting, and so on.

Instead of having to develop specific versions of these operations for objects, arrays, files, etc., all those data types can be represented as `Map` objects. The operations can then be written to work with `Map` objects.

The standard `Map` class is somewhat awkward to extend directly. For this reason, the `async-tree` library includes a base class called [`SyncMap`](SyncMap.html) that can be used as a drop-in replacement for `Map`. See that page for a discussion of the issues with `Map` and how `SyncMap` addresses them.

Another important use of `Map` is in constructing general-purpose trees, such as the tree of resources for a site. See the [Map Tree pattern](/pattern) for a walkthrough of how maps can be used in that way.
