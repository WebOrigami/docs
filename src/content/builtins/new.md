---
title: "new: protocol"
subtitle: Create instances of JavaScript classes
---

The `new:` protocol lets you construct an instance of a JavaScript class. It expects a path to a class constructor and returns a function which will instantiate that class via the JavaScript `new` keyword.

For example, you can instantiate the JavaScript `Date` class with:

```console
$ ori "new:Date('2025-12-31')"
${ yaml new:Date('2025-12-31') }
```

You can also call `new:` like a function and pass a class as an argument. This allows you to, for example, fully specify the name of a class with a namespace. Since `Date` is in the [`js:`](/builtins/js.html) namespace, the command below has the same effect as the one above:

```console
$ ori "new(js:Date)('2025-12-31')"
${ yaml new:(js:Date)('2025-12-31') }
```
