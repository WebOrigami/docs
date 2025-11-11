---
title: toFunction(obj)
---

This coerces the given object to a function.

- If the object is already a function, it is returned as is.
- If the object is a file that can be [unpacked](/language/fileTypes.html#unpacking-files) to a function, such as a `.js`, `.ori`, or `.wasm` file, this unpacks the file and returns the default export (which is assumed to be a function).
- If the object is a [map-like](/async-tree/map-like.html) object, the object is coerced to a tree, and the tree's `get()` method will be returned.
- Otherwise, a constant function is returned that always produces the indicated object.
