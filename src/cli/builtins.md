---
title: Built-In Functions
---

These examples generally demonstrate invoking built-in functions from the command line, although the same functions can also be used in Egret formulas.

<a name="cache"></a>

## cache(cache, graph, filter)

_This experimental function is not yet stable enough to document._

<a name="clean"></a>

## clean()

_This experimental function is not yet stable enough to document._

<a name="compose"></a>

## compose(...graphs)

This composes the indicated graphs, which can be any graph [variant](/core/variants.html), using [Compose](/core/Compose.html).

<a name="config"></a>

## config([relativePath])

This returns the graph for the active pika configuration that applies to the indicated directory. This directory will be the current folder, or the folder at the indicated `relativePath` if supplied.

<a name="copy"></a>

## copy(sourceGraph, targetGraph)

Traverses the `sourceGraph` and writes all values into the `targetGraph`.

For example, to copy the values from a YAML file into individual files:

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika copy greetings.yaml, files/greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The `files/greetings` argument indicates that `copy` should copy the input YAML graph to a file system graph under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

The `targetGraph` must support the [`set`](/core/set.html) method. The only types of graphs defined in the ExplorableGraph [core](/core) that provides such support are [ExplorableObject](/core/ExplorableObject.html) and [ExplorableFiles](/core/ExplorableFiles.html). Only the latter provides persistent effects, so `copy` is typically used to copy the values from the source graph into file system files.

<a name="defaultGraph"></a>

## defaultGraph([relativePath])

Returns the default graph that will be used by pika as the scope for evaluating commands. This graph will be the current folder, or the folder at the indicated `relativePath` if supplied.

The default graph will be an instance of [ExplorableFiles](/core/ExplorableFiles.html) transformed in various ways to facilitate commands. Among other things, if the resulting graph is asked for a key like `foo` which does not exist, the graph will make a second check to see if a module `foo.js` exists and, if so, to return the default export from that module.

<a name="dot"></a>

## dot(graph)

