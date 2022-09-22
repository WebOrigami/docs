---
title: Copy a graph
set = node_modules/@explorablegraph/pattern-intro/src/set:
---

A key benefit of building a site as a graph is that we can seamlessly move between browsing that graph and rendering that graph as static content.

## Build process

When working with graphs, the "build" process can be conceptually simple:

<figure>
  Real markdown files → Virtual HTML files → Real HTML files
</figure>

1. We define a graph of real content — as an object, as files, etc. — backed by persistent storage. In the context of our sample problem, the real content could be markdown documents stored as files.
1. We use one or more transforms to create a virtual graph of the final content (HTML, say) that we want. We can directly browse this virtual graph during development.
1. We want to copy the virtual graph (of HTML pages) into some persistent form such as `.html` files. We can then deploy these files.

For the last step, we could write the files out directly using a file system API. But we've gained a lot by abstracting away the file system read operations; we can make similar gains by abstracting away write operations too.

## Setting graph values

Let's extend our Explorable interface with an optional method `set(key, value)`. This updates the graph so that getting the corresponding `key` will now return the new `value`. We can supporting deleting a key/value from the graph by declaring that, if `value` is undefined, the key and its corresponding value will be removed from the graph.

This is straightforward for our object-based graph:

```js
// In set/ObjectGraph.js
  async set(key, value) {
    if (value === undefined) {
      delete this.obj[key];
    } else {
      this.obj[key] = value;
    }
  }
```

And a fair bit of work for our file system-based graph:

```js
// In set/FilesGraph.js

  async set(key, value) {
    // Where are we going to write this value?
    const destPath = path.resolve(this.dirname, key ?? "");

    if (value === undefined) {
      // Delete the file or directory.
      let stats;
      try {
        stats = await stat(destPath);
      } catch (/** @type {any} */ error) {
        if (error.code === "ENOENT" /* File not found */) {
          return;
        }
        throw error;
      }
      if (stats.isDirectory()) {
        // Delete directory.
        await fs.rm(destPath, { recursive: true });
      } else if (stats) {
        // Delete file.
        await fs.unlink(destPath);
      }
    }

    const isExplorable =
      typeof value?.[Symbol.asyncIterator] === "function" &&
      typeof value?.get === "function";

    if (isExplorable) {
      // Write out the contents of the value graph to the destination.
      const destGraph = key === undefined ? this : new FilesGraph(destPath);
      for await (const subKey of value) {
        const subValue = await value.get(subKey);
        await destGraph.set(subKey, subValue);
      }
    } else {
      // Ensure this directory exists.
      await fs.mkdir(this.dirname, { recursive: true });
      // Write out the value as the contents of a file.
      await fs.writeFile(destPath, value);
    }
  }
```

Half the work here involves handling the case where we want to delete a file or subfolder by passing in an `undefined` value.

The other complex case we handle is when the value itself is explorable, and we have to recursively write out that value as a set of files or folders. We didn't have to handle that case specially for `ObjectGraph`, as it's perfectly fine for an `ObjectGraph` instance to have a value which is an explorable graph; the file system is not so flexible. The good news is that all this complexity can live inside of the `FilesGraph` class — from the outside, we can just call `set` and trust that the file system will be updated as expected.

That point gets to another way to think about explorable graphs: you can think about explorable graphs as software adapters or drivers for any kind of hierarchical storage.

A graph doesn't have to support the `set` method. In our code, the virtual graph returned by `transform` can remain read-only. Hypothetically, it _could_ support writing, but that would entail converting arbitrarily HTML to markdown. Such a transformation would be lossy, and in any event is beyond the scope of our development problem. We can solve our problem with the `transform` graph being read-only.

## setDeep

We can now introduce a new helper function, `setDeep(target, source)`, which handles the general case of writing values from the `source` graph into the `target` graph.

```{{'js'}}
// set/setDeep.js

{{ set/setDeep.js }}
```

## Build real files from virtual content

We're now ready to build the static for our site by copying the virtual graph of HTML pages into a real file system folder. All we need to do is wrap a folder called `dist` in a `FilesGraph`:

```{{'js'}}
// set/distFolder.js

{{ set/distFolder.js }}
```

And then copy the virtual graph defined in `htmlFolder.js` into that real `dist` folder:

```{{'js'}}
// set/build.js

{{ set/build.js }}
```

```console
$ ls dist
ls: dist: No such file or directory
$ node build
$ ls dist
Alice.html Bob.html   Carol.html index.html more
```

We could inspect the individual files in the `dist` folder to confirm their contents — but we can also use our `json` utility to dump the entire `dist` folder to the console.

```console
$ node json distFolder.js
{{ json set/htmlObject }}
```

We can see that we've generated HTML pages for all the markdown content, and also see that each level of this tree has an `index.html` page.

## Browse the built HTML files

You could now deploy the HTML files in the `dist` folder anywhere, such as a CDN (Content Delivery Network).

As a quick test, you can serve the `dist` folder in any static server, such as [http-server](https://github.com/http-party/http-server).

```console
$ npx http-server dist
Starting up http-server, serving dist
```

You can browse to the static server and confirm that the static results are the same as what you can see running the dynamically-generated graph.

We've now solved our original problem: we've created a system in which our team can write content for our web site using markdown, and end up with HTML pages we can deploy.
