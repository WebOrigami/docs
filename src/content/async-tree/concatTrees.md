---
title: concatTrees
subtitle: Tagged template function to concatenate the deep values of trees
---

This JavaScript function exposes the basic behavior of Origami [templates](/language/templates.html), especially their ability to concatenate the deep values of an asynchronous tree.

By default, JavaScript templates don't perform useful work on inputs that are objects, rendering objects unhelpfully as `"[object Object]"`.

The `concatTrees` tagged template function can be called to concatenate the values of a treelike object such as, here, plain JavaScript object:

```js
${ samples.ori/js/concatNames.js }
```

Since `concatTrees` is a tagged template function, it is followed immediately by a backtick instead of an opening parenthesis. Also note the use of `await`: `concatTrees` is an asynchronous function.

The above module exports this string:

```
${ samples.ori/js/concatNames.js/ }

```
