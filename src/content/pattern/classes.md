---
title: Graph classes
classes = node_modules/pattern-intro/src/classes:
---

We now have explorable wrappers for a _specific_ object, folder, or function — but let's generalize that code to create classes to wrap _any_ object, folder, or function.

These classes package up our existing code, adding a constructor to accept the thing we want to wrap. Any code that we've written to work with explorable graphs, like our `json` utility, will already accept instances of these classes, as the classes support the necessary Explorable interface methods.

These classes do _not_ inherit from some shared base class. Doing so is possible but would be awkward, as these classes have substantially different constructor parameters. By defining an explorable graph as an interface instead of a base class, we retain more flexibility than using a class hierarchy.

## Object graph class

This class accepts a plain JavaScript object and returns a corresponding explorable graph:

```{{'js'}}
/* src/classes/ObjectGraph.js */

{{ classes/ObjectGraph.js }}
```

We can redefine our existing `object.js` to use this class:

```{{'js'}}
/* src/classes/object.js */

{{ classes/object.js }}
```

We can verify that this object passes our tests, can be displayed with our `json` utility, and can be used as the basis for our markdown-to-HTML transformation.

## Files graph class

The class for a files-based graph takes a directory path as input.

```{{'js'}}
/* src/classes/FilesGraph.js */

{{ classes/FilesGraph.js }}
```

## Function graph class

The constructor for a function-based graph takes a function and an array as a function domain.

```{{'js'}}
/* src/classes/FunctionGraph.js */

{{ classes/FunctionGraph.js }}
```

With these classes, we can quickly create new graphs based on any object, folder, or function.

&nbsp;

Next: [Deep graphs](deep.html) »
