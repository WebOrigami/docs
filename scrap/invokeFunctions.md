---
title: invokeFunctions(tree)
---

Given a [map-based tree](/async-tree/mapBasedTree.html), this returns a new tree in which any sync or async functions are replaced with the result of invoking the function.

This can be used, for example, to define a site's resource tree in JavaScript. Some resources may be simple data values (e.g., strings) while others may define a function in order to defer work.

```js
// invoke.js

${ samples/help/invoke.js }
```
