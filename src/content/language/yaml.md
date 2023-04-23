---
title: Origami expressions in YAML
---

```yaml
name: world
message: !ori greet(name)
names:
  - Alice
  - Bob
  - Carol
greetings: !ori (@map/values(names, greet))
```

```console
$ ori expressions.yaml/
name: world
message: Hello, world!
names:
  - Alice
  - Bob
  - Carol
greetings:
  - Hello, Alice!
  - Hello, Bob!
  - Hello, Carol!
```
