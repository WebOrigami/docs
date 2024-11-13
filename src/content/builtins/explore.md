---
title: "explore: protocol"
subtitle: To treat a website with JSON keys as a tree
---

If the given site supports the [JSON Keys](/async-tree/jsonKeys.html) protocol, you can work with it as a tree in Origami using its [custom `explore:` protocol](/async-tree/jsonKeys.html#origami-support-for-json-keys). This lets you treat the website as a tree who keys can be fully explored.

```console
$ ori keys explore://weborigami.org/samples/greetings
- Alice
- Bob
- Carol
```
