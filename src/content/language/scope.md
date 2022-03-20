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

## Ancestor-sibling scope

By default, the scope of an Origami graph is _ancestor-sibling scope_, defined as: all siblings of the current graph node (including that node itself) and any of its ancestors. If a formula were a person, it would know about its siblings (and itself), its parents and their siblings, its grandparents and their siblings, etc. If we consider a formula as a file, the formula can see everything in that folder, as well as anything in any ancestor folder.

Example:

```{{'yaml'}}
{{ yaml example }}
```

which looks like

<figure>
{{ svg example }}
</figure>

This graph includes a formula `message = j`. Let's consider the scope available to that formula. Using the above definition for ancestor-sibling scope, we walk up the graph looking for all siblings at each level. The scope will contain, in order:

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

## Scenarios

- Graphs created with the `virtual` or `meta` builtins will have the graph of Origami [builtins](/cli/builtins.html) as an ancestor, so all builtins will be in scope as well.

## Custom scope
