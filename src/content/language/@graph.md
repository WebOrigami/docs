---
title: "@graph"
---

This collection of functions operates on async graphs. Functions that accept a `graph` parameter will accept any [graph variant](/core/variants.html).

<a name="concat"></a>

## @graph/concat(...objs)

Converts the indicated objects to strings, then returns the concatenated strings.

- If an object is a function, it is invoked, then these rules are applied to the result.
- If an object is a graph, this concatenates the deep values in the graph.
- If an object can be converted to a string, it is. Otherwise, the empty string is used.

To concatenate two strings:

```console
$ ori "@graph/concat 'foo', 'bar'"
foobar
```

To concatenate the values in a graph:

```console
$ cat greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @graph/concat greetings.yaml
Hello, Alice.Hello, Bob.Hello, Carol.
```

<a name="dot"></a>

## @graph/dot(graph)

Returns a text representation of the indicated graph in the [DOT](https://graphviz.org/documentation/) graph description language. Various tools exist to render such a DOT representation into various graph formats such as PNG or SVG.

If you want a basic visual representation of a graph, use the [@svg()](@svg.html) function instead. Use the `dot` function only if you want to use other DOT tools to render a graph.

<a name="expand"></a>

## @graph/expand(graph)

Expands any graph nodes which can be treated as [graph variant](/core/variants.html) values (e.g., YAML/JSON text) into subgraphs.

<a name="first"></a>

## @graph/first(graph)

Returns the first value in `graph`.

<a name="from"></a>

## @graph/from(variant)

Converts any [graph variant](/core/variants.html) into an async graph.

<a name="inners"></a>

## @graph/inners(graph)

Returns the graph's interior nodes, i.e., its nodes that have children.

<a name="keys"></a>

## @graph/keys([graph])

Returns an array of the top-level keys in the indicated graph.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @graph/keys greetings.yaml
- Alice
- Bob
- Carol
```

See also [values](#values).

<a name="merge"></a>

## @graph/merge(...graphs)

Returns a graph that is the result of merging the indicated graphs.

```console
$ cat graph1.yaml
a: The letter A
b: The letter B
c: The letter C
$ cat graph2.yaml
c: This won't appear in the merge
d: The letter D
e: The letter E
$ ori @graph/merge graph1.yaml, graph2.yaml
a: The letter A
b: The letter B
c: The letter C
d: The letter D
e: The letter E
```

When asked for a key, the merged graph asks each of the constituent graphs in turn for that key; the first defined result is returned. In the example above, getting `c` returns the result from `graph1.yaml`, because that is the first graph that defines a value for `c`.

The merge operation is shallow; for a deep merge operation, see [mergeDeep()](#mergeDeep).

<a name="mergeDeep"></a>

## @graph/mergeDeep(...graphs)

Like [merge()](#merge), but performs a deep merge: if multiple graphs define values for the same key, and those values are themselves async graphs, then those values themselves will be merged.

<a name="nextKey"></a>

## @graph/nextKey(graph, key)

Enumerates the graph's key until `key` is found, then returns the next key in the graph.

<a name="nulls"></a>

## @graph/nulls(graph)

Returns a new graph with all values equal to null.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @graph/nulls greetings.yaml
? Alice
? Bob
? Carol
```

`nulls` can be useful when you want to display the structure of a graph (especially a hierarchical graph) without concern for the actual data values.

<a name="parent"></a>

## @graph/parent(graph)

If the graph has a `parent` property, this returns the value of that property.

<a name="plain"></a>

## @graph/plain([graph])

Converts an asynchronous async graph into a synchronous plain JavaScript object. The supplied argument can be any [graph variant](/core/variants.html) such as a JSON/YAML file, file system folder, etc. If omitted, `plain` converts the current graph — in the command line, this will be the current folder — to a plain JavaScript object.

A common use for `plain` is to convert a graph into a form that you can pass to any function that works with plain JavaScript objects.

<a name="previousKey"></a>

## @graph/previousKey(graph, key)

Enumerates the graph's key until `key` is found, then returns the previous key in the graph.

<a name="reverse"></a>

## @graph/reverse(graph)

Reverses the order of keys in the graph.

```console
$ cat letters.yaml
a: The letter A
b: The letter B
c: The letter C
$ ori @graph/reverse letters.yaml
c: The letter C
b: The letter B
a: The letter A
```

<a name="setDeep"></a>

## @graph/setDeep(target, source)

Recursively applies updates from the `source` graph to the `target` graph.

The `target` graph must support the [`set`](/core/set.html) method. The only types of graphs defined in the GraphOrigami [core library](/core) that provides such support are [ObjectGraph](/core/ObjectGraph.html) and [FilesGraph](/core/FilesGraph.html).

<a name="shuffle"></a>

## @graph/shuffle(graph)

Returns a new graph with the original `graph` keys randomly shuffled.

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @graph/shuffle greetings.yaml
Carol: Hello, Carol.
Alice: Hello, Alice.
Bob: Hello, Bob.
$ ori @graph/shuffle greetings.yaml
Carol: Hello, Carol.
Bob: Hello, Bob.
Alice: Hello, Alice.
```

<a name="sort"></a>

## @graph/sort(graph, [keyFn])

Returns a copy of the indicated [graph variant](/core/variants.html) with the keys sorted. The sort is performed with the default lexicograph Unicode sort order provided by JavaScript's [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.

```console
$ cat capitals.yaml
Japan: Tokyo
Turkey: Ankara
Australia: Canberra
Spain: Madrid
$ ori @graph/sort capitals.yaml
Australia: Canberra
Japan: Tokyo
Spain: Madrid
Turkey: Ankara
```

If a `keyFn` parameter is supplied, this evaluates that function for each graph key to determine a sort key. The sort key must support comparison via the JavaScript `<` (less than) and `>` (greater than) operators.

```console
$ cat capitals.yaml
Japan: Tokyo
Turkey: Ankara
Australia: Canberra
Spain: Madrid
$ ori @graph/sort capitals.yaml, =@value
Turkey: Ankara
Australia: Canberra
Spain: Madrid
Japan: Tokyo
```

<a name="static"></a>

## @graph/static(graph)

This adds keys to the graph which are commonly used when deploying a static web site:

- `index.html`
- `.keys.json` (see details on [.keys.json](/core/SiteGraph.html#keysjson-files) files)

<a name="table"></a>

## @graph/table(graph)

Returns a basic tabular representation of the keys and values in the indicated `graph`.

If the graph is flat — that is, has only a single level of keys and values — the table will have two columns listing those.

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

If the graph has two levels, the row headings will contain the top-level keys, and the column headings will be the second-level keys. (The first subgraph in the graph will be taken as representative of the remaining subgraphs.)

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
$ ori @graph/table languages.json | column -t -s$'\\\t'
         a            b            c
english  Hello, a.    Hello, b.    Hello, c.
french   Bonjour, a.  Bonjour, b.  Bonjour, c.
spanish  Hola, a.     Hola, b.     Hola, c.
```

`table` separates columns with TAB characters. To ensure visual column alignment requires using other shell tools (such as [column](https://www.man7.org/linux/man-pages/man1/column.1.html), above).

<a name="take"></a>

## @graph/take(graph, n)

Returns a copy of the given graph, with the additional restriction that the new graph's `keys` method will return only (at most) the first `n` keys.

```console
$ cat letters.yaml
a: The letter A
b: The letter B
c: The letter C
$ ori @graph/take letters.yaml, 2
a: The letter A
b: The letter B
```

<a name="values"></a>

## @graph/values([graph])

Returns an array of the top-level values in the graph.

```console assert: true, path: files
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @graph/values greetings.yaml
- Hello, Alice.
- Hello, Bob.
- Hello, Carol.
```

See also [keys](#keys).

<a name="valuesDeep"></a>

## @graph/valuesDeep(graph)

Return the in-order exterior values of the graph as a flat array.

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
$ ori @graph/valuesDeep greetings.yaml
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
