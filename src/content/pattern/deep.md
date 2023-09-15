---
title: Deep graphs
functions: !ori js/codeFunctions.js(pattern-intro/deep/json.js)
---

Until now, the "graphs" we've been working with are flat lists. Now that we've cleanly isolated our graph wrappers into classes, let's extend the `ObjectGraph` and `FilesGraph` classes to support arbitrarily deep trees.

As mentioned earlier, you can think of an async graph as a tree of promises. If you have a deep `FilesGraph` (below), you are essentially holding a tree of a promises for all the files in the corresponding file system hierarchy.

## Deep object graphs

We rewrite the `get` implementation in `ObjectGraph.js`, adding a simplistic check to see whether the value we're passing back is a plain JavaScript object. If it is a plain object, we'll wrap it in its own `ObjectGraph` before returning it.

```{{'js'}}
/* src/deep/ObjectGraph.js */

{{ pattern-intro/deep/ObjectGraph.js }}
```

Note that instead of creating new instances with `new ObjectGraph`, we use `new this.constructor`. The former could work in this tutorial, but the latter is more future-proof because it supports subclassing. If you ever were to subclass `ObjectGraph`, you'd want that subclass to spawn new instances of the same subclass, not `ObjectGraph`.

This lets us create a deep tree:

```{{'js'}}
/* src/deep/object.js */

{{ pattern-intro/deep/object.js }}
```

which represents the deep graph

<figure>
  {{ @svg pattern-intro/deep/object }}
</figure>

## Deep file graphs

We do something very similar in `FilesGraph.js`. Here we check to see whether the requested key corresponds to a subdirectory and, if so, wrap that in its own `FilesGraph` before returning it.

```{{'js'}}
/* src/deep/FilesGraph.js */

{{ pattern-intro/deep/FilesGraph.js }}
```

This lets us support arbitrarily deep subfolders.

## Deep function graphs

By itself, the `FunctionGraph` class doesn't need to be updated to support deep function-backed graphs. Instead, the function that's being wrapped would need to be updated.

For this tutorial, we'll leave the sample function in `fn.js` alone, but if we wanted it to define a deep graph, for certain keys it could return values that are async graphs of any type.

## Converting a deep graph to a plain object

Finally, we need to update our `json` utility. That code has a function called `plain` that resolves an async graph to a plain JavaScript object. To handle deep graphs, we make the same `isAsyncDictionary` check that the transform above does to decide whether to recurse into a subgraph.

```{{'js'}}
/* Inside src/deep/json.js */

{{ functions/plain }}
```

<span class="tutorialStep"></span> From inside the `src/deep` directory, display a deep `ObjectGraph` or `FilesGraph` instance from inside the `src/deep` directory.

```console
$ cd ../deep
$ node json files.js
{{ @json pattern-intro/deep/files.js }}
```

## Deep transforms

Our transformation that converts markdown to HTML needs to be updated too. After its `get` implementation receives a value from the inner graph, it checks to see whether that value is itself a subgraph. If it is, the function applies itself to that subgraph before returning it.

```{{'js'}}
/* src/deep/transform.js */

{{ pattern-intro/deep/transform.js }}
```

<span class="tutorialStep"></span> Display the result of this transformation applied to the deep object or folder graph.

```console
$ node json htmlFiles.js
{{ @json pattern-intro/deep/transform.js @graph/from pattern-intro/deep/files.js }}
```

Visually this looks like:

<figure>
{{ @svg pattern-intro/deep/transform.js @graph/from pattern-intro/deep/files.js }}
</figure>

So now we have a way of transforming an arbitrarily deep folder of markdown content into a corresponding deep tree of HTML content. We're now ready to do some interesting things with this content.

&nbsp;

Next: [Serve a graph](serve.html) »
