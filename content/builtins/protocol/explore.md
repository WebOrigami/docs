---
title: "explore: protocol"
subtitle: To treat a site with JSON keys as a tree
---

If the given site supports the [JSON Keys](/async-tree/jsonKeys.html) protocol, you can work with it as a tree in Origami using the `explore:` protocol.

```console
$ ori keys explore://weborigami.org/samples/greetings
${ Origami.yaml(Tree.keys(explore://weborigami.org/samples/greetings/)) }
```
