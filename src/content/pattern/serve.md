---
title: Serve a graph
deep = node_modules/pattern-intro/src/deep:
functions = js/codeFunctions(deep/serve.js):
---

Displaying a graph in the console is fine for playing around or debugging, but we can do much more interesting things with a graph — like serve it to a web browser.

Let's build a small graph server directly on top of Node's `http` API. (If we were already using a server like [Express](https://expressjs.com/), it would be straightforward to adapt this same idea into a server middleware function that handles a specific portion of a larger site.)

Using the Explorable interface to model the graph will let us browse content regardless of how that content is stored or generated.

## Treat a URL as a series of graph keys

The first thing is to recognize a URL as a graph traversal — we can treat a URL path as a series of keys to follow through a graph.

Specifically, we convert a string URL path like `/foo/bar` into an array of keys `["foo", "bar"]`.

```{{'js'}}
{{ functions/keysFromUrl }}
```

If the path ends in a slash like `foo/`, this produces the keys `["foo", "index.html"]`.

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

If a request returns an explorable graph, we redirect to an `index.html` value inside that graph. E.g., in our sample deep object and files graphs, we have a subfolder called `more`. If someone navigates to the path `more`, that request will return the corresponding subgraph. We then redirect to `more/`, which will ultimately render the page at `more/index.html`.

## Serve the graph

Finally, we start the server at a default port.

```{{'js'}}
{{ functions/@prologue }}

{{ functions/@epilogue }}

```

To add a layer of flexibility, we'll serve the graph define in a new file called `siteGraph.js`. We can then define this file to export the graph of transformed HTML defined in `htmlObject.js`, `htmlFiles.js`, or `htmlFn.js` as the graph to serve.

```{{'js'}}
/* src/deep/siteGraph.js */

{{ deep/siteGraph.js }}
```

## Trying our server

<span class="tutorialStep"></span> From inside the `src/deep` directory, start the server:

```console
$ cd ../deep
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

Note: If you're running the tutorial on StackBlitz, the site may indicate that you need to enable certain cookies in order to run the server.

<span class="tutorialStep"></span> Browse to that local server. The site root won't find an index page, so the serve will initially return Not Found. But if you browse to a page like http://localhost:5000/Alice.html, you'll see a simple HTML page.

> Hello, **Alice**.

If you want, you can define an index page at `markdown/index.md`, and then immediately browse it at the site's root. But we'll also add default index pages in a minute.

## Explorable graphs are lazy

Explorable graphs are lazy by nature. When you start the server, no real work is done beyond starting the HTTP listener.

The graph only generates the HTML when you ask for it by browsing to a page like Alice.html:

1. The server asks the HTML graph for Alice.html.
1. The transform defining the HTML graph asks the inner markdown graph for Alice.md.
1. The inner markdown graph asks the file system for the content of Alice.md.
1. The transform converts the markdown content to HTML.
1. The listener responds with the HTML content.

We defined the markdown-to-HTML transform such that, if it's asked for a key that doesn't end in `.html`, it will ask the inner graph for the corresponding value and return that value as is. One ramification of that is that, if we can ask the server for a markdown file, it will obtain that from the inner markdown graph.

<span class="tutorialStep"></span> Navigate to `Alice.md` to see the original markdown content.

```
Hello, **Alice**.
```

## Flexible

This server is already pretty interesting! We've got a simple site, but can flexibly change the representation of the data. Having done relatively little work, we can let our team write content in markdown. Unlike many markdown-to-HTML solutions, the translation is happening at runtime, so an author can immediately view the result of markdown changes by refreshing the corresponding page.

Each of our underlying object, file, or function-based graphs has its advantages. For example, we can serve our function-based graph to browse HTML pages which are generated on demand.

<span class="tutorialStep"></span> Edit `siteGraph.js` to export the function-based graph in `htmlFn.js`.

<span class="tutorialStep"></span> Serve the new graph with `node serve`.

<span class="tutorialStep"></span> Observe that, this time, an index page _is_ shown — albeit a pretty strange one that says

> Hello, **index**.

The served graph is responding to `index.html` by asking the function-based markdown graph for `index.md`, and the underlying function is dutifully generating a markdown file for that "name".

<span class="tutorialStep"></span> Navigate to an HTML page for own name, say, `Sara.html` to view

> Hello, **Sara**.

<span class="tutorialStep"></span> You can navigate to the corresponding `Sara.md` to view the markdown generated by the inner function-based markdown graph.

```
Hello, **Sara*..
```

&nbsp;

Next: [Index pages](indexPages.html) »
