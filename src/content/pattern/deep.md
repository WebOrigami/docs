---
title: Deep graphs
deep = node_modules/@explorablegraph/pattern-intro/src/deep:
functions = js/codeFunctions(deep/json.js):
---

Until now, the "graphs" we've been working with are flat lists. Now that we've cleanly isolated our graph wrappers into classes, let's extend the `ObjectGraph` and `FilesGraph` classes to support arbitrarily deep trees.

TODO: Need diagram

## Deep object graphs

We rewrite the `get` implementation in `ObjectGraph.js`, adding a simplistic check to see whether the value we're passing back is a plain JavaScript object. If so, the value is a sub-object that we'll wrap in its own `ObjectGraph` before returning it.

```{{'js'}}
// deep/ObjectGraph.js

{{ deep/ObjectGraph.js }}
```

## Deep file graphs

We do something very similar in `FilesGraph.js`. Here we check to see whether the requested key corresponds to a subdirectory and, if so, wrap that in its own `FilesGraph` before returning it.

```{{'js'}}
// deep/FilesGraph.js

{{ deep/FilesGraph.js }}
```

## Deep transforms

Our transformation that converts markdown to HTML needs to be updated too. After its `get` implementation receives a value from the inner graph, it checks to see whether that value is itself explorable. If it is, the function applies itself to that explorable value before returning it.

```{{'js'}}
// deep/transform.js

{{ deep/transform.js }}
```

## Converting a deep graph to a plain object

Finally, we need to update our `json` utility. That code has a function called `plain` that resolves an explorable graph to a plain JavaScript object. To handle deep graphs, we make the same `isExplorable` check that the transform above does to decide whether to recurse into an explorable value.

```{{'js'}}
// In deep/json.js

{{ functions/plain }}
```
