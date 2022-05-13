---
title: Additions
files:
  addition.yaml: |
    +:
      c: 3
      d: 4
    a: 1
    b: 2
---

Graph _additions_ allow you to incorporate a subgraph into a parent graph as if subgraph's children were the parent's children. You can define an addition key on its own, or as the left-hand side of a formula containing an `=` equals sign.

An addition graph is indicated by giving it the key `+` (a plus sign).

```console assert: true, path: files
$ ori addition.yaml
+:
  c: 3
  d: 4
a: 1
b: 2
```

Here, the `+` key defines an additions graph with two members, `c` and `d`. Those members appear as if they were virtual members of the parent graph, so the graph effectively becomes:

```console assert: true, path: files
$ ori meta addition.yaml
+:
  c: 3
  d: 4
a: 1
b: 2
c: 3
d: 4
```

## Organizing files using addition graphs

One use for addition graphs is to organize source files that you want available in scope, but don't want to always see when navigating a project.

## Generating additions with functions

You can define the `+` additions key in a formula, so you can use JavaScript and Origami built-in functions to generate things that should be dynamically added to a graph.

```console
+ = myFn():
```

## Additions and metagraphs

You can define an addition graph as a metagraph.

```console
$ ori addMeta
"+ = meta(this).yaml":
```
