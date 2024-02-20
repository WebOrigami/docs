---
title: "@shuffle(treelike)"
---

Returns a new tree with the original `tree` keys randomly shuffled.

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @shuffle greetings.yaml
Carol: Hello, Carol.
Alice: Hello, Alice.
Bob: Hello, Bob.
$ ori @shuffle greetings.yaml
Carol: Hello, Carol.
Bob: Hello, Bob.
Alice: Hello, Alice.
```
