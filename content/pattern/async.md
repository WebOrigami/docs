---
title: Asynchronous maps
---

Before wrapping up our look at maps and trees, let's take a brief look at [asynchronous](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS) maps.

All of our `Map` classes have been "lazy" in the sense that they don't do any work until requested. But those "lazy" methods are still _synchronous_: when invoked, they immediately return a result. This won't be good enough to represent a network resource, where fetching data can take long enough that we want to get other work done in the meantime.

## AsyncMap

To model network resources, we can introduce an asynchronous variation of the `Map` class called `AsyncMap`. `AsyncMap` has basically the same methods as `Map`, but all of the methods like `get` and `keys` are marked as `async` functions.

```js
export default class AsyncMap {
  async get(key) { … }
  async *keys() { … }
  …
}
```

Unlike the `SyncMap` base class, the `AsyncMap` base class is fundamentally abstract — it doesn't provide any built-in storage mechanism. Accordingly, its core methods like `get` and `keys` must be overridden to define a useful subclass. That is, they have to actually get content from somewhere.

## Retrieving content from a site

As a demonstration, we can subclass `AsyncMap` to create a class that retrieves a collection of content from a site.

- The constructor will take a URL representing a site area.
- The `get` call will use the standard JavaScript [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) method to retrieve a resource from within that area.
- The HTTP/S protocols sadly do not offer a standard way to get the set of resources available within a particular site area. Our `keys` method can use a simple convention called [JSON Keys](https://weborigami.org/async-tree/jsonkeys): for any given route, we expect the site to define a `.keys.json` file at that route that returns an array of string keys in JSON format.

Given that, we can subclass `AsyncMap` to represent content on such a site an asynchronous map.

```js
/* src/async/ExplorableSiteMap.js */

export default class ExplorableSiteMap extends AsyncMap {


*** TODO ***


}
```

## Sample network post content

The weborigami.org site implements the JSON Keys protocol, so we can use this site as an example. The sample area at https://weborigami.org/samples/posts defines a `.keys.json` file that looks like:

```json
["post1.md", "post2.md", "post3.md"]
```

Those files contain the same sample we've been using in this walkthrough, so `post1.md` contains:

```md
This is \*\*post 1\*\*.
```

We can then represent that area as an async map:

```js
/* src/async/remote.js */

${ pattern/async/remote.js }
```

## Tools for working with async maps

We can adapt our `json` utility to dump an async map to the console. We update the `plain` function to use a `for await` loop to process the async `keys`, and likewise uses `await` to call the async `get` method for a given key.

```js
/* src/async/json.js */

${ src/js/codeFunctions.js(pattern/async/json.js).plain }
```

We can then use this `json` utility to dump our posts from the network site to the console:

```console
$ node json.js remote.js
${ Tree.json(pattern/async/remote.js) + "\n" }
```

Happily, this async `json` utility will still be able to process our regular, synchronous `Map` classes too. The JavaScript `for await` statement and `await` keyword are flexible enough that they work even if a map's `get` and `keys` methods are synchronous. The use of the async features for a sync map will have a minor impact on performance, but in exchange tools like the `json` utility can be made to work with both sync and async maps.

It would be possible, with a modest amount of work, to extend our complete set of map-based tooling to work with async maps:

- We could adapt `HtmlMap` to accept an async map as the source of markdown content.
- We could adapt `serve.js` to serve content from an async map.
- We could adapt `copy.js` to copy content from one async map to another.

Having the underlying infrastructure accommodate both sync and async maps would confer a great deal of flexibility. We could, for example, easily redefine our site to directly pull the markdown content from a server.

&nbsp;

Next: [Reusable map-based tools](reuse.html) »
