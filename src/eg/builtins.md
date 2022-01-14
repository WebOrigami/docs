---
title: Built-In Functions
path: /eg/builtins.html
---

These examples generally demonstrate invoking built-in functions from the command line, although the same functions can also be used in Egret formulas.

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

<a name="files"></a>

## files([dirname])

Returns an [ExplorableFiles](/core/ExplorableFiles.html) representation of the current directory or (if `dirname` is supplied) subdirectory named `dirname` within the current directory.

<a name="graph"></a>

## graph(variant)

Converts any graph [variant](/core/variants.html) into an explorable graph.

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

<a name="serve"></a>

## serve([graph], [port])

Starts a local web server to serve the contents of `graph`. To serve the current folder:

```console
$ eg serve .
Server running at http://localhost:5000
```

A web route like `a/b/c` will be turned into a graph traversal operation that returns the graph value at that path.

If no `graph` is supplied, `serve` uses the current graph (from the command line, that will be the current folder) transformed via the [app](#app) function into an application.

<a name="stdin"></a>

## stdin()

Returns the complete contents of the standard input stream. This lets you pipe data into JavaScript functions:

```console
$ eg uppercase.js
export default (x) => x.toString().toUpperCase();
$ echo This is input from the shell | eg uppercase stdin
THIS IS INPUT FROM THE SHELL
```

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
