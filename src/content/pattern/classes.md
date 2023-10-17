---
title: Tree classes
---

We now have async tree wrappers for a _specific_ object, folder, or function — but let's generalize that code to create classes to wrap _any_ object, folder, or function.

These classes package up our existing code, adding a constructor to accept the thing we want to wrap. Any code that we've written to work with async trees, like our `json` utility, will already accept instances of these classes, as the classes support the necessary AsyncDictionary interface methods.

These classes do _not_ inherit from some shared base class. Doing so is possible but would be awkward, as these classes have substantially different constructor parameters. By defining an async tree as an interface instead of a base class, we retain more flexibility than using a class hierarchy.

## Object tree class

This class accepts a plain JavaScript object and returns a corresponding async tree:

```{{'js'}}
/* src/classes/ObjectTree.js */

{{ source.ori/classes/ObjectTree.js }}
```

We can redefine our existing `object.js` to use this class:

```{{'js'}}
/* src/classes/object.js */

{{ source.ori/classes/object.js }}
```

We can verify that this object passes our tests, can be displayed with our `json` utility, and can be used as the basis for our markdown-to-HTML transformation.

## File tree class

The class for a files-based tree takes a directory path as input.

```{{'js'}}
/* src/classes/FileTree.js */

{{ source.ori/classes/FileTree.js }}
```

## Function tree class

The constructor for a function-based tree takes a function and an array as a function domain.

```{{'js'}}
/* src/classes/FunctionTree.js */

{{ source.ori/classes/FunctionTree.js }}
```

With these classes, we can quickly create new trees based on any object, folder, or function.

## Test the classes

<span class="tutorialStep"></span> Run all the tests to confirm that the class-based trees all behave as expected.

```console
$ cd ../classes
$ node --test
…
# tests 4
# pass 4
# fail 0
```

All tests pass, so now we have three different general ways to implement a tree that all work the same way. The markdown-to-HTML transformation doesn't need any modification to work with these new class-based trees, as it can already work with anything implementing the AsyncDictionary interface.

&nbsp;

Next: [Deep trees](deep.html) »
