---
title: Graph shape modifiers
files:
  addition.yaml: |
    +:
      c: 3
      d: 4
    a: 1
    b: 2
---

Origami lets you modify the shape of a graph — the keys and values it contains — by defining special types of keys inside that graph. These are like power-ups you can place inside a graph to change how it behaves.

| Graph shape modifier                                                  | Example key  |
| :-------------------------------------------------------------------- | :----------- |
| Wildcard: matches a pattern that can include an extension             | `\[x\].html` |
| Addition: incorporates a subgraph's children into a parent graph      | `+`          |
| Ghost graph: adds a subgraph's children to matching folders/subgraphs | `[x]+`       |

You can define one of these shape-modifying keys on its own, or as the left-hand side of a formula.

## Wildcards

A _wildcard_ key will match against string keys that fit the wildcard's pattern.

This graph defines two real keys for specific people names, plus a wildcard that matches any other name (or string).

```console
$ ori wildcardGreeting.yaml
"[name]": Hi.
Alice: Hello, Alice!
Bob: Hey, Bob.
Carol: Hi there, Carol.
```

Asking for one of the specific keys returns the corresponding value:

```console
$ ori "meta(wildcardGreeting.yaml)/Alice"
Hello, Alice!
```

Asking for any other name matches the wildcard, and evaluates that

```console
$ ori "meta(wildcardGreeting.yaml)/David"
Hi.
```

Note that the wildcard only matches as a last resort — since `Alice` is defined as a key, the wildcard will not match against "Alice". It only matches "David" because there is no `David` key.

Exercise care when defining wildcards like this without an extension, as they can easily match things you don't expect. This is particularly likely to occur if you have other formulas in the same graph.

### Bound wildcard variable

The identifier inside a wildcard, such as `name` in `[name]` defines a variable that will be bound to the text that matched. That variable will be in scope for any expression on the right-hand side of a formula.

We can use that to modify the above example and greet unknown people by name:

```console
$ ori wildcardGreeting.yaml
"[name] = `Hi, {{name}}.`":
Alice: Hello, Alice!
Bob: Hey, Bob.
$ ori "meta(wildcardGreeting.yaml)/David"
Hi, David.
```

### Matching extensions

If add an extension to a wildcard, it will only match requests for keys that have that extension.

```console
[x].html = this(x).js
```

### Multiple wildcards

You can define multiple wildcards with the same pattern. The first one that produces a defined (not `undefined`) value will be used.

## Additions

Graph _additions_ allow you to incorporate a subgraph into a parent graph as if subgraph's children were the parent's children.

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

### Organizing files using addition graphs

One use for addition graphs is to organize source files that you want available in scope, but don't want to always see when navigating a project.

### Additions and metagraphs

You can define an addition graph as a metagraph.

```console
$ ori addMeta
"+ = meta(this).yaml":
```

## Ghost graphs
