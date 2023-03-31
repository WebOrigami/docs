---
title: "@graphHttps(domain, [...keys])"
---

Returns a new [SiteGraph](/core/SiteGraph.html) for the indicated `domain`. If `keys` are supplied, this traverses the keys and returns the resulting value. This lets you retrieve resources from an existing website by treating it as a graph.

The site must define [.keys.json](https://graphorigami.org/core/sitegraph#keysjson-files) files if the site graph is to be able to enumerate its contents.

You won't normally call this function directly. Instead, you can specify the custom `graphhttps:` protocol in a URL:

```console
$ ori graphhttps://graphorigami.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

The custom `graphhttps:` protocol invokes this `@graphHttps` function to create a `SiteGraph`.
