---
title: Serve a graph
deep = node_modules/@graphorigami/pattern-intro/src/deep:
functions = js/codeFunctions(deep/serve.js):
---

Displaying a graph in the console is fine for playing around or debugging, but we can do much more interesting things with a graph — like serve it to a web browser.

Let's build a small graph server directly on top of Node's `http` API. (If we were already using a server like [Express](https://expressjs.com/), it would be straightforward to adapt this same idea into a server middleware function that handles a specific portion of a larger site.)

Using the Explorable interface to model the graph will let us browse content regardless of how it's stored.

## Treat a URL as a series of graph keys

The first thing is to recognize a URL as a graph traversal.

We can treat a URL path as a series of keys to follow through a graph. Specifically, we convert a string URL path like `/foo/bar` into an array of keys `["foo", "bar"]`. If the path ends in a slash like `foo/`, produce the keys `["foo", "index.html"]`.

```{{'js'}}
{{ functions/keysFromUrl }}
```

## Traverse a graph

We can then iteratively follow this array of keys through a deep graph to a final value:

```{{'js'}}
{{ functions/traverse }}
```

The graph itself is acting as a web site router.

## Handle requests using a graph

Putting these together, we can build a listener function that uses a graph to respond to HTTP requests.

```{{'js'}}
{{ functions/requestListener }}
```

This converts a request's URL into an array of keys, then returns what it finds there. If no value is found, the listener responds with 404 Not Found.

## Serve the graph

Finally, we start the server at a default port. We can use the graph of transformed HTML defined in `htmlObject.js` or `htmlFolder.js` as the graph to traverse.

```{{'js'}}
{{ functions/@prologue }}

{{ functions/@epilogue }}

```

## Trying our server

<span class="tutorialStep"></span> Start the server:

```console
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

Note: If you're running the tutorial on StackBlitz, the site may indicate that you need to enable certain cookies in order to run the server.

<span class="tutorialStep"></span> Browse to that local server. The site root won't find an index page, so will return Not Found. But if you browse to a page like http://localhost:5000/Alice.html or http://localhost:5000/more/David.html, you'll a simple HTML page.

If you want, you can define an index page at `markdown/index.md`, and then immediately browse it at the site's root. But we'll also add default index pages in a minute.

## Explorable graphs are lazy

Explorable graphs are lazy by nature. When you start the server, no real work is done beyond starting the HTTP listener.

The graph only generates the HTML when you ask for it by browsing to a page like Alice.html:

1. The server asks the HTML graph for Alice.html.
1. The transform defining the HTML graph asks the inner markdown graph for Alice.md.
1. The inner markdown graph asks the file system for the content of Alice.md.
1. The transform converts the markdown content to HTML.
1. The listener responds with the HTML content.

## Flexible

This server is already pretty interesting! We've got a simple site, but can flexibly change the representation of the data. Having done relatively little work, we can let our team author content in markdown. Unlike many markdown-to-HTML solutions, the translation is happening at runtime, so an author can immediately view the result of markdown changes by refreshing the corresponding page.

&nbsp;

Next: [Index pages](indexPages.html) »
