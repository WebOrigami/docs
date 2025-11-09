---
title: Working with file types
---

## Representing files

The specific form a "file" takes can depend on how you reference it.

- When you reference a file in the file system in Origami, Origami uses a [FileTree](/async-tree/FileTree.html) to resolve the reference and return the value as a Node [Buffer](https://nodejs.org/api/buffer.html) object.
- When you reference a file on a site via a URL, Origami uses a [SiteTree](/async-tree/SiteTree.html) to resolve the reference and return the value as a JavaScript [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

## Standard file types

Origami has built-in support for handling the following types of files.

| File extension      | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| .css                | [Text](#text-files)                                     |
| .csv                | [Comma-separated values](#comma-separated-values-files) |
| .htm                | [Text](#text-files)                                     |
| .html               | [Text](#text-files)                                     |
| .jpeg               | [JPEG image](#jpeg-image-files)                         |
| .jpg                | [JPEG image](#jpeg-image-files)                         |
| .js                 | [JavaScript](#javascript-files)                         |
| .json               | [JSON](#json-files)                                     |
| .md                 | [Text](#text-files)                                     |
| .mjs                | [JavaScript](#javascript-files)                         |
| .ori                | [Origami](#origami-files)                               |
| .ori.&lt;something> | [Origami](#origami-files)                               |
| .sh                 | [Shell script](#shell-script-files)                     |
| .ts                 | [TypeScript](#typescript-files)                         |
| .tsv                | [Tab-separated values](#tab-separated-values-files)     |
| .txt                | [Text](#text-files)                                     |
| .wasm               | [WebAssembly](#webassembly-files)                       |
| .xhtml              | [Text](#text-files)                                     |
| .yaml               | [YAML](#yaml-files)                                     |
| .yml                | [YAML](#yaml-files)                                     |

See below for details on these types.

### Unpacking files

Regardless of a file's representation, you can use Origami path syntax to traverse the file and work with a more meaningful representation that reflects the file's type. Origami determines how to "unpack" the file contents based on the file extension.

For example, suppose you have a JSON file `pet.json` containing

```json
${ samples/help/pet.json }
```

If you use the `ori` [CLI](/cli) to display this file, you will see the plain file contents:

```console
$ ori pet.json
${ Tree.json(samples/help/pet.json) + "\n" }
```

Since JSON files are a supported file type, you can unpack this file and traverse into its data with a slash path:

```console
$ ori pet.json/name
${ samples/help/pet.json/name + "\n" }
```

Ending a path with a slash unpacks the file and returns all the data. By default, `ori` will display it in YAML format:

```console
$ ori pet.json/
${ Origami.yaml(samples/help/pet.json) }
```

Most builtin functions that work on data will implicitly unpack a file in order to work on it. For example, you can hand the above JSON file directly to the [`keys`](/builtins/tree/keys.html) function to view the keys of the data in that file, without having to append a `/` trailing slash to the `pet.json` file name:

```console
$ ori keys pet.json
${ Origami.yaml(Tree.keys(samples/help/pet.json)) }
```

If you're writing Origami that works with a file and needs to explicitly unpack it, you can call the [`unpack`](/builtins/origami/unpack.html) builtin function.

### Comma-separated values files

Origami can unpack a `.csv` file as containing [comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values). The first row is assumed to be a header row with property names. Values containing commas can be quoted. Quotes can be escaped as double-quotes.

If `catBreeds.csv` contains:

```csv
${ samples/help/catBreeds.csv }
```

then this can be unpacked to an array of objects:

```console
$ ori catBreeds.csv/
${ Origami.yaml(samples/help/catBreeds.csv) }
```

For formatting an array of objects as CSV, see [`Origami.csv`](/builtins/origami/csv.html).

### JavaScript files

Unpacking a `.js` file returns the file's default export or, if there are multiple exports, all the exports. If that export is [treelike](/async-tree/treelike.html), you can traverse into that export using slash syntax.

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

### JPEG image files

JPEG images can contain metadata in [Exif](https://en.wikipedia.org/wiki/Exif) format. You can retrieve this data via slash syntax:

```console
$ ori sample.jpg/caption
A nice photo at the beach
```

Origami also has a small set of built-in functions in the [`Origami.image`](/builtins/origami/image/) collection for resizing or reformatting images.

### JSON files

You can traverse into a JSON file using slash syntax; see [Unpacking files](#unpacking-files) above.

### Origami files

A file with a `.ori` extension indicates a file containing an Origami expression. If the result of that expression is [treelike](/async-tree/treelike.html) you can traverse into it using slash syntax.

If `greet.ori` contains

```ori
{
  name: "Bob"
  greeting: `Hello, \${name}!`
}
```

then you can retrieve a specific value (including any required evaluation) with:

```console
$ ori greet.ori/greeting
Hello, Bob!
```

You can add another extension after `.ori` to create a file like `bold.ori.html`. This allows you to define a file type that your editor will recognize as, say, an HTML file, and at the same time be able to treat the file as an Origami [template document](templates.html#template-documents). When you evaluate the file, any Origami expressions in `\${ }` placeholders will be replaced with their results.

You can also invoke the document as a function with one argument that will be available as the variable `_`:

```html
<!-- bold.ori.html -->
${ samples/templateDocuments/bold.ori.html }
```

```console
$ ori "bold.ori.html('Hooray')"
${ samples/templateDocuments/bold.ori.html("Hooray") }
```

### Shell script files

A file with a `.sh` extension unpacks to a function that invokes the text as a shell script. This function can accept an argument that will be treated by the script as standard input.

Suppose the markdown file `hokusai.md` contains:

```md
${ samples/help/hokusai.md }
```

The script `wc.sh` invokes the [`wc`](https://www.linfo.org/wc.html) shell command to count words in the standard input:

```sh
${ samples/help/wc.sh }
```

Invoking this and passing the markdown file as an argument counts the words in the file:

```console
$ ori wc.sh hokusai.md
${ samples/help/wc.sh(samples/help/hokusai.md) + "\n" }
```

Here the leading spaces in the output come from the `wc` command. If you want to convert that text to a simpler number, you could process the output further in the script, or process the result of the script with an Origami expression and JavaScript function:

```console
$ ori parseInt wc.sh hokusai.md
${ parseInt(samples/help/wc.sh(samples/help/hokusai.md)) + "\n" }
```

### Tab-separated values files

Files with a `.tsv` extension are treated as [tab-separated values](https://en.wikipedia.org/wiki/Tab-separated_values) with a header row.

If `bunnies.tsv` contains:

```
${ samples/help/bunnies.tsv }
```

This can be unpacked and traversed with expressions like:

```console
$ ori bunnies.tsv[2]
${ Origami.yaml((samples/help/bunnies.tsv)[2]) }
$ ori bunnies.tsv[3].breed
${ Origami.yaml((samples/help/bunnies.tsv)[3].breed) }
```

To output data in TSV format, see [`Origami.tsv`](/builtins/origami/tsv.html).

### Text files

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

See more about [working with text documents](documents.html) in Origami.

### TypeScript files

If you are running Node v23.6.0 or later, Origami can load TypeScript `.ts` files the same as `.js` files (above). This only strips out type information; it does not support using any TypeScript-specific language transformations.

### WebAssembly files

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

The parentheses around the URL for a WebAssembly module cause it to be evaluated first, which downloads the module. The `/` slash after the `.wasm` causes the downloaded module to be loaded, and the `add` obtains a function with that name from the module. The final `(2, 3)` invokes the `add` function and passes those two values to it.

### YAML files

Like JSON files, you can traverse into a YAML file using slash syntax.

## Custom file types

You can tell Origami how to handle other types of files based on their file extension.

### Define a handler for a file extension

Suppose your project has `.user` files that define data about users. For simplicity, let's assume the contents of a `.user` file is in plain JSON text.

You can define a JavaScript file `user.handler.js`:

```${"js"}
${ samples/cli/user.handler.js }
```

The `mediaType` declaration tells the Origami server to transmit any `.user` files as JSON. The `unpack` method defines how to turn the file contents into data. A file may be a `Buffer`, `ArrayBuffer`, or other data type depending on where it is stored. The `toString()` utility function in Origami converts any of those types to plain text. The `JSON.parse()` call then parses the text into data.

### Add your extension handler to your Origami configuration

The second step is to tell Origami to use your `user.handler.js` file to handle any `.user` files.

Define a [config.ori](configuration.html) file at the root of your project. Inside that, define a key `user.handler` that points to the location of the `.js` file:

```ori
{
  user.handler = src/user.handler.js
}
```

With that, Origami will call your custom file handler whenever you reference a `.user` file:

```console
$ cat alice.user
${ samples/cli/alice.user }
$ ori alice.user/
${ Origami.yaml(Origami.jsonParse(samples/cli/alice.user)) }
$ ori alice.user/name
${ Origami.jsonParse(samples/cli/alice.user).name + "\n" }
```

### Defining a handler for a template language

As a reference example, the [Origami Handlebars extension](https://github.com/WebOrigami/extensions/tree/main/handlebars) defines a handler for `.hbs` files that contain [Handlebars](https://handlebarsjs.com) templates.
