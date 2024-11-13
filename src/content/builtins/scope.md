---
title: "scope: protocol"
subtitle: To explicitly reference a key in scope
---

This protocol exists to support the rare situations in which you have a string representing some file or other object in scope and want to convert that to the corresponding value. Origami automatically resolves scope references in Origami expressions, so you will rarely need to use this protocol.

One situation where `scope:` can be useful is if you have a data object that references a file by name, and you want to obtain the file's contents.

Suppose `poets.yaml` contains data about poets, and a poet's entry references a file with a sample poem by that person:

```yaml
# poets.yaml
${ samples.ori/help/poets.yaml }
```

Here, "cicada.txt" contains a sample poem:

```
${ samples.ori/help/cicada.txt }
```

To obtain this sample from the data, you can use the `scope:` protocol as a function:

```console
$ ori "scope:(poets.yaml/Basho/sample)"
${ samples.ori/help(samples.ori/help/poets.yaml/Basho/sample) }
```
