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
- A key may follow the [trailing slash convention](interface.html#trailing-slash-convention) by ending in a trailing `/` slash to signal that the key is for a subfolder. If the site chooses not to do this, it should redirect to a route that ends in a trailing slash (e.g., from `/foo` to `/foo/`); the redirection itself will act as the signal that the route represents a folder.
- The `.keys.json` file should not list its own name in the array of keys, nor should it include `"."` and `".."` entries for the folder itself and its parent.

## Example

This weborigami.org site supports the JSON Keys protocol. For example, it has a route `/samples/greetings` containing some trivial files like [/samples/greetings/Alice](/samples/greetings/Alice). The structure of the route looks like:

```
samples/
  index.html
  greetings/
    Alice
    Bob
    Carol
    index.html
```

To expose all these files, the `/samples` route defines a [/samples/.keys.json](/samples/.keys.json) file listing its keys (the files and subfolders it contains) as a JSON array of strings:

```json
["greetings/", "index.html"]
```

Likewise, the `/sample/greetings` route defines a JSON file at [/samples/greetings/.keys.json](/samples/greetings/.keys.json) that enumerates the names of its files:

```json
["Alice", "Bob", "Carol", "index.html"]
```

These `.keys.json` files can be viewed by users or consumed by programs so they can discover the full set of files available on the site.

## Origami support for JSON Keys

The Origami [ExplorableSiteTree](ExplorableSiteTree.html) class supports the JSON Keys protocol. If you ask a `ExplorableSiteTree` for its keys, it will look for a `.keys.json` file and, if it exists, parse it and return those keys. (It will strip the trailing `/` from any keys for subtrees.)

The ori [CLI](/cli) builds on this in several ways.

Origami's custom `explore:` protocol allow you to indicate that you want to treat a given URL as the root of an [ExplorableSiteTree](ExplorableSiteTree.html) instead of a single resource. This lets you pass a site to any function that wants to enumerate the site's keys, such as the [@keys](/builtins/@keys.html) builtin:

```console
$ ori @keys explore://weborigami.org/samples/greetings/
- Alice
- Bob
- Carol
- index.html
```

Here the `explore:` protocol creates a `SiteTree` instance which retrieves the route's keys defined in a `.keys.json` file. The `@keys` function then asks that tree for the list of keys, which the ori CLI displays as the result of the command.

You can also use ori to display the complete contents of all pages at a given route:

```console
$ ori explore://weborigami.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
index.html: … [HTML content of the file] …
```

Or use ori to copy the contents of a site locally:

```console
$ ori @copy explore://weborigami.org/samples/greetings/, @files/snapshot
$ ls snapshot
Alice      Bob        Carol      index.html
```

You can also use the [@exploreSite](/builtins/@exploreSite.html) builtin to create an explorable site for a given URL.

## Adding support for JSON Keys to your site

You can apply the [@jsonKeys](/builtins/@jsonKeys.html) function to your site to define default `.keys.json` files for all your site's routes. Alternatively, you can apply the [@static](/builtins/@static.html) function to define both default `.keys.json` and `index.html` files for your site.

## Supporting JSON Keys on other platforms

The JSON Keys protocol strives to be as simple as possible so that it can be implemented in other systems. Example: an implementation of [JSON Keys for Apache and PHP](https://gist.github.com/JanMiksovsky/e748cab5d3e8f460d23ca7e51798ad27).
