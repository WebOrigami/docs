---
title: Graph variants
---

Many features in the core library and many of the [Origami expression language](/language) built-in functions accept async graphs in a variety of types. These types are called _graph variants_.

The graph variant types are, in order of priority:

1. Any object that exposes a `toGraph()` method which, when invoked, produces any of these listed graph variants
1. A JavaScript object that directly implements the members of the [AsyncDictionary](AsyncDictionary.html) interface.
1. A plain JavaScript object created with [object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals) syntax, `new Object()`, or `Object.create(null)`.
1. A JavaScript `Array` instance
1. A JavaScript `Set` instance
1. A JavaScript function
1. A `string` object that can be parsed as JSON or YAML, including text with JSON or YAML front matter.
1. A `Buffer` object containing text that can be parsed as JSON or YAML, including text with JSON or YAML front matter.
1. A JavaScript `object` instance

The easiest way for you to write a function that can accept any graph variant as a parameter is to pass that parameter to [Graph.from()](Graph.html#from). The `from()` function considers the types above in priority order and, if the type applies, wraps the object with a library class such as [ObjectGraph](ObjectGraph.html) and returns the resulting graph.

```js
async function manipulateGraph(variant) {
  const graph = Graph.from(variant);
  if (graph) {
    /* `graph` is an async graph */
  }
}
```
