---
title: Create a basic blog in Origami
subtitle: A hands-on walkthrough
numberHeadings: true
---

<script src="/components.js"></script>

Here’s a secret: _most websites aren’t all that complex_.

If you already know some JavaScript, you already know most of what you need to build a site from scratch. You don’t need a big framework or complex static site generator. All you need is

- a model for representing the creation of your site as the transformation of your content
- a language for describing your site’s transformation
- a general way to represent structured information as a tree
- a library of functions for common site tasks

As an introduction, this tutorial walks you through the basics of Origami by building a simple blog.

## Set up

A guiding principle of Origami is that [you are always in control](principles.html#you-are-always-in-control), so by design Origami does not require you to initialize a new project with a pile of required files or enforce a particular folder structure.

- Origami is built with [Node.js](https://nodejs.org), so if you'd like to follow along on your own machine, you'll need a currently-maintained version of [Node.js](https://nodejs.org) (v20 or later). You will also need to create a minimal `package.json` file.
- To exercise the blog features, you'll also need some (potentially trivial) content files to work with.

If you want to save time you can create that handful of files by cloning the [blog-intro](https://github.com/WebOrigami/blog-intro) project. Or if you'd prefer to confirm that there's really no magic involved, manually recreate those files following the instructions in that ReadMe.

Let's begin.

## Visualize your site as a tree

A helpful way to approach the creation of a site is to think about it as a tree of resources. In the case of the very basic blog in this tutorial, that tree will include:

- An HTML index page linking to all the posts
- HTML pages for the individual posts
- Feeds in formats like RSS for feed readers
- plus assets like CSS stylesheets

You can visualize this as:

<figure>
${ svg.js({
assets/: "Stylesheets and other resources"
index.html: "Index page"
posts/: {
1: "Post 1"
2: "Post 2"
}
feed.xml: "RSS feed"
}) }
</figure>

## Create a file to define your site

A straightforward way to define a tree is with an _object_ that has keys and values. (The Origami language is based on JavaScript expressions and so uses JavaScript terminology. What JavaScript calls “objects”, other programming languages may refer to as dictionaries or associative arrays.)

To define an object in Origami, you write an expression that goes in its own file with a `.ori` extension. Origami expressions are the essentially same as JavaScript expressions, with the addition of support for file paths.

<span class="tutorialStep"></span> In the `src` folder, create a file called `site.ori`. (The name `site.ori` is just a convention; you could call this file something else, in which case adjust the `scripts` in `package.json` to match.) In that file, enter:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  index.html: "My blog"
}
</pre>

</clipboard-copy>

Everything between the `{ }` curly braces defines the top level of the site. This is standard JavaScript object syntax with one refinement: because Origami objects are often used to create files whose names contain periods, no quotes are necessary around `index.html` even though that name contains a period.

This object in `site.ori` is going to define your blog site’s tree of resources. You can think of this as defining a set of virtual files. The object above defines a single virtual file whose name or _key_ is `index.html`, and whose contents or _value_ is the text “My blog”.

Aside: the above Origami expression is shorthand for the slightly longer JavaScript:

```js
export default {
  "index.html": "My blog",
};
```

The Origami server will happily serve a site defined in a JavaScript file like this. Origami’s expression syntax can be 30–40% more concise, so we’ll continue using that for the rest of this tutorial.

## Browse your site

You’ll eventually use `site.ori` to build your site’s static files, but for now you can serve that file directly to browse it as you do your work.

<span class="tutorialStep"></span> In the terminal, type:

```console
$ npm run start
```

This `start` script is just a convenient shorthand for a command that starts the Origami server with some debugging facilities enabled. You should see output like:

```
> start
> ori serve watch src, =debug src/site.ori

Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Open that `localhost` location in your browser to see a page saying “My blog”.

Keep that browser tab open. For future reference, let’s call that tab the Preview tab.

## Confirm your site’s structure

You can use Origami’s debugging tools to confirm the site’s current structure.

<span class="tutorialStep"></span> Open your local site in a new browser tab and add `/!explore` to the end of the URL. The new URL should now look like `https://localhost:5000/!explore`.

This will open the Web Origami Explorer window listing your project’s virtual files (like `index.html`) and local real files. Clicking a file on the left will display it on the right.

<span class="tutorialStep"></span> Select the `site.ori` file on the left, then click the **SVG** button at the top.

You'll see your site visually represented as a tree with just one branch:

<figure>
${ svg.js({
index.html: "My Blog"
}) }
</figure>

The little circle represents the overall tree, and the box represents the `index.html` file. You can click on that box to visit that page.

As you work on your site, you can periodically return to this tab to confirm your site has all the resources you expect. We’ll refer to this as the Explorer tab.

## Use a template to create text

The `index.html` file is currently defined with a short quoted string. You can create larger, more realistic HTML pages using _templates_. A template is nothing more than a function that accepts data and returns text.

For this tutorial, you'll use the [template system built into Origami](templates.html), but Origami can also work with other template systems.

<span class="tutorialStep"></span> Create a file called `index.ori` and enter:

```${"html"}
// Blog home page
() => Tree.indent`
  <h1>My blog</h1>
`
```

Like all Origami `.ori` files, this file returns an expression: in this case, a function that acts as a template. The function will eventually accept the posts we want to render in a list, but for now it takes no input and always returns the same HTML fragment.

The [`Tree.indent`](/builtins/tree/indent.html) tagged template literal normalizes the indentation of the text output. Use of `Tree.indent` is optional; if you don’t care much about the legibility of the final HTML you can drop it.

You can call this template from another Origami expression. Origami lets one file reference another using a _path_, which can be as simple as a file name.

<span class="tutorialStep"></span> In `site.ori`, update the formula for `index.html` to remove the quoted string, and instead reference the `index.ori` template name. Call this template as a function by using parentheses.

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  index.html: <b>index.ori()</b>
}
</pre>

</clipboard-copy>

Origami will now generate the HTML for `index.html`:

```html
<h1>My blog</h1>
```

<span class="tutorialStep"></span> Refresh the Preview tab to confirm the page now shows “My blog” as a heading.

When you call `index.ori` in an expression like this, Origami searches the current [scope](scope.html) for that name. Origami will find the `src/index` template file and use it to create the home page.

## Define a property getter

As `site.ori` is written, the `index.html` value of this site is calculated when the site is loaded. That happens when you start the server. Because the site is being served with a debugging facility called [`watch`](/builtins/dev/watch.html), it will be reloaded whenever you change something in the `src` folder.

As your site grows, it can become expensive to calculate the value of every site resource every time the site is loaded or reloaded. To remedy that, you can arrange to have the value of `index.html` calculated upon request.

<span class="tutorialStep"></span> Edit `site.ori` so that `index.html` is defined with an `=` equals sign instead of a colon:

<clipboard-copy>

<pre class="step">
{
  index.html <b>=</b> index.ori()
}
</pre>

</clipboard-copy>

The `=` is Origami's syntax for defining a dynamic property getter, which makes the calculation of the index page content _lazy_ — only calculated when asked for. We'll use that approach for the site's remaining resources so that the site's only doing work as necessary.

The equivalent JavaScript would be roughly:

```js
import indexTemplate from "index.js"; // If index.ori were ported to JS

export default {
  get ["index.html"]() {
    return indexTemplate();
  },
};
```

## Pull in an assets folder

Some resources such as CSS stylesheets can be incorporated into your site as is. To demonstrate that, let's add a simple stylesheet.

<span class="tutorialStep"></span> Create a `src/assets` folder, and within that folder create a `styles.css` file with any kind of styling. E.g.,

```css
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
}
```

<span class="tutorialStep"></span> Add the `assets` folder to your `site.ori`:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  <b>assets/</b>
  index.html = index.ori()
}
</pre>

