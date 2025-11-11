---
title: async-tree
subtitle: Library for working with asynchronous trees
---

${ src/templates/blocks.ori(areaLinks) }

The `async-tree` JavaScript library lets you work with different kinds of hierarchical data as a consistent type of abstract tree. Each node of the tree is either a JavaScript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) or an asynchronous variation called [`AsyncMap`](AsyncMap.html).

This lets you create applications in plain JavaScript like those possible in the Origami [language](/language).

This library is an implementation of the [Map Tree pattern](/pattern/). It provides helper classes like [`ObjectMap`](ObjectMap.html) and [`FileMap`](FileMap.html) that can treat a range of data sources as maps. The library also includes helper functions for common tree operations.

For an example of a site created with the `async-tree` library, see the [sample async-tree blog site](https://github.com/WebOrigami/pondlife-async-tree).
