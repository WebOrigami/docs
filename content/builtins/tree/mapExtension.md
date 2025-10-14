---
title: "mapExtension(tree, ext, [fn|options])"
---

A variant of [`map`](map.html) that changes file extensions in keys.

Changing a key's extension is very common. Mapping values often changes the type of the data, and it is useful to be able to reflect that change in type in file extensions.

It's also possible to use `mapExtension` to limit the application of a map to keys that match a particular extension, leaving the extension unchanged.

## Options

The extension option can be specified as a second string argument to `mapExtension`, or as an `extension` option in an `options` object. All of the following are equivalent:

- `Tree.mapExtension(tree, ".md->.html", fn)`
- `Tree.mapExtension(tree, ".md->.html", { value: fn })`
- `Tree.mapExtension(tree, { extension: ".md->.html", value: fn })`

The `options` object can specify the following options just like `map`.

- `deep`: If `false` (the default), this only maps the top-level values in the tree. If `true`, this maps values at all levels of the tree.
- `value`: A function that will be applied to the original tree's values.

## Extension specifier

The extension string indicates how the extension should be changed using one of the following formats:

- `".md"` restricts the map to only apply to keys ending in `.md`
- `"->.html"` adds the `.html` extension to all keys
- `".md->.html"` only applies the map to keys ending in `.md`, and adds the `.html` extension to keys in the result
- `".json→"` only applies the map to `.json`files, removing the`.json` extension from their names
- `"/→.json"` only applies the map to folder keys like "data/" and maps that to "data.json"

Example:

```console
$ cat greetings.yaml
${ samples/cli/greetings.yaml
}$ ori "Tree.mapExtension(greetings.yaml, '→.html')"
${ Origami.yaml(Tree.mapExtension(samples/cli/greetings.yaml, "→.html")) }
```

When mapping file extensions as shown above, trailing slashes are generally ignored. However, you can supply a trailing slash as an extension if you want to explicitly map, for example, folder keys that end in trailing slashes. (See example above.)
