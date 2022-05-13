---
title: Wildcards
---

A _wildcard_ key will match against string keys that fit the wildcard's pattern. You can define a wildcard on its own, or as the left-hand side of a formula containing an `=` equals sign.

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

### Using wildcards in website routing

### Matching extensions

If add an extension to a wildcard, it will only match requests for keys that have that extension.

```console
[x].html = this(x).js
```

### Multiple wildcards

You can define multiple wildcards with the same pattern. The first one that produces a defined (not `undefined`) value will be used.
