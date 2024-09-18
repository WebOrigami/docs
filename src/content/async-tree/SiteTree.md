---
title: SiteTree
subtitle: Wraps a web site as an async tree
---

## JSON Keys protocol support

If you use `SiteTree` to wrap a site that supports the [JSON Keys protocol](jsonKeys.html), the `SiteTree` instance will be able to programmatically return the keys at a given route. See that protocol for more details.

For example, you can use the ori [CLI](/cli) to display the keys of a given site route using the custom [tree](/builtins/@treeHttps.html) or [treehttp](/builtins/@treeHttp.html) protocols:

```console
$ ori @keys tree://weborigami.org/samples/greetings/
- Alice
- Bob
- Carol
```

You can also use ori to display the complete contents of all pages at a given route:

```console
$ ori tree://weborigami.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

Above, the custom `tree:` protocol retrieves the route's keys defined in the `.keys.json`, then makes separate requests for each of those pages.

${ templates/class.ori(api.ori/SiteTree.yaml/exports/0) }
