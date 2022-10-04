---
title: Index pages
index = node_modules/@graphorigami/pattern-intro/src/index:
functions = js/codeFunctions(index/indexPages.js):
htmlObject = index/transform(index/object):
---

Right now, the experience of browsing our graph of generated HTML is a little unsatisfying because there are no index pages — we have to know what routes are there.

We can fix that by adding another graph transform. Wrapping a graph with this transform will: 1) add "index.html" as one of the inner graph's keys if it's not already defined, and 2) define a default value for "index.html" if one isn't already defined. The default value will be an HTML page listing the graph's other keys as links.

## Generate a single index page

First let's write a function that returns a reasonable default index page for a graph that doesn't define one.

```{{'js'}}
{{ functions/indexPage }}
```

If the little `more` branch of our HTML graph looks like this:

<figure>
{{ svg htmlObject/more }}
</figure>

Then invoking `indexPage` on this branch will return:

```{{'html'}}
{{ ((index/indexPages)(htmlObject/more))/index.html }}
```

## Transform a graph by adding index pages

Using the default `indexPage` function above, let's now create a graph transform. This will accept any explorable graph, and return a new graph with an `index.html` key.

```{{'js'}}
// index/indexPages.js

{{ functions/@prologue }}
{{ functions/@epilogue }}
```

If we use this to transform the `more` branch of the HTML graph, we'll get:

<figure>
{{ svg index/indexPages(htmlObject/more) }}
</figure>

## Incorporate the index page transform

We can apply this `indexPages` transform on top of our object, file, and function-based HTML graphs. The file-based graph now looks like:

```{{'js'}}
// index/htmlFolder.js

{{ index/htmlFolder.js }}
```

These transforms are just functions, so we can transform a graph all we want. In this case, the order of function calls matters: when `indexPages` transform is iterating through the keys of a graph, we want it to see keys that end in `.html` so that it create links to the HTML pages. If we applied the `indexPages` transform first, it would create links to the `.md` files.

<span class="tutorialStep"></span> Serve the HTML graph again.

```console
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

You'll now see index pages at each level of the hierarchy.

This server can be good enough for development, and we could easily deploy it in this state. But since this HTML content is currently all static, it would be nice to render the HTML content as `.html` files we can deploy directly.

&nbsp;

Next: [Copy a graph](copy.html) »
