---
title: "@match(pattern, fn, [keys])"
---

Returns a tree that can match against simple patterns or JavaScript regular expressions. This is useful in creating virtual trees.

For example, if you are creating a `/user` area within a site that will handle routes like `/user/[name].html`, you can use `match()` to match that pattern and return a result.

```console
$ ori "(@match('[name].txt', =\`Hello, \$\{ name }.\`))/Alice.txt"
Hello, Alice.
```

The expression in parentheses defines a tree that matches patterns of the form `[name].txt`. This tree is then used to obtain a value for the key `Alice.txt`. Since that matches, the `match()` generates a result — here, using a template.

The `pattern` argument can take one of two forms:

1. A simple pattern like `[name].txt`. When used to match `Alice.txt`, this puts "Alice" in scope as the value of `name`.
2. A standard JavaScript [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) instance. One way to create a regular expression is with `@js/RegExp`; see the [@js](@js.html) built-in. If the regular expression matches, the value of any groups named in the regular expression will be put in scope.

By default, the tree will have no public keys, but you can provide any [treelike object](/async-tree/treelike.html) as the `keys` argument. That tree's keys will be used as the keys for the tree returned by `match()`.

```console
$ ori "@match '[name].txt', =\`Hello, \$\{ name }.\`, ['Alice.txt', 'Bob.txt', 'Carol.txt']"
Alice.txt: Hello, Alice.
Bob.txt: Hello, Bob.
Carol.txt: Hello, Carol.
```
