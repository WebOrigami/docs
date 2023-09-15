---
title: Serve a graph
functions: !ori js/codeFunctions.js(pattern-intro/deep/serve.js)
---

Displaying a graph in the console is fine for playing around or debugging, but we can do much more interesting things with a graph — like serve it to a web browser.

Let's build a small graph server directly on top of Node's `http` API. (If we were already using a server like [Express](https://expressjs.com/), it would be straightforward to adapt this same idea into a server middleware function that handles a specific portion of a larger site.)

Using the AsyncDictionary interface to model the graph will let us browse content regardless of how that content is stored or generated.

## Treat a URL as a series of graph keys

The first thing is to recognize a URL as a graph traversal — we can treat a URL path as a series of keys to follow through a graph.

Specifically, we convert a string URL path like `/foo/bar` into an array of keys `["foo", "bar"]`.

```{{'js'}}
/* In src/deep/serve.js */

{{ functions/keysFromUrl }}
```

If the path ends in a slash like `foo/`, this produces the keys `["foo", "index.html"]`.

## Traverse a graph

We can then iteratively follow this array of keys through a deep graph to a final value:

```{{'js'}}
/* In src/deep/serve.js */

{{ functions/traverse }}
```

The graph itself is acting as a web site router.

## Handle requests using a graph

Putting these together, we can build a listener function that uses a graph to respond to HTTP requests.

```{{'js'}}
/* In src/deep/serve.js */

{{ functions/requestListener }}
```

This converts a request's URL into an array of keys, then returns what it finds there. If no value is found, the listener responds with 404 Not Found.

If a request returns an async graph, we redirect to an `index.html` value inside that graph. E.g., in our sample deep object and files graphs, we have a subfolder called `more`. If someone navigates to the path `more`, that request will return the corresponding subgraph. We then redirect to `more/`, which will ultimately render the page at `more/index.html`.

## Serve the graph

Finally, we start the server at a default port.

```{{'js'}}
/* src/deep/serve.js */

{{ functions/@prologue }}

/* …Plus the above code fragments… */

{{ functions/@epilogue }}

```

To add a layer of flexibility, we'll serve the graph defined in a new file called `siteGraph.js`. This file exports whichever graph of transformed HTML we'd like to use, as defined in `htmlObject.js`, `htmlFiles.js`, or `htmlFn.js`. To use the files-backed graph:

```{{'js'}}
/* src/deep/siteGraph.js */

{{ pattern-intro/deep/siteGraph.js }}
```

## Trying our server

<span class="tutorialStep"></span> From inside the `src/deep` directory, start the server:

```console
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Browse to that local server. **The site root won't find an index page**, so the serve will initially return Not Found.

If you want, you can define an index page at `markdown/index.md`, and then immediately browse it at the site's root. But we'll also add default index pages in a minute.

<span class="tutorialStep"></span> In the browser preview, add `Alice.html` to the URL to see the expected HTML page for Alice:

> Hello, **Alice**.

We defined the markdown-to-HTML transform such that, if it's asked for a key that doesn't end in `.html`, it will ask the inner graph for the corresponding value and return that value as is. One ramification of that is that, if we can ask the server for a markdown file, it will obtain that from the inner markdown graph.

<span class="tutorialStep"></span> Browse to `Alice.md` to see the original markdown content.

```
Hello, **Alice**.
```

## async graphs are lazy

async graphs are lazy by nature. When you start the server, no real work is done beyond starting the HTTP listener.

The graph only generates the HTML when you ask for it by browsing to a page like Alice.html:

1. The server asks the HTML graph for Alice.html.
1. The transform defining the HTML graph asks the inner markdown graph for Alice.md.
1. The inner markdown graph asks the file system for the content of Alice.md.
1. The transform converts the markdown content to HTML.
1. The listener responds with the HTML content.

## Flexible

This server is already pretty interesting! We've got a simple site, but can flexibly change the representation of the data. Having done relatively little work, we can let our team write content in markdown. Unlike many markdown-to-HTML solutions, the translation is happening at runtime, so an author can immediately view the result of markdown changes by refreshing the corresponding page.

Each of our underlying object, file, or function-based graphs has its advantages. For example, we can serve our function-based graph to browse HTML pages which are generated on demand.

<span class="tutorialStep"></span> Edit `src/deep/siteGraph.js` to export the function-based graph from `htmlFn.js` instead of `htmlFiles.js`.

<span class="tutorialStep"></span> Restart the server with `node serve`.

<span class="tutorialStep"></span> Observe that, this time, an index page _is_ shown — albeit a pretty strange one that says

> Hello, **index**.

The served graph is responding to `index.html` by asking the function-based markdown graph for `index.md`, and the underlying function is dutifully generating a markdown file for that "name".

<span class="tutorialStep"></span> Add `.html` to your own name, like `Sara.html`, and try putting that in the address bar.

> Hello, **Sara**.

<span class="tutorialStep"></span> In the browser preview, you can also navigate to the corresponding `Sara.md` to view the markdown generated by the inner function-based markdown graph.

```
Hello, **Sara*..
```

<span class="tutorialStep"></span> Before moving on, in the terminal window, stop the server by pressing Ctrl+C.

&nbsp;

Next: [Index pages](indexPages.html) »
