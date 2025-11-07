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

`Map` comes with built-in storage — but we are going to completely ignore that! We will co-opt `Map` into working as a general-purpose interface for accessing information stored elsewhere. Specifically, we can subclass `Map` to create a custom class that looks and works just like `Map` but is backed by other data.

That is, we will use `Map` as an _interface_: a defined set of consistently-named methods and properties that meet specific expectations. Any code written to work with `Map` will automatically work with our custom subclasses without modification.

The standard `Map` class includes two core methods of special interest:

- A `keys` method which produces the keys of the map. In the map above, the keys are `post1.md`, `post2.md`, and `post3.md`. The keys will often be strings, but don't have to be strings.
- A `get` method which gets the value for a given key. If we ask the above map for `post1.`, we want to get back `This is \*\*post 1\*\*.` Here the value we get is text, but like the keys, the values can be of any data type.

Overriding these two `Map` methods will form the basis of the Map pattern. The basic shape of our code will look like:

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

This `Map` class isn’t complete yet, but is sufficient for us to begin playing with it. We can instantiate this class to wrap an object containing the markdown data:

```${'js'}
/* src/map/object.js */

${ pattern/map/object.js }
```

For now, this wrapper can only handle a flat object — later we'll extend this to handle hierarchical objects.

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