</clipboard-copy>

The order of definitions in `site.ori` doesn't matter, so you can add the `assets/` reference anywhere. The trailing slash in `assets/` is optional, but serves as a reminder that `assets` is a folder.

<span class="tutorialStep"></span> Update the `index.ori` template to reference the stylesheet:

<clipboard-copy>

<pre class="step">
// Blog home page
() => Tree.indent`
  <b>&lt;link rel="stylesheet" href="/assets/styles.css"></b>
  &lt;h1>My blog&lt;/h1>
`
</pre>

</clipboard-copy>

Refresh the Preview tab to see the updated index page. You can also refresh the Explorer tab to see the updated site structure:

<figure>
${ svg.js({
assets/: {
  styles.css: "... styles ..."
}
index.html: `<link rel="stylesheet"...`
}) }

</figure>

## Process the markdown posts into data

Up to this point you’ve been defining the blog site structure in `site.ori`. In the next phase you’ll add the blog posts to the site. Your blog will use the posts in several different ways: as list items in the blog index page, as individual posts in the `/posts` area, and as items in the blog feeds.

All content sites need to resolve a point in tension: you want to make the content as easy as possible for you to write by hand, while at the same time making it easy to consistently render that content to HTML in multiple places.

You can resolve this tension by processing your raw content (here, markdown files in the `markdown` folder) into an intermediate form that can be easily rendered in a template function. That processing entails the calculation of any data that can be inferred from the content and will be used in more than one place. Here:

