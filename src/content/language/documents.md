---
title: Working with text documents
---

Text documents are an extremely common [file type](fileTypes.html) used in the creation of sites and many other software artifacts. Origami includes some features for working with text documents that may or may not have additional data associated with them.

## Plain text

Some text files contain just plain text, like this markdown file:

```console
$ ori hokusai.md
${ samples.ori/help/hokusai.md }
```

If you ask Origami to [unpack](fileTypes.html#unpacking-files) this file by appending a slash, it returns the plain text as is:

```console
$ ori hokusai.md/
${ samples.ori/help/hokusai.md/ }
```

## Document objects

To include additional data in text documents, you can include it as "front matter" in JSON or YAML format at the top of the document, enclosed in lines of `---` three hyphens:

```console
$ cat basho.md
${ samples.ori/help/basho.md }
```

To represent text with data consistently, Origami will generally work with it as a plain object. The plain object's properties include the front matter data and an additional `text` property with the body text.

If you ask Origami to unpack this file:

```console
$ ori basho.md/
${ yaml samples.ori/help/basho.md/ }
```

You can see that Origami is treating the body text as a `text` property. In JSON format:

```console
$ ori json basho.md
${ json(samples.ori/help/basho.md) + "\n" }
```

Here, the [`json`](/builtins/origami/json.html) command implicitly unpacks the document, so the trailing `/` slash is unnecessary.

You can create a text document from plain text with the [`document`](/builtins/text/document.html) builtin.

## Working on documents with builtin functions

Origami builtins that work on text, like [`inline`](/builtins/text/inline.html) and [`mdHtml`](/builtins/text/mdHtml.html), can work on both plain text documents and document objects.

If you give a builtin function plain text, you get back plain text. For example, `mdHtml` transforms plain markdown text into plain HTML text:

```console
$ ori mdHtml hokusai.md
${ mdHtml samples.ori/help/hokusai.md }
```

If you give the builtin a document object, you get back a new document object that preserves the original front matter data as properties and a `text` property that contains the transformed text:

```console
$ ori mdHtml basho.md
${ yaml mdHtml samples.ori/help/basho.md/ }
```
