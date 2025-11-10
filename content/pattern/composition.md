---
title: Compose a tree from maps
---

We are now going to create a little site tree with a home page and a `posts` area organized into a navigational hierarchy:

<figure>
  ${ svg(pattern/site/site.js) }
</figure>

Using `Map` objects to represent this tree will be straightforward.

- The `posts` area (the circle in the middle of the above diagram) will be the result of applying the `HtmlMap` transformation to a map of markdown documents. Those could come from anywhere; for this demonstration we'll use the file-based markdown collection.
- The `index.html` page will use that `posts` map to construct links to all the posts.

## Composing the site's root node

We need a way to combine these two pieces into a new map to form the root of our tree (the circle on the left above). This is a good job for a stock `Map`!

```js
/* src/site/site.js */

${ pattern/site/site.js }
```

Alternatively, we could define the root node with an `ObjectMap`:

```js
import markdown from "./files.js";
import HtmlMap from "./HtmlMap.js";
import indexPage from "./indexPage.js";
import ObjectMap from "./ObjectMap.js";

const posts = new HtmlMap(markdown);

export default new ObjectMap({
  "index.html": indexPage(posts),
  posts,
});
```

This requires a separate `import` statement, but the tree definition itself is slightly more concise and arguably more legible.

## Displaying the site

Because our site is a tree of maps, we can dump the entire contents of the site to the console using our `json` utility.

```console
$ node json site.js
${ Tree.json(pattern/site/site.js) + "\n" }
```

The `index.html` page is a little hard to read inside the block of JSON — but the content is all there and correct.

Of course, what we really want to do is _browse_ this site tree.

&nbsp;

Next: [Serve a tree](serve.html) »
