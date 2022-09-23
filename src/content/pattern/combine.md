---
title: Combine graphs
combine = node_modules/@explorablegraph/pattern-intro/src/combine:
---

Now that we have a basic site working in graph form, we can manipulate that graph to suit our needs without needing to adjust our server and build infrastructure. For example, we can readily combine graphs to create larger graphs.

In the course of this tutorial, we've created three parallel graph implementations, backed by an object, a folder tree, and a function. We can combine those graphs to make a larger graph with three branches, each of which is defined differently, but each of which can be explored using the same Explorable interface.

## Using ObjectGraph to combine graphs

Our `ObjectGraph` class turns out to be a useful tool to combine the three graphs of HTML pages from `htmlFolder.js`, `htmlFn.js`, and `htmlObject.js`. We take the exports from those three files, then use them as values in an object. The keys of that object will name the graph's branches — `files`, `function`, and `object` — letting us route requests into the appropriate branch with those names.

```{{'js'}}
// combine/site.js

{{ combine/site.js }}
```

We apply our `indexPages` transform to give the overall graph an index page.

Our combined graph is quite large:

<figure>
{{ svg combine/site }}
</figure>

Each of the three main branches of this tree is defined in a different way, with different pros and cons. When constructing a real site, this flexibility lets us pick the most appropriate implementation for any part of the site. And when our needs inevitably change, we can switch those implementations around without needing to change any of our surrounding infrastructure.

## Serving and building

We can serve this larger graph by updated the top-level import in `serve.js`:

```js
// In combine/serve.js

import siteGraph from "./site.js";
…
```

```console
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

And we can update `build.js` to build the larger graph:

```{{'js'}}
// combine/build.js

{{ combine/build.js }}
```

We can run this new build process and verify that it generates the complete set of pages for the full, combined graph.

```console
$ node build
$ ls dist
Alice.html Bob.html   Carol.html David.html Eve.html   Frank.html Grace.html index.html more
```

&nbsp;

Next: [Graph operations](operations.html) »
