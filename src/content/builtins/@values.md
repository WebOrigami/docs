---
title: "@values([treelike])"
---

Returns an array of the top-level values in the tree.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @values greetings.yaml
- Hello, Alice.
- Hello, Bob.
- Hello, Carol.
```

See also [@keys](@keys.html).
