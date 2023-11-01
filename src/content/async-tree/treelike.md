---
title: Treelike objects
---

Many features in the async-tree library and the [Origami expression language](/language) built-in functions accept async trees in a variety of _treelike_ objects.

The treelike types are, in order of priority:

1. A JavaScript object that directly implements the members of the [AsyncTree](AsyncTree.html) interface.
1. A JavaScript function
1. A JavaScript `Map` instance
1. A JavaScript `Set` instance
1. Any object that exposes an `unpack()` method which, when invoked, produces any of these listed treelike objects
1. A plain JavaScript object created with [object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals) syntax, `new Object()`, or `Object.create(null)`.
1. A JavaScript `Array` instance
1. Any other kind of JavaScript object

The easiest way for you to write a function that can accept any treelike object as a parameter is to pass that parameter to [Tree.from()](Tree.html#from). The `from()` function considers the types above in priority order and, if the type applies, wraps the object with a library class such as [ObjectTree](ObjectTree.html) and returns the resulting tree.

```js
async function manipulateTree(treelike) {
  const tree = Tree.from(treelike);
  if (tree) {
    /* `tree` is an async tree */
  }
}
```
