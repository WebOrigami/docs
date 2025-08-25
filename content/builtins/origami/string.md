---
title: string(value)
supertitle: "Origami."
---

Returns the value, coerced to a string.

This typically calls the object's [`toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method, but with some special cases:

- If the `value` is an `ArrayBuffer` (e.g., returned from a web request) or `TypedArray`, then this call decodes the value as UTF-8 text.
- If the object's underlying `toString` method is the degenerate implementation of `Object.toString()` (which normally returns the text "[object Object]"), this method returns `null` instead. The principle is that it's better for this method to essentially fail than for it to return a useless string.
