---
title: "@valuesDeep(treelike)"
---

Return the in-order exterior values of the tree as a flat array.

```console
$ cat greetings.yaml
english:
  a: Hello, a.
  b: Hello, b.
  c: Hello, c.
french:
  a: Bonjour, a.
  b: Bonjour, b.
  c: Bonjour, c.
spanish:
  a: Hola, a.
  b: Hola, b.
  c: Hola, c.
$ ori @valuesDeep greetings.yaml
- Hello, a.
- Hello, b.
- Hello, c.
- Bonjour, a.
- Bonjour, b.
- Bonjour, c.
- Hola, a.
- Hola, b.
- Hola, c.
```
