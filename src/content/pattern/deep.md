---
title: Deep trees
---

Until now, the "trees" we've been working with are flat lists. Now that we've cleanly isolated our tree wrappers into classes, let's extend the `ObjectTree` and `FileTree` classes to support arbitrarily deep trees.

As mentioned earlier, you can think of an async tree as a tree of promises. If you have a deep `FileTree` (below), you are essentially holding a tree of a promises for all the files in the corresponding file system hierarchy.

## Deep object trees

We rewrite the `get` implementation in `ObjectTree.js`, adding a simplistic check to see whether the value we're passing back is a plain JavaScript object. If it is a plain object, we'll wrap it in its own `ObjectTree` before returning it.

```${'js'}
/* src/deep/ObjectTree.js */

${ pattern.ori/deep/ObjectTree.js }
```

Note that instead of creating new instances with `new ObjectTree`, we use `new this.constructor`. The former could work in this tutorial, but the latter is more future-proof because it supports subclassing. If you ever were to subclass `ObjectTree`, you'd want that subclass to spawn new instances of the same subclass, not `ObjectTree`.

This lets us create a deep tree:

```${'js'}
/* src/deep/object.js */

${ pattern.ori/deep/object.js }
```

which represents the deep tree

<figure>
  ${ svg.js(pattern.ori/deep/object.js) }
</figure>

## Deep file trees

We do something very similar in `FileTree.js`. Here we check to see whether the requested key corresponds to a subdirectory and, if so, wrap that in its own `FileTree` before returning it.

```${'js'}
/* src/deep/FileTree.js */

${ pattern.ori/deep/FileTree.js }
```

This lets us support arbitrarily deep subfolders.

## Deep function trees

By itself, the `FunctionTree` class doesn't need to be updated to support deep function-backed trees. Instead, the function that's being wrapped would need to be updated.

For this tutorial, we'll leave the sample function in `fn.js` alone, but if we wanted it to define a deep tree, for certain keys it could return values that are async trees of any type.

## Converting a deep tree to a plain object

Finally, we need to update our `json` utility. That code has a function called `plain` that resolves an async tree to a plain JavaScript object. To handle deep trees, we make the same `isAsyncDictionary` check that the transform above does to decide whether to recurse into a subtree.

```${'js'}
/* Inside src/deep/json.js */

${ js/codeFunctions.js(pattern.ori/deep/json.js).plain }
```

<span class="tutorialStep"></span> From inside the `src/deep` directory, display a deep `ObjectTree` or `FileTree` instance from inside the `src/deep` directory.

```console
$ cd ../deep
$ node json files.js
${ Tree.json(pattern.ori/deep/files.js) + "\n" }
```

## Deep transforms

Our transformation that converts markdown to HTML needs to be updated too. After its `get` implementation receives a value from the inner tree, it checks to see whether that value is itself a subtree. If it is, the function applies itself to that subtree before returning it.

```${'js'}
/* src/deep/transform.js */

${ pattern.ori/deep/transform.js }
```

<span class="tutorialStep"></span> Display the result of this transformation applied to the deep object or folder tree.

```console
$ node json htmlFiles.js
${ Tree.json(pattern.ori/deep/transform.js(Tree.from(pattern.ori/deep/files.js))) + "\n" }
```

Visually this looks like:

<figure>
${ svg.js(pattern.ori/deep/transform.js(Tree.from(pattern.ori/deep/files.js))) }
</figure>

So now we have a way of transforming an arbitrarily deep folder of markdown content into a corresponding deep tree of HTML content. We're now ready to do some interesting things with this content.

&nbsp;

Next: [Serve a tree](serve.html) »
