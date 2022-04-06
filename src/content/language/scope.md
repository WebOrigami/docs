---
title: Scope
subtitle: Defines what's available to expressions executed in a given context
example: |
  a:
    b: B
  c:
    d:
      e:
        f: F
      g: G
      message = j: ""
    h:
      i: I
  j: J
---

## Scope basics

An Origami expression contains references — to named functions, files, data keys, etc. — that must be resolved in order to evaluate the expression. For example, in the expression

```
message = myFunction()
```

where does Origami look for the `myFunction` function in order to invoke it? The answer is that every Origami expression is evaluated in the context of a _scope_.

A scope is essentially an ordered list of key/value pairs. When Origami needs to resolve a reference like `myFunction`, it consults the scope. The first appearance of the key `myFunction` that has a defined value (i.e., not the JavaScript `undefined` value) will be used. Keys may appear multiple times in a scope, but only the first defined value will be used.

Given the graph-focused nature of Origami, it's natural that the scope is expressed as an explorable graph.

The Origami CLI and framework can both provide a default scope that should meet most of your needs. If you encounter a situation where the default scope is inadequate, you can construct a scope graph yourself to tightly control how references in Origami expressions are resolved.

## Ancestor-sibling scope

By default, the scope of an Origami graph is _ancestor-sibling scope_: all siblings of the current graph node (including that node itself) and its ancestors.

Example:

```{{'yaml'}}
{{ yaml example }}
```

which looks like

<figure>
{{ svg example }}
</figure>

This graph includes a formula `message = j`. Let's consider the scope available to that formula so that we can understand how Origami will resolve the `j` reference.

Using the above definition for ancestor-sibling scope, we start at the point where the `message = j` formula appears. We then look for all siblings at each level as we walk up the graph.

The scope will then contain, in order:

- e
- g
- message = j
- d
- h
- a
- c
- j
- _… and all Origami builtins_

Some values in this example graph will _not_ be present in the scope available to the `message` formula because they are not siblings of that formula or any ancestor.

- b
- f
- i

Given this scoping, a formula like `message = j` works because `j` is in scope. A formula like `message = i` would fail, because `i` is not in scope.

## Scope in the Origami Framework

If we consider a formula as a file, the formula can see everything in that folder, as well as anything in any ancestor folder.

## Scope in the Origami CLI

- Graphs created with the `virtual` or `meta` builtins will have the graph of Origami [builtins](/cli/builtins.html) as an ancestor, so all builtins will be in scope as well.

## Scope in an Origami Template

## Custom scope
