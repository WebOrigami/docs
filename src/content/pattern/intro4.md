---
title: Transform a graph
numberHeadings: true
intro = client/samples/patternIntro:
---

In the last step, we defined an in-memory JavaScript object to hold the set of markdown content we want to convert to HTML. We wrapped the object in the Explorable graph interface so that other code can access that content as an abstract graph, without the need to know specifically how and where that content is stored.

With that in place, we can now write the code to transform the graph of markdown into a corresponding graph of HTML.

## Visualize the transformation

In our markdown-to-HTML transformation, we will create a virtual graph of HTML content based on the real graph of markdown content. The graphs will have the same shape, but the keys and values will both differ.

<div class="sideBySide" style="grid-template-columns: 1fr 1.4fr;">
  <figure>
    {{ svg intro/round2complete/object }}
  </figure>
  <figure>
    {{ svg intro/round2complete/transform intro/round2complete/object }}
  </figure>
  <figcaption>Real markdown graph</figcaption>
  <figcaption>Virtual HTML graph</figcaption>
</div>

## Rough in the transformation

The transformation will be a function that accepts an explorable graph of markdown and returns a new graph of HTML.

```{{'js'}}
{{ intro/round2complete/transform1.js }}
```

## Transform the keys

The first step is to transform the extension on the keys from `.md` to `.html`. When dealing with content, we often use an extension in a name as a type signature to indicate the type of data. In this case, we want the keys of the transformed graph to reflect the fact its contents are HTML.

```{{'js'}}
{{ intro/round2complete/transform2.js }}
```

The transformed graph's `asyncIterator` iterates over the keys of the inner `graph`. If a key ends in `.md`, the extension will be replaced with `.html`. That key is then yielded.

This transformation is only halfway done, but we can inspect that it is already returning the expected keys.

```console
$ ori keys transform object
- Alice.html
- Bob.html
- Carol.html
```

## Transform the values

The second step is to transform the markdown values into HTML values. For this we can use the [marked](https://github.com/markedjs/marked) markdown processor.

```{{'js'}}
{{ intro/round2complete/transform.js }}
```

The `get` function is given a key, most likely one ending in `.html`. This function will then ask the underlying markdown graph for a corresponding markdown file. If asked for `foo.html`, it asks the markdown graph for `foo.md`.

That is, the `get` function is working in the opposite direction of the `asyncIterator`. The `asyncIterator` maps a set of markdown keys to HTML keys; the `get` function maps a single HTML key into a markdown key.

If the markdown graph returns a value, we cast that value to a string. In the object graph we're using for markdown content at this point, the value will already be a string. But in the general case, we'd like to handle any value type that can be cast to a string. We then pass the markdown string to the `marked` function to get the corresponding HTML.

We can now verify that our transform is working as expected.

```console
$ ori transform object
{{ yaml intro/round2complete/transform(intro/round2complete/object) }}
```

This graph of HTML has the desired shape, keys, and values as the diagram shown earlier.

&nbsp;

Next: [File graphs](intro5.html)
