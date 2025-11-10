---
title: The Map interface
---

The last section noted that, in the context of our markdown-to-HTML problem, it's possible to conceptualize the markdown content as a map:

<figure>
  ${ svg({
	  "post1.md": "This is **post 1**.",
	  "post2.md": "This is **post 2**.",
	  "post3.md": "This is **post 3**.",
  }) }
</figure>

This section introduces an interface suitable for working with such a map, regardless of its underlying data representation.

## The standard `Map` class

We want to represent a collection of keys associated with values, and JavaScript provides a standard [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class for that exact purpose.

```js
const m = new Map();

m.add("a", 1);
m.add("b", 2);

m.get("a"); // 1
m.get("b"); // 2
m.get("c"); // undefined

m.keys(); // "a", "b"
```

If you haven’t worked with the `Map` class before, you can think of it as an array holding little arrays, each of which pairs a key with a value. The above `Map` is effectively the same as the array:

```js
[
  ["a", 1],
  ["b", 2],
];
```

One thing that makes `Map` more interesting than an array-of-arrays is that finding a value in a `Map` designed to be much faster at finding a given key and the value associated with it. Another point that’s vital for our purposes is that `Map` is a class whose members can be overridden.

We can actually pass an array-of-arrays to the `Map` constructor to populate it with an initial set of entries. We could initialize a `Map` with our sample post data:

```js
const m = new Map([
  ["post1.md", "This is **post 1**."],
  ["post2.md", "This is **post 2**."],
  ["post3.md", "This is **post 3**."],
]);

m.get("post1.md"); // "This is **post 1**."
```

## Map as an interface

We can co-opt `Map` into working as a general-purpose interface for accessing information stored elsewhere.

Specifically, we can subclass `Map` to create a custom class that looks and works just like `Map` but is backed by other data. The `Map` class happens to come with built-in storage — but we are going to completely ignore that!

That is, we will use `Map` as an _interface_: a defined set of consistently-named methods and properties that meet specific expectations. Any code written to work with `Map` will automatically work with our custom subclasses without modification.

The standard `Map` class includes two core methods of special interest:

- A `get` method which gets the value for a given key. If we ask the above map for `post1.`, we want to get back `This is \*\*post 1\*\*.` Here the value we get is text, but like the keys, the values can be of any data type.
- A `keys` method which produces the keys of the map. In the map above, the keys are `post1.md`, `post2.md`, and `post3.md`. The keys will often be strings, but don't have to be strings.

Overriding these two `Map` methods will form the basis of the Map Tree pattern. The basic shape of our code will look like:

```js
class CustomMap extends Map {
  get(key) {
    // Return the value of the given key
  }

  *keys() {
    // Yield the available keys
  }
}
```

The `keys` method is slightly exotic, returning an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol) that can produce a sequence of values.

- The simplest way to create an iterator is writing a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
- The simplest way to consume an iterator is to pass it to [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), which will enumerate the values produced by the iterator and return those as an array.

## Create a map from an object

Of the three data representations we looked at previously, the in-memory JavaScript object was the simplest, so let's first look at defining a `Map` subclass that's backed directly by data stored in an object:

```js
/* src/map/ObjectMap.js */

${ pattern/map/ObjectMap.js }
```

This lets us work with an existing object as if it were a `Map`. To be clear: we’re not copying that object’s keys and values into a `Map` — we’re creating a `Map` that wraps the object. This is a fast operation.

This `ObjectMap` class isn’t finished yet, but this is sufficient for us to begin playing with it. We can instantiate this class to wrap an object containing the markdown data:

```${'js'}
/* src/map/object.js */

${ pattern/map/object.js }
```

## Test the object map

The first thing we can do with this object-based map is programmatically verify that its methods conform to the expectations of the `Map` class:

```${'js'}
/* src/map/object.test.js */

${ pattern/map/object.test.js }
```

<span class="tutorialStep"></span> From inside the `src/map` directory, run these tests to see that all test pass:

```console
$ cd ../map
$ node object.test.js
…
# tests 3
# pass 3
# fail 0
```

&nbsp;

Next: [Display a map](display.html) »
