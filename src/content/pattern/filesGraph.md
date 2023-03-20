---
title: File graphs
---

We now have a working markdown-to-HTML system. Depending on our needs, we might be done. At this point, the markdown content is stored in a JavaScript object defined in a single JavaScript file. As discussed earlier, there are a number of other data representations and storage systems we could choose.

Which approach is best for our particular team authors might vary, but as an example let's look at how we can transition our system to read markdown from file system folders because that's relatively simple. The graph approach we're taking is flexible, so we could change our mind again later.

## Comparing files and objects

Before starting, let's quickly look at both objects and files through the lens of the Explorable interface. In both cases, we have standard ways of getting keys — in the case of folders and files, the keys are folder and file names. And in both cases, we have a way of getting the value or content associated with a given key.

| Explorable interface method &emsp; | Object implementation &emsp; | File implementation   |
| :--------------------------------- | :--------------------------- | :-------------------- |
| `get(key)`                         | `obj[key]`                   | `fs.readFile(key)`    |
| `keys()`                           | `Object.keys(obj)`           | `fs.readdir(dirname)` |

If we're using the Node `fs` API, we have our choice of synchronous or asynchronous methods, but there are performance benefits to be gained by using the asynchronous API.

It's worth noting how much of the `fs` API is _not_ necessary for our task at hand. The full API has a wide range of features for comparatively obscure tasks like changing a file's modified date, renaming a file, or creating a symbolic link. Those features are necessary for some applications — but it's reasonable to imagine that the vast majority of users of the `fs` API are using just the `readdir` and `readFile` methods shown above.

## Rough in the file graph

To start on our file-backed graph implementation, we'll need to get a path to the directory that will be the root of the graph. In this case, we use some Node APIs to get the directory of a folder relative to the folder containing the JavaScript module we're writing.

Our goal is to then return an object implementing the Explorable interface for that folder.

```js
/* src/flat/files.js */

import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleFolder = path.dirname(fileURLToPath(import.meta.url));
const dirname = path.resolve(moduleFolder, "markdown");

export default {
  async get(key) {
    /* TODO */
  },
  async keys() {
    /* TODO */
  },
};
```

## Get the folder's keys

To get the keys for the folder, we'll ask the `fs.readdir` API for the list of file names in that folder, then yield the names in that list.

```js
  async keys() {
    const filenames = await fs.readdir(dirname);
    return filenames;
  },
```

## Get the contents of a file

To implement the `get` method in the Explorable interface, we'll use the `fs.readFile` API to read the contents of the file with the indicated key/name.

```js
  async get(key) {
    const filename = path.resolve(dirname, key);
    try {
      return await fs.readFile(filename);
    } catch (error) {
      if (error.code === "ENOENT") {
        return undefined;
      }
      throw error;
    }
  },
```

This `get` method includes some error handling. The Explorable interface expects the `get` method to return `undefined` for an unsupported key, but the `fs.readFile` API will throw an exception if a file does not exist with the indicated name. To create a well-behaved explorable graph, we catch exceptions and, if the exception is specifically an `ENOENT` (file not found) exception, we return undefined.

## Test the files graph

We can test this files graph, once again copying-and-pasting the tests used for the explorable object implementation:

```{{'js'}}
/* src/flat/files.test.js */

{{ pattern-intro/flat/files.test.js }}
```

<span class="tutorialStep"></span> Run these tests to see that all test pass:

```console
$ node files.test.js
…
# tests 3
# pass 3
# fail 0
```

## Display the files

<span class="tutorialStep"></span> Use our `json` utility from inside the `src/flat` folder to render the folder as JSON:

```console
$ node json files.js
{{ json pattern-intro/flat/files }}
```

That's a single chunk of data now — but the keys of that object came from a directory listing, and each of those values is content from a separate file!

<span class="tutorialStep"></span> Observe that this is the exact same output as the object implementation:

```console
$ node json object.js
{{ json pattern-intro/flat/object }}
```

The critical bit here is that the `json` utility required no modification to work with the new files-based graph. We wrote the `json` utility to work with explorable graphs, and the folder is just another explorable graph.

## Transform the folder

Since our folder is now available to us in graph form, we can convert its markdown content to HTML using the transform we already wrote. We can start with the same graph+transform module we created in `htmlObject.js`, and just change where the graph is coming from.

```{{'js'}}
/* src/flat/htmlFiles.js */

{{ pattern-intro/flat/htmlFiles.js }}
```

<span class="tutorialStep"></span> View the HTML translation of the markdown files in the `markdown` folder.

```console
$ node json htmlFiles.js
{{ json pattern-intro/flat/transform pattern-intro/flat/htmlFiles }}
```

The transform function can accept any graph of markdown content, so we can switch between our object and folder graph implementations at will. If we wanted to read the markdown content from a CMS, we could create a graph implementation backed by the CMS, then directly apply the unmodified transform function to that graph.

Both our JSON utility and markdown-to-HTML transformation are completely independent of the underlying data representation and storage location.

&nbsp;

Next: [Function graphs](functionGraph.html)
