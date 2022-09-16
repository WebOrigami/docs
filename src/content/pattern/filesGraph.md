---
title: File graphs
numberHeadings: true
intro = client/samples/patternIntro:
---

We now have a working markdown-to-HTML system. Depending on our needs, we might be done. But the markdown content is stored in a JavaScript object defined in a JavaScript file. As discussed earlier, there are a number of other data representations and storage systems we could choose.

Which approach is best for our particular team authors might vary, but as an example let's look at how we can transition our system to read markdown from file system folders because that's relatively simple. The graph approach we're taking is flexible, so we could change our mind again later.

## Comparing files and objects

Before starting, let's quickly look at both objects and files through the lens of the Explorable interface. In both cases, we have standard ways of getting keys — in the case of folders and files, the keys are folder and file names. And in both cases, we have a way of getting the value or content associated with a given key.

| Explorable interface method &nbsp;&nbsp;&nbsp; | Object implementation &nbsp;&nbsp; | File implementation   |
| :--------------------------------------------- | :--------------------------------- | :-------------------- |
| `asyncIterator`                                | `Object.keys(obj)`                 | `fs.readdir(dirname)` |
| `get(key)`                                     | `obj[key]`                         | `fs.readFile(key)`    |

If we're using the Node `fs` API, we have our choice of synchronous or asynchronous methods, but there are performance benefits to be gained by using the asynchronous API.

## Rough in the file graph

To start on our file-backed graph implementation, we'll need to get a path to the directory that will be the root of the graph. In this case, we use some Node APIs to get the directory of a folder relative to the folder containing the JavaScript module we're writing.

Our goal is to then return an Explorable graph for that folder.

```{{'js'}}
{{ intro/round2complete/folder1.js }}
```

## Get the folder's keys

To get the keys for the folder, we'll ask the `fs.readdir` API for the list of file names in that folder, then yield the names in that list.

```{{'js'}}
{{ intro/round2complete/folder2.js }}
```

Although the graph implementation is not yet complete, we can verify our work at this point by asking ori to display the keys of this graph.

```console
$ ori keys folder
- Alice.md
- Bob.md
- Carol.md
```

## Get the contents of a file

To implement the `get` method in the Explorable interface, we'll use the `fs.readFile` API to read the contents of the file with the indicated key/name.

```{{'js'}}
{{ intro/round2complete/folder.js }}
```

This `get` method includes some error handling. The Explorable interface expects the `get` method to return `undefined` for an unsupported key, but the `fs.readFile` API will throw an exception if a file does not exist with the indicated name. To create a well-behaved file graph, we catch exceptions and, if the exception is specifically a `ENOENT` (file not found) exception, we return undefined.

<span class="tutorialStep"></span> Use ori to verify the folder graph works as expected:

```console
$ ori folder
{{ yaml intro/round2complete/folder }}
```

Each of those lines of output includes content from a separate file.

<span class="tutorialStep"></span> Compare this with the object graph, and verify that the results are exactly the same:

```console
$ ori object
{{ yaml intro/round2complete/object }}
```

## Transform the folder

Since our folder is now available to us in graph form, we can convert its markdown content to HTML using the transform we already wrote _without any modification_.

```console
$ ori transform folder
{{ yaml intro/round2complete/transform intro/round2complete/folder }}
```

The transform function can accept any graph of markdown content, so we can switch between our object and folder graph implementations at will. If we wanted to read the markdown content from a CMS, we could create a graph implementation backed by the CMS, then directly apply the unmodified transform function to that graph.

## Serve the transformed folder

&nbsp;

Next: [Copy a graph](intro6.html)
