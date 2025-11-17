---
title: Transform a map
---

In the last step, we defined an in-memory JavaScript object to hold the set of markdown content we want to convert to HTML. We wrapped the object in a `Map` so that other code can access that content in an abstract way, without the need to know specifically how and where that content is stored.

With that in place, we can now write code to transform the map of markdown into HTML. The interesting thing is that we will define the result of this transformation as another `Map`!

## Visualize the transformation

We've already used a general strategy to define a `Map` backed by a plain object. We can use that same strategy to define one `Map` backed by a second `Map`.

In our markdown-to-HTML transformation, we will create a virtual map of HTML content based on the original map of markdown content. The maps will have the same shape, but the keys and values will both differ.

<div class="sideBySide split2to3">
  <figure>
    ${ svg(pattern/map/object.js) }
  </figure>
  <figure>
    ${ svg(pattern/map/htmlObject.js) }
  </figure>
  <figcaption>Map of markdown content</figcaption>
  <figcaption>Map of HTML content</figcaption>
</div>

A `Map` associates keys with values, so the fact the transformation will affect both keys and values makes a `Map` a good choice for representing the transformation's input and output.

## Rough in the transformation

The transformation will be a class that accepts a map of source markdown and represents a new, transformed map of HTML.

```js
/* src/map/HtmlMap.js */

import { marked } from "marked";

export default class HtmlMap extends Map {
  constructor(markdownMap) {
    super();
    this.source = markdownMap;
  }

  get(key) {
    /* TODO */
  }

  *keys() {
    /* TODO */
  }
}
```

To translate markdown to HTML, we will use the [marked](https://github.com/markedjs/marked) markdown processor. Other markdown processors would work equally well.

## Transform the keys

When dealing with content, we often use an extension in a name as a type signature to indicate the type of data contained therein.

In this case, we want the keys of the transformed map to reflect the fact its contents are no longer markdown, but HTML instead. So the first step in our transformation is to change the file extensions on the keys from `.md` to `.html`.

```js
  *keys() {
    for (const markdownKey of this.source.keys()) {
      yield markdownKey.replace(/\.md$/, ".html");
    }
  }
```

The transformed map's `keys` method iterates over the keys of the inner `source` map. If a key ends in `.md`, the extension will be replaced with `.html`. For example, if the inner `source` has a key `post1.md`, the transformed map will return the key `post1.html`.

## Transform the values

The second step is to transform the markdown values into HTML values.

```js
  get(key) {
    const sourceKey = key.replace(/\.html$/, ".md");
    const sourceValue = this.source.get(sourceKey);
    const resultValue =
      sourceValue && key.endsWith(".html")
        ? marked(sourceValue.toString())
        : undefined;
    return resultValue;
  }
```

The `get` function is given a key, most likely one ending in `.html`. This function will then ask the underlying markdown map for a corresponding markdown file. If asked for `foo.html`, it asks the markdown map for `foo.md`.

When it comes to keys, the `get` function is working in the opposite direction of the `keys` method. The `keys` method maps a markdown key to an HTML key so that it can enumerate what HTML keys it virtually contains. The `get` function maps an HTML key to a markdown key so that it can retrieve the corresponding markdown content.

If the markdown map actually returns a value, we cast that value to a string. In the object map we're using for markdown content at this point, the value will already be a string. But in the general case, we'd like to handle any value type that can be cast to a string. We then pass the markdown string to the `marked` function to get the corresponding HTML.

## Test the transform

We can now verify that our transform is working as expected by adapting the same tests we used to verify our object tree. The only changes are to: 1) expect `.html` keys instead of `.md` keys, and 2) expect HTML content instead of markdown content.

```js
/* src/map/HtmlMap.test.js */

${ pattern/map/HtmlMap.test.js }
```

<span class="tutorialStep"></span> From inside the `src/map` directory, run the transform tests:

```console
$ node HtmlMap.test.js
▶ HtmlMap
  ✔ get (5.9125ms)
  ✔ keys (0.352084ms)
✔ HtmlMap (6.658167ms)
ℹ tests 2
ℹ suites 1
ℹ pass 2
ℹ fail 0
```

## Display the transformed map

We can bake the transform and the object together to create a final HTML map.

```js
/* src/map/htmlObject.js */

${ pattern/map/htmlObject.js }
```

This `HtmlMap` class takes a `Map` of markdown and returns a new `Map` of HTML. The resulting map is _lazy_: it does not do any substantive work when it is created!

The real work — to enumerate the HTML keys, and to get the values of those keys — will only be performed when we actually traverse the map. This laziness is a vital aspect of the transformation; we can use this map in various ways and be sure we are only doing the minimum work necessary.

<span class="tutorialStep"></span> Use the same `json` utility we wrote earlier to dump this transformed map to the console.

```console
$ node json htmlObject.js
${ Tree.json(pattern/map/htmlObject.js) + "\n" }
```

The `json` utility traverses the HTML map, causing it to do its work of transforming markdown to HTML as the utility builds an in-memory object it ultimately displays as JSON. You can see that the displayed JSON has the desired shape, keys, and values as the virtual HTML map in the diagram at the top of this page.

You can set breakpoints in the code and step through the code to confirm how it works. For example, in Microsoft Visual Studio Code: open the Terminal, start a new JavaScript Debug Terminal, set a breakpoint, then run the `node` command above.

&nbsp;

Next: [File maps](fileMap.html)
