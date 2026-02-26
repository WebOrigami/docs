---
title: "httpstree: protocol"
subtitle: Treat an HTTPS site as a tree
---

This lets you retrieve resources from an existing site by treating it as a tree.

```console
$ ori "(httpstree://example.com)/index.html"
… displays contents of https://example.com/index.html …
```

One use for `httpstree:` is passing a site to [`crawl`](/builtins/dev/crawl.html) to crawl a site.

## Example: dynamic paths

Another use for `httpstree:` is to define a dynamic path: a fixed path extended by some portion determined by a runtime variable.

As an example, the Web Origami [Cat Prints Store](https://cat-prints-store.weborigami.org) sample application has an `/artwork` route with [sample cat images](https://cat-prints-store.weborigami.org/artwork/).

Perhaps we have a new site that wants to reference those same images using just a file name. An Origami function `catImages.ori` can use `httpstree:` to establish the tree of web resources we're interested in — essentially a symbolic link to a point on the web. The function then extend that path by treating that tree like a function, passing in the `name` of a specific sample image.

```ori
// catImage.ori
${ samples/help/catImage.ori }
```

We can then make a reference like `catImages.ori/woman-with-a-cat`, and this will fetch the desired image from the full path, https://cat-prints-store.weborigami.org/artwork/woman-with-a-cat.jpg.
