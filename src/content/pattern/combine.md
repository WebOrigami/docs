---
title: Combine graphs
---

Now that we have a basic site working in graph form, we can manipulate that graph to suit our needs without needing to adjust our server and build infrastructure. For example, we can readily combine graphs to create larger graphs.

In the course of this tutorial, we've created three parallel graph implementations, backed by an object, a folder tree, and a function. We can combine those graphs to make a larger graph with three branches, each of which is defined differently, but each of which can be explored using the same AsyncDictionary interface.

## Using ObjectGraph to combine graphs

Our `ObjectGraph` class turns out to be a useful tool to combine the three graphs of HTML pages from `htmlFiles.js`, `htmlFn.js`, and `htmlObject.js`. We take the exports from those three files, then use them as values in an object. The keys of that object will name the graph's branches — `files`, `function`, and `object` — letting us route requests into the appropriate branch with those names.

We can define this combination by updating `siteGraph.js`:

```{{'js'}}
/* src/combine/siteGraph.js */

{{ pattern-intro/combine/siteGraph.js }}
```

We apply our `indexPages` transform to give the overall graph an index page. Having done that, we can drop the use of `indexPages` in the individual graphs. For example, the object-backed graph in `htmlObject.js` no longer needs to define index pages:

```{{'js'}}
/* src/combine/htmlObject.js */

{{ pattern-intro/combine/htmlObject.js }}
```

To contrast the values coming from each branch of this graph, we can update the object, files, and function graphs so that they each define different names.

Our combined graph is quite large:

<figure>
{{ @svg pattern-intro/combine/siteGraph }}
</figure>

Each of the three main branches of this tree is defined in a different way, with different pros and cons. When constructing a real site, this flexibility lets us pick the most appropriate implementation for any part of the site. And when our needs inevitably change, we can switch those implementations around without needing to change any of our surrounding infrastructure.

## Serving and building

<span class="tutorialStep"></span> Run the updated server from inside the `src/combine` directory.

```console
$ cd ../combine
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Browse the combined site.

Node that the `function` route can handle arbitrary requests. E.g., if you browse to `function/Sara.html`, you'll see a page for Sara.

<span class="tutorialStep"></span> Stop the server and run the build process to generate the pages for the full, combined graph.

```console
$ node build
$ ls dist
files      function   index.html object
```

The build process is copying the virtual graph into real files. Among other things, this will create files for all the values in the `keys` provided by the dynamic `function` route. But now that the files are static, the pages provided by that `function` route are essentially frozen.

If it's necessary that your site handle dynamic requests, then you would have to serve the live site graph (not static files). It would also be possible to blend approaches: use a build process to generate static files for those things that can be statically generated, and use a live server for the remaining portion.

&nbsp;

Next: [Graph operations](operations.html) »
