---
title: The AsyncTree interface
---

The `AsyncTree` interface is a simple and flexible way to represent a wide variety of data types as trees.

## Async trees

An async tree is a collection of nodes which are key/value dictionaries.

- You can ask an async tree node for its _keys_.
- With a key, you can ask a node to give you the corresponding _value_ associated with that key.
- The value may be another node in the tree, or the value may be any other type of JavaScript data.
- The set of keys you get back may not be complete. That is, the node may have keys that it can handle that it chooses _not_ to return in the set of keys it will give you.
- The node may (or may not) allow you set the value associated with a given key.
- All these node operations — obtaining its keys, getting the value for a given key, and optionally setting the value for a given key — may be asynchronous.

Such a construct is sufficiently flexible to encompass many types of data.

## AsyncTree interface definition

JavaScript does not have a first-class representation of interfaces, but a tree node supporting the `AsyncTree` interface looks like this:

```js
const tree = {
  // Get the value of a given key.
  async get(key) { ... }

  // Iterate over this tree node's keys.
  async keys() { ... }

  // Optional: set the value of a given key.
  async set(key, value) { ... }
}
```

Some notes on the JavaScript shown above:

- The `keys` method must return an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol). An iterator is an object that can produce a sequence of values. A tree's `keys` method can return an instance of a JavaScript class like `Array` and `Set` that support the iterator protocol, or `keys` can return an iterator defined by other means.

- Both functions in the `AsyncTree` interface are marked with the [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) keyword, indicating that they are asynchronous functions. In practice, the functions may return immediately, but they have the potential, at least, to do work that will require a bit of time: retrieving data from the file system, accessing data from a network, or performing long calculations.

- The `keys` method does _not_ have to return all the keys supported by `get`! There may be keys that `get` can handle that the `keys` will not include. This turns out to be useful in a number of situations.

- An async tree's `get` method is expected to return `undefined` if the key is not present in the tree.

In TypeScript, the interface looks roughly like:

```ts
interface AsyncTree {
  get(key: any): Promise<any>;
  keys(): Promise<IterableIterator<any>>;
  set?(key: any, value: any): Promise<this>;
}
```

## Representing a simple tree

Suppose we want to represent the small tree used in the [introduction](/cli/) to the ori command-line tool:

<figure>
${ svg.js samples.ori/cli/greetings.yaml }
</figure>

The small circle on the left is a tree node with three keys ("Alice", "Bob", "Carol") that correspond to three values ("Hello, Alice", etc.). This can be represented in the `AsyncTree` interface as:

```js
const tree = {
  // Get the value of a given key.
  async get(key) {
    return `Hello, \${key}.`;
  },

  // Return this tree node's keys.
  async keys() {
    return ["Alice", "Bob", "Carol"];
  },
};
```

## Traversing an async tree

If we wish to display the keys and values in the above tree, we can write:

```js
// Display a tree.
// Loop over the tree's keys.
for (const key of await tree.keys()) {
  // For a given key, get the value associated with it.
  const value = await tree.get(key);
  // Display the key and value.
  console.log(`\${key}: \${value}`);
}
```

This produces the output:

```console
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

## Wrappers

Instead of directly defining a class or object that implements the `AsyncTree` interface, you can make use of various wrappers that will turn something into an async tree version:

- [FileTree](FileTree.html) can wrap a file system folder
- [FunctionTree](FunctionTree.html) can wrap a JavaScript function and an optional domain
- [ObjectTree](ObjectTree.html) can wrap a plain JavaScript object or array
- [SiteTree](SiteTree.html) can wrap a web site
