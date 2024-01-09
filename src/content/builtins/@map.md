---
title: "@map"
mappedKeys: !ori "@map(samples.ori/cli/greetings.yaml, { keyMap: =`{{ @key }}.html` })"
---

Creates a new tree from another by applying mapping functions to the original tree's values and/or keys.

<a name="values"></a>

## Mapping values

In the simplest form of `@map`, you provide a tree and a function that will be applied to the tree's values. The resulting tree will have the same keys as the original:

```console
$ cat greetings.yaml
{{ samples.ori/cli/greetings.yaml
}}$ cat uppercase.js
{{ samples.ori/cli/uppercase.js
}}$ ori @map(greetings.yaml, uppercase.js)
{{ @yaml @map samples.ori/cli/greetings.yaml, samples.ori/cli/uppercase.js }}
```

<div class="sideBySide">
  <figure>
    {{ svg.js samples.ori/cli/greetings.yaml }}
  </figure>
  <figure>
    {{ svg.js @map samples.ori/cli/greetings.yaml, samples.ori/cli/uppercase.js }}
  </figure>
  <figcaption>Original tree</figcaption>
  <figcaption>Mapped values</figcaption>
</div>

Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `@map` function does not do any mapping work upon invocation — it only does the work when someone requests the mapped tree's keys or values.

The mapping function is typically a JavaScript function, an Origami [lambda](/language/syntax.html#lambdas-unnamed-functions) (unnamed function), or a template such as an [Origami template](templates.html). You can also use a second [tree as a map](/cli/intro.html#use-a-tree-as-a-map).

## @map options

In the basic form of `@map` shown above, the second parameter is some kind of mapping function that will be applied to the tree's values. You can also use an expanded form of `@map` in which the second parameter is a collection of options:

```console
$ ori @map(greetings.yaml, { valueMap: uppercase.js })
```

Available `options` include:

- `deep`: If `false` (the default), this only maps the top-level values in the tree. If `true`, this maps values at all levels of the tree.
- `extensions`: See below.
- `keyMap`: A function that will be applied to the original tree's keys. See below.
- `valueMap`: A function that will be applied to the original tree's values.

<a name="keys"></a>

## Mapping keys

You can call `@map` with a `keyMap` option to apply a function to a tree's keys. For example, if a tree has keys which are names like "Alice", you can map those keys to ones that end in ".html", like "Alice.html".

```console
$ cat greetings.yaml
{{ samples.ori/cli/greetings.yaml
}}$ ori "@map(greetings.yaml, { keyMap: =`\{{ @key }}.html` })"
{{ @yaml mappedKeys }}
```

<div class="sideBySide">
  <figure>
    {{ svg.js samples.ori/cli/greetings.yaml }}
  </figure>
  <figure>
    {{ svg.js mappedKeys }}
  </figure>
  <figcaption>Original tree</figcaption>
  <figcaption>Mapped keys</figcaption>
</div>

## Transforming extensions

The above example of changing a key's extension is very common. Mapping values often changes the type of the data, and it is useful to be able to reflect that change in type in file extensions.

To facilitate changing extensions in a `@map`, you can supply an `extensions` option that indicates whether and how the extensions of the original tree should be changed:

- `extensions: "md"` restricts the map to only apply to keys ending in `.md`
- `extensions: "->html"` adds the `.html` extension to the keys in the result
- `extensions: "md->html"` only applies the map to keys ending in `.md`, and adds the `.html` extension to keys in the result

In place of the `->` text, you can alternatively write a Unicode `→` Rightwards Arrow, as in `"md→html"`. You can optionally include the `.` in extensions: `{ extension: ".md" }`.

So you can also write the above example as:

```console
$ cat greetings.yaml
{{ samples.ori/cli/greetings.yaml
}}$ ori "@map(greetings.yaml, { extensions: '→html' })"
{{ @yaml mappedKeys }}
```
