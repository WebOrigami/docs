---
title: "log(result, [message])"
supertitle: "dev:"
---

This diagnostic function logs a message to the console as a side effect and then returns the indicated result.

```console
$ ori "log(1, 'Hello')"
Hello
1
```

Here the first line ("Hello") is the logged message. The second line ("1") is
the result of the function displayed by ori.

You can pass an object as the message to log the object in YAML form:

```console
$ ori log 2, { a: 1 }
a: 1
2
```

You can also call `log` with a single argument which will be both logged and returned.

One use for `log` is watching progress in a [`map`](./map.html):

```ori
// test.ori
map(
  ["Alice", "Bob", "Carol"]
  (name, index) => log(`Hello, \${name}!, `Processing \${index}`)
)
```

This logs the progress of the map operation before the final result is returned:

```console
$ ori test.ori/
Processing 0
Processing 1
Processing 2
- Hello, Alice!
- Hello, Bob!
- Hello, Carol!
```

See also [`breakpoint`](./breakpoint.html).
