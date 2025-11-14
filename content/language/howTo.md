---
title: How To
subtitle: Suggestions for common tasks
---

[Define a shared header, footer, or side bar](#topNav)<br>
[Define a base page template](#baseTemplate)<br>
[Transform a folder of markdown into HTML](#transform-markdown-folder)<br>
[Merge one folder into another](#spread)<br>
[Add an index page to a folder created with a map](#transform-with-index)<br>
[Hide parts of a tree](#hide-parts-of-a-tree)<br>
[Define a default value](#define-a-default-value)<br>
[Extract specific resources from a site](#extract-specific-resources-from-a-site)<br>

<a name="topNav"></a>

## Define a shared header, footer, or side bar

You can create an Origami template that defines shared HTML elements or other content in a single file, which you can then include in other page templates for any page that needs that shared content.

In this example, you'll create a simple navigation header.

<span class="tutorialStep"></span> Define a `topNav.html` file to hold the shared navigation elements.

```html
<!-- topNav.html -->
${ samples/howTo/topNav/topNav.html }
```

The above just defines a single link to the home page; add any other elements you want on your pages.

<span class="tutorialStep"></span> Define some templates for pages that will use the shared navigation. Inside each template, include a reference to `\${ topNav.html }`.

Examples:

```ori
// about.ori
${ samples/howTo/topNav/about.ori }
```

```ori
// contact.ori
${ samples/howTo/topNav/contact.ori }
```

<span class="tutorialStep"></span> In a `site.ori` site definition, define HTML pages that use the above templates.

```ori
// site.ori
${ samples/howTo/topNav/site.ori }
```

When Origami generates a page like `about.ori`, the page template incorporates the `topNav.html` file into the output.

```console
$ ori site.ori/about.html
${ samples/howTo/topNav/site.ori/about.html }
```

This technique can be combined with the following one.

<a name="baseTemplate"></a>

## Define a base page template for multiple pages

Most sites define a consistent structure for all their pages that includes basic HTML elements for things like links to spreadsheet, `<meta>` tags, and other top-level page elements. You can define this structure in a base template that will be used by other templates.

<span class="tutorialStep"></span> Create a `page.ori` template that will serve as the base template.

```ori
// page.ori
${ samples/howTo/baseTemplate/page.ori }
```

This template expects to receive a [document object](documents.html#document-objects) that has a `title` property with the document title and a `text` property with the body text.

<span class="tutorialStep"></span> Create an `about.ori` template for an About page. This page will call the base `page.ori` template as a function, passing in the desired `title` and `text` for the About page.

```ori
// about.ori
${ samples/howTo/baseTemplate/about.ori }
```

<span class="tutorialStep"></span> Create a site.ori file to define your site:

```ori
// site.ori
${ samples/howTo/baseTemplate/site.ori }
```

When a site visitor asks for `about.html`, this will invoke the `about.ori` template. That in turn will call the base `page.ori` template, which will incorporate the page title and body text into the page structure for the complete page.

```console
$ ori site.ori/about.html
${ samples/howTo/baseTemplate/site.ori/about.html }
```

As a site grows, the base page template can become quite large. For clarity, it can be helpful to separate out pieces of the base template into separate files. For example, if the top navigation area gets complex, you can separate it into a separate top navigation template; see the preceding section.

<a name="transform-markdown-folder"></a>

## Transform a folder of markdown into HTML

You may want to use [markdown](https://daringfireball.net/projects/markdown/) format to write pages which are primarily text. You can then have Origami transform the markdown pages to HTML.

<span class="tutorialStep"></span> Create a folder called `markdown` to hold your `.md` markdown files:

```
src/
  markdown/
    about.md
    products.md
    support.md
  site.ori
```

Your `markdown` folder will have the following structure:

<figure>
${ svg({
  markdown: samples/howTo/markdown/markdown
}) }
</figure>

<span class="tutorialStep"></span> In your site definition, add a line that calls the [`map`](/builtins/tree/map.html) to transform all the markdown files using the [`mdHtml`](/builtins/origami/mdHtml.html) builtin.

```ori
// site.ori
${ samples/howTo/markdown/site.ori }
```

The `map` builtin will use `mdHtml` to transform both the keys (names) and values (contents) of the markdown files: the file extension on the keys will change from `.md` to `.html`, and the values will change from markdown text to HTML.

<figure>
${ svg(samples/howTo/markdown/site.ori) }
</figure>

If you want the pages to appear at a higher level of the site, you can combine this technique with the spread operator; see below.

<a name="spread"></a>

## Merge one folder into another

Sometimes you want to group a set of pages into a subfolder to keep your source content organized, but have all those pages appear as if they were direct children of some other folder.

For example, if you are an indie site author, you may want to create set of [slash pages](https://slashpages.net) at the top level of your site for various aspects of you and your interests. You can create these pages in HTML directly (or use markdown; see the preceding section).

It may be useful to group such pages into a subfolder, but them merge them into the top level of your site so the pages have shorter URLs.

<span class="tutorialStep"></span> Group the pages into a subfolder called `slash`:

```
src/
  slash/
    about.html
    links.html
    now.html
  index.html
  site.ori
```

If you include the `slash` folder as a subfolder of your site:

```ori
// site.ori
${ samples/howTo/slashPages/site.ori }
```

you will have the following site hierarchy:

<figure>
${ svg(samples/howTo/slashPages/site.ori) }
</figure>

This would give you URLs like `/slash/now.html`.

<span class="tutorialStep"></span> Since you want the `slash` pages to appear at the top level of your site, use the [spread operator](expressions.html#spread-operator) to merge the contents of the `slash` folder into the site's top level:

```ori
// siteSpread.ori
${ samples/howTo/slashPages/siteSpread.ori }
```

which produces the following hierarchy:

<figure>
${ svg(samples/howTo/slashPages/siteSpread.ori) }
</figure>

With this, all the pages are directly available at the root of the site and URLs like `/now.html`.

<a name="transform-with-index"></a>

## Add an index page to a folder created with a map

Suppose you have a folder of posts you're create with [`map`](/builtins/tree/map.html), perhaps to [transform a folder of markdown into HTML](#transform-markdown-folder), and you want the resulting virtual folder of HTML to have its own `index.html` page. You can use the same [spread operator](expressions.html#spread-operator) shown above.

In this situation, you're going to be using your transformed markdown twice: once to create the HTML pages in the `pages` area, and a second time for the index page for the `pages` area. To make your `map` reusable, define it in a separate file called `data.ori`

```ori
// data.ori
${ samples/howTo/markdownIndex/data.ori }
```

Now create a basic index page template in `pagesIndex.ori`:

```ori
// pagesIndex.ori
${ samples/howTo/markdownIndex/pagesIndex.ori }
```

Then define a `site.ori` formula to create the `pages` area. This expression will use the spread operator to incorporate all the individual pages. To that set of pages, the `index.html` formula will create the index page, passing the set of individual pages to the `pagesIndex.ori` template.

```ori
// site.ori
${ samples/howTo/markdownIndex/site.ori }
```

To visualize this operation: `data.ori` defines a tree that looks like this.

<figure>
${ svg(samples/howTo/markdownIndex/data.ori) }
</figure>

The `pages` definition in `site.ori` includes all of that, plus the additional `index.html` page:

<figure>
${ svg(samples/howTo/markdownIndex/site.ori/pages) }
</figure>

## Hide parts of a tree

It can be helpful to break down the construction of complex tree values into simpler temporary values that are used but not made publicly available.

One way to accomplish this is to have a tree define a `public` value that is later extracted from the tree.

As a trivial example, this program defines a site whose `index.html` includes a `name` value:

```ori
// public.ori
${ samples/help/public.ori }
```

Along with `index.html`, this tree will expose the `name` value:

```console
$ ori public.ori/
${ Origami.yaml(samples/help/public.ori) }
```

But if you don't want the `name` value to be exposed, you can move the portion of the tree you _do_ want to expose into a `public` subtree, and then arrange to return only that subtree:

```ori
// private.ori
${ samples/help/private.ori }
```

This program effectively defines a [closure](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>): inside the `public` subtree, the `name` property is available for use in calculations.

The `.public` at the end of the program returns only the `public` subtree, so the internal `name` value is not available externally:

```console
$ ori private.ori/
${ Origami.yaml(samples/help/private.ori) }
```

## Define a default value

You can define a default value for a tree using the [spread operator](expressions.html#spread-operator) with an [arrow function](expressions.html#arrow-functions):

```ori
// default.ori
${ samples/help/default.ori }
```

This tree returns the indicated value for any defined key, and zero for anything else:

```console
$ ori default.ori/a
${ Origami.yaml(samples/help/default.ori/a) }
$ ori default.ori/b
${ Origami.yaml(samples/help/default.ori/b) }
$ ori default.ori/x
${ Origami.yaml(samples/help/default.ori/x) }
```

This works as follows:

- The `() => 0` syntax defines a function that returns zero for any input.
- The `...` spread operator merges that function into the tree.
- Merging the function into the tree implicitly turns it into a tree: asking this tree for a key will call the indicated function, which will return zero.
- The merged tree ends up combining two trees: 1) the tree defined by the `=0` function, and 2) the tree of the explicitly defined keys and values.

When asked to get a key, the merged tree starts by consulting the _second_ tree (of explicit keys/values). If the tree has a value, that will be returned. Otherwise, the merged tree consults the first tree (the function).

The idiom as written above is suitable for shallow trees: the `...` spread operator does a shallow merge, and the `() => 0` function defines a shallow tree.

You can adapt this idiom to provide a default value for deep trees using the [`Tree.deepMerge`](/builtins/tree/deepMerge.html) function to do the merge and the [`Tree.constant`](/builtins/tree/constant.html) builtin to define the default value.

```ori
// deepDefault.ori
${ samples/help/deepDefault.ori }
```

This provides the default value of zero for any level of the tree:

```console
$ ori deepDefault.ori/a
${ Origami.yaml(samples/help/deepDefault.ori/a) }
$ ori deepDefault.ori/x
${ Origami.yaml(samples/help/deepDefault.ori/x) }
$ ori deepDefault.ori/b/c
${ Origami.yaml(samples/help/deepDefault.ori/b/c) }
$ ori deepDefault.ori/b/y
${ Origami.yaml(samples/help/deepDefault.ori/b/y) }
```

One use for this is to provide a default "Not found" page for a dynamic site:

```ori
${ samples/help/notFound.ori }
```

## Extract specific resources from a site

The [`httpstree:`](/builtins/protocol/httpstree.html) protocol lets you treat a live site as a tree. Since sites don't generally make their keys (routes) available, you can only use such a tree to obtain values at known routes.

That said, if you know the routes you want to extract from a site, you can combine `httpstree:` with [`Tree.deepMerge`](/builtins/tree/deepMerge.html) to extract those specific routes.

```ori
// extract.ori

${ samples/help/extract.ori }
```

This merges two trees together:

1. The `httpstree:` defines an opaque tree with values but no keys.
2. The object literal defines a skeleton tree with keys but no defined values.

When this merged tree is asked to enumerate its keys, it will return the keys from the second tree. When the merged tree is later asked for the values of those keys, it will look for those in the second tree -- but since that tree has no defined values, the values from the first tree (the site) will be used.

The result is the tree of explicitly-requested resources from the site:

```console
$ ori extract.ori/
index.html: [contents of index.html]
language:
  index.html: [contents of language/index.html]
```

This technique is useful when you know the set of resources you want to fetch. If you don't know what resources the site provides, the [`dev:crawl`](/builtins/dev/crawl.html) builtin can return the complete publicly-reachable set of resources.
