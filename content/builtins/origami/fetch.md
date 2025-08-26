---
title: "fetch(url, options)"
supertitle: "Origami."
---

This is based on the standard JavaScript [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) method, with these differences:

1. If the server successfully returns a `Response` object, this calls the [`arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer) on the `Response` and returns the `ArrayBuffer` result. You can use that `ArrayBuffer` as is. If you want to convert it to text, pass it to [`Origami.string`](/builtins/origami/string.html).
1. If the `url` ends in an file extension for a known [file type](/language/fileTypes.html), Origami will attach an `unpack` method to the returned `ArrayBuffer`. You can invoke that method to process the content using the handler associated with that file extension. Additionally, when called in Origami code, you can access data properties directly from the result of the `Origami.fetch` call.

Example: if a given URL returns a YAML resource:

```console
$ ori https://weborigami.org/samples/cli/greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

Then these commands are equivalent:

```console
$ ori "Origami.fetch('https://weborigami.org/samples/cli/greetings.yaml').Alice"
Hello, Alice.
$ ori "(https://weborigami.org/samples/cli/greetings.yaml).Alice"
Hello, Alice.
```

Because Origami automatically evaluates a URL in an Origami expression, it is not generally necessarily to call `Origami.fetch`. However, `Origami.fetch` may be useful in certain cases like using a [`Tree.map`](/builtins/tree/map.html) to extract a set of URLs from data and then fetch the corresponding resources.
