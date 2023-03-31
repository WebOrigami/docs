---
title: Using graphs with the ori CLI
numberHeadings: true
---

## Explorable graphs

ori is especially good at dealing with graphs. More specifically, ori is designed to work with _explorable graphs_: a graph that can tell you what's in it, and can be either synchronous or asynchronous. Many common data structures can be represented as explorable graphs.

<span class="tutorialStep"></span> One way to define an explorable graph is in [YAML](https://yaml.org/) format.

```console
$ ori greetings.yaml
{{ client/samples/cli.yaml/greetings.yaml }}
```

ori can interpret this file as the following graph:

<figure>
{{ @svg client/samples/cli.yaml/greetings.yaml }}
</figure>

The YAML data format shown above can be easier for people to read than formats like JSON. If you prefer, you can just as easily use the ubiquitous JSON format.

ori itself natively understands several types of explorable graphs:

- JSON
- YAML
- JavaScript objects
- JavaScript arrays
- JavaScript functions
- folder trees
- web sites (some operations require support for [.keys.json](/ori/.keys.json) files, discussed later)
- any object that implements the [Explorable](/core/explorable.html) interface

## Extract specific values out of a graph

<span class="tutorialStep"></span> You can use path syntax to extract a specific value from a graph.

```console
$ ori greetings.yaml/Alice
Hello, Alice.
```

The `greetings.yaml` graph is a flat list, but it can be a hierarchical tree or arbitrarily complex.

<span class="tutorialStep"></span> An explorable graph can also be invoked like a function, so you also have the option of using function call syntax:

```console
$ ori "greetings.yaml('Alice')"
Hello, Alice.
```

<span class="tutorialStep"></span> You can easily combine ori features like JSON/YAML parsing, path syntax, and function invocation to have ori parse a specific value out of a graph and feed that directly to your function.

```console
$ ori uppercase greetings.yaml/Alice
HELLO, ALICE.
```

## Translate JSON to YAML and vice versa

<span class="tutorialStep"></span> You can use ori to transform a graph from one format to another. By default, ori renders graphs in YAML format, but you can ask for JSON format with the [@json](/language/@json.html) function:

```console
$ ori greetings.yaml
{{ client/samples/cli.yaml/greetings.yaml }}$ ori @json greetings.yaml
{{ @json client/samples/cli.yaml/greetings.yaml }}
```

<span class="tutorialStep"></span> In the other direction, you can render a JSON file as YAML with the [@yaml](/language/@yaml.html) function:

```console
$ ori letters.json
{{ client/samples/cli.yaml/letters.json }}$ ori @yaml letters.json
{{ @yaml client/samples/cli.yaml/letters.json }}
```

The `@json` function isn't a specific YAML-to-JSON transformation; it can transform any graph to JSON text. Similarly, `@yaml` can transform any graph to YAML text.

## Parse JSON/YAML files

You can use ori to parse a JSON or YAML file into a plain JavaScript object that your JavaScript function can then handle.

Suppose you have a focused function that does something with a flat, plain object. Perhaps it returns the text of an object's values:

```console
$ ori text.js
export default function text(obj) {
  return Object.values(obj).join("\\\t");
}
```

<span class="tutorialStep"></span> You can use the built-in `@graph/plain` function to convert a YAML file to a plain JavaScript object, then pass that to the sample `text` function:

```console
$ ori text @graph/plain greetings.yaml
Hello, Alice.   Hello, Bob.     Hello, Carol.
```

<span class="tutorialStep"></span> Or pass a parsed JSON file to your function:

```console
$ ori text @graph/plain letters.json
The letter A    The letter B    The letter C
```

Separating the parsing from your function like this lets you keep your function as general as possible.

## Render the current file system tree as a graph

<span class="tutorialStep"></span> The file system is just another graph that ori natively understands. If you give ori a path to a folder, it will treat that as a graph. For example, you can specify the current folder with a period (`.`):

```console
$ ori .
```

This will render the complete contents of the current folder, including subfolders, in YAML.

<span class="tutorialStep"></span> You can capture that result to package up the current folder as a YAML file.

```console
$ ori . > files.yaml
```

<span class="tutorialStep"></span> Or package the folder as JSON:

```console
$ ori @json . > files.json
```

## Unpack files into the file system

<span class="tutorialStep"></span> This ori introduction began with you unpacking a YAML file into separate files. As another example, you can unpack the greetings in `greetings.yaml` into individual files:

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @copy greetings.yaml, @files/greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The `@files/greetings` argument indicates that [@copy](/language/@copy.html) should copy the input YAML graph to a file system graph under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

<span class="tutorialStep"></span> The important point here is that _all graphs look the same to ori_. It doesn't matter whether a graph is defined in a single file like YAML, or a collection of loose files in the file system. Having unpacked the `greetings.yaml` file above, we can ask ori to display the `greetings` folder we just created:

```console
$ ori greetings
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

It _looks_ like `greetings` is a YAML file, but it's not — it's really a folder. ori is just displaying the folder's contents in the default YAML output format. Each line of that output is actually coming from a different file.

The `greetings` folder and the `greetings.yaml` file both define the same graph, even though the underlying data is stored in completely different ways and accessed via different APIs.

## Process a folder tree as a JavaScript object

<span class="tutorialStep"></span> Because the `greetings` folder created in the above example is just another graph ori can process, you can feed it to the simple JavaScript function `text(obj)` shown earlier that displayed the text values of a plain JavaScript object.

```console
$ ori text @graph/plain greetings
Hello, Alice.   Hello, Bob.     Hello, Carol.
```

This connects two ideas:

- A folder like `greetings` is a explorable graph ori can understand.
- ori to convert any graph to a plain JavaScript object with the `@graph/plain` function.

This means that you can use the `@graph/plain` function to convert a _folder_ to a plain JavaScript object too. The keys will be the file/folder names, and the values will be the file contents or folder subgraphs.

Writing code to work with folder and files this way can be much easier than using Node's file system API directly. There is a performance trade-off implied by building an in-memory object to hold the file system data, but in many cases this is still very fast. And in practice it can much easier to manipulate a complete file system hierarchy as an in-memory object than working with a file system API.

Another important benefit of working with explorable graphs is that you can change your mind later about how you want to represent data without having to rewrite code that processes that data. You could start a small project by representing data in a single file and then, if your needs change later, switch to representing that data in a hierarchical tree of files, or data stored as web resources.

&nbsp;

Next: [Transforming data and graphs](intro4.html) »
