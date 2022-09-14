---
title: Serve a graph
numberHeadings: true
intro = client/samples/patternIntro:
---

Displaying our trivial site in the console is fine for debugging, but now that our site is in graph form, we can do much more interesting things with it.

We can now create a small server to directly serve this graph. This server is built directly on top of Node's `http` API, and requires no framework.

If we're already using a server like [Express](https://expressjs.com/), it's straightforward to adapt this same idea into a server middleware function that handles a specific portion of a larger site.

## Treat a URL as a series of graph keys

The first thing is to recognize a URL as a graph traversal. We can treat a URL path as a series of keys to follow through a graph.

Specifically, we convert a string URL path like `/foo/bar` into an array of keys `["foo", "bar"]`. If the path ends in a slash like `foo/`, produce the keys `["foo", "index.html"]`.

```{{'js'}}
{{ js/functionSource intro/test/serve.js, 'keysFromUrl' }}
```

## Traverse a graph

We can then follow this array of keys to traverse a deep graph to a final value:

```{{'js'}}
{{ js/functionSource intro/test/serve.js, 'traverse' }}
```

## Handle requests using a graph

Putting these together, we can build a listener function that uses a graph to respond to HTTP/HTTPS requests.

```{{'js'}}
{{ js/functionSource intro/test/serve.js, 'requestListener' }}
```

This converts a request's URL into an array of keys, then returns what it finds there. If no value is found, the listener responds with 404 Not Found.

## Serve the graph

Finally, we start the server at a default port, using the graph defined in `siteGraph.js` as the graph to traverse.

```js
import http from "node:http";
import siteGraph from "./siteGraph.js";

const port = 5000;

// Start the server.
const server = http.createServer(requestListener(siteGraph));
server.listen(port, undefined, () => {
  console.log(
    `Server running at http://localhost:${port}. Press Ctrl+C to stop.`
  );
});
```

## Testing our server

We can now start our server:

```console
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

Then browse to that local server and see the index page.
