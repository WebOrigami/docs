---
title: "@keys([treelike])"
---

Returns an array of the top-level keys in the indicated tree.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @keys greetings.yaml
- Alice
- Bob
- Carol
```

See also [@values](@values.html).
