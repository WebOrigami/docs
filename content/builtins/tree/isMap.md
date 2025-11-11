---
title: isMap(obj)
supertitle: "Tree."
---

Returns true if the indicated object is:

- A standard JavaScript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object
- An [`AsyncMap`](/async-tree/AsyncMap.html) object (an asynchronous variant of `Map`)
- An object with the same interface as `Map` or `AsyncMap`: i.e., has the same methods and properties

```console
$ ori "Tree.isMap(new Map())"
${ Tree.isMap(new Map()) }

$ ori Tree.isMap {}
${ Tree.isMap({}) }

$ ori Tree.isMap []
${ Tree.isMap([]) }

```

See also [`isMaplike`](isMaplike.html), a looser test that returns `true` if its input is a map or can be wrapped to be treated as one.