- Parse the post’s date from the file name.
- Transform the post content from markdown to an HTML fragment.
- Remove the `.md` extension from the file name to produce a key for use in a route like `/posts/<key>`.

You can consolidate this work into a new Origami file that will return the set of processed post data objects. This will effectively constitute a data pipeline for your project that will consume one tree (the posts in the `markdown` folder) and produce another.

<span class="tutorialStep"></span> Create a file called `src/postData.ori`. For now, enter in:

<clipboard-copy>

<pre class="step">
markdown/
</pre>

</clipboard-copy>

This will simply return the contents of the `markdown` folder as is. You’ll refine this in a moment to do more interesting work.

<span class="tutorialStep"></span> To see what data is being returned by `postData.ori`, refresh the Explorer tab and select that file on the left. Then click the **YAML** button at the top. You’ll see something like:

```yaml
2026-09-01.md: |
  ---
  title: First post
  ---
  This is the _first_ post.
2026-09-02.md: |
  ---
  title: Second post
  ---
  This is the _second_ post.
```

This just shows a tree whose keys are markdown file names, and whose values are markdown text with front matter.

## Transform the markdown to HTML

You can begin processing the markdown by parsing the `.md` markdown file into data. Origami understands some standard [file types](fileTypes.html), including markdown files. It will implicitly parse a markdown file if you attempt to work with it as data.

