---
title: Working with file types
---

Origami has specific knowledge of certain types of documents and files which are identified by file extension.

| Type        | File extensions                                |
| :---------- | :--------------------------------------------- |
| JavaScript  | .js<br>.mjs                                    |
| JPEG image  | .jpeg<br>.jpg                                  |
| JSON        | .json                                          |
| Origami     | .ori                                           |
| Text        | .css<br>.htm<br>.html<br>.md<br>.txt<br>.xhtml |
| WebAssembly | .wasm                                          |
| YAML        | .yaml<br>.yml                                  |

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

Text files can contain data as front matter in YAML or JSON. You can traverse into the front matter data with slash syntax.

```console
$ cat post1.md
---
title: The First Post
---

Here's the text of my first post.
$ ori post1.md/title
The First Post
```

Origami assumes that text files are encoded in [UTF-8](https://en.wikipedia.org/wiki/UTF-8).

YAML front matter can [contain Origami expressions](yaml.html).

## WebAssembly files

You can traverse into a WebAssembly module, for example, to invoke a function defined in WebAssembly.

If `add.wasm` exports a function called `add` that adds two integer arguments, then you can invoke it with:

```console
$ ori "add.wasm/add(1, 2)"
3
```

This can give you access to functions defined in the many other languages that can be compiled to WebAssembly.

WebAssembly modules run in a "sandbox" that is isolated from your computer so you can download and execute modules directly:

```console
$ ori "(https://webassembly.js.org/example-add.wasm)/add(2, 3)"
5
```

The parentheses around the URL for a WebAssembly module cause it to be evaluated first, which downloads the module. The `/` slash after the `.wasm)` causes the downloaded module to be loaded, and the `add` obtains a function with that name from the module. The final `(2, 3)` invokes the `add` function and passes those two values to it.

## YAML files

Like JSON files, you can traverse into a YAML file using slash syntax. YAML front matter can [contain Origami expressions](yaml.html).
