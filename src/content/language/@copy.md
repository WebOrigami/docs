---
title: "@copy(sourceTree, targetTree)"
---

Traverses the `sourceTree` and writes all values into the `targetTree`.

For example, to copy the values from a YAML file into individual files:

```console
$ cat greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @copy greetings.yaml, @files/greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The `files/greetings` argument indicates that `copy` should copy the input YAML tree to a file system tree under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

The `targetTree` must support a `set` method. The two types of trees defined in the Graph Origami [core library](/core) that provides such support are [ObjectTree](/core/ObjectTree.html) and [FileTree](/core/FileTree.html). Only the latter provides persistent effects, so `copy` is typically used to copy the values from the source tree into file system files.
