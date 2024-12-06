---
title: How To
subtitle: Suggestions for common tasks
---

[Define a shared header, footer, or side bar](#topNav)<br>
[Define a base page template](#baseTemplate)<br>
[Transform a folder of markdown into HTML](#transform-markdown-folder)<br>
[Merge one folder into another](#spread)<br>
[Add an index page to a folder created with a map](#transform-with-index)

<a name="topNav"></a>

## Define a shared header, footer, or side bar

You can create an Origami template that defines shared HTML elements or other content in a single file, which you can then include in other page templates for any page that needs that shared content.

In this example, you'll create a simple navigation header.

<span class="tutorialStep"></span> Define a `topNav.html` file to hold the shared navigation elements.

```html
<!-- topNav.html -->
${ samples.ori/howTo/topNav/topNav.html }
```

The above just defines a single link to the home page; add any other elements you want on your pages.

<span class="tutorialStep"></span> Define some templates for pages that will use the shared navigation. Inside each template, include a reference to `\${ topNav.html }`.

Examples:

```ori
// about.ori
${ samples.ori/howTo/topNav/about.ori }
```

```ori
// contact.ori
${ samples.ori/howTo/topNav/contact.ori }
```

<span class="tutorialStep"></span> In a `site.ori` site definition, define HTML pages that use the above templates.

```ori
// site.ori
${ samples.ori/howTo/topNav/site.ori }
```

When Origami generates a page like `about.ori`, the page template incorporates the `topNav.html` file into the output.

```console
$ ori site.ori/about.html
${ samples.ori/howTo/topNav/site.ori/about.html }
```

This technique can be combined with the following one.

<a name="baseTemplate"></a>

## Define a base page template for multiple pages

Most sites define a consistent structure for all their pages that includes basic HTML elements for things like links to spreadsheet, `<meta>` tags, and other top-level page elements. You can define this structure in a base template that will be used by other templates.

<span class="tutorialStep"></span> Create a `page.ori` template that will serve as the base template.

```ori
// page.ori
${ samples.ori/howTo/baseTemplate/page.ori }
```

This template expects to receive a [document object](documents.html#document-objects) that has a `title` property with the document title and a `text` property with the body text.

<span class="tutorialStep"></span> Create an `about.ori` template for an About page. This page will call the base `page.ori` template as a function, passing in the desired `title` and `text` for the About page.

```ori
// about.ori
${ samples.ori/howTo/baseTemplate/about.ori }
```

<span class="tutorialStep"></span> Create a site.ori file to define your site:

```ori
// site.ori
${ samples.ori/howTo/baseTemplate/site.ori }
```

When a site visitor asks for `about.html`, this will invoke the `about.ori` template. That in turn will call the base `page.ori` template, which will incorporate the page title and body text into the page structure for the complete page.

```console
$ ori site.ori/about.html
${ samples.ori/howTo/baseTemplate/site.ori/about.html }
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
${ svg.js({
  markdown: samples.ori/howTo/markdown/markdown
}) }
</figure>

<span class="tutorialStep"></span> In your site definition, add a line that calls the [`map`](/builtins/tree/map.html) to transform all the markdown files using the [`mdHtml`](/builtins/text/mdHtml.html) builtin.

```ori
// site.ori
${ samples.ori/howTo/markdown/site.ori }
```

The `map` builtin will use `mdHtml` to transform both the keys (names) and values (contents) of the markdown files: the file extension on the keys will change from `.md` to `.html`, and the values will change from markdown text to HTML.

<figure>
${ svg.js samples.ori/howTo/markdown/site.ori }
</figure>

If you want the pages to appear at a higher level of the site, you can combine this technique with the spread operator; see below.

<a name="spread"></a>

## Merge one folder into another

Sometimes you want to group a set of pages into a subfolder to keep your source content organized, but have all those pages appear as if they were direct children of some other folder.

For example, if you are an indie website author, you may want to create set of [slash pages](https://slashpages.net) at the top level of your site for various aspects of you and your interests. You can create these pages in HTML directly (or use markdown; see the preceding section).

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
${ samples.ori/howTo/slashPages/site.ori }
```

you will have the following site hierarchy:

<figure>
${ svg.js samples.ori/howTo/slashPages/site.ori }
</figure>

This would give you URLs like `/slash/now.html`.

<span class="tutorialStep"></span> Since you want the `slash` pages to appear at the top level of your site, use the [spread operator](syntax.html#spread-operator) to merge the contents of the `slash` folder into the site's top level:

```ori
// siteSpread.ori
${ samples.ori/howTo/slashPages/siteSpread.ori }
```

which produces the following hierarchy:

<figure>
${ svg.js samples.ori/howTo/slashPages/siteSpread.ori }
</figure>

With this, all the pages are directly available at the root of the site and URLs like `/now.html`.

<a name="transform-with-index"></a>

## Add an index page to a folder created with a map

Suppose you have a folder of posts you're create with [`map`](/builtins/tree/map.html), perhaps to [transform a folder of markdown into HTML](#transform-markdown-folder), and you want the resulting virtual folder of HTML to have its own `index.html` page. You can use the same [spread operator](syntax.html#spread-operator) shown above.

In this situation, you're going to be using your transformed markdown twice: once to create the HTML pages in the `pages` area, and a second time for the index page for the `pages` area. To make your `map` reusable, define it in a separate file called `data.ori`

```ori
// data.ori
${ samples.ori/howTo/markdownIndex/data.ori }
```

Now create a basic index page template in `pagesIndex.ori`:

```ori
// pagesIndex.ori
${ samples.ori/howTo/markdownIndex/pagesIndex.ori }
```

Then define a `site.ori` formula to create the `pages` area. This expression will use the spread operator to incorporate all the individual pages. To that set of pages, the `index.html` formula will create the index page, passing the set of individual pages to the `pagesIndex.ori` template.

```ori
// site.ori
${ samples.ori/howTo/markdownIndex/site.ori }
```

To visualize this operation: `data.ori` defines a tree that looks like this.

<figure>
${ svg.js samples.ori/howTo/markdownIndex/data.ori }
</figure>

The `pages` definition in `site.ori` includes all of that, plus the additional `index.html` page:

<figure>
${ svg.js samples.ori/howTo/markdownIndex/site.ori/pages }
</figure>
