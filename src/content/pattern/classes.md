---
title: Graph classes
classes = node_modules/@explorablegraph/pattern-intro/src/classes:
---

We now have explorable wrappers for a specific object, a specific folder, and a specific function. Before moving on, let's generalize that code to create classes to wrap any object, folder, or function.

These classes are basically the code we had before, and simply use a constructor that accepts the thing we want to wrap.

Any code that we've written to work with explorable graphs, like our `json` utility, will already accept instances of these classes.

## Object graph class

```{{'js'}}
// classes/ObjectGraph.js

{{ classes/ObjectGraph.js }}
```

## Folder graph class

```{{'js'}}
// classes/FilesGraph.js

{{ classes/FilesGraph.js }}
```

## Function graph class

```{{'js'}}
// classes/FunctionGraph.js

{{ classes/FunctionGraph.js }}
```
