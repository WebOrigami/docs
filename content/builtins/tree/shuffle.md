---
title: shuffle(map)
supertitle: "Tree."
---

Returns a new map with the original's keys randomly shuffled.

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori Tree.shuffle greetings.yaml
Carol: Hello, Carol.
Alice: Hello, Alice.
Bob: Hello, Bob.
$ ori Tree.shuffle greetings.yaml
Carol: Hello, Carol.
Bob: Hello, Bob.
Alice: Hello, Alice.
```
