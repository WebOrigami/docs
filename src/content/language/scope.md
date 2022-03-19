---
title: Scope
subtitle: Defines what's available to expressions executed in a given context
example: |
  root:
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

## Ancestor-children scope

By default, the scope of an Origami graph is _ancestor-children scope_, defined as: all direct children of any direct ancestor, starting from the immediate parent and working upwards.

Example:

```{{'yaml'}}
{{ yaml example }}
```

which looks like

<figure>
{{ svg example }}
</figure>

This graph includes a formula `message = j`. Let's consider what scope will apply to that formula.

Using the above definition for ancestor-children scope, we walk up the graph looking for all direct children of any direct ancestor. The scope will contain, in order:

- e
- g
- message = j
- d
- h
- a
- c
- j
- root
- _… and all Origami builtins_

Some values in this example graph will _not_ be present in the scope available to this `message` formula because they are not direct children of any direct ancestor:

- b
- f
- i

Given this scoping, a formula like `message = j` succeeds because `j` is in scope. A formula like `message = i` would fail, because `i` is not in scope.

### Genealogical analogy

It may be helpful to think about this in terms of human genealogy. If an expression were a person, it would know about

- its siblings
- its parents, aunts, and uncles
- its grandparents, grand-aunts, and grand-uncles
- its great-grandparents, great-grand-aunts, great-grand-uncles
- … etc.

but would _not_ know about

- its nieces and nephews
- its cousins

## Scenarios

- Graphs created with the `virtual` or `meta` builtins will have the graph of Origami [builtins](/cli/builtins.html) as an ancestor, so all builtins will be in scope as well.

## Custom scope
