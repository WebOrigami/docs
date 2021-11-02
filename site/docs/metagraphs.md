# MetaGraphs

```yaml
description: |
  When we ask for the keys of this metagraph, we get _three_ keys. Two are the keys we defined: `a` and `b = a`. The metagraph also evaluates the formula `b = a`, yielding a third, virtual key, `b`.
fixture:
  a: Hello
  b = a:
actual = keys(fixture):
expected:
  - a
  - b
  - b = a
```

```yaml
description: The value of `a` is "Hello", as defined in the original graph.
fixture:
  a: Hello
  b = a:
actual = fixture/a:
expected: Hello
```

```yaml
description: The value of `b` is *also* "Hello", as implied by the formula `b = a`.
fixture:
  a: Hello
  b = a:
actual = fixture/b:
expected: Hello!
```
