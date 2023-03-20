---
title: Index pages
functions: !ori js/codeFunctions(pattern-intro/index/indexPages.js)
htmlObject: !ori pattern-intro/index/transform(pattern-intro/index/object)
---

Right now, the experience of browsing our graph of generated HTML is a little unsatisfying because there are no index pages — we have to know what pages exist and manually enter a valid URL.

We can fix that by adding another graph transform. Wrapping a graph with this transform will:

1. add "index.html" as one of the inner graph's keys if it's not already defined
2. define a default value for "index.html" if one isn't already defined

The default value will be an HTML page listing the graph's other keys as links.

## Generate a single index page

First let's write a function that returns a reasonable default index page for a graph that doesn't define one.

```{{'js'}}
/* In src/index/indexPages.js */

{{ functions/indexPage }}
```

If the little `more` branch of our HTML graph looks like this:

<figure>
{{ svg htmlObject/more }}
</figure>

Then invoking `indexPage` on this branch will return:

```{{'html'}}
{{ ((pattern-intro/index/indexPages)(htmlObject/more))/index.html }}
```

## Transform a graph by adding index pages

Using the default `indexPage` function above, let's now create a graph transform. This will accept any explorable graph, and return a new graph with an `index.html` key.

```{{'js'}}
/* In src/index/indexPages.js */

{{ functions/@prologue }}
{{ functions/@epilogue }}
```

If we use this to transform the `more` branch of the HTML graph, we'll get:

<figure>
{{ svg pattern-intro/index/indexPages(htmlObject/more) }}
</figure>

## Incorporate the index page transform

We can apply this `indexPages` transform on top of our object, file, and function-based HTML graphs. For example, the file-based graph now looks like:

```{{'js'}}
/* src/index/htmlFiles.js */

{{ pattern-intro/index/htmlFiles.js }}
```

These transforms are just functions, so we can apply as many graph transforms as we want.

In this case, the order of function calls matters: when the `indexPages` transform is iterating through the keys of a graph, we want it to see keys that end in `.html` so that it create links to the HTML pages. If we applied the `indexPages` transform first, it would create links to the `.md` files.

<span class="tutorialStep"></span> From inside the `src/index` directory, serve the HTML graph again.

```console
$ cd../index
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Browse the site to see index pages at each level of the hierarchy.

This server can be good enough for development, and we could easily deploy it in this state. But since this HTML content is currently all static, it would be nice to render the HTML content as `.html` files we can deploy directly.

<span class="tutorialStep"></span> Before moving on, in the terminal window, stop the server by pressing Ctrl+C.

&nbsp;

Next: [Copy a graph](copy.html) »
