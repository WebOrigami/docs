---
title: map(tree, options)
supertitle: "Tree."
---

Creates a new tree from another by applying mapping functions to the original tree's values and/or keys.

<a name="values"></a>

## Mapping values

In the simplest form of `map`, you provide a tree and a function that will be applied to the tree's values. The resulting tree will have the same keys as the original:

```console
$ cat greetings.yaml
${ samples.ori/cli/greetings.yaml
}$ cat uppercase.js
${ samples.ori/cli/uppercase.js
}$ ori Tree.map greetings.yaml, uppercase.js
${ Origami.yaml(Tree.map(samples.ori/cli/greetings.yaml, samples.ori/cli/uppercase.js)) }
```

<div class="sideBySide">
  <figure>
    ${ svg.js(samples.ori/cli/greetings.yaml) }
  </figure>
  <figure>
    ${ svg.js(Tree.map(samples.ori/cli/greetings.yaml, samples.ori/cli/uppercase.js)) }
  </figure>
  <figcaption>Original tree</figcaption>
  <figcaption>Mapped values</figcaption>
</div>

Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `map` function does not do any mapping work upon invocation — it only does the work when someone requests the mapped tree's keys or values.

The mapping function is typically a JavaScript function, an Origami [lambda](/language/syntax.html#lambdas-unnamed-functions) (unnamed function), or a template such as an [Origami template](/language/templates.html). You can also use a second tree as a map.

## map options

In the basic form of `map` shown above, the second parameter is some kind of mapping function that will be applied to the tree's values. You can also use an expanded form of `map` in which the second parameter is a collection of options:

```console
$ ori Tree.map greetings.yaml, { value: uppercase.js }
```

The options include:

- `deep`: If `false` (the default), this only maps the top-level values in the tree. If `true`, this maps values at all levels of the tree.
- `extensions`: See "Transforming extensions".
- `inverseKey`: A function that will be applied to a result key to get back the original key. See "Inverse keys".
- `key`: A function that will be applied to a key from the original tree to get a result key. See "Mapping keys".
- `value`: A function that will be applied to the original tree's values.

## The value, key, and tree being mapped

When `map` calls a function to map a key or value, it passes the function three arguments:

1. The value being mapped
2. The key being mapped
3. The original tree being mapped

The function being called does not need to use all three arguments. The following example only needs the value, so it only defines a parameter for the first argument:

```console
$ ori "Tree.map(greetings.yaml, (greeting) => uppercase.js(greeting))"
${ Origami.yaml(Tree.map(samples.ori/cli/greetings.yaml, (greeting) => samples.ori/cli/uppercase.js(greeting))) }
```

### Mapping keys

This function wants to reference the key being mapped (a person's name). That will be passed as the second argument, so the function defines two parameters:

```console
$ ori "Tree.map(greetings.yaml, (greeting, name) => uppercase.js(name))"
${ Origami.yaml(Tree.map(samples.ori/cli/greetings.yaml, (greeting, name) => samples.ori/cli/uppercase.js(name))) }
```

A common case for mapping keys is turning some data into a file name. For example, if a tree has keys which are names like "Alice", you can map those keys to ones that end in `.html`, like `Alice.html`.

```console
$ cat greetings.yaml
${ samples.ori/cli/greetings.yaml
}$ ori "Tree.map(greetings.yaml, { key: (greeting, name) => `\${ name }.html` })"
${ Origami.yaml(Tree.map(samples.ori/cli/greetings.yaml, { key: (greeting, name) => `${ name }.html` })) }
```

<div class="sideBySide">
  <figure>
    ${ svg.js(samples.ori/cli/greetings.yaml) }
  </figure>
  <figure>
    ${ svg.js(Tree.map(samples.ori/cli/greetings.yaml, { key: (greeting, name) => `${ name }.html` })) }
  </figure>
  <figcaption>Original tree</figcaption>
  <figcaption>Mapped keys</figcaption>
</div>

### Inverse keys

Generally speaking, a `map` operation needs to be able to change an original key like "Alice" into a result key like `Alice.html` _and_ it must be able to go in the other direction. If someone asks the above mapped tree for `Bob.html`, the `map` operation will need to change `Bob.html` into the key "Bob" in order to be able to retrieve Bob's data.

To do this, you can provide an `inverseKey` function that turns a result key into an original key. As a convenience, if you do not provide your own `inverseKey` function, `map` will provide a default `inverseKey` function for you.

This default `inverseKey` function is not especially efficient, as it exhaustively maps each original key to see if the result matches what is being requested. In this example, if someone asks for `Bob.html`, the default `inverseKey` function will try mapping the original key "Alice" to `Alice.html` to see if that matches. It doesn't, so the function next tries mapping "Bob" to `Bob.html`. That does match, so it knows that the inverse of `Bob.html` is "Bob".

For small maps, this default `inverseKey` function may be perfectly acceptable. For the best performance in mapping larger collections, define both the `key` and `inverseKey` functions.

## Keys in deep maps

A deep tree can indicate whether a key is for a subtree by [ending the key with a trailing slash](https://weborigami.org/async-tree/interface.html#trailing-slash-convention). In a deep map (a map where the `deep` option is set), all keys for subtrees are left alone; the `key` or `inverseKey` functions (or the `extension` option described below) are not applied.

## Transforming extensions

Changing a key's extension is very common. Mapping values often changes the type of the data, and it is useful to be able to reflect that change in type in file extensions.

To facilitate changing extensions in a `map`, you can supply an `extension` option that indicates whether and how the extensions of the original tree should be changed:

- `extension: ".md"` restricts the map to only apply to keys ending in `.md`
- `extension: "->.html"` adds the `.html` extension to all keys
- `extension: ".md->.html"` only applies the map to keys ending in `.md`, and adds the `.html` extension to keys in the result
- `extension: ".json→"` only applies the map to `.json`files, removing the`.json` extension from their names

The `extension` option generates a `key` and `inverseKey` functions for you. If you provide two extensions, like `".md->.html"`, the `inverseKey` function will be much more efficient.

So you can also write the above example as:

```console
$ cat greetings.yaml
${ samples.ori/cli/greetings.yaml
}$ ori "Tree.map(greetings.yaml, { extension: '→.html' })"
${ Origami.yaml(Tree.map(samples.ori/cli/greetings.yaml, { key: (greeting, name) => `${ name }.html` })) }
```

When mapping file extensions as shown above, trailing slashes are generally ignored. However, you can supply a trailing slash as an extension if you want to explicitly map, for example, folder keys that end in trailing slashes. For example, `"/→.json"` would map a folder key like "data/" to "data.json".
