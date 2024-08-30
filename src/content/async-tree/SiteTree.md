---
title: SiteTree
subtitle: Wraps a web site as an async tree
---

## JSON Keys protocol

We can think of a website as an asynchronous tree whose values can be retrieved via HTTP/S requests. Sadly, HTTP does not provide a way to list the keys of a subtree, so normally it is impossible to completely traverse a site's tree.

To remedy that, a site can indicate which keys are available at a given route by supporting the JSON Keys protocol:

- Every route can expose its keys by defining a `.keys.json` file.
- This contains an array in JSON format of the keys available at that route.
- If a key represents a subtree, the key end in a trailing `/` slash, although that is not required.

This Web Origami site supports this JSON Keys protocol. For example, it has a route `/samples/greetings` containing some trivial files like [/samples/greetings/Alice](/samples/greetings/Alice). The server defines a JSON file at [/samples/greetings/.keys.json](/samples/greetings/.keys.json) that enumerates the names of those files:

```json
["Alice", "Bob", "Carol"]
```

The higher level route `/samples` likewise has a [/samples/.keys.json](/samples/.keys.json) file listing its keys, including the `greetings/` key:

```json
[
  "greetings/",
  ... other keys ...
]
```

The information makes a site tree traversable. The underlying `SiteTree` class supports the JSON Keys protocol. If you ask a `SiteTree` for its keys, it will retrieve this `.keys.json` file and, if found, return those keys. (It will strip the trailing `/` from any keys for subtrees.)

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

The `.keys.json` file should normally not include itself in its list of keys.

### Adding support for JSON Keys to your site

The Origami builtin [@jsonKeys](/builtins/@jsonKeys.html) function makes it easy to define `.keys.json` files for all routes in a given tree.

Given the very basic nature of the protocol, it is not hard to implement in other systems. Example: an implementation of [JSON Keys for Apache and PHP](https://gist.github.com/JanMiksovsky/e748cab5d3e8f460d23ca7e51798ad27).

${ templates/class.ori(api.ori/SiteTree.yaml/exports/0) }