In Origami you can process a set of files as a batch with a _map_ in the [computer science sense of the word](<https://en.wikipedia.org/wiki/Map_(higher-order_function)>): an operation performed on every item in a collection to produce a new collection. You can think of the result of a map as a virtual folder — a set of things you can browse and work with, but which aren't stored anywhere.

<span class="tutorialStep"></span> Update `postData.ori` so that it maps the tree of markdown text files to a tree of corresponding data objects:

<clipboard-copy>

<pre class="step">
Tree.map(markdown/, {
  value: (file) => {
    ...file
  }
})
</pre>

</clipboard-copy>

[`Tree.map`](/builtins/tree/map.html) is a builtin Origami function that will apply the `value` function `(file) => { ...file }` to every value (text file) in the `markdown` folder. This particular value function returns an object, using the JavaScript `...` spread operator to duplicate all the properties of the indicated file.

As mentioned, when you try to work with text content in Origami like markdown as data, Origami implicitly parses the text.

<span class="tutorialStep"></span> Refresh the Explorer tab to view the value of `postData.ori` as YAML. It will now look like:

```yaml
2026-09-01.md:
  title: First post
  _body: |
    This is the _first_ post.
2026-09-02.md:
  title: Second post
  _body: |
    This is the _second_ post.
```

Origami has parsed the markdown text into data. The `title` value in the document front matter is now a `title` property, and the document body text is now a `_body` property containing the markdown.

## Add a date property

Most blog systems require you to track a post date as a property; to demonstrate the ability to work with data however you want, this sample blog tracks the date in the post file name. You’ll now extract that date from the file name and add it to the post data objects.

This could be done with an Origami expression, but let’s use this opportunity to show how you can call a JavaScript function from an Origami expression like `postData.ori`. Being able to easily call JavaScript gives you a great deal of flexibility; if you ever encounter a situation where Origami can’t do what you want, you can always drop down to JavaScript to accomplish your goals.

<span class="tutorialStep"></span> Create a file `src/parseDate.js` with:

<clipboard-copy>

<pre class="step">
// Parse a YYYY-MM-DD date from the start of the text.
export default function parseDate(text) {
  const match = text.match(/^(?<date>\d\d\d\d-\d\d-\d\d)/);
  // Dates will end up in GMT, so we shift the date to the desired time zone.
  // This sample content uses noon in U.S. Eastern Time, which is UTC minus 5
  // hours. See https://en.wikipedia.org/wiki/List_of_UTC_offsets for a list of
  // UTC offsets; replace with the time zone you want for your posts.
  return new Date(`\${match.groups.date}T12:00-05:00`);
}
</pre>

</clipboard-copy>

When `Tree.map` calls the `value` function to map an item’s value, it passes that function several arguments. The first is the item’s original value; the second is the item’s original key (name).

<span class="tutorialStep"></span> Update `postData.ori` to make these _two_ edits.

<clipboard-copy>

<pre class="step">
Tree.map(markdown/, {
  value: (file<b>, fileName</b>) => {
    ...file
    <b>date: parseDate.js(fileName)</b>
  }
})
</pre>

</clipboard-copy>

Synax note: JavaScript object syntax requires a comma between object entries. In an Origami object you have the option of using a newline character as a separator, so the above code omits the comma. If you want to stick with JavaScript syntax, you can add a comma after `...file`.

Here the Origami expression will call the function exported by `parseDate.js`. Just as Origami knows that `markdown` files can contain text and date, it knows that JavaScript modules can export objects — in this case, a function that can be applied.

<span class="tutorialStep"></span> Refresh the Explorer tab to view the new data:

```yaml
2026-09-01.md:
  title: First post
  _body: |
    This is the _first_ post.
  date: 2026-09-01T17:00:00.000Z
2026-09-02.md:
  title: Second post
  _body: |
    This is the _second_ post.
  date: 2026-09-02T17:00:00.000Z
```

Now each post has a `date` property.

## Transform the markdown to HTML

Many JavaScript libraries exist to transform markdown to HTML, and you can any one you want. You can write a JavaScript function that invokes your preferred markdown library, and then call that function using the technique shown above for `parseDate.js`.

For basic tasks, Origami includes a builtin function called [`Origami.mdHtml`](/builtins/origami/mdHtml.html). You can use this to read the markdown file’s `_body` property and define a new `_body` property containing HTML.

<span class="tutorialStep"></span> Update `postData.ori` to:

<clipboard-copy>

<pre class="step">
Tree.map(markdown/, {
  value: (file, fileName) => {
    ...file
    <b>_body: Origami.mdHtml(file._body)</b>
    date: parseDate.js(fileName)
  }
})
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Explorer tab to view the updated data:

```yaml
2026-09-01.md:
  title: First post
  _body: |
    <p>This is the <em>first</em> post.</p>
  date: 2026-09-01T17:00:00.000Z
2026-09-02.md:
  title: Second post
  _body: |
    <p>This is the <em>second</em> post.</p>
  date: 2026-09-02T17:00:00.000Z
```

Now the `_body` property is HTML. (Note: the name `_body` is just a convention used by Origami’s built-in features; when defining your own objects, you can call that property anything you want.)

## Remove the extension

You’ll want each post to have a consistent key that can be used as part of a route: for a post like `2026-09-01.md`, we can use the base part of the file name as the key: `2026-09-01`.

The `Tree.map` builtin has an [`extension`](https://weborigami.org/builtins/tree/map#transforming-extensions) option that lets you add, change, and remove extensions.

<span class="tutorialStep"></span> Update `postData.ori` to:

<clipboard-copy>

<pre class="step">
Tree.map(markdown/, {
  <b>extension: ".md→"</b>
  value: (file, fileName) => {
    ...file
    _body: Origami.mdHtml(file._body)
    date: parseDate.js(fileName)
  }
})
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Explorer tab to see:

```yaml
2026-09-01:
  title: First post
  _body: |
    <p>This is the <em>first</em> post.</p>
  date: 2026-09-01T17:00:00.000Z
2026-09-02:
  title: Second post
  _body: |
    <p>This is the <em>second</em> post.</p>
  date: 2026-09-02T17:00:00.000Z
```

Now the top-level keys of this data collection have no extension.

## Sort the data

A benefit of using a date at the start of the file name is that the posts will be automatically sorted by date, which can make it easy for you to find a particular post. However, blogs generally show posts in reverse chronological order.

To finish processing the posts, then, you can apply another builtin function called [`Tree.reverse`](/builtins/tree/reverse.html) to reverse the order of the posts.

<span class="tutorialStep"></span> Update `postData.ori` to wrap the final result with a call to `Tree.reverse`:

<clipboard-copy>

<pre class="step">
<b>Tree.reverse(</b>
  Tree.map(markdown/, {
    extension: ".md->"
    value: (file, fileName) => {
      ...file
      _body: Origami.mdHtml(file._body)
      date: parseDate.js(fileName)
    }
  })
<b>)</b>
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Explorer tab to see:

```yaml
2026-09-02:
  title: Second post
  _body: |
    <p>This is the <em>second</em> post.</p>
  date: 2026-09-02T17:00:00.000Z
2026-09-01:
  title: First post
  _body: |
    <p>This is the <em>first</em> post.</p>
  date: 2026-09-01T17:00:00.000Z
```

Now the newest post comes first.

Your little data pipeline is complete. It turns this tree of files in the `markdown` folder:

<figure>
${ svg.js({
2026-09-01.md: `---
title: First post
---
This is the _first_ post.
`
2026-09-02.md: `---
title: Second post
---
This is the _second_ post.
`
}) }
</figure>

into this tree of data:

<figure>
${ svg.js({
	2026-09-02: {
	  title: "Second post"
	  _body: "<p>This is the <em>second</em> post.</p>"
	  date: "2026-09-02T17:00:00.000Z"
	}
  2026-09-01: {
	  title: "First post"
	  _body: "<p>This is the <em>first</em> post.</p>"
	  date: "2026-09-01T17:00:00.000Z"
  }
}) }
</figure>

Now you’re ready to render the processed posts. You've already done much of the hard work, so the rest of this should go quickly.

## Create a list of posts

You can now update `index.ori` to show a list of your blog posts.

Most template systems handle such lists with some form of iteration, but Origami lets you reuse the same `Tree.map` feature you’ve already used in `postData.ori`. That file returns a set of post data objects — and you can map each of those objects to an HTML fragment for a list item.

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

<pre class="step">
// Blog home page
(posts) => Tree.indent`
  &lt;link rel="stylesheet" href="/assets/styles.css">
  &lt;h1>My blog&lt;/h1>
  &lt;ul>
    \${ Tree.map(posts, (post, slug) => Tree.indent`
      &lt;li>
        &lt;a href="/posts/\${ slug }.html">
          \${ post.title }
        &lt;/a>
        —
        \${ post.date.toLocaleDateString("en-US", { dateStyle: "short" }) }
      &lt;/li>
    `) }
  &lt;/ul>
`
</pre>

</clipboard-copy>

The `index.ori` file defines two templates, an outer template and an inner template:

- The outer template spans all lines and defines the overall page. This outer template accepts the entire collection of posts as input.
- The inner, nested template is defined on the line with `Tree.map`. That inner template will receive a single post object as input and returns an HTML `<li>` element. This map will generate a collection of list elements, which Origami will insert into the final HTML returned by `index.ori`.

<span class="tutorialStep"></span> Update `site.ori` so that you pass the collection of posts defined in `postData.ori` to `index.ori:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = index.ori(<b>postData.ori</b>)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Preview tab to see the updated `index.html`, which now includes links to the blog posts. Because the post data is defined in reverse chronological order, newer posts are listed first.

Now you need to create a `posts` area so the links open the corresponding post.

## Create a posts area

The `posts` area of the site will contain one page for each blog post. In Origami, any time you have one set of things and want a different set of things, that’s a likely call for `Tree.map`. Above you mapped the posts in `postData.ori` to HTML list elements. In the same way, you can map the posts to HTML pages.

<span class="tutorialStep"></span> Create a file `src/postPage.ori` to define a template function that accepts a single post and returns a page for it. For now the page will be a minimal fragment:

<clipboard-copy>

<pre class="step">
// A page for a single post
(post) => Tree.indent`
  &lt;h1>${ post.title }&lt;/h1>
  &lt;div>${ post._body }&lt;/div>
`
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Update `site.ori` to define the `posts` area, using the `postPage.ori` template to generate a page for each post:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = index.ori(postData.ori)

  <b>posts/ = Tree.map(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })</b>
}
</pre>

</clipboard-copy>

This uses the same `extension` option you used earlier to remove a `.md` extension; now you can use it to add an `.html` extension.

<span class="tutorialStep"></span> In the Explorer tab, select the `site.ori` on the left, then click **SVG** to confirm that your site now has a `posts` area with a page for each post:

<figure>
${ svg.js({
  assets/: {
    styles.css: "... styles ..."
  }
  index.html: `<link rel="stylesheet"...`
  posts/: {
    2026-09-02.html: "&lt;h1>Second post&lt;/h1>"
    2026-09-01.html: "&lt;h1>First post&lt;/h1>"
  }
}) }
</figure>

You can click on the index page to visit it, then click on a link to confirm the link opens the expected post.

## Create a base page template

The rudimentary `postPage.ori` template doesn’t give the posts any styling. Rather than copying the styling from `index.ori`, it would be appropriate to create a base page template that both `postPage.ori` and `index.ori` share.

Many template systems have special facilities for creating a base page template. Since Origami templates are just functions, you can have those functions do whatever they want. In this situation, you can have the template function for a specific kind of page call a separate, general function that adds the base elements common to all pages.

<span class="tutorialStep"></span> Create a `src/page.ori` file to define a base template:

<clipboard-copy>

<pre class="step">
// Base page template for all pages
(page) => Tree.indent`
  &lt;!DOCTYPE html>
  &lt;html lang="en">
    &lt;head>
      &lt;meta charset="utf-8">
      &lt;meta name="viewport" content="width=device-width, initial-scale=1">
      &lt;link rel="stylesheet" type="text/css" href="/assets/styles.css">
      &lt;title>\${ page.title }&lt;/title>
    &lt;/head>
    &lt;body>
      &lt;header>
        &lt;a href="/">My blog&lt;/a>
      &lt;/header>
      &lt;main>
        $\{ page._body }
      &lt;/main>
    &lt;/body>
  &lt;/html>
`
</pre>

</clipboard-copy>

This template accepts a very simple kind of `page` object that only needs to define a `title` and `_body` properties so that those properties can be rendered in the correct places.

You can now adjust your specific page templates to call `page.ori`.

<span class="tutorialStep"></span> Update `postPage.ori` to:

<clipboard-copy>

<pre class="step">
// A page for a single post
(post) => page.ori({
  title: post.title
  _body: Tree.indent`
    &lt;h1>\${ post.title }&lt;/h1>
    &lt;div>\${ post._body }&lt;/div>
  `
})
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

<pre class="step">
// Blog home page
(posts) => page.ori({
  title: "My blog"
  _body: Tree.indent`
    &lt;h1>My blog&lt;/h1>
    &lt;ul>
      \${ Tree.map(posts, (post, slug) => Tree.indent`
        &lt;li>
          &lt;a href="/posts/\${ slug }.html">
            \${ post.title }
          &lt;/a>
          —
          \${ post.date.toLocaleDateString("en-US", { dateStyle: "short" }) }
        &lt;/li>
      `) }
    &lt;/ul>
    &lt;footer>
      &lt;a href="/feed.xml">RSS feed&lt;/a>
      &lt;a href="/feed.json">JSON feed&lt;/a>
    &lt;/footer>
  `
})
</pre>

</clipboard-copy>

The `index.ori` template no longer needs to reference the CSS stylesheet; that responsibility is now handled in `page.ori`.

<span class="tutorialStep"></span> Refresh the Preview window and confirm that both the index page and the post pages are consistently styled and show an appropriate title in the browser window.

At its core, Origami doesn’t really have a distinct concept of a template — a template is just a function that returns text. The ability to work directly with objects and functions means you’re not limited by someone else’s idea about how your site should be constructed.

## Create blog feeds

A hallmark of a blog is the ability for you to let your readers read your posts in whatever application they prefer via a _feed_ of posts. Most blog frameworks or site generators provide quasi-magic support for feeds: you check a box somewhere or add an incantation to a configuration file, and this automatically defines a feed. The feed _may_ do what you want, but adjusting it may require configuring arcane options.

Origami recognizes that a blog feed is just a data structure with a particular format. An appropriate data structure isn’t necessarily hard to understand. A common choice in Origami is to define your feed data in [JSON Feed](https://www.jsonfeed.org/) format, which is fairly simple. JSON itself is a little noisy, but we can view in the somewhat more legible YAML form, the feed for your site might look like this:

```yaml
version: https://jsonfeed.org/version/1.1
title: My blog
feed_url: https://example.com/feed.json
home_page_url: https://example.com
items:
  - content_html: |
      <p>This is the <em>second</em> post.</p>
    date_published: 2026-09-02T17:00:00.000Z
    id: https://example.com/posts/2026-09-02.html
    title: Second post
    url: https://example.com/posts/2026-09-02.html
  - content_html: |
      <p>This is the <em>first</em> post.</p>
    date_published: 2026-09-01T17:00:00.000Z
    id: https://example.com/posts/2026-09-01.html
    title: First post
    url: https://example.com/posts/2026-09-01.html
```

So to define a feed in Origami, you can define an object with the above structure.

<span class="tutorialStep"></span> Create a file `feed.ori` that contains:

<clipboard-copy>

<pre class="step">
// The posts in JSON Feed format
(posts) => {
  version: "https://jsonfeed.org/version/1.1"
  title: "My blog"
  feed_url: `https://example.com/feed.json`
  home_page_url: `https://example.com`

  // Map the post data to JSON Feed items
  items: Tree.values(Tree.map(posts, (post, slug) => {
    content_html: post._body
    date_published: post.date
    id: url
    title: post.title
    url: `https://example.com/posts/\${ slug }.html`
  }))
}
</pre>

</clipboard-copy>

This fills out some top-level fields like your blogs `title`. The data for the individual blog posts goes in the `items` property, which should be an array. Here the code uses `Tree.map` again to convert each post into a corresponding feed item, and then calls [`Tree.values`](/builtins/tree/values.html) to convert those values to an array.

This JSON Feed format isn’t widely used — but since you’ve already got the data in that format, you may as well make it available.

<span class="tutorialStep"></span> Update `site.ori` to define a `feed.json` resource:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = index.ori(postData.ori)

  posts/ = Tree.map(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })

  <b>feed.json = Tree.json(feed.ori(postData.ori))</b>
}
</pre>

