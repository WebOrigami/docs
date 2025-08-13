---
title: match(pattern, fn, [keys])
supertitle: "Tree."
---

Returns a tree that can match against simple patterns or JavaScript regular expressions. This is useful in creating virtual trees.

For example, if you are creating a `/user` area within a site that will handle routes like `/user/[name].html`, you can use `match()` to match that pattern and return a result.

```console
$ ori match.ori
${ samples.ori/templates/match.ori }$ ori match.ori/user/Alice.html
${ samples.ori/templates/match.ori/user/Alice.html + "\n" }
```

The expression in parentheses defines a tree that matches patterns of the form `[name].html`. This tree is then used to obtain a value for the key `Alice.html`. Since that matches, the `match()` generates a result — here, using a template.

The `pattern` argument can take one of two forms:

1. A simple pattern like `[name].html`. When used to match `Alice.html`, the `fn` function will be given an object with the matches: `{ name: "Alice" }`.
2. A standard JavaScript [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

By default, the tree will have no public keys, but you can provide any [treelike object](/async-tree/treelike.html) as the `keys` argument. That tree's values will be used as the keys for the tree returned by `match()`.

```console
$ ori matchDomain.ori
${ samples.ori/templates/matchDomain.ori }
$ ori matchDomain.ori
${ Origami.yaml(samples.ori/templates/matchDomain.ori/) + "\n" }
```