Returns a text representation of the indicated graph in the [DOT](https://graphviz.org/documentation/) graph description language. Various tools exist to render such a DOT representation into various graph formats such as PNG or SVG.

If you want a basic visual representation of a graph, use the [svg](#svg) function instead. Use the `dot` function only if you want to use other DOT tools to render a graph.

<a name="feedRss"></a>

## feedRss(graph)

Converts a graph of posts in [JSON Feed](https://www.jsonfeed.org/) format to [RSS](https://www.rssboard.org/rss-specification) format. The graph can be any graph [variant](/core/variants.html).

<a name="fetch"></a>

## fetch(url)

Returns a [Buffer](https://nodejs.org/api/buffer.html) of the web resource at `url`.

<a name="files"></a>

## files([dirname])

Returns an [ExplorableFiles](/core/ExplorableFiles.html) representation of the current directory or (if `dirname` is supplied) subdirectory named `dirname` within the current directory.

<a name="front"></a>

## front(text)

Returns any _front matter_ parsed from the start of the indicated text. The front matter data should be in JSON or YAML format and delimited before and after by three hyphens on a line by themselves.

```console
$ pika hello.md
​---
title: Hello
​---

Hello, world.
$ pika front hello.md
title: Hello
```

If the indicated text includes no front matter, this returns `undefined`.

<a name="graph"></a>

## graph(variant)

Converts any graph [variant](/core/variants.html) into an explorable graph.

<a name="graphVirtual"></a>

## graphVirtual(graph)

Wraps any graph [variant](/core/variants.html) as a virtual application using the Origami [framework](/framework). This will include the same [MetaTransform](/framework/MetaTransform.html) used by the [meta](#meta) function, as well as adding default pages like `index.html` via [DefaultPages](/framework/DefaultPages.html).

<a name="hbs"></a>

## hbs(template, input)

Returns the result of interpreting the `template` text as a [Handlebars](https://handlebarsjs.com/) template and applying that to the `input` data.

<a name="help"></a>

## help([name])

Displays this page, showing the documentation for the built-in function with the indicated name.

<a name="http"></a>

## http(domain, ...keys)

Returns an [ExplorableSite](/core/ExplorableSite.html) for the given HTTP URL. See also [https](#https) for details on arguments.

<a name="https"></a>

## https(domain, ...keys)

Returns an [ExplorableSite](/core/ExplorableSite.html) for the given HTTPS URL.

The first argument is a string indicating the URL domain; the remainder are the portions of the URL path within that domain. E.g., for the URL `example.com/foo/bar`, the arguments would be `example.com`, `foo`, and `bar`.

You normally won't need to call this function directly. pika will parse the URL `https://example.com/foo/bar` into the function call `https('example.com', 'foo', 'bar')` for you, so you can use the more readable URL format.

<a name="inners"></a>

## inners(graph)

Returns the inner nodes — the nodes with children — in the indicated `graph`.

<a name="json"></a>

## json(object)

Render the contents of the object in JSON format.

The pika tool uses YAML as its default output format, so you can use the `json` command to reformat the output as JSON:

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika json greetings.yaml
{
  "Alice": "Hello, Alice.",
  "Bob": "Hello, Bob.",
  "Carol": "Hello, Carol."
}
```

<a name="keys"></a>

## keys([graph])

Returns an array of the top-level keys in the indicated graph, which can be any graph [variant](/core/variants.html).

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika keys greetings.yaml
- Alice
- Bob
- Carol
```

See also [values](#values).

<a name="make"></a>

## make()

_This experimental function is not yet stable enough to document._

<a name="map"></a>

## map(graph, mapFn, [sourceExtension], [targetExtension])

Returns a new [MapGraph](/core/MapGraph.html) that applies the given `mapFn` to the values in the `graph`.

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika uppercase.js
export default (x) => x.toString().toUpperCase();
$ pika "map(greetings.yaml, uppercase)"
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Carol: HELLO, CAROL.
```

If a `sourceExtension` or `targetExtension` are supplied, this returns a [MapTypesGraph](/core/MapTypesGraph.html) instead, which will only apply the `mapFn` to values whose keys end in the indicated `sourceExtension`. In that case, the mapped `asyncIterator` will change the key's extension to the indicated `targetExtension`.

Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `map` function does not do any mapping work upon invocation — it only does the work when someone requests the mapped graph's keys or values.

The `mapFn` mapping function is typically a JavaScript function, but can be any graph [variant](/core/variants.html). For example, you can use a second [graph as a map](/pika/intro.html#use-a-graph-as-a-map).

`map` works on all levels of a graph. If you only want to transform the top-level values in a graph, see [shallowMap](#shallowMap).

<a name="mdHtml"></a>

## mdHtml(markdown)

Formats the indicated [markdown](https://github.github.com/gfm/) (GitHub-flavored) to HTML.

Any front matter in the markdown will be preserved at the top of the HTML output.

<a name="meta"></a>

## meta(graph)

Returns an Egret [metagraph](/framework/metagraph.html) by applying a [MetaTransform](/framework/MetaTransform.html) to the indicated graph. This interprets [formulas](/framework/formulas.html) in the graph's keys as pika expressions.

<a name="nulls"></a>

## nulls(graph)

Returns a new graph with all values equal to null.

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika nulls greetings.yaml
? Alice
? Bob
? Carol
```

`nulls` can be useful when you want to display the structure of a graph (especially a hierarchical graph) without concern for the actual data values.

<a name="parent"></a>

## parent(graph)

_This experimental function is not yet stable enough to document._

<a name="parse"></a>

## parse(text)

Parses the indicated text as JSON or YAML. The parsed plain JavaScript object is returned or, if the parse fails, this returns `undefined`. This can be used to parse JSON or YAML files.

Parsing a quoted argument on the command line:

```console
$ pika parse "'[1, 2, 3]'"
- 1
- 2
- 3
```

This is similar to the separate [plain](#plain) function, which can only parse JSON/YAML representing graphs. In contrast, the `parse` function can handle text representing things that aren't graphs, such as arrays, dates, and numbers.

<a name="plain"></a>

## plain([graph])

Converts an asynchronous explorable graph into a synchronous plain JavaScript object. The supplied argument can be any graph [variant](/core/variants.html) such as a JSON/YAML file, file system folder, etc. If omitted, `plain` converts the current graph — in the command line, this will be the current folder — to a plain JavaScript object.

A common use for `plain` is to convert a graph into a form that you can pass to any function that works with plain JavaScript objects.

<a name="scope"></a>

## scope()

<a name="serve"></a>

## serve([graph], [port])

Starts a local web server to serve the contents of `graph`. To serve the current folder:

```console
$ pika serve .
Server running at http://localhost:5000
```

A web route like `a/b/c` will be turned into a graph traversal operation that returns the graph value at that path.

If no `graph` is supplied, `serve` uses the current graph (from the command line, that will be the current folder) transformed via the [app](#app) function into an application.

<a name="shallowMap"></a>

## shallowMap(graph, mapFn)

Like [map](#map), but only transforms the top-level values of a graph. Any values which are subgraphs will be handed to the `mapFn` mapping function as is.

<a name="shell"></a>

## shell(command)

Returns the output of executing the indicated shell command.

<a name="shuffle"></a>

## shuffle(graph)

Returns a new graph with the original `graph` keys randomly shuffled.

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika shuffle greetings.yaml
Carol: Hello, Carol.
Alice: Hello, Alice.
Bob: Hello, Bob.
$ pika shuffle greetings.yaml
Carol: Hello, Carol.
Bob: Hello, Bob.
Alice: Hello, Alice.
```

<a name="static"></a>

## static(graph)

_This experimental function is not yet stable enough to document._

<a name="stdin"></a>

## stdin()

Returns the complete contents of the standard input stream. This lets you pipe data into JavaScript functions:

```console
$ pika uppercase.js
export default (x) => x.toString().toUpperCase();
$ echo This is input from the shell | pika uppercase stdin
THIS IS INPUT FROM THE SHELL
```

<a name="stdout"></a>

## stdout(obj)

Writes the indicated object `obj` to the standard output stream. This `stdout` function is used by pika itself to write the evaluated result of an expression to the console. If you wish to override the standard `stdout` implementation to, say, default to JSON output instead of YAML, you can do so by defining your own function named `stdout` in the pika [config file](/pika/config.html).

<a name="svg"></a>

## svg(graph)

Returns a Scalable Vector Graphics [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) text describing a two-dimensional visual representation of the indicated graph, which can be any [variant](/core/variants.html).

<a name="table"></a>

## table(graph)

Returns a basic tabular representation of the keys and values in the indicated `graph`.

If the graph is flat — that is, has only a single level of keys and values — the table will have two columns listing those.

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika table greetings.yaml
Key     Value
Alice   Hello, Alice.
Bob     Hello, Bob.
Carol   Hello, Carol.
```

If the graph has two levels, the row headings will contain the top-level keys, and the column headings will be the second-level keys. (The first subgraph in the graph will be taken as representative of the remaining subgraphs.)

```console
$ pika languages.json
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
$ pika table languages.json | column -t -s$'\t'
         a            b            c
english  Hello, a.    Hello, b.    Hello, c.
french   Bonjour, a.  Bonjour, b.  Bonjour, c.
spanish  Hola, a.     Hola, b.     Hola, c.
```

`table` separates columns with TAB characters. To ensure visual column alignment requires using other shell tools (such as [column](https://www.man7.org/linux/man-pages/man1/column.1.html), above).

<a name="values"></a>

## values([graph])

Returns an array of the top-level values in the indicated graph, which can be any graph [variant](/core/variants.html).

```console
$ pika greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ pika values greetings.yaml
- Hello, Alice.
- Hello, Bob.
- Hello, Carol.
```

See also [keys](#keys).

<a name="yaml"></a>

## yaml(object)

Render the contents of the object in YAML format.

The pika tool uses YAML as its default output format, so you won't often need to invoke the `yaml` function yourself from the command line. One occasion to use it would be to convert a JSON file to YAML.

```console
$ pika letters.json
{
  "a": "The letter A",
  "b": "The letter B",
  "c": "The letter C"
}
$ pika yaml letters.json
a: The letter A
b: The letter B
c: The letter C
```

<a name="watch"></a>

<a name="virtual"></a>

## virtual([key])

Returns the current graph as an explorable application. This creates an [ExplorableFiles](/core/ExplorableFiles.html) at the current graph or folder, then wraps that with a virtual app via [graphVirtual](#graphVirtual).

If a key is supplied, this gets the indicated key from the resulting explorable application.

## watch()

_This experimental function is not yet stable enough to document._