</clipboard-copy>

The new line calls `feed.ori` with the post data, then calls [`Tree.json`](/builtins/tree/json.html) to convert that to JSON format.

<span class="tutorialStep"></span> Refresh the Explorer tab and select `feed.json` from the left to inspect the feed.

Next you can make your feed available in the widely-used [RSS](https://cyber.harvard.edu/rss/) format. That format is slightly more awkward to construct, but Origami has a builtin function [`Origami.rss`](/builtins/origami/rss.html) that makes it trivial to convert a JSON Feed object to RSS with.

<span class="tutorialStep"></span> Update `site.ori` to define a `feed.xml` resource in RSS:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = index.ori(postData.ori)

  posts/ = Tree.map(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })

  feed.json = Tree.json(feed.ori(postData.ori))
  <b>feed.xml = Origami.rss(feed.json)</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Explorer tab and select `feed.xml` from the left to inspect the RSS feed.

You can do two final things to make your blog's feeds more discoverable by people.

<span class="tutorialStep"></span> Update your base `page.ori` template to indicate the location of your feed resources. This will make it easier for blog reader applications to find your feeds.

<clipboard-copy>

<pre class="step">
// Base page template for all pages
(page) => Tree.indent`
  &lt;!DOCTYPE html>
  &lt;html lang="en">
    &lt;head>
      &lt;meta charset="utf-8">
      &lt;meta name="viewport" content="width=device-width, initial-scale=1">
      &lt;link rel="stylesheet" type="text/css" href="/assets/styles.css">
      <b>&lt;link rel="alternate" type="application/rss+xml" href="/feed.xml">
      &lt;link rel="alternate" type="application/json" href="/feed.json"></b>
      &lt;title>\${ page.title }&lt;/title>
    &lt;/head>
    &lt;body>
      &lt;header>
        &lt;a href="/">My blog&lt;/a>
      &lt;/header>
      &lt;main>
        \${ page._body }
      &lt;/main>
    &lt;/body>
  &lt;/html>
`
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Update the `index.ori` template to add links to the feeds so that visitors know the feeds exist.

