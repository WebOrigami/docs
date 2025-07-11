---
title: copy(sourceTree, targetTree)
supertitle: "Tree."
---

Traverses the `sourceTree` and writes all values into the `targetTree`.

For example, to copy the values from a YAML file into individual files:

```console
$ cat greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori copy greetings.yaml, files:greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The `files:greetings` argument indicates that `copy` should copy the input YAML tree to a file system tree under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

The `targetTree` must support a `set` method. The two types of trees defined in the [async-tree](/async-tree) library that provides such support are [ObjectTree](/async-tree/ObjectTree.html) and [FileTree](/async-tree/FileTree.html). Only the latter provides persistent effects, so `copy` is typically used to copy the values from the source tree into file system files.

## Copy to build

Building a static site in Origami is typically a matter of defining the site in a `.ori` file to define a virtual tree containing all the site's resources. You can then `copy` that virtual tree into the file system to produce a folder of regular, deployable files.

Example: the [origami-start](https://github.com/WebOrigami/origami-start) project defines a simple [site.ori](https://github.com/WebOrigami/origami-start/blob/main/src/site.ori) file:

```ori
${ <https://raw.githubusercontent.com/WebOrigami/origami-start/refs/heads/main/src/site.ori> }
```

This project defines `build` script that issues the following [ori](/cli) command:

```console
$ ori copy src/site.ori, clear files:build
```

This command clears out the contents of a folder called `build` (creating it if necessary), then copies the virtual contents described by `site.ori` into that `build` folder. The `build` folder will end up with a single file called `index.html` containing "Hello!"

```console
$ ls build
index.html
$ cat build/index.html
Hello!
```
