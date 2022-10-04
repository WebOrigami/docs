---
title: Higher-level graph operations
merge = node_modules/pattern-intro/src/merge:
---

One extremely useful aspect of graph-based development is that we can define higher-level operations on graphs that solve general problems.

In the previous step, we combined several graphs backed by different data representations into a single graph, producing a single tree with several branches.

In some cases, it's useful to _merge_ two or more graphs together to create a single graph. Let's solve that general problem by creating a higher-level graph that merges multiple graphs together.

## MergeGraph class

We'll start creating a `MergeGraph` class by defining a constructor that accepts multiple graphs.

```js
export default class MergeGraph {
  constructor(...graphs) {
    this.graphs = graphs;
  }

  async *[Symbol.asyncIterator]() { … }

  async get(key) { … }
}
```

The `asyncIterator` will yield all the keys in all of the supplied graphs. We can use a `Set` to de-duplicate the keys.

```js
  async *[Symbol.asyncIterator]() {
    const keys = new Set();
    for (const graph of this.graphs) {
      for await (const key of graph) {
        if (!keys.has(key)) {
          keys.add(key);
          yield key;
        }
      }
    }
  }
```

The `get` method look in each of the graphs in turn, returning the first value it finds that's not `undefined`.

```js
  async get(key) {
    const explorableValues = [];
    for (const graph of this.graphs) {
      const value = await graph.get(key);

      const isExplorable =
        typeof value?.[Symbol.asyncIterator] === "function" &&
        typeof value?.get === "function";

      if (value !== undefined) {
        if (isExplorable) {
          explorableValues.push(value);
        } else {
          return value;
        }
      }
    }

    if (explorableValues.length > 0) {
      return new this.constructor(...explorableValues);
    }
  }
```

We also take care to handle the case where multiple graphs define explorable values for the same key. In that case, we collect the explorable values and wrap them in a new `MergeGraph` instance. This implements a deep merge operation.

## Use MergeGraph to define the site

We can update our site to use this new higher-level `MergeGraph` operation.

```{{'js'}}
/* src/merge/site.js */

{{ merge/site.js }}
```

We apply our `indexPages` transform to give the merged graph index pages.

The site is now the deep merge of all three graphs:

<figure>
{{ svg merge/site }}
</figure>

If you compare this to the previous step, where we treated each of the component graphs as separate branches, you can see that the merged graph is flatter.

<span class="tutorialStep"></span> From inside the `src/merge` directory, run the updated server.

```console
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> You can also build the site.

```console
$ node build
$ ls dist
Alice.html    Carol.html    Grace.html    Kelly.html    Michelle.html more
Bob.html      Frank.html    Henry.html    Larry.html    index.html
```

## Other higher-level operations

You can define a range of useful higher-level graph operations to handle situations commonly encountered in website development and other contexts, such as:

- A cache operation that accepts two graphs: a source graph that produces values, and a read-write graph to store values which have already been produced. The latter is consulted first. If no value for a given key has been produced yet, the source graph is consulted, and the resulting value stored for later use.
- A filter operation that accepts two graphs: a source graph that produces values, and a graph that defines a filter which should be used to decide whether or not to return a value from the source graph.
- A sort operation that wraps a source graph, with an `asyncIterator` that yields the source graph's keys in a particular sort order.
- A shuffle operation that wraps a source graph, with an `asyncIterator` that yields the source graph's keys in a random order.

Such higher-level operations are common enough that they would be of value in many projects. Rather than having many people implement such operations, it'd be nice to share solid implementations of them in a common library.

&nbsp;

Next: [Sharing a common library and tools](sharing.html)
