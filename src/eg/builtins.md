---
title: Built-In Functions
path: /eg/builtins.html
---

These examples generally demonstrate invoking built-in functions from the command line, although the same functions can also be used in Egret formulas.

<a name="app"></a>

## app([key])

Returns the current graph as an explorable application. This creates an [ExplorableFiles](/core/ExplorableFiles.html) at the current graph or folder, then wraps that in a [graphApp](#graphApp).

If a key is supplied, this gets the indicated key from the resulting explorable application.

<a name="clean"></a>

## clean()

_This experimental function is not yet stable enough to document._

<a name="compose"></a>

## compose(...graphs)

This composes the indicated graphs, which can be any graph [variant](/core/variants.html), using [Compose](/core/Compose.html).

<a name="config"></a>

## config([relativePath])

This returns the graph for the active `eg` configuration that applies to the indicated directory. This directory will be the current folder, or the folder at the indicated `relativePath` if supplied.

<a name="copy"></a>

## copy(sourceGraph, targetGraph)

Traverses the `sourceGraph` and writes all values into the `targetGraph`.

For example, to copy the values from a YAML file into individual files:

```console
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ eg copy greetings.yaml, files/greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The `files/greetings` argument indicates that `copy` should copy the input YAML graph to a file system graph under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

The `targetGraph` must support the [`set`](/core/set.html) method. The only types of graphs defined in the ExplorableGraph [core](/core) that provides such support are [ExplorableObject](/core/ExplorableObject.html) and [ExplorableFiles](/core/ExplorableFiles.html). Only the latter provides persistent effects, so `copy` is typically used to copy the values from the source graph into file system files.

<a name="defaultGraph"></a>

## defaultGraph([relativePath])

Returns the default graph that will be used by `eg` as the scope for evaluating commands. This graph will be the current folder, or the folder at the indicated `relativePath` if supplied.

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
$ eg hello.md
​---
title: Hello
​---

Hello, world.
$ eg front hello.md
title: Hello
```

If the indicated text includes no front matter, this returns `undefined`.

<a name="graph"></a>

## graph(variant)

Converts any graph [variant](/core/variants.html) into an explorable graph.

<a name="graphApp"></a>

## graphApp(graph)

Wraps any graph [variant](/core/variants.html) as an [Egret](/egret) application. This will include the same [MetaTransform](/egret/MetaTransform.html) used by the [meta](#meta) function, as well as adding default pages like `index.html` via [DefaultPages](/egret/DefaultPages.html).

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

You normally won't need to call this function directly. `eg` will parse the URL `https://example.com/foo/bar` into the function call `https('example.com', 'foo', 'bar')` for you, so you can use the more readable URL format.

<a name="inners"></a>

## inners(graph)

Returns the inner nodes — the nodes with children — in the indicated `graph`.

<a name="json"></a>

## json(object)

Render the contents of the object in JSON format.

The `eg` tool uses YAML as its default output format, so you can use the `json` command to reformat the output as JSON:

```console
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ eg json greetings.yaml
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
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ eg keys greetings.yaml
- Alice
- Bob
- Carol
```

See also [values](#values).

<a name="make"></a>

## make()

_This experimental function is not yet stable enough to document._

<a name="map"></a>

## map()

<a name="mdHtml"></a>

## mdHtml()

<a name="meta"></a>

## meta()

<a name="nulls"></a>

## nulls()

<a name="parent"></a>

## parent()

<a name="parse"></a>

## parse(text)

Parses the indicated text as JSON or YAML. The parsed plain JavaScript object is returned or, if the parse fails, this returns `undefined`. This can be used to parse JSON or YAML files.

Parsing a quoted argument on the command line:

```console
$ eg parse "'[1, 2, 3]'"
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
$ eg serve .
Server running at http://localhost:5000
```

A web route like `a/b/c` will be turned into a graph traversal operation that returns the graph value at that path.

If no `graph` is supplied, `serve` uses the current graph (from the command line, that will be the current folder) transformed via the [app](#app) function into an application.

<a name="shallowMap"></a>

## shallowMap()

<a name="shell"></a>

## shell()

<a name="shuffle"></a>

## shuffle()

<a name="static"></a>

## static()

<a name="stdin"></a>

## stdin()

Returns the complete contents of the standard input stream. This lets you pipe data into JavaScript functions:

```console
$ eg uppercase.js
export default (x) => x.toString().toUpperCase();
$ echo This is input from the shell | eg uppercase stdin
THIS IS INPUT FROM THE SHELL
```

<a name="stdout"></a>

## stdout()

<a name="svg"></a>

## svg()

<a name="table"></a>

## table()

<a name="values"></a>

## values([graph])

Returns an array of the top-level values in the indicated graph, which can be any graph [variant](/core/variants.html).

```console
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ eg values greetings.yaml
- Hello, Alice.
- Hello, Bob.
- Hello, Carol.
```

See also [keys](#keys).

<a name="yaml"></a>

## yaml(object)

Render the contents of the object in YAML format.

The `eg` tool uses YAML as its default output format, so you won't often need to invoke the `yaml` function yourself from the command line. One occasion to use it would be to convert a JSON file to YAML.

```console
$ eg letters.json
{
  "a": "The letter A",
  "b": "The letter B",
  "c": "The letter C"
}
$ eg yaml letters.json
a: The letter A
b: The letter B
c: The letter C
```

<a name="watch"></a>

## watch()
