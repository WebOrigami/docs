---
title: "explore: protocol"
subtitle: To treat a site with JSON keys as a tree
---

If the given site supports the [JSON Keys](/async-tree/jsonKeys.html) protocol, you can work with it as a tree in Origami using the `explore:` protocol.

The Web Origami documentation site supports JSON Keys, so as a trivial example, you can get a list of the resources available at any route:

```console
$ ori keys explore://weborigami.org/samples/greetings/
${ Origami.yaml(Tree.keys(explore://weborigami.org/samples/greetings/)) }
```

**Note:** an `explore:` URL for a site area like this requires a trailing slash!

You can also copy such a site area locally:

```console
$ ori copy explore://weborigami.org/samples/greetings/, files:snapshot
$ ls snapshot
Alice   Bob   Carol
$ cat snapshot/Alice
${ explore://weborigami.org/samples/greetings/Alice }

$
```
