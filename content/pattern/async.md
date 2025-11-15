---
title: Asynchronous maps
---

Before wrapping up our look at maps and trees, let's take a brief look at [asynchronous](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS) maps.

All of our `Map` classes so far are "lazy" in the sense that they don't do any work until requested. But those lazy methods are still _synchronous_: when invoked, they immediately return a result. This won't be good enough to represent a network resource, where fetching data can take long enough that we want to get other work done in the meantime.

## AsyncMap

To model network resources, we can introduce an _asynchronous_ variation of the `Map` class called `AsyncMap`. `AsyncMap` has the same methods names as `Map`, but all those methods are marked as `async` functions.

```js
export default class AsyncMap {
  async get(key) { … }
  async *keys() { … }
  …
}
```

Unlike the `SyncMap` base class, the `AsyncMap` base class is fundamentally abstract — it doesn't provide any built-in storage mechanism. Accordingly, its core methods like `get` and `keys` must be overridden to define a useful subclass; they have to actually get content from somewhere.

## Retrieving content from a site

As a demonstration, we will create an asynchronous map that retrieves a collection of content from an "explorable" site.

- The constructor will take a URL representing a site area.
- The `get` call will use the standard JavaScript [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) method to retrieve a resource from within that area.
- The HTTP/S protocols sadly do not offer a standard way to get the set of resources available within a particular site area. Our `keys` method can use a simple convention called [JSON Keys](https://weborigami.org/async-tree/jsonkeys): for any given route, we expect the site to define a `.keys.json` file at that route that returns an array of string keys in JSON format. This gives us the vital information we need to be able to programmatically explore the site.

Given that, we can subclass `AsyncMap` to represent a node in such an explorable site.

```js
/* src/async/ExplorableSiteMap.js */

export default class ExplorableSiteMap extends AsyncMap {
  constructor(href) {
    super();
    this.href = href;
  }

  async get(key) {
    /* TODO */
  }

  async *keys() {
    /* TODO */
  }
}
```

The map's `get()` method fetches a given key within the area rooted by the site:

```js
  async get(key) {
    // Extend the URL with the key and fetch the resource
    const href = new URL(key, this.href).href;
    const response = await fetch(href);
    if (!response.ok) {
      return undefined;
    }
    // If a known text type, return the text; otherwise return an ArrayBuffer
    const mediaType = response.headers?.get("Content-Type")?.split(";")[0];
    const value = textMediaTypes.includes(mediaType)
      ? await response.text()
      : await response.arrayBuffer();
    return value;
  }
```

The `keys()` method fetches the `.keys.json` file using the map's own `get()` method and parses the result as JSON:

```js
  async *keys() {
    // Save a promise to ensure we only check for keys once, even if multiple
    // requests are made before the first one completes.
    this.keysPromise ??= this.get(".keys.json").then((json) =>
      json ? JSON.parse(json) : []
    );
    const keys = await this.keysPromise;
    yield* keys;
  }
```

## Sample network post content

The weborigami.org site implements the JSON Keys protocol, so we can use this site to demonstrate this `ExplorableSiteMap` class. For example, https://weborigami.org/samples/posts/.keys.json is a file that lists the files in that specific site area:

```json
${ https://weborigami.org/samples/posts/.keys.json }

```

Those files contain the same sample content we've been using in this walkthrough, so `post1.md` contains:

```
${ https://weborigami.org/samples/posts/post1.md }

```

We can then represent that area as an async map:

```js
/* src/async/remote.js */

${ pattern/async/remote.js }
```

## Testing

We can adapt our tests so that they can cope with an async map using `await`.

<span class="tutorialStep"></span> From inside the `src/async` directory, confirm that the tests pass:

```console
$ cd ../async
$ node remote.test.js
…
# tests 3
# pass 3
# fail 0
```

These passing tests are retrieving the expected data from the weborigami.org site.

## Tools for working with async maps

We can adapt our `json` utility to dump an async map to the console. We update the `plain` function to use a `for await` loop to process the async `keys`, and likewise uses `await` to call the async `get` method for a given key.

```js
/* src/async/json.js */

${ src/js/codeFunctions.js(pattern/async/json.js).plain }
```

We can then use this `json` utility to dump our posts from the network site to the console:

```console
$ node json remote.js
${ Tree.json(pattern/async/remote.js) + "\n" }
```

As before, all of the data looks the same — but is now coming from a server. Each of those keys came from the server's `.keys.json` file, and each of those values came from the respective server file.

Happily, this async `json` utility will still be able to process our regular, synchronous `Map` classes too. The JavaScript `for await` statement and `await` keyword are flexible enough that they work even if a map's `get` and `keys` methods are synchronous. The use of the async features for a sync map will have a minor impact on performance, but in exchange tools like the `json` utility can be made to work with both sync and async maps.

It would be possible, with a modest amount of work, to extend our complete set of map-based tooling to work with async maps:

- We could adapt `HtmlMap` to accept an async map as the source of markdown content.
- We could adapt `serve.js` to serve content from an async map.
- We could adapt `copy.js` to copy content from one async map to another.

Having the underlying infrastructure accommodate both sync and async maps would confer a great deal of flexibility. We could, for example, redefine our site to directly pull the markdown content from a server.

&nbsp;

Next: [A system of tools](system.html) »
