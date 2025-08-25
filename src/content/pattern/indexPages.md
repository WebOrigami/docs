---
title: Index pages
---

Right now, the experience of browsing our tree of generated HTML is a little unsatisfying because there are no index pages — we have to know what pages exist and manually enter a valid URL.

We can fix that by adding another tree transform. Wrapping a tree with this transform will:

1. add "index.html" as one of the inner tree's keys if it's not already defined
2. define a default value for "index.html" if one isn't already defined

The default value will be an HTML page listing the tree's other keys as links.

## Generate a single index page

First let's write a function that returns a reasonable default index page for a tree that doesn't define one.

```${'js'}
/* In src/index/indexPages.js */

${ src/js/codeFunctions.js(pattern.ori/index/indexPages.js).indexPage }
```

If the little `more` branch of our HTML tree looks like this:

<figure>
${ svg(pattern.ori/index/object.js/more) }
</figure>

Then invoking `indexPage` on this branch will return:

```${'html'}
${
  // 2024-09: Need parens; patterns intro doesn't handle trailing slashes yet
  pattern.ori/index/htmlObject.js/more("index.html") + "\n"
}
```

## Transform a tree by adding index pages

Using the default `indexPage` function above, let's now create a tree transform. This will accept any async tree, and return a new tree with an `index.html` key.

```${'js'}
/* In src/index/indexPages.js */

${ src/js/codeFunctions.js(pattern.ori/index/indexPages.js)["@prologue"] }
${ src/js/codeFunctions.js(pattern.ori/index/indexPages.js)["@epilogue"] }
```

If we use this to transform the `more` branch of the HTML tree, the transformed tree now includes an `index.html` page:

<figure>
${ svg(pattern.ori/index/indexPages.js(pattern.ori/index/htmlObject.js/more)) }
</figure>

## Incorporate the index page transform

We can apply this `indexPages` transform on top of our object, file, and function-based HTML trees. For example, the file-based tree now looks like:

```${'js'}
/* src/index/htmlFiles.js */

${ pattern.ori/index/htmlFiles.js }
```

These transforms are just functions, so we can apply as many tree transforms as we want.

In this case, the order of function calls matters: when the `indexPages` transform is iterating through the keys of a tree, we want it to see keys that end in `.html` so that it create links to the HTML pages. If we applied the `indexPages` transform first, it would create links to the `.md` files.

<span class="tutorialStep"></span> From inside the `src/index` directory, serve the HTML tree again.

```console
$ cd../index
$ node serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Browse the site to see index pages at each level of the hierarchy.

This server can be good enough for development, and we could easily deploy it in this state. But since this HTML content is currently all static, it would be nice to render the HTML content as `.html` files we can deploy directly.

<span class="tutorialStep"></span> Before moving on, in the terminal window, stop the server by pressing Ctrl+C.

&nbsp;

Next: [Copy a tree](copy.html) »
