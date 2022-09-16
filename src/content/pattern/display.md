---
title: Display a graph
numberHeadings: true
intro = node_modules/@explorablegraph/pattern-intro/src/class:
---

Now that we've applied the Explorable interface to an object to create an explorable graph, let's write a simple tool that will display the contents of an explorable graph in the console. To stay as close to the platform as possible, we'll render the graph in JSON format. JSON isn't particularly friendly, but does support deep structures.

## Convert an explorable graph to a JavaScript object

An explorable graph is asynchronous, so we'll need to either traverse it asynchronously and display its values as we go, or else resolve the entire graph to a synchronous, in-memory object. We'll take the latter approach here.

```{{'js'}}
{{ intro/plain.js }}
```

It may feel counter-productive to do work to wrap a synchronous in-memory object with the asynchronous Explorable interface — and then immediately unwind all those asynchronous promises to get back an in-memory object!

But we'll soon be working with graphs that are inherently asynchronous, so it's worth tackling the general case now. We've still made an important step to separate the underlying representation of some hierarchical data with a tool to display such data.

## Dynamically import a JavaScript module

We could write a tool to statically import a specific graph we want to display, but our goal is a utility that can quickly display any graph. So let's have the tool parse a command line argument specifying the file name of a JavaScript module.

```{{'js'}}
{{ intro/display.js }}
```

The tool dynamically imports the indicated JavaScript file and gets its default export, which is expected to be an explorable graph. We then use the `plain` function above to resolve the graph to an in-memory object, then render the JSON for that object to the console.

## Display the graph in the console

TODO: display→json

```console
$ node display object.js
{{ json intro/plain intro/Object }}
```
