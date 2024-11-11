---
title: "exploreSite(url)"
---

If the given site supports the [JSON Keys](/async-tree/jsonKeys.html) protocol, you can work with it as a tree in Origami using its [custom `explore:` protocol](/async-tree/jsonKeys.html#origami-support-for-json-keys). In cases where you already have an `https` URL, you can pass that to the `exploreSite` function to get back that site as an explorable tree.

For example, the following are equivalent:

```console
$ ori keys explore://weborigami.org/samples/greetings
- Alice
- Bob
- Carol
$ ori keys "exploreSite('https://weborigami.org/samples/greetings')"
- Alice
- Bob
- Carol
```
