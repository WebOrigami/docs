---
title: document(text, [data])<br>document(object)
supertitle: "Origami."
---

You can explicitly convert a plain [text document](/language/documents.html) to a document object by passing it to the `document` function.

If `hokusai.md` contains plain text:

```console
$ ori hokusai.md
${ samples.ori/help/hokusai.md }
```

then invoking `document` on it returns a plain object with the original body text as a `_body` property:

```console
$ ori Origami.document hokusai.md
${ Origami.yaml(removeText.ori(Origami.document(samples.ori/help/hokusai.md))) }
```

You can also attach data:

```console
$ ori Origami.document hokusai.md, { author: "'Katsushika Hokusai'" }
${ Origami.yaml(removeText.ori(Origami.document(samples.ori/help/hokusai.md, { author: "Katsushika Hokusai" }))) }
```

If you have a text document with data in front matter:

```console
$ ori basho.md
${ samples.ori/help/basho.md }
```

Then calling `document` on it returns a plain object with the front matter data as properties, plus the body text as a `_body` property:

```console
$ ori Origami.document basho.md
${ Origami.yaml(removeText.ori(samples.ori/help/basho.md/)) }
```

If you have a collection of documents, some of which have data and some of which don't, you can normalize all of them to document objects by applying `document` to each of them.

```console
$ ori Tree.map [basho.md, hokusai.md], =Origami.document _
${ Origami.yaml(Tree.map([
  samples.ori/help/basho.md
  samples.ori/help/hokusai.md
], (file) => removeText.ori(Origami.document(file)))) }
```

All of the objects in the result are now document objects with a `_body` property.
