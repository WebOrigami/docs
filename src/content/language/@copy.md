---
title: "@copy(sourceGraph, targetGraph)"
---

Traverses the `sourceGraph` and writes all values into the `targetGraph`.

For example, to copy the values from a YAML file into individual files:

```console
$ cat greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @copy greetings.yaml, files/greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The `files/greetings` argument indicates that `copy` should copy the input YAML graph to a file system graph under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

The `targetGraph` must support the [`set`](/core/set.html) method. The two types of graphs defined in the Graph Origami [core library](/core) that provides such support are [ObjectGraph](/core/ObjectGraph.html) and [FilesGraph](/core/FilesGraph.html). Only the latter provides persistent effects, so `copy` is typically used to copy the values from the source graph into file system files.
