---
title: "@treeHttps(domain, [...keys])"
---

Returns a new [SiteTree](/async-tree/SiteTree.html) for the indicated `domain`. If `keys` are supplied, this traverses the keys and returns the resulting value. This lets you retrieve resources from an existing website by treating it as a tree.

The site must define [.keys.json](/async-tree/SiteTree#keysjson-files) files if the site tree is to be able to enumerate its contents.

You won't normally call this function directly. Instead, you can specify the custom `treehttps:` protocol in a URL.

```console
$ ori treehttps://weborigami.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

The custom `treehttps:` protocol invokes this `@treeHttps` function to create a `SiteTree`.

Origami also supports `tree:` as a shorthand for `treehttps:`, so you could rewrite the above command as:

```console
$ ori tree://weborigami.org/samples/greetings/
```
