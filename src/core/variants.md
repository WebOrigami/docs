---
title: Graph variants
path: /core/variants.html
---

Many features in the core library and many of the `pika` [built-in functions](/pika/builtins.html) accept explorable graphs in a variety of types. These types are called _graph variants_.

The graph variant types are:

1. JavaScript objects that directly implement the members of the [Explorable](explorable.html) interface.
1. `string` objects that can be parsed as JSON or YAML.
1. `Buffer` objects containing text that can be parsed as JSON or YAML.
1. functions (`Function` instances)
1. `Array` instances
1. Plain JavaScript objects created with [object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals) syntax, `new Object()`, or `Object.create(null)`.
1. Any object that exposes a `toGraph()` method which, when invoked, produces any of these listed graph variants

The easiest way for you to write a function that can accept any graph variant as a parameter is to first pass that parameter to [ExplorableGraph.from()](ExplorableGraph.html#from). If the parameter is any of the graph variant types listed above, `from()` will return an corresponding object that directly implements the `Explorable` interface.

```js
function manipulateGraph(variant) {
  const graph = ExplorableGraph.from(variant);
  if (graph) {
    /* `graph` is an explorable graph */
  }
}
```
