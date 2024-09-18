---
title: JSON Keys
subtitle: Simple system for making sites traversable
---

The JSON Keys protocol lets you make a site fully traversable so that users and programs can easily determine what files the site provides.

We can think of a website as an asynchronous tree whose values can be retrieved via HTTP requests. Sadly, HTTP does not provide a way to list the keys of a subtree, so normally it is impossible to completely traverse a site's tree. JSON Keys attempts to fill this gap in the simplest way possible.

## JSON Keys protocol

A site can indicate which keys are available at a given route by supporting the JSON Keys protocol:

- Every route that acts as a folder can define a `.keys.json` file.
- The contents of this file must be an array of strings in JSON format listing the keys (names) of the files and subfolders published at that route.
- A key may end in a trailing `/` to signal that the key is for a subfolder. If the site chooses not to do this, it should redirect to a route that ends in a trailing slash (e.g., from `/foo` to `/foo/`); the redirection itself will act as the signal that the route represents a folder.
- The `.keys.json` file should not list its own name in the array of keys, nor should it include `"."` and `".."` entries for the folder itself and its parent.

## Example

This weborigami.org site supports the JSON Keys protocol. For example, it has a route `/samples/greetings` containing some trivial files like [/samples/greetings/Alice](/samples/greetings/Alice). The server defines a JSON file at [/samples/greetings/.keys.json](/samples/greetings/.keys.json) that enumerates the names of those files:

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

The information makes a site tree traversable.

## Origami support for JSON Keys

The Origami [SiteTree](SiteTree.html) class supports the JSON Keys protocol. If you ask a `SiteTree` for its keys, it will retrieve this `.keys.json` file and, if this file exists, parse it and return those keys. (It will strip the trailing `/` from any keys for subtrees.)

The ori [CLI](/cli) builds on this in several ways. The custom [tree](/builtins/@treeHttps.html) or [treehttp](/builtins/@treeHttp.html) protocols allow you to indicate that you want to treat a given URL as the root of a complete tree instead of a single resource.

The `tree:` protocol returns a tree that can be passed to any Origami builtin like [@keys](/builtins/@keys.html) that accepts a tree:

```console
$ ori @keys tree://weborigami.org/samples/greetings/
- Alice
- Bob
- Carol
```

Here the `tree:` protocol creates a `SiteTree` instance which retrieves the route's keys defined in a `.keys.json` file. The `@keys` function then asks that tree for the list of keys, which the ori CLI displays as the result of the command.

You can also use ori to display the complete contents of all pages at a given route:

```console
$ ori tree://weborigami.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

## Adding support for JSON Keys to your site

You can apply the [@jsonKeys](/builtins/@jsonKeys.html) function to your site to define default `.keys.json` files for all your site's routes. Alternatively, you can apply the [@static](/builtins/@static.html) function to define both default `.keys.json` and `index.html` files for your site.

## Supporting JSON Keys on other platforms

The JSON Keys protocol strives to be as simple as possible so that it can be implemented in other systems. Example: an implementation of [JSON Keys for Apache and PHP](https://gist.github.com/JanMiksovsky/e748cab5d3e8f460d23ca7e51798ad27).
