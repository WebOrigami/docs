---
title: Higher-level tree operations
---

One extremely useful aspect of tree-based development is that we can define higher-level operations on trees that solve general problems.

In the previous step, we combined several trees backed by different data representations into a single tree with several branches.

In some cases, it's useful to _merge_ two or more trees together to create a single tree. Let's solve that general problem by creating a higher-level tree that merges multiple trees together.

## MergeTree class

We'll start creating a `MergeTree` class whose constructor accepts multiple trees.

```js
/* src/merge/MergeTree.js */

export default class MergeTree {
  constructor(...trees) {
    this.trees = trees;
  }

  async keys() {
    /* TODO */
  }

  async get(key) {
    /* TODO */
  }
}
```

The `keys` will return all the keys in all of the supplied trees. We can use a `Set` to de-duplicate the keys.

```js
  async keys() {
    const keys = new Set();
    for (const tree of this.trees) {
      for await (const key of tree) {
        keys.add(key);
      }
    }
    return keys;
  }
```

The `get` method looks in each of the trees in turn, returning the first defined value from any of the trees.

```js
  async get(key) {
    const subtrees = [];
    for (const tree of this.trees) {
      const value = await tree.get(key);

      const isAsyncDictionary =
        typeof value?.get === "function" &&
        typeof value?.keys === "function";

      if (value !== undefined) {
        if (isAsyncDictionary) {
          subtrees.push(value);
        } else {
          return value;
        }
      }
    }

    return subtrees.length === 0
      ? undefined
      : subtrees.length === 1
      ? subtrees[0]
      : new this.constructor(...subtrees);
  }
```

We also take care to handle the case where multiple trees define async subtrees for the same key. In that case, we collect the subtrees and wrap them in a new `MergeTree` instance. This implements a deep merge operation.

## Use MergeTree to define the site

We can update our site tree to use this new higher-level `MergeTree` operation.

```${'js'}
/* src/merge/siteTree.js */

${ <pattern.jse/merge/siteTree.js> }
```

We apply our `indexPages` transform to give the merged tree index pages.

The site is now the deep merge of all three trees:

<figure>
${ <svg.js>(<pattern.jse/merge/siteTree.js>) }
</figure>

If you compare this to the previous step, where we treated each of the component trees as separate branches, you can see that the merged tree is flatter.

<span class="tutorialStep"></span> From inside the `src/merge` directory, run the updated server.

```console
$ cd ../merge
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Browse the merged site.

Some of the pages are defined by an object, some by files, and some by a function. In fact, that function will handle any requests for `.html` pages that aren't otherwise defined — if you browse to a page not defined by the object- or files-based trees, the function tree will provide a default value. For example, browsing to `Sara.html` returns a default page for Sara.

<span class="tutorialStep"></span> You can also build the site.

```console
$ node build
$ ls dist
Alice.html    Carol.html    Grace.html    Kelly.html    Michelle.html more
Bob.html      Frank.html    Henry.html    Larry.html    index.html
```

## Other higher-level operations

You can define a range of useful higher-level tree operations to handle situations commonly encountered in website development and other contexts, such as:

- A cache operation that accepts two trees: a source tree that produces values, and a read-write tree to cache values which have already been produced. The latter is consulted first. If no value for a given key has been produced yet, the source tree is consulted, and the resulting value cached for later use.
- A filter operation that accepts two trees: a source tree that produces values, and a tree that defines a filter which should be used to decide whether or not to return a value from the source tree.
- A sort operation that wraps a source tree, with an `keys` method that returns the source tree's keys in a particular sort order.
- A shuffle operation that wraps a source tree, with an `keys` method that returns the source tree's keys in a random order.

Such higher-level operations are common enough that they would be of value in many projects. Rather than having many people implement such operations, it'd be nice to share solid implementations of them in a common library.

&nbsp;

Next: [Sharing a common library and tools](sharing.html)
