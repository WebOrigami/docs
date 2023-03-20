---
title: The Explorable interface
---

The `Explorable` interface is a simple and flexible way to represent a wide variety of data types as graphs.

## Explorable graphs

Specifically, the graphs handled by the `Explorable` are said to be _explorable_ graphs, which means:

- You can ask a node in the graph for its _keys_.
- With a key, you can ask a node to give you the corresponding _value_ associated with that key.
- The value may be another node in the graph, or the value may be any other type of JavaScript data.
- The set of keys you get back may not be complete. That is, the node may have keys that it can handle that it chooses _not_ to return in the set of keys it will give you.
- The node may (or may not) allow you set the value associated with a given key.
- All these node operations — obtaining its keys, getting the value for a given key, and optionally setting the value for a given key — may be asynchronous.

A useful way to think about an explorable graph is that it is a "lazy dictionary". Such a construct is sufficiently flexible to encompass many types of data.

## Explorable interface definition

JavaScript does not have a first-class representation of interfaces, but a graph node supporting the `Explorable` interface looks like this:

```js
const graph = {
  // Get the value of a given key.
  async get(key) { ... }

  // Iterate over this graph node's keys.
  async keys() { ... }

  // Optional: set the value of a given key.
  async set(key, value) { ... }
}
```

Some notes on the JavaScript shown above:

- The `keys` method must return an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol). An iterator is an object that can produce a sequence of values. A graph's `keys` method can return an instance of a JavaScript class like `Array` and `Set` that support the iterator protocol, or `keys` can return an iterator defined by other means.

- Both functions in the `Explorable` interface are marked with the [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) keyword, indicating that they are asynchronous functions. In practice, the functions may return immediately, but they have the potential, at least, to do work that will require a bit of time: retrieving data from the file system, accessing data from a network, or performing long calculations.

- The `keys` method does _not_ have to return all the keys supported by `get`! There may be keys that `get` can handle that the `keys` will not include. This turns out to be useful in a number of situations.

- An Explorable graph's `get` method is expected to return `undefined` if the key is not present in the graph.

In a strongly-typed language like TypeScript, the interface looks like:

```ts
interface Explorable {
  get(key: any): Promise<any>;
  keys(): Promise<IterableIterator<any>>;
  set?(key: any, value: any): Promise<void>;
}
```

## Representing a simple graph

Suppose we want to represent the small graph used in the [introduction](/cli/) to the ori command-line tool:

<figure>
{{ svg client/samples/cli.yaml/greetings.yaml }}
</figure>

The small circle on the left is a graph node with three keys ("Alice", "Bob", "Carol") that correspond to three values ("Hello, Alice", etc.). This can be represented in the `Explorable` interface as:

```js
const graph = {
  // Get the value of a given key.
  async get(key) {
    return `Hello, ${key}.`;
  },

  // Return this graph node's keys.
  async keys() {
    return ["Alice", "Bob", "Carol"];
  },
};
```

## Traversing an explorable graph

If we wish to display the keys and values in the above graph, we can write:

```js
// Display a graph.
// Loop over the graph's keys.
for (const key of await graph.keys()) {
  // For a given key, get the value associated with it.
  const value = await graph.get(key);
  // Display the key and value.
  console.log(`${key}: ${value}`);
}
```

This produces the output:

```console
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

## Wrappers

Instead of directly defining a class or object that implements the `Explorable` interface, you can make use of various wrappers that will turn something into an explorable version:

- [ExplorableArray](ExplorableArray.html) can wrap a JavaScript `Array` instance
- [FilesGraph](FilesGraph.html) can wrap a file system folder
- [FunctionGraph](ExplorableFunctions.html) can wrap a JavaScript function and an optional domain
- [ObjectGraph](ObjectGraph.html) can wrap a plain JavaScript object
- [ExplorableSite](ExplorableSite.html) can wrap a web site
