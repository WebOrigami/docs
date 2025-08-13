---
title: The AsyncTree interface
---

The `AsyncTree` interface is a simple and flexible way to represent a wide variety of data types as trees. It defines an asynchronous dictionary, essentially a minimalist `async` JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), that can be nested to create trees.

## Async trees

An async tree is a collection of nodes which are key/value dictionaries, also known as an associative array.

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

  // Optional: a reference to the parent of this tree node
  parent
}
```

Some notes on the JavaScript shown above:

- The `keys` method must return an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol). An iterator is an object that can produce a sequence of values. A tree's `keys` method can return an instance of a JavaScript class like `Array` and `Set` that support the iterator protocol, or `keys` can return an iterator defined by other means.

- Both functions in the `AsyncTree` interface are marked with the [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) keyword, indicating that they are asynchronous functions. In practice, the functions may return immediately, but they have the potential, at least, to do work that will require a bit of time: retrieving data from the file system, accessing data from a network, or performing long calculations.

- The `keys` method does _not_ have to return all the keys supported by `get`! There may be keys that `get` can handle that the `keys` will not include. This turns out to be useful in a number of situations.

- An async tree's `get` method is expected to return `undefined` if the key is not present in the tree.

- An async tree doesn't have to define a `parent` property, but if it does it must be an `AsyncTree` instance or `null`.

In TypeScript, the interface looks roughly like:

```ts
export default interface AsyncTree {
  get(key: any): Promise<any>;
  keys(): Promise<Iterable<any>>;
  parent?: AsyncTree | null;
}
```

## Mutable async trees

Mutable async trees like [FileTree](FileTree.html) and [ObjectTree](ObjectTree.html) support an extended interface with additional `set` method:

```ts
export default interface AsyncMutableTree extends AsyncTree {
  set(key: any, value: any): Promise<this>;
}
```

## Representing a simple tree

Suppose we want to represent the small tree used in the [introduction](/cli/) to the ori command-line tool:

<figure>
${ svg.js(samples.ori/cli/greetings.yaml) }
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

## Trailing slash convention

Async trees can be _deep_, meaning that values in the tree may themselves be subtrees.

Deep async trees with string keys have the option of following the trailing slash convention: if a key represents a subtree, the key can end in a trailing slash, like `subfolder/` in the following tree.

<figure>
${ svg.js({
a: 1
subfolder/: { b: 2 }
}) }
</figure>

The specifics of the convention are:

- If a trailing slash _is_ present, then the value is definitely a traversable subtree.
- If a trailing slash is not present, the value may or may not be a subtree. That is, a tree isn't obligated to append slashes to any or all of its keys for traversable subtrees.

Trailing slashes have several purposes:

First, they are useful to someone looking at a list of keys. Origami's [`keys`](/builtins/tree/keys.html) command, for example, will display the keys in a folder:

```console
$ ori keys myProject
- README.md
- src/
- test/
```

The trailing slashes let you know that `src/` and `test/` represent subfolders.

Second, a trailing slash is used as a signal by certain trees to save work. This is important for trees like [SiteTree](SiteTree.html), which must make potentially slow network requests to `get()` values. The trailing slash is an important indication that they can traverse into a subtree value _without_ making a network request.

If the tree depicted above is a `SiteTree`, a call to `get("subfolder")` will make a network request, but a call to `get("subfolder/")` will not. The latter call will just return a new `SiteTree` instance for the indicated location. Only when a `SiteTree` is asked to `get` a key that doesn't end in a slash — or to return its `keys` — will the tree be forced to make a network request.

Other trees like [ObjectTree](ObjectTree.html) can return a value quickly so they ignore trailing slashes. If the above tree represents an `ObjectTree`, then `get("a")` and `get("a/")` return the same value (even though "a" is not a subtree). Likewise, `get("subfolder")` and `get("subfolder/")` would behave the same.

Third, tools can look at a trailing slash to infer intent. The Origami [language](/language) interprets the presence of a trailing slash to indicate that you're expecting to get back a traversable subtree. If the value you're working with is a file, Origami implicitly [unpacks the file](/language/fileTypes.html#unpacking-files) into data. For example, the expression `data.json` returns the raw file contents of the indicated file, but `data.json/` (with a trailing slash) parses the JSON in the file and returns the data object.

Origami also includes a set of [`slash`](/builtins/origami/slash.html) functions for working with trailing slashes.

## Wrappers

Instead of directly defining a class or object that implements the `AsyncTree` interface, you can make use of various wrappers that will turn something into an async tree version:

- [FileTree](FileTree.html) can wrap a file system folder
- [FunctionTree](FunctionTree.html) can wrap a JavaScript function and an optional domain
- [MapTree](MapTree.html) can wrap a JavaScript `Map`
- [ObjectTree](ObjectTree.html) can wrap a plain JavaScript object or array
- [SetTree](SetTree.html) can wrap a JavaScript `Set`
- [SiteTree](SiteTree.html) can wrap a web site

## Converting to and from async trees

The functions exposed by the `async-tree` library that accept a tree accept any [treelike object](treelike.html), and will generally convert them to an `AsyncTree` instance before working with them. The same goes for the [Origami built-in functions](/builtins).

If you want to explicitly cast a treelike object to an `AsyncTree`, you can call [`Tree.from()`](Tree.html#from).

To convert an `AsyncTree` to a plain JavaScript object, call [`Tree.plain()`](Tree.html#plain).
