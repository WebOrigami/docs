---
title: Index pages
---

We'll now use our map classes to create a toy blog site that we can browse and build.

At this point, we've already got a way to build a map of HTML pages that are backed by a collection of markdown files — stored either in memory or the file system, or generated dynamically. Regardless of where the markdown comes from, we end up with an `HtmlMap` instance. Each key in that map ends in `.html` and each value represents a (trivial) HTML blog post.

<figure>
  ${ svg(pattern/map/htmlObject.js) }
</figure>

We can construct our site around this map in two different ways:

1. We'll include this map as the site's `posts` area.
2. We'll use this map to construct a simple blog index page.

## Navigation elements reflect tree structure

Sites generally offer navigation headers, side bars, etc., that reflect the contents of the site. These elements often have a one-to-one correspondence between the site’s tree structure and visible user interface elements. For example, for each post in the `posts` area, we want to create a clickable link on the home page.

We can define the home page as as a function which, given a map of HTML pages, returns the HTML for an index page that links to all those pages.

```js
/* src/site/indexPage.js */

${ pattern/site/indexPage.js }
```

The work proceeds in steps:

1. Get the `keys` of the input `map`. That will be an [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator), which is somewhat awkward to work with. We can convert it to a simple array of strings via [`Array.prototype.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).
2. For each string key, we create an HTML fragment for a list item containing a link to the corresponding page in the `posts` area. (We'll actually define that area shortly.) In a real blog index, we'd want the link to include the blog post title, date, and maybe a summary. Here we'll just use the page file name without the `.html` extension.
3. We join all the links together and insert them into HTML boilerplate.

A useful aspect of this `indexPage` function is that, by virtue of using the `Map` abstract, it can construct links to any set of HTML pages defined by any means. We can use it to generate an index of HTML pages generated from markdown files — or write a unit test that generates an index for a small set of hardcoded HTML pages wrapped in a standard `Map`.

&nbsp;

Next: [Composing a tree](composition.html) »
