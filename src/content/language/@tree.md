---
title: "@tree"
---

This collection of functions operates on async trees. Functions that accept a `tree` parameter will accept any [treelike object](/core/treelike.html).

<a name="concat"></a>

## @tree/concat(...objs)

Converts the indicated objects to strings, then returns the concatenated strings.

- If an object is a function, it is invoked, then these rules are applied to the result.
- If an object is a tree, this concatenates the deep values in the tree.
- If an object can be converted to a string, it is. Otherwise, the empty string is used.

To concatenate two strings:

```console
$ ori "@tree/concat 'foo', 'bar'"
foobar
```

To concatenate the values in a tree:

```console
$ cat greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @tree/concat greetings.yaml
Hello, Alice.Hello, Bob.Hello, Carol.
```

<a name="dot"></a>

## @tree/dot(treelike)

Returns a text representation of the indicated tree in the [DOT](https://treeviz.org/documentation/) tree description language. Various tools exist to render such a DOT representation into various tree formats such as PNG or SVG.

If you want a basic visual representation of a tree, use the [@svg()](@svg.html) function instead. Use the `dot` function only if you want to use other DOT tools to render a tree.

<a name="expand"></a>

## @tree/expand(treelike)

Expands any tree nodes which can be treated as [treelike object](/core/treelike.html) values (e.g., YAML/JSON text) into subtrees.

<a name="first"></a>

## @tree/first(treelike)

Returns the first value in `tree`.

<a name="from"></a>

## @tree/from(treelike)

Converts any [treelike object](/core/treelike.html) into an async tree.

<a name="inners"></a>

## @tree/inners(treelike)

Returns the tree's interior nodes, i.e., its nodes that have children.

<a name="keys"></a>

## @tree/keys([treelike])

Returns an array of the top-level keys in the indicated tree.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @tree/keys greetings.yaml
- Alice
- Bob
- Carol
```

See also [values](#values).

<a name="merge"></a>

## @tree/merge(...treelikes)

Returns a tree that is the result of merging the indicated trees.

```console
$ cat tree1.yaml
a: The letter A
b: The letter B
c: The letter C
$ cat tree2.yaml
c: This won't appear in the merge
d: The letter D
e: The letter E
$ ori @tree/merge tree1.yaml, tree2.yaml
a: The letter A
b: The letter B
c: The letter C
d: The letter D
e: The letter E
```

When asked for a key, the merged tree asks each of the constituent trees in turn for that key; the first defined result is returned. In the example above, getting `c` returns the result from `tree1.yaml`, because that is the first tree that defines a value for `c`.

The merge operation is shallow; for a deep merge operation, see [mergeDeep()](#mergeDeep).

<a name="mergeDeep"></a>

## @tree/mergeDeep(...treelikes)

Like [merge()](#merge), but performs a deep merge: if multiple trees define values for the same key, and those values are themselves async trees, then those values themselves will be merged.

<a name="nextKey"></a>

## @tree/nextKey(treelike, key)

Enumerates the tree's key until `key` is found, then returns the next key in the tree.

<a name="nulls"></a>

## @tree/nulls(treelike)

Returns a new tree with all values equal to null.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @tree/nulls greetings.yaml
? Alice
? Bob
? Carol
```

`nulls` can be useful when you want to display the structure of a tree (especially a hierarchical tree) without concern for the actual data values.

<a name="parent"></a>

## @tree/parent(treelike)

If the tree has a `parent` property, this returns the value of that property.

<a name="plain"></a>

## @tree/plain([treelike])

Converts an asynchronous async tree into a synchronous plain JavaScript object. The supplied argument can be any [treelike object](/core/treelike.html) such as a JSON/YAML file, file system folder, etc. If omitted, `plain` converts the current tree — in the command line, this will be the current folder — to a plain JavaScript object.

A common use for `plain` is to convert a tree into a form that you can pass to any function that works with plain JavaScript objects.

<a name="previousKey"></a>

## @tree/previousKey(treelike, key)

Enumerates the tree's key until `key` is found, then returns the previous key in the tree.

<a name="reverse"></a>

## @tree/reverse(treelike)

Reverses the order of keys in the tree.

```console
$ cat letters.yaml
a: The letter A
b: The letter B
c: The letter C
$ ori @tree/reverse letters.yaml
c: The letter C
b: The letter B
a: The letter A
```

<a name="setDeep"></a>

## @tree/setDeep(target, source)

Recursively applies updates from the `source` tree to the `target` tree.

The `target` tree must support the [`set`](/core/set.html) method. The only types of trees defined in the Graphorigami [core library](/core) that provides such support are [ObjectTree](/core/ObjectTree.html) and [FileTree](/core/FileTree.html).

<a name="shuffle"></a>

## @tree/shuffle(treelike)

Returns a new tree with the original `tree` keys randomly shuffled.

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @tree/shuffle greetings.yaml
Carol: Hello, Carol.
Alice: Hello, Alice.
Bob: Hello, Bob.
$ ori @tree/shuffle greetings.yaml
Carol: Hello, Carol.
Bob: Hello, Bob.
Alice: Hello, Alice.
```

<a name="sort"></a>

## @tree/sort(treelike, [keyFn])

Returns a copy of the indicated [treelike object](/core/treelike.html) with the keys sorted. The sort is performed with the default lexicotree Unicode sort order provided by JavaScript's [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.

```console
$ cat capitals.yaml
Japan: Tokyo
Turkey: Ankara
Australia: Canberra
Spain: Madrid
$ ori @tree/sort capitals.yaml
Australia: Canberra
Japan: Tokyo
Spain: Madrid
Turkey: Ankara
```

If a `keyFn` parameter is supplied, this evaluates that function for each tree key to determine a sort key. The sort key must support comparison via the JavaScript `<` (less than) and `>` (greater than) operators.

```console
$ cat capitals.yaml
Japan: Tokyo
Turkey: Ankara
Australia: Canberra
Spain: Madrid
$ ori @tree/sort capitals.yaml, =@value
Turkey: Ankara
Australia: Canberra
Spain: Madrid
Japan: Tokyo
```

<a name="static"></a>

## @tree/static(treelike)

This adds keys to the tree which are commonly used when deploying a static web site:

- `index.html`
- `.keys.json` (see details on [.keys.json](/core/SiteTree.html#keysjson-files) files)

<a name="table"></a>

## @tree/table(treelike)

Returns a basic tabular representation of the keys and values in the indicated `tree`.

If the tree is flat — that is, has only a single level of keys and values — the table will have two columns listing those.

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori table greetings.yaml
Key     Value
Alice   Hello, Alice.
Bob     Hello, Bob.
Carol   Hello, Carol.
```

If the tree has two levels, the row headings will contain the top-level keys, and the column headings will be the second-level keys. (The first subtree in the tree will be taken as representative of the remaining subtrees.)

```console
$ ori languages.json
{
  "english": {
    "a": "Hello, a.",
    "b": "Hello, b.",
    "c": "Hello, c."
  },
  "french": {
    "a": "Bonjour, a.",
    "b": "Bonjour, b.",
    "c": "Bonjour, c."
  },
  "spanish": {
    "a": "Hola, a.",
    "b": "Hola, b.",
    "c": "Hola, c."
  }
}
$ ori @tree/table languages.json | column -t -s$'\\\t'
         a            b            c
english  Hello, a.    Hello, b.    Hello, c.
french   Bonjour, a.  Bonjour, b.  Bonjour, c.
spanish  Hola, a.     Hola, b.     Hola, c.
```

`table` separates columns with TAB characters. To ensure visual column alignment requires using other shell tools (such as [column](https://www.man7.org/linux/man-pages/man1/column.1.html), above).

<a name="take"></a>

## @tree/take(treelike, n)

Returns a copy of the given tree, with the additional restriction that the new tree's `keys` method will return only (at most) the first `n` keys.

```console
$ cat letters.yaml
a: The letter A
b: The letter B
c: The letter C
$ ori @tree/take letters.yaml, 2
a: The letter A
b: The letter B
```

<a name="values"></a>

## @tree/values([treelike])

Returns an array of the top-level values in the tree.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @tree/values greetings.yaml
- Hello, Alice.
- Hello, Bob.
- Hello, Carol.
```

See also [keys](#keys).

<a name="valuesDeep"></a>

## @tree/valuesDeep(treelike)

Return the in-order exterior values of the tree as a flat array.

```console
$ cat greetings.yaml
english:
  a: Hello, a.
  b: Hello, b.
  c: Hello, c.
french:
  a: Bonjour, a.
  b: Bonjour, b.
  c: Bonjour, c.
spanish:
  a: Hola, a.
  b: Hola, b.
  c: Hola, c.
$ ori @tree/valuesDeep greetings.yaml
- Hello, a.
- Hello, b.
- Hello, c.
- Bonjour, a.
- Bonjour, b.
- Bonjour, c.
- Hola, a.
- Hola, b.
- Hola, c.
```
