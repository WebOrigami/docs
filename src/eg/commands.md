---
title: eg Commands
path: /eg/commands.html
---

<a name="copy"></a>

## `copy(sourceGraph, targetGraph)`

Traverses the `sourceGraph` and writes all values into the `targetGraph`.

For example, to copy the values from a YAML file into individual files:

```sh
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ eg copy greetings.yaml, files/greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The `files/greetings` argument indicates that `copy` should copy the input YAML graph to a file system graph under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

The `targetGraph` must support the [`set`](/core/set.html) method. The only types of graphs defined in the ExplorableGraph [core](/core) that provides such support are [ExplorableObject](/core/ExplorableObject.html) and [ExplorableFiles](/core/ExplorableFiles.html). Only the latter provides persistent effects, so `copy` is typically used to copy the values from the source graph into file system files.

<a name="serve"></a>

## `serve(graph, [port])`

Starts a local web server to serve the contents of `graph`. To serve the current folder:

```sh
$ eg serve .
Server running at http://localhost:5000
```

A web route like `a/b/c` will be turned into a graph traversal operation that returns the graph value at that path.
