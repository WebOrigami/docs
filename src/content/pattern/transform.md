---
title: Transform a graph
flat = node_modules/@graphorigami/pattern-intro/src/flat:
---

In the last step, we defined an in-memory JavaScript object to hold the set of markdown content we want to convert to HTML. We wrapped the object in the Explorable graph interface so that other code can access that content as an abstract graph, without the need to know specifically how and where that content is stored.

With that in place, we can now write the code to transform the graph of markdown into a corresponding graph of HTML.

## Visualize the transformation

In our markdown-to-HTML transformation, we will create a virtual graph of HTML content based on the real graph of markdown content. The graphs will have the same shape, but the keys and values will both differ.

<div class="sideBySide" style="grid-template-columns: 1fr 1.4fr;">
  <figure>
    {{ svg flat/object }}
  </figure>
  <figure>
    {{ svg flat/htmlObject }}
  </figure>
  <figcaption>Real markdown graph</figcaption>
  <figcaption>Virtual HTML graph</figcaption>
</div>

The markdown graph is "real", in the sense that it is directly stored in some fashion as `object.js`. In the code that follows, we'll create a new, virtual graph — virtual in the sense that it exists only while the code is running.

## Rough in the transformation

The transformation will be a function that accepts an explorable graph of markdown and returns a new graph of HTML.

```js
// flat/transform.js

import { marked } from "marked";

export default function (graph) {
  return {
    async *[Symbol.asyncIterator]() { … },

    async get(key) { … },
  };
}
```

## Transform the keys

The first step is to transform the extension on the keys from `.md` to `.html`.

When dealing with content, we often use an extension in a name as a type signature to indicate the type of data. In this case, we want the keys of the transformed graph to reflect the fact its contents are HTML.

```js
    async *[Symbol.asyncIterator]() {
      for await (const markdownKey of graph) {
        const htmlKey = markdownKey.replace(/\.md$/, ".html");
        yield htmlKey;
      }
    }
```

The transformed graph's `asyncIterator` iterates over the keys of the inner `graph`. If a key ends in `.md`, the extension will be replaced with `.html`. That key is then yielded.

## Transform the values

The second step is to transform the markdown values into HTML values. For this we can use the [marked](https://github.com/markedjs/marked) markdown processor.

```js
    async get(key) {
      if (key.endsWith(".html")) {
        const markdownKey = key.replace(/\.html$/, ".md");
        const markdown = await graph.get(markdownKey);
        if (markdown) {
          return marked(markdown.toString());
        }
      } else {
        return graph.get(key);
      }
    },
```

The `get` function is given a key, most likely one ending in `.html`. This function will then ask the underlying markdown graph for a corresponding markdown file. If asked for `foo.html`, it asks the markdown graph for `foo.md`.

That is, the `get` function is working in the opposite direction of the `asyncIterator`. The `asyncIterator` maps a markdown key to an HTML key; the `get` function maps an HTML key to a markdown key.

If the markdown graph returns a value, we cast that value to a string. In the object graph we're using for markdown content at this point, the value will already be a string. But in the general case, we'd like to handle any value type that can be cast to a string. We then pass the markdown string to the `marked` function to get the corresponding HTML.

## Test the transform

We can now verify that our transform is working as expected by adapting the same tests we used to verify our object graph. The only changes are to: 1) expect `.html` keys instead of `.md` keys, and 2) expect HTML content instead of markdown content.

```{{'js'}}
// flat/transform.test.js

{{ flat/transform.test.js }}
```

```console
$ node transform.test.js
…
# tests 3
# pass 3
# fail 0
```

## Display the transformed graph

We can bake the transform and the object together to create a final HTML graph.

```{{'js'}}
// flat/htmlObject.js

{{ flat/htmlObject.js }}
```

And use the same `json` utility we wrote earlier to dump this graph to the console.

```console
$ node json htmlObject.js
{{ json flat/transform flat/htmlObject }}
```

This graph has the desired shape, keys, and values as the virtual graph in the earlier diagram.

&nbsp;

Next: [File graphs](filesGraph.html)
