---
title: Graph classes
classes = node_modules/pattern-intro/src/classes:
---

We now have explorable wrappers for a _specific_ object, folder, or function. Before moving on, let's generalize that code to create classes to wrap _any_ object, folder, or function.

These classes package up our existing code, adding a constructor to accept the thing we want to wrap. Any code that we've written to work with explorable graphs, like our `json` utility, will already accept instances of these classes, as they support the necessary Explorable interface methods.

These classes do _not_ inherit from some shared base class. Doing so is possible but would be awkward, as these classes have substantially different constructor parameters.

By defining an explorable graph as an interface instead of a base class, we retain more flexibility that using a class hierarchy.

## Object graph class

```{{'js'}}
/* src/classes/ObjectGraph.js */

{{ classes/ObjectGraph.js }}
```

## Files graph class

```{{'js'}}
/* src/classes/FilesGraph.js */

{{ classes/FilesGraph.js }}
```

## Function graph class

```{{'js'}}
/* src/classes/FunctionGraph.js */

{{ classes/FunctionGraph.js }}
```

&nbsp;

Next: [Deep graphs](deep.html) »
