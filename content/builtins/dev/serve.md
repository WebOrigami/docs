---
title: serve(tree, [port])
supertitle: "Dev."
---

Starts a local web server to serve the given [map-based tree](/async-tree/mapBasedTree.html).

To serve the current folder:

```console
$ ori serve .
Server running at http://localhost:5000
```

The server translates requests for a web route like `a/b/c` into a traversal of the tree, traversing the keys `a`, `b`, and `c`, then returning the value from that point in the tree.

Note: Instead of using Origami's built-in server, you can also use Origami as middleware for server frameworks such as [Express](https://expressjs.com/). This allows you to define a tree of site resources using Origami, then incorporate that into your server as the site's top level or a branch of site. See [express-demo](https://github.com/WebOrigami/express-demo) for an example.

## Transforming a resource into a `Response`

For each request, the serve traverses the tree to obtain a resource. The server than transforms this into an HTTP [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object before returning it to the client.

- If the resource is a function, it is invoked to obtain the final resource.
- If the resource is already a `Response`, it is returned as is.
- If the resource has a `pack()` function, this is invoked to obtain the final resource.

## Identifying the response's media type

The server also determines an appropriate [media type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types) (also known as a MIME type or content type) for each resource.

- If the resource has a `mediaType` property, that value is used as the media type.
- If the original path ended in a web file extension (e.g., `.html`) associated with a [common media type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types), that media type is used.
- If the resource is some form of [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) and the resource can be decoded as text with only printable characters, the resource will be treated as text.
- If the resource is text and appears to start with an HTML tag, HTML comment, or `DOCTYPE` declaration, the media type will be `text/html`. Otherwise a text resource will have the media type `text/plain`.
