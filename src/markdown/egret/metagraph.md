# Metagraph

A _metagraph_ is a graph that defines its own transformation. The transformation is defined by formulas in keys: instead of a key being a simple string like "a", you create a key with a formula like "b = a". The metagraph will parse and evaluate this formula to define a new, virtual key called "b" that has the same value "a" has.

## Example: Metagraph with a key that includes a formula

```yaml
fixture:
  a: Hello
  b = a: ""
```

This graph defines two keys: the first key is `a` and it has the value "Hello", the second key is the text `b = a`. (In this example, the value of the second key is irrelevant; here it is an empty string.)

```yaml
description: |
  When we ask for the keys of this metagraph, we get _three_ keys. Two are the keys we defined: `a` and `b = a`. The metagraph also evaluates the formula `b = a`, yielding a third, virtual key, `b`.
actual = keys(fixture):
expected:
  - a
  - b
  - b = a
```

```yaml
description: The value of `a` is "Hello", as defined in the original graph.
actual = fixture/a:
expected: Hello
```

```yaml
description: The value of `b` is *also* "Hello", obtained by interpreting the formula `b = a`.
actual = fixture/b:
expected: Hello, world!
```

```yaml
description: The complete metagraph looks like
actual = fixture:
expected:
  a: Hello
  b: Hello
  b = a: ""
```
