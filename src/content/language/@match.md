---
title: "@match(pattern, fn, [keys])"
---

Returns a graph that can match against simple patterns or JavaScript regular expressions. This is useful in creating virtual graphs.

For example, if you are creating a `/user` area within a site that will handle routes like `/user/[name].html`, you can use `match()` to match that pattern and return a result.

```console
$ ori "(@match('[name].txt', =\`Hello, \{\{ name }}.\`))/Alice.txt"
Hello, Alice.
```

The expression in parentheses defines a graph that matches patterns of the form `[name].txt`. This graph is then used to obtain a value for the key `Alice.txt`. Since that matches, the `match()` generates a result — here, using a template.

The `pattern` argument can take one of two forms:

1. A simple pattern like `[name].txt`. When used to match `Alice.txt`, this puts "Alice" in scope as the value of `name`.
2. A JavaScript regular expression. One way to create a regular expression is with a JavaScript regular expression literal or the [RegExp](#RegExp) constructor. You can do this via `@js/RegExp()`, see the [@js](@js.html) built-in. If the regular expression matches, the value of any groups named in the regular expression will be put in scope.

By default, the graph will have no public keys, but you can provide any [graph variant](/core/variants.html) as the `keys` argument. That graph's keys will be used as the keys for the graph returned by `match()`.

```console
$ ori "@match '[name].txt', =\`Hello, \{\{ name }}.\`, ['Alice.txt', 'Bob.txt', 'Carol.txt']"
Alice.txt: Hello, Alice.
Bob.txt: Hello, Bob.
Carol.txt: Hello, Carol.
```
