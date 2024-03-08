---
title: Working with file types
---

Origami has specific knowledge of certain types of documents and files which are identified by file extension.

| Type       | File extensions                                |
| ---------- | ---------------------------------------------- |
| JavaScript | .js<br>.mjs                                    |
| JPEG image | .jpeg<br>.jpg                                  |
| JSON       | .json                                          |
| Origami    | .ori                                           |
| Text       | .css<br>.htm<br>.html<br>.md<br>.txt<br>.xhtml |
| YAML       | .yaml<br>.yml                                  |

## Representing files

The specific form a "file" takes can depend on how you reference it.

- When you reference a file in the file system in Origami, Origami uses a [FileTree](/async-tree/FileTree.html) to resolve the reference and return the value as a Node [Buffer](https://nodejs.org/api/buffer.html) object.
- When you reference a file on a site via a URL, Origami uses a [SiteTree](/async-tree/SiteTree.html) to resolve the reference and return the value as a JavaScript [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

## Unpacking files

Regardless of a file's representation, you can use Origami path syntax to traverse the file and work with a more meaningful representation that reflects the file's type. Origami determines how to "unpack" the file contents based on the file extension.

For example, suppose you have a JSON file `pet.json` containing

```json
{
  "name": "Fluffy",
  "owner": "Alice"
}
```

If you use the `ori` [CLI](/cli) to display this file, you will see the plain file contents:

```console
$ ori pet.json
{
  "name": "Fluffy",
  "owner": "Alice"
}
```

You can unpack this file and traverse into its data with a slash path:

```console
$ ori pet.json/name
Fluffy
```

Ending a path with a slash unpacks the file and returns all the data. By default, `ori` will display it in YAML format:

```console
$ ori pet.json/
name: Fluffy
owner: Alice
```

See below for details on specific types of files.

## JavaScript files

Unpacking a `.js` file returns the file's default export or, if there are multiple exports, all the exports. If that export is [treelike](/async-tree/treelike), you can traverse into that export using slash syntax.

Example: If `data.js` contains

```js
export default {
  a: 1,
};
```

then you can retrieve traverse the data with a slash path:

```console
$ ori data.js/a
1
```

## JPEG image files

JPEG images can contain metadata in [Exif](https://en.wikipedia.org/wiki/Exif) format. You can retrieve this data via slash syntax:

```console
$ ori sample.jpg/caption
A nice photo at the beach
```

Origami also has a small set of built-in functions called [@image](/builtins/@image.html) for resizing or reformatting images.

## JSON files

You can traverse into a JSON file using slash syntax; see [Unpacking files](#unpacking-files) above.

## Origami files

A file with a `.ori` extension indicates a file containing an Origami expression. If the result of that expression is [treelike](/async-tree/treelike) you can traverse into it using slash syntax.

If `greet.ori` contains

```
{
  name = "Bob"
  greeting = `Hello, ${name}!`
}
```

then you can retrieve a specific value (including any required evaluation) with:

```console
$ ori greet.ori/greeting
Hello, Bob!
```

## Text files

UTF-8

## YAML files

Like JSON files, you can traverse into a YAML file using slash syntax.
