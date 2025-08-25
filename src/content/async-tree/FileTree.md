---
title: FileTree class
subtitle: Wraps a file system directory as an async tree
---

This class wraps the Node.js [`fs`](https://nodejs.org/api/fs.html) file system API so that you can work with a file system folder as an async tree.

## JavaScript usage

Pass the `FileTree` constructor a `location` that's either a `file:` URL or a file system path. A relative path will be resolved with respect to the current working directory.

To get a folder relative to the JavaScript module itself, construct a URL relative to [`import.meta.url`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta).

```js
import { FileTree } from "@weborigami/async-tree";

// Get the tree of files in the "assets" folder next to this module
const files = new FileTree(new URL("assets", import.meta.url));

// Get a stylesheet from the assets folder
const styles = await files.get("styles.css");
```

## API

${ src/templates/class.ori(api/drivers/FileTree.yaml/exports/0) }
