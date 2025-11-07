---
title: Serve a tree
---

Displaying a tree in the console is fine for playing around or debugging, but we can do much more interesting things with a tree — like serve it to a web browser.

Let's build a small tree server directly on top of Node's `http` API. (If we were already using a server like [Express](https://expressjs.com/), it would be straightforward to adapt this same idea into a server middleware function that handles a specific portion of a larger site.)

Using the `Map` interface to model the nodes of the site tree lets us browse content regardless of how that content is stored or generated.

## Treat a URL as a series of tree keys

The first thing is to recognize a URL as a tree traversal — we can treat a URL path as a series of keys to follow through a tree.

Specifically, we convert a string URL path like `/foo/bar` into an array of keys `["foo", "bar"]`.

```js
/* In src/map/serve.js */

${ src/js/codeFunctions.js(pattern/map/serve.js).keysFromUrl }
```

If the path ends in a slash like `foo/`, this produces the keys `["foo", "index.html"]`.

## Traverse a tree

We can then iteratively follow this array of keys through a deep tree of `Map` nodes to a final value:

```js
/* In src/map/serve.js */

${ src/js/codeFunctions.js(pattern/map/serve.js).traverse }
```

The tree itself is acting as a web site router.

## Handle requests using a tree

Putting these together, we can build a listener function that uses a tree to respond to HTTP requests.

```js
/* In src/map/serve.js */

${ src/js/codeFunctions.js(pattern/map/serve.js).requestListener }
```

This converts a request's URL into an array of keys, then returns the resource it finds there. If no value is found, the listener responds with 404 Not Found.

## Serve the tree

Finally, we start the server at a default port, serving the tree defined in `site.js`.

```js
/* src/map/serve.js */

${ src/js/codeFunctions.js(pattern/map/serve.js)["@prologue"] }

…

${ src/js/codeFunctions.js(pattern/map/serve.js)["@epilogue"] }

```

## Trying our server

<span class="tutorialStep"></span> From inside the `src/map` directory, start the server:

```console
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Browse to that local server. The simple blog index page should appear.

<span class="tutorialStep"></span> Click a post to view it.

## Maps can be lazy

Because we've designed all our `Map` classes to be lazy, when you start the server, no real work is done beyond starting the HTTP listener.

The tree only generates the HTML when you ask for it by browsing to a page like `posts/post1.html`:

1. The server asks the top-level `ObjectMap` for `posts`. This returns a `HtmlMap`.
1. The server asks the `HtmlMap` for `post1.html`.
1. The `HtmlMap` asks the inner `FileMap` map for `post1.md`.
1. The inner `FileMap` asks the file system for the content of `post1.md` and returns that.
1. The `HtmlMap` converts the markdown content to HTML and returns that.
1. The server gets the HTML as the final resource and sends it to the client.

Because all the maps involved are lazy, getting `posts/post1.html` doesn't do any of the work required to generate the other pages `post2.html` or `post3.html`.

## Flexible

This server is already pretty interesting! We've got a simple site, but can flexibly change the representation of the data. Having done relatively little work, we can let our team write content in markdown. Unlike many markdown-to-HTML solutions, the translation is happening at runtime, so an author can immediately view the result of markdown changes by refreshing the corresponding page.

Each of our underlying object, file, or function-based trees has its advantages. For example, we can serve our function-based tree to browse HTML pages which are generated on demand.

<span class="tutorialStep"></span> Edit `src/map/site.js` to export the function-based map from `htmlFn.js` instead of `htmlFiles.js`.

<span class="tutorialStep"></span> Browse to a page like `posts/post4.html`. Corresponding markdown will be generated on demand by the `FunctionMap` and converted to HTML:

> This is **post 4**.

<span class="tutorialStep"></span> Before moving on, in the terminal window, stop the server by pressing Ctrl+C.

&nbsp;

Next: [Build by copying](copy.html) »