<clipboard-copy>

<pre class="step">
// Blog home page
(posts) => page.ori({
  title: "My blog"
  _body: Tree.indent`
    &lt;h1>My blog&lt;/h1>
    &lt;ul>
      \${ Tree.map(posts, (post, slug) => Tree.indent`
        &lt;li>
          &lt;a href="/posts/\${ slug }.html">
            \${ post.title }
          &lt;/a>
          —
          \${ post.date.toLocaleDateString("en-US", { dateStyle: "short" }) }
        &lt;/li>
      `) }
    &lt;/ul>
    <b>&lt;footer>
      &lt;a href="/feed.xml">RSS feed&lt;/a>
      &lt;a href="/feed.json">JSON feed&lt;/a>
    &lt;/footer></b>
  `
})
</pre>

</clipboard-copy>

## View the tree of the completed site

Your basic blog is now complete.

<span class="tutorialStep"></span> In the Explorer tab, select `site.ori` and click **SVG** to view your site's final structure.

<figure>
${ svg.js({
  assets/: {
    styles.css: "... styles ..."
  }
  index.html: `<link rel="stylesheet"...`
  posts/: {
    2026-09-02.html: "&lt;h1>Second post&lt;/h1>"
    2026-09-01.html: "&lt;h1>First post&lt;/h1>"
  },
  feed.json: `{ "version: "https://jsonfeed.org/vers...`
  feed.xml: `<?xml version="1.0" ?>`
}) }
</figure>

