---
title: Transform a tree
---

In the last step, we defined an in-memory JavaScript object to hold the set of markdown content we want to convert to HTML. We wrapped the object in the async tree interface so that other code can access that content as an abstract tree, without the need to know specifically how and where that content is stored.

With that in place, we can now write code to transform the tree of markdown into a corresponding tree of HTML.

## Visualize the transformation

In our markdown-to-HTML transformation, we will create a virtual tree of HTML content based on the real tree of markdown content. The trees will have the same shape, but the keys and values will both differ.

<div class="sideBySide split2to3">
  <figure>
    {{ @svg pattern-intro/flat/object.js }}
  </figure>
  <figure>
    {{ @svg pattern-intro/flat/htmlObject.js }}
  </figure>
  <figcaption>Tree of markdown content</figcaption>
  <figcaption>Virtual tree of HTML</figcaption>
</div>

The markdown tree is "real", in the sense that it is persistently stored in some fashion as `object.js`. In the code that follows, we'll create a new tree which is _virtual_ as it exists only while the code is running.

## Rough in the transformation

The transformation will be a function that accepts an async tree of markdown and returns a new async tree of HTML.

```js
/* src/flat/transform.js */

import { marked } from "marked";

export default function (tree) {
  return {
    async keys() {
      /* TODO */
    },
    async get(key) {
      /* TODO */
    },
  };
}
```

To translate markdown to HTML, we will use the [marked](https://github.com/markedjs/marked) markdown processor. Other markdown processors would work equally well.

## Transform the keys

The first step is to transform the extension on the keys from `.md` to `.html`.

When dealing with content, we often use an extension in a name as a type signature to indicate the type of data contained therein. In this case, we want the keys of the transformed tree to reflect the fact its contents are HTML.

```js
    async keys() {
      const markdownKeys = Array.from(await tree.keys());
      const htmlKeys = markdownKeys.map((key) => key.replace(/\.md$/, ".html"));
      return htmlKeys;
    }
```

The transformed tree's `keys` method iterates over the keys of the inner `tree`. If a key ends in `.md`, the extension will be replaced with `.html`. For example, if the inner `tree` has a key `Alice.md`, the transformed tree will return the key `Alice.html`.

## Transform the values

The second step is to transform the markdown values into HTML values.

```js
    async get(key) {
      if (key.endsWith(".html")) {
        const markdownKey = key.replace(/\.html$/, ".md");
        const markdown = await tree.get(markdownKey);
        if (markdown) {
          return marked(markdown.toString());
        }
      } else {
        return tree.get(key);
      }
    },
```

The `get` function is given a key, most likely one ending in `.html`. This function will then ask the underlying markdown tree for a corresponding markdown file. If asked for `foo.html`, it asks the markdown tree for `foo.md`.

When it comes to keys, the `get` function is working in the opposite direction of the `keys` method. The `keys` method maps a markdown key to an HTML key so that it can enumerate what HTML keys it virtually contains. The `get` function maps an HTML key to a markdown key so that it can retrieve the corresponding markdown content.

If the markdown tree actually returns a value, we cast that value to a string. In the object tree we're using for markdown content at this point, the value will already be a string. But in the general case, we'd like to handle any value type that can be cast to a string. We then pass the markdown string to the `marked` function to get the corresponding HTML.

If the HTML tree is asked for something that doesn't end in `.html`, it simply forwards that request to the inner tree and returns the result.

## Test the transform

We can now verify that our transform is working as expected by adapting the same tests we used to verify our object tree. The only changes are to: 1) expect `.html` keys instead of `.md` keys, and 2) expect HTML content instead of markdown content.

```{{'js'}}
/* src/flat/transform.test.js */

{{ pattern-intro/flat/transform.test.js }}
```

<span class="tutorialStep"></span> From inside the `src/flat` directory, run the transform tests:

```console
$ node transform.test.js
…
# tests 3
# pass 3
# fail 0
```

## Display the transformed tree

We can bake the transform and the object together to create a final HTML tree.

```{{'js'}}
/* src/flat/htmlObject.js */

{{ pattern-intro/flat/htmlObject.js }}
```

You can think of this `transform` function as a function that takes a tree of markdown and returns a virtual tree of HTML. But keep in mind that the virtual tree is actually asynchronous. The `transform` function does not do any substantive work when it is called above.

One way to think about this virtual HTML tree is that it represents a _tree of promises_ for the real work. The real work — to enumerate the HTML keys, and to get the values of those keys — will only be performed when we actually traverse the tree.

<span class="tutorialStep"></span> Use the same `json` utility we wrote earlier to dump this transformed tree to the console.

```console
$ node json htmlObject.js
{{ @json pattern-intro/flat/transform.js @tree/from pattern-intro/flat/htmlObject.js }}
```

The `json` utility traverses the virtual HTML tree, causing it to do its work of transforming markdown to HTML as the utility builds an in-memory object it ultimately displays as JSON. You can see that the displayed JSON has the desired shape, keys, and values as the virtual HTML tree in the diagram at the top of this page.

&nbsp;

Next: [File trees](FileTree.html)
