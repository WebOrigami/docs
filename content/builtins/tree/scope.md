---
title: "scope(map)"
supertitle: "Tree."
---

Given a map node in a [map-based tree](/async-tree/mapBasedTree.html), this returns a new map representing the [tree scope](/language/scope.html) for that node. This effectively merges that map node with all of its ancestors into a single map.

For example, take this file system hierarchy:

```
package.json
ReadMe.md
src/
  assets/
    image1.jpg
  greet.js
  site.ori
```

Given a reference to the `src` folder, calling `Tree.scope(src)` creates a map that has these keys _in order_:

```yaml
- assets/
- greet.js
- site.ori
- package.json
- ReadMe.md
- src/
```

This scope includes the keys in `src` and the keys of its ancestors (here, just the parent folder). The `image1.jpg` file is not in the scope, because it is not directly contained by `src` or any of its ancestors.
