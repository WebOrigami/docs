---
title: File maps
---

We now have a working markdown-to-HTML system. Depending on our needs, we might be done. At this point, the markdown content is stored in a JavaScript object defined in a single JavaScript file. As discussed earlier, there are a number of other data representations and storage systems we could choose.

Which approach is best for our particular team authors might vary, but as an example let's look at how we can transition our system to read markdown from file system folders because that's relatively simple. The `Map`-based approach we're taking is flexible, so we could change our mind again later.

## Comparing files and objects

Before starting, let's quickly look at both objects and files through the lens of the `Map` interface. In both cases, we have standard ways of getting keys — in the case of folders and files, the keys are folder and file names. And in both cases, we have a way of getting the value or content associated with a given key.

| Map method &emsp; | Object implementation &emsp; | File implementation       |
| :---------------- | :--------------------------- | :------------------------ |
| `get(key)`        | `obj[key]`                   | `fs.readFileSync(key)`    |
| `keys()`          | `Object.keys(obj)`           | `fs.readdirSync(dirname)` |

If we're using the Node `fs` API, we have our choice of synchronous or asynchronous methods, but for simplicity here we'll use the synchronous methods.

It's worth noting how much of the `fs` API is _not_ necessary for our task at hand. The full API has a wide range of features for comparatively obscure tasks like changing a file's modified date, renaming a file, or creating a symbolic link. Those features are necessary for some applications — but it's reasonable to imagine that the vast majority of users of the `fs` API are using just the methods shown above.

## Rough in the file map

To start on our file-backed map implementation, we'll need to get a path to the directory that will be the root of the map. In this case, we use some Node APIs to get the directory of a folder relative to the folder containing the JavaScript module we're writing.

Our goal is to then return an object implementing the `Map` interface for that folder.

```js
/* src/map/FileMap.js */

import * as fs from "node:fs";
import path from "node:path";

export default class FileMap extends Map {
  constructor(dirname) {
    super();
    this.dirname = path.resolve(process.cwd(), dirname);
  }

  get(key) {
    /* TODO */
  }

  keys() {
    /* TODO */
  }
}
```

## Get the folder's keys

To get the keys for the folder, we'll ask the `fs.readdirSync` method for the list of file names in that folder, then yield the names in that list.

```js
  *keys() {
    yield* fs.readdirSync(this.dirname);
  },
```

## Get the contents of a file

To implement the `get` method in the AsyncTree interface, we'll use the `fs.readFileSync` method to read the contents of the file with the indicated key/name.

```js
  get(key) {
    const filename = path.resolve(dirname, key);
    try {
      return await fs.readFileSync(filename);
    } catch (error) {
      if (error.code === "ENOENT") {
        return undefined; /* File not found */
      }
      throw error;
    }
  },
```

This `get` method includes some error handling. The Map interface expects the `get` method to return `undefined` for an unsupported key, but the `fs.readFileSync` API will throw an exception if a file does not exist with the indicated name. To create a well-behaved async tree, we catch exceptions and, if the exception is specifically an `ENOENT` (file not found) exception, we return `undefined`.

## Test the file map

We can test this file map by instantiating it, pointing it at a local `markdown` folder:

```js
/* src/map/files.js */

${ pattern/map/files.js }
```

We can test this file map, once again copying-and-pasting the tests used for the object-based `Map` implementation:

```${'js'}
/* src/map/files.test.js */

${ pattern/map/files.test.js }
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

<span class="tutorialStep"></span> Use our `json` utility from inside the `src/map` folder to render the folder as JSON:

```console
$ node json files.js
${ Tree.json(pattern/map/files.js) + "\n" }
```

That's a single chunk of data now — but the keys of that object came from a directory listing, and each of those values is content from a separate file!

<span class="tutorialStep"></span> Observe that this is the exact same output as the object implementation:

```console
$ node json object.js
${ Tree.json(pattern/map/object.js) + "\n" }
```

The critical bit here is that the `json` utility required no modification to work with the new files-based `Map`. We wrote the `json` utility to work with any `Map`, and the folder is just another `Map`. While it would have been possible to hard-code support for objects and file system folders into the `json` utility, that approach would be harder to maintain and less flexible.

This `Map`-based approach is superior because the `Map` interface is entire abstract. This allows us to factor our code better — but even more importantly, to accommodate future `Map` classes that we don’t even know about at the time we’re writing code like the `json` utility.

## Transform the folder

Since our folder is now available to us in map form, we can convert its markdown content to HTML using the transform we already wrote. We can start with the same map-transforming module we created in `htmlObject.js`, and just change where the map is coming from.

```${'js'}
/* src/map/htmlFiles.js */

${ pattern/map/htmlFiles.js }
```

<span class="tutorialStep"></span> View the HTML translation of the markdown files in the `markdown` folder.

```console
$ node json htmlFiles.js
${ Tree.json(pattern/map/htmlFiles.js) + "\n" }
```

The transform function can accept any map of markdown content, so we can switch between our object and folder map implementations at will. Both our JSON utility and markdown-to-HTML transformation are completely independent of the underlying data representation and storage location.

&nbsp;

Next: [Function map](functionMap.html)