To review, you've created this entire site with a few resources, a handful of templates, and a concise `site.ori` with a handful of formulas:

<clipboard-copy>

```ori
// Define the site structure
{
  assets/
  index.html = index.ori(postData.ori)

  posts/ = Tree.map(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })

  feed.json = Tree.json(feed.ori(postData.ori))
  feed.xml = Origami.rss(feed.json)
}
```

</clipboard-copy>

## Building static files

You have been viewing your blog using an Origami server running locally. To prepare the site for deploying on the public web, you can turn the whole site into "static" files: regular files whose contents aren't expected to constantly change.

Publishing a site as static files is faster and much cheaper than running a live web server.

<span class="tutorialStep"></span> In the terminal, type:

```console
$ npm run build
```

This runs an npm script that calls [`Origami.copy`](/builtins/dev/copy.html) to copy all the virtual files defined in `site.ori` into a real folder called `build`.

<span class="tutorialStep"></span> Inspect the contents of the `build` folder.

In addition to copies of the real files in the `assets` and `images` folders, the `build` folder now contains real copies of all the virtual files you defined in `site.ori`:

- A real `posts` folder with pages for each post
- A real `index.html` page with links to all the posts
- A copy of the `assets` folder
- Generated `feed.json` and `feed.xml` resources

Because these are regular files, you can host these on many different web hosting services to publish your site. Web hosting is beyond the scope of this tutorial, but one sample web host that's well suited for hosting static files is [Netlify](https://www.netlify.com/). For small projects with modest traffic, static file hosting on Netlify is often free.

## Done!

This concludes the Origami tutorial. If you'd like to try working with Origami on your own machine, you can copy the [origami-start](https://github.com/WebOrigami/origami-start) project.

You can continue exploring related topics:

- The [Origami expression language](/language/) you used to write formulas and template expressions has additional features not covered in this tutorial.
- View some [examples of Origami sites](examples.html).
- The npm `start` and `build` scripts call the [Origami command-line interface](/cli) to let you view the site during development and to copy the virtual files to real files.
- The conceptual framework is built on an [async-tree](/async-tree) library that lets you do everything that you did here with formulas using JavaScript instead.
- You can implement sites completely from scratch using the [async tree pattern](/pattern) and no library or framework at all, an approach may appeal to people who want to work as close to the metal as possible. That pattern is also a useful reference if you want to understand how Origami works under the hood.

&nbsp;

Back to [Overview](/language/)
