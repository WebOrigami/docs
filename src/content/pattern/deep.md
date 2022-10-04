---
title: Deep graphs
deep = node_modules/@graphorigami/pattern-intro/src/deep:
functions = js/codeFunctions(deep/json.js):
---

Until now, the "graphs" we've been working with are flat lists. Now that we've cleanly isolated our graph wrappers into classes, let's extend the `ObjectGraph` and `FilesGraph` classes to support arbitrarily deep trees.

TODO: Need diagram

With this step, you can think of an explorable graph as a _tree of promises_. If you have a deep `FilesGraph` (below), you are essentially holding a tree of a promises for all the files in the corresponding file system hierarchy.

## Deep object graphs

We rewrite the `get` implementation in `ObjectGraph.js`, adding a simplistic check to see whether the value we're passing back is a plain JavaScript object. If it is a plain object, but is not already explorable, we'll wrap in its own `ObjectGraph` before returning it.

```{{'js'}}
// deep/ObjectGraph.js

{{ deep/ObjectGraph.js }}
```

Note that instead of creating new instances with `new ObjectGraph`, we use `new this.constructor`. The former could work in this tutorial, but the latter is more future-proof because it supports subclassing. If you ever were to subclass `ObjectGraph`, you'd want that subclass to spawn new instances of that subclass, not `ObjectGraph`.

This lets us create a deep tree:

```{{'js'}}
// deep/object.js

{{ deep/object.js }}
```

which represents the graph

<figure>
  {{ svg deep/object }}
</figure>

## Deep file graphs

We do something very similar in `FilesGraph.js`. Here we check to see whether the requested key corresponds to a subdirectory and, if so, wrap that in its own `FilesGraph` before returning it.

```{{'js'}}
// deep/FilesGraph.js

{{ deep/FilesGraph.js }}
```

This lets us support arbitrarily deep subfolders.

## Converting a deep graph to a plain object

Finally, we need to update our `json` utility. That code has a function called `plain` that resolves an explorable graph to a plain JavaScript object. To handle deep graphs, we make the same `isExplorable` check that the transform above does to decide whether to recurse into an explorable value.

```{{'js'}}
// In deep/json.js

{{ functions/plain }}
```

Now we can display a deep `ObjectGraph` or `FilesGraph` instance in the console.

```console
$ node json folder.js
{{ json deep/folder }}
```

## Deep transforms

Our transformation that converts markdown to HTML needs to be updated too. After its `get` implementation receives a value from the inner graph, it checks to see whether that value is itself explorable. If it is, the function applies itself to that explorable value before returning it.

```{{'js'}}
// deep/transform.js

{{ deep/transform.js }}
```

We can display the result of this transformation applied to the deep object or folder graph.

```console
$ node json htmlFolder.js
{{ json deep/transform deep/folder }}
```

Visually this looks like:

<figure>
{{ svg deep/transform deep/folder }}
</figure>

So now we have a way of transforming an arbitrarily deep folder of markdown content into a corresponding deep tree of HTML content. We're now ready to do some interesting things with this content.

&nbsp;

Next: [Serve a graph](serve.html) »
