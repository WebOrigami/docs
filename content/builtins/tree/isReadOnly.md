---
title: isReadOnly(obj)
supertitle: "Tree."
---

Returns true if the indicated object is a read-only `Map` or [`AsyncMap`](/async-tree/AsyncMap.html):

- If the object is a plain `Map`, this returns `false`.
- If the object defines a `readOnly` property, this returns the value of that property. The different map classes in the [`async-tree`](/async-tree) library define that property.
