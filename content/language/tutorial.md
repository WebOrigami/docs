---
title: Create a basic blog in Origami
subtitle: A hands-on tutorial
numberHeadings: true
---

<script src="/components.js"></script>

You can walk through the basics of Origami by building a simple blog. If you follow along on your own machine, it might take about an hour to complete this tutorial.

The blog will be modeled after a [sample Origami blog](https://pondlife.netlify.app).

## Set up

A guiding principle of Origami is that [you are always in control](principles.html#you-are-always-in-control), so Origami does not require you to initialize a new project with a large set of files in a particular folder structure.

Origami is built with [Node.js](https://nodejs.org), so if you'd like to follow along on your own machine, you'll need a currently-maintained version of [Node.js](https://nodejs.org) (v20 or later).

Origami is based on a conceptual model called [Content/Transformation](model.html) in which you create a set of content files along with small programs (expressions) that transform that content into the final files for your site. So you’ll need a few content files to work with.

<span class="tutorialStep"></span> If you want to save time, clone the [blog-intro](https://github.com/WebOrigami/blog-intro) project locally to obtain the necessary files. Then skip to the next section below.

<span class="tutorialStep"></span> Or if you'd prefer to confirm there's no magic involved, you can manually recreate the files you need. Create a new project folder, and inside that create a `package.json` file along these lines:

<clipboard-copy>

<pre class="step">
{
  "name": "blog-intro",
  "type": "module",
  "dependencies": {
    "@weborigami/origami": "${ Dev.version }"
  },
  "scripts": {
    "build": "ori copy src/site.ori, clear files:build",
    "start": "ori serve watch src, =debug src/site.ori"
  }
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Then run `npm install` to install Origami. If you'd like to understand how the `build` and `start` scripts work, you can read about those [standard incantations](/cli/incantations.html).

Finally, create an empty `src` folder and a `markdown` folder with a couple of markdown files in it. The `markdown` folder can be at the project's top level, or can go inside the `src` folder — the instructions below work the same either way.

Origami doesn't impose any structure on your files — but this tutorial assumes that the markdown file names start with a date, like `2026-09-01.md`. The tutorial also assumes each post has a `title` property, so the markdown content might look like this:

<clipboard-copy>

<pre class="step">
\---
title: First post
---
This is the _first_ post.
</pre>

</clipboard-copy>

With that preparation out of the way, let's begin.

## Visualize your site as a tree

A helpful way to approach the creation of a site is to think about it as a tree of resources. For a very basic blog, that resource tree includes:

- an HTML index page linking to all the posts
- HTML pages for the individual posts
- feeds in formats like RSS for feed readers
- plus assets like CSS stylesheets

You can visualize this as:

<figure>
${ svg({
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

A straightforward way to define a tree is with an _object_ that has keys and values. (Origami uses JavaScript terminology; other programming languages refer to such objects as dictionaries or associative arrays.)

To define an object in Origami, you write an expression that goes in its own file with a `.ori` extension. Origami expressions are [essentially the same as JavaScript expressions](expressions.html), with the addition of support for file paths.

<span class="tutorialStep"></span> In the `src` folder, create a file called `site.ori`. That name is just a convention; you could call this file something else, in which case adjust the `scripts` in `package.json` to match.

<span class="tutorialStep"></span> In that `site.ori` enter:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  index.html: "My blog"
}
</pre>

</clipboard-copy>

Everything between the `{ }` curly braces defines the object that describes the virtual folders and files in your blog site. This object defines a single virtual file whose _key_ or name is `index.html`, and whose _value_ or content is the text “My blog”.

This is standard JavaScript object syntax with one small refinement: because Origami objects are often used to create files with periods in their names, no quotes are necessary around `index.html`, even though that name contains a period.

The value of a `.ori` file is the result of evaluating the expression inside. This is similar to the way a JavaScript module can export a value, so the above Origami expression is shorthand for the slightly longer JavaScript:

```js
// Define the site structure
export default {
  "index.html": "My blog",
};
```

(Origami will happily work with a site defined in a JavaScript like this, but the Origami expression syntax can be 20–40% more concise so we’ll use that for this tutorial.)

## Browse your site

You’ll eventually use `site.ori` to build your site’s static files, but for now you can serve that file directly to browse it as you do your work.

<span class="tutorialStep"></span> In the terminal, type:

```console
$ npm run start
```

This executes a command that starts the Origami server with some debugging facilities enabled. You should see output like:

```console
> start
> ori serve watch src, =debug src/site.ori

Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> Open that `localhost` location in your browser to see a page saying “My blog”.

For future reference, let’s call this browser tab the Preview tab. Keep it open so you can return to it.

## Confirm your site’s structure

You can use Origami’s debugging tools to confirm the site’s current structure.

<span class="tutorialStep"></span> Open your local site in a second browser tab and add `/!explore` to the end of the URL. The new URL should now look like `https://localhost:5000/!explore`.

This opens the Origami Explorer, a debugging page listing your project’s virtual files (like `index.html`) and local real files. Clicking an item on the left displays it on the right.

<span class="tutorialStep"></span> Select the `site.ori` file on the left, then click the **SVG** button at the top. Your site will be visually depicted as a tree with just one branch:

<figure>
${ svg({
index.html: "My Blog"
}) }
</figure>

The little circle represents the root of the tree, and the box represents the `index.html` file. You can click on that box to visit that page.

We’ll refer to this browser tab as the Explorer tab. You will periodically return to this tab to confirm the site has the resources you expect.

## Use a template to create text

The `index.html` file is currently defined with a short quoted string. You can create larger, more realistic HTML pages using a [template](templates.html), which in Origami is just a function that accepts data and returns text. (Origami can also work with other template systems.)

<span class="tutorialStep"></span> Create a file called `indexPage.ori` and enter:

<clipboard-copy>

<pre class="step">
// Blog home page
() => Tree.indent`
  &lt;h1>My blog&lt;/h1>
`
</pre>

</clipboard-copy>

The value of this `.ori` file is a function. It will eventually accept the posts we want to render in a list, but for now it takes no input and always returns the same HTML fragment.

The [`Tree.indent`](/builtins/tree/indent.html) tagged template literal normalizes the indentation of the text output. Use of `Tree.indent` is optional; if you don’t care much about the legibility of the final HTML you can drop it.

You can call this template from another Origami expression with a path, which can be as simple as a file name.

<span class="tutorialStep"></span> In `site.ori`, update the formula for `index.html` to remove the quoted string, and instead reference the `indexPage.ori` template name. Call this template as a function by using parentheses.

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  index.html: <b>indexPage.ori()</b>
}
</pre>

</clipboard-copy>

Origami now generates the HTML for `index.html`:

```html
<h1>My blog</h1>
```

<span class="tutorialStep"></span> Refresh the Preview tab to confirm the page now shows “My blog” as a heading.

When you call `indexPage.ori` in an expression like this, Origami searches the current [scope](scope.html) for that name. Origami will find the `src/indexPage.ori` file and use it to create the home page.

Using functions for templates means there’s nothing special for you to learn about how to use them and, as we’ll see, gives you a great deal of flexibility.

## Define a property getter

As `site.ori` is written, the `index.html` value of this site is calculated when you start the server and it loads the site. Because the `start` script invokes a debugging facility called [`watch`](/builtins/dev/watch.html), the site will be reloaded whenever you change something in the `src` folder.

As your site grows, it can become expensive to recalculate the value of every site resource every time the site is loaded or reloaded. You can arrange to have the value of `index.html` calculated upon request instead.

<span class="tutorialStep"></span> Edit `site.ori` so that `index.html` is defined with an `=` equals sign instead of a colon:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  index.html <b>=</b> indexPage.ori()
}
</pre>

</clipboard-copy>

The `=` is Origami's syntax for defining a dynamic property getter, which makes the calculation of the index page content “lazy” — only calculated when asked for.

You won't see any visible change to the site, but we'll use this approach for the site's remaining resources so that the site's only doing work as necessary.

The equivalent JavaScript is roughly:

```js
import indexTemplate from "index.js"; // If indexPage.ori were ported to JS

export default {
  get ["index.html"]() {
    return indexTemplate();
  },
};
```

## Pull in an assets folder

Some resources such as CSS stylesheets can be incorporated into your site as is. Let’s show that by adding a simple stylesheet.

<span class="tutorialStep"></span> Create a `src/assets` folder, and within that folder create a `styles.css` file with any kind of styling. E.g.,

<clipboard-copy>

<pre class="step">
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Add the `assets` folder to your `site.ori`:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  <b>assets/</b>
  index.html = indexPage.ori()
}
</pre>

</clipboard-copy>

The order of definitions in `site.ori` doesn't matter, so you can add the `assets/` reference anywhere. The trailing slash in `assets/` is optional; it serves as a reminder that `assets` is a folder.

<span class="tutorialStep"></span> Update the `indexPage.ori` template to reference the stylesheet:

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
${ svg({
assets/: {
  styles.css: "... styles ..."
}
index.html: `<link rel="stylesheet"...`
}) }

</figure>

## Process the markdown posts into data

Up to this point you’ve been defining the blog site structure in `site.ori`. In the next phase you’ll switch gears and work in a different site that defines how the blog post content will be handled.

All content sites need to resolve a crucial point in tension:

- you want to make your content as easy as possible for you to write by hand,
- while at the same time making it easy for your project to consistently render that content to HTML in multiple places.

You can resolve this tension by processing your raw content (here, markdown) into an intermediate form that can be easily rendered by a template function. That includes the calculation of any data that can: a) be inferred from the content and b) will be used in more than one place.

Your blog will use the posts as list items in the blog index page, as individual posts in the `/posts` area, and as items in the blog feeds. And for each post, you’ll want to perform some calculations:

- Parse the post’s date from the file name.
- Transform the post content from markdown to an HTML fragment.
- Remove the `.md` extension from the file name to produce a key for use in a route like `/posts/<key>`.

You can consolidate this work into a new Origami file that returns the set of processed post data objects. This will effectively constitute a data pipeline for your project that will consume one tree (the posts in the `src/markdown` folder) and produce another. If you haven't created a `src/markdown` folder yet, check out the examples in [the starter repo](https://github.com/WebOrigami/blog-intro/tree/main/markdown)

<span class="tutorialStep"></span> Create a file called `src/postData.ori`. For now, type only this line into the file:

<clipboard-copy>

<pre class="step">
// Blog post data pipeline
markdown/
</pre>

</clipboard-copy>

This simply returns the contents of the `markdown` folder as is. (You’ll refine that in a moment to do more interesting work.)

<span class="tutorialStep"></span> To see what data is being returned, refresh the Explorer tab and select the `postData.ori` file on the left. Then click the **YAML** button at the top to see something like:

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

This shows a tree whose keys are markdown file names (with a `.md` extension), and whose values are markdown text with front matter.

## Transform the markdown to HTML

You can begin processing the markdown by parsing the `.md` markdown file into data. Markdown files are a [file type](fileTypes.html) whose extension is known to Origami. Origami automatically parses `.md` files for you if you try to extract data from them.

In Origami you can process a set of files as a batch with a _map_, in the [computer science sense](<https://en.wikipedia.org/wiki/Map_(higher-order_function)>) of an operation performed on every item in a collection to produce a new collection. You can think of a map’s result as a virtual folder — a set of things you can browse and work with, but which aren't stored anywhere.

<span class="tutorialStep"></span> Update `postData.ori` so that it maps the tree of markdown text files to a tree of corresponding data objects:

<clipboard-copy>

<pre class="step">
// Blog post data pipeline
<b>Tree.map(markdown/, {
  value: (file) => {
    ...file
  }
})</b>
</pre>

</clipboard-copy>

[`Tree.map`](/builtins/tree/map.html) is a builtin Origami function analogous to the JavaScript Array [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method that maps array values. The `Tree.map` function maps a tree, changing the keys, the values, or both.

The above call to `Tree.map` changes the values. It applies the `value` function `(file) => { ...file }` to every value (text file) in the `markdown` folder. That produces a new object with the JavaScript `...` spread operator that duplicates the parsed properties of the indicated file.

<span class="tutorialStep"></span> Refresh the Explorer tab to view the new value of `postData.ori`. It will now look like:

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

Origami has parsed the markdown text: the `title` value in the document front matter is now a `title` property, and the document body is now a `_body` property.

## Add a date property

Most blog systems require you to track a post date as a property, for example in a document’s front matter. You can certainly do that, although to demonstrate flexibility this sample blog will track the date in the post file name. You’ll now extract that date from the file name and add it to the post data objects.

You could do this date parsing in an Origami expression, but let’s call a JavaScript function to do it just to show how that works. Being able to easily call JavaScript gives considerable power; if you encounter a situation where Origami can’t do what you want, you can use JavaScript instead.

<span class="tutorialStep"></span> Create a file `src/parseDate.js` with:

<clipboard-copy>

<pre class="step">
// Parse a YYYY-MM-DD date from the start of the text.
export default function parseDate(text) {
  const match = text.match(/^(?&lt;date>\\d\\d\\d\\d-\\d\\d-\\d\\d)/);
  // Dates will end up in GMT, so we shift the date to the desired time zone.
  // This sample content uses noon in U.S. Eastern Time, which is UTC minus 5
  // hours. See https://en.wikipedia.org/wiki/List_of_UTC_offsets for a list of
  // UTC offsets; replace with the time zone you want for your posts.
  return new Date(`\${match.groups.date}T12:00-05:00`);
}
</pre>

</clipboard-copy>

When `Tree.map` calls the `value` function to map an item’s value, it passes that function several arguments. The first is the item’s original value; the second is the item’s original key. The tree being mapped here is a folder, so the key will be a file’s name.

<span class="tutorialStep"></span> Update `postData.ori` to make these _two_ edits:

<clipboard-copy>

<pre class="step">
// Blog post data pipeline
Tree.map(markdown/, {
  value: (file<b>, fileName</b>) => {
    ...file
    <b>date: parseDate.js(fileName)</b>
  }
})
</pre>

</clipboard-copy>

Syntax note: JavaScript requires a comma between object entries, but Origami gives you the option of separating with a newline character. If you want to stick with JavaScript syntax, you can add a comma after `...file`.

The Origami expression above calls the function exported by `parseDate.js`. Just as Origami knows that `markdown` files can contain text and date, it knows that `.js` module files can export a value.

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

Many JavaScript libraries exist to transform markdown to HTML, and you can write a JavaScript function that invokes your preferred markdown library along the lines above.

But for basic markdown processing, Origami includes a builtin function called [`Origami.mdHtml`](/builtins/origami/mdHtml.html). You can use this to read the markdown file’s `_body` property and define a new `_body` property containing the equivalent HTML.

<span class="tutorialStep"></span> Update `postData.ori` to:

<clipboard-copy>

<pre class="step">
// Blog post data pipeline
Tree.map(markdown/, {
  value: (file, fileName) => {
    ...file
    <b>_body: Origami.mdHtml(file._body)</b>
    date: parseDate.js(fileName)
  }
})
</pre>

</clipboard-copy>

This new line says: the `_body` of the new post object will be the HTML transformation of the original file’s `_body`. (The name `_body` is a convention of Origami’s built-in features; when defining your own objects, you could call that property whatever you want.)

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

Now the `_body` properties are HTML.

## Remove the extension

You’ll want each post to have a consistent key that can be used as part of a route: for a post like `2026-09-01.md`, we can use the base part of the file name as the key: `2026-09-01`.

There's a variation of `Tree.map` called [`Tree.mapExtension`](https://weborigami.org/builtins/tree/mapExtension.html) that can add, change, and remove extensions.

<span class="tutorialStep"></span> Update `postData.ori` to call `Tree.mapExtension` and indicate that you want to remove the `.md` extension:

<clipboard-copy>

<pre class="step">
// Blog post data pipeline
Tree.<b>mapExtension</b>(markdown/, {
  <b>extension: ".md->"</b>
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

You’ve now written a small `postData.ori` that turns a set of markdown files into a corresponding set of plain objects.

## Sort the data

A benefit of using a date at the start of the file name is that the posts will be automatically sorted by date, which can make it easy for you to find a particular post.

Since blogs generally show posts in reverse chronological order, you can apply a builtin function called [`Tree.reverse`](/builtins/tree/reverse.html) to reverse the order of the posts.

<span class="tutorialStep"></span> Update the start and end of `postData.ori` to wrap the result with a call to `Tree.reverse`:

<clipboard-copy>

<pre class="step">
// Blog post data pipeline
<b>Tree.reverse(</b>
  Tree.mapExtension(markdown/, {
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
${ svg({
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
${ svg({
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

Now you’re ready to render the processed posts.

## Create a list of posts

Let’s update `indexPage.ori` to show a list of your blog posts.

Most template systems handle lists with iteration, but Origami lets you reuse the same `Tree.map` feature you’ve already used in `postData.ori`. You can use the same `Tree.map` to turn the post objects into HTML text.

<span class="tutorialStep"></span> Update `indexPage.ori` to expect an incoming `posts` parameter and to build a list of those posts:

<clipboard-copy>

<pre class="step">
// Blog home page
(<b>posts</b>) => Tree.indent`
  &lt;link rel="stylesheet" href="/assets/styles.css">
  &lt;h1>My blog&lt;/h1>
  <b>&lt;ul>
    \${ Tree.map(posts, (post, key) => Tree.indent`
      &lt;li>
        &lt;a href="/posts/\${ key }.html">\${ post.title }&lt;/a>
        —
        \${ post.date.toLocaleDateString("en-US", { dateStyle: "short" }) }
      &lt;/li>
    `) }
  &lt;/ul></b>
`
</pre>

</clipboard-copy>

This defines two templates, an outer template and an inner template:

- The outer template spans all lines and defines the overall page. This outer template accepts the entire collection of posts as input.
- The inner, nested template is defined on the line with `Tree.map`. That inner template receives a single post object as input and returns an HTML `<li>` element. This map generates a collection of list elements, which Origami inserts into the final HTML returned by `indexPage.ori`.

<span class="tutorialStep"></span> Update `site.ori` to pass the collection of posts defined in `postData.ori` to `indexPage.ori`:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = indexPage.ori(<b>postData.ori</b>)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Preview tab to see the updated `index.html`, with a list of links to the blog posts in reverse chronological order.

## Create a posts area

To make the post links work, you need to create a `posts` area of the site with a page for each post. In Origami, any time you have one set of things and want a different set of things, that’s a likely call for `Tree.map`. Above you mapped the posts in `postData.ori` to HTML text; now you will map the same posts to HTML pages.

<span class="tutorialStep"></span> Create a file `src/postPage.ori` to define a template function that accepts a single post and returns a minimal HTML fragment for it:

<clipboard-copy>

<pre class="step">
// A page for a single post
(post) => Tree.indent`
  &lt;h1>\${ post.title }&lt;/h1>
  \${ post._body }
`
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Update `site.ori` to define the `posts` area, applying the `postPage.ori` template to generate a page for each post:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = indexPage.ori(postData.ori)

  <b>posts/ = Tree.mapExtension(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })</b>
}
</pre>

</clipboard-copy>

This uses the same `Tree.mapExtension` function you used earlier. Here it adds an `.html` extension to each key.

<span class="tutorialStep"></span> In the Explorer tab, select the `site.ori` on the left, then click **SVG** to confirm that your site now has a `posts` area with a page for each post:

<figure>
${ svg({
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

The rudimentary `postPage.ori` template doesn’t give the posts any styling. Rather than copying the stylesheet reference from `indexPage.ori`, it’s more appropriate to create a base page template that `postPage.ori` and `indexPage.ori` can share.

Many template systems have special concepts to support base templates. Origami templates are just functions, so you can have those functions do whatever you need. You can have the template function for a specific kind of page call a separate, general function that adds the base elements common to all pages.

<span class="tutorialStep"></span> Create a `src/page.ori` file to define a base template function:

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

This template accepts a very simple kind of `page` object with `title` and `_body` properties. You can have your specific page templates call this base template, passing in an object with appropriate values for those properties.

<span class="tutorialStep"></span> Update `postPage.ori` to:

<clipboard-copy>

<pre class="step">
// A page for a single post
(post) => <b>page.ori({
  title: post.title
  _body:</b> Tree.indent`
    &lt;h1>\${ post.title }&lt;/h1>
    \${ post._body }
  `
<b>})</b>
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Update `indexPage.ori` to:

<clipboard-copy>

<pre class="step">
// Blog home page
(posts) => <b>page.ori({
  title: "My blog"
  _body:</b> Tree.indent`
    &lt;h1>My blog&lt;/h1>
    &lt;ul>
      \${ Tree.map(posts, (post, slug) => Tree.indent`
        &lt;li>
          &lt;a href="/posts/\${ slug }.html">\${ post.title }&lt;/a>
          —
          \${ post.date.toLocaleDateString("en-US", { dateStyle: "short" }) }
        &lt;/li>
      `) }
    &lt;/ul>
  `
<b>})</b>
</pre>

</clipboard-copy>

The `indexPage.ori` template no longer needs to reference the CSS stylesheet; that responsibility is now handled in `page.ori`.

<span class="tutorialStep"></span> Refresh the Preview window and confirm that both the index page and the post pages are consistently styled and show an appropriate title in the browser window.

Using regular functions for templates and passing around regular objects seems basic but is extremely flexible.

## Create blog feeds

A blog should let a person view your posts in their preferred blog-reading application via a _feed_ of posts. Most blog frameworks or site generators provide quasi-magic support for feeds: you add an incantation to a configuration file, and the framework automatically defines a feed. That feed _may_ do what you want — or not. Getting things right may require configuring arcane options.

Origami recognizes that a blog feed is just a data structure with a particular schema. A feed is just an object. A common choice in Origami is to define your feed object in the simple [JSON Feed](https://www.jsonfeed.org/) format.

JSON text itself is a little noisy, so we can view the required data in the somewhat more legible YAML form, where the feed for your site might look like this:

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

You can define a feed in Origami by creating a plain object with the above schema.

<span class="tutorialStep"></span> Create a file `src/feed.ori` that contains:

<clipboard-copy>

<pre class="step">
// The posts in JSON Feed format
(posts) => {
  version: "https://jsonfeed.org/version/1.1"
  title: "My blog"
  feed_url: "https://example.com/feed.json"
  home_page_url: "https://example.com"

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

This fills out some top-level fields like your blog’s `title`. The data for the individual blog posts goes in the `items` property, which should be an array. Here the code uses `Tree.map` again to convert each post into a corresponding feed item, and then calls [`Tree.values`](/builtins/tree/values.html) to convert those values to an array.

This JSON Feed format isn’t widely used — but since you’ve already got the data in that format, you may as well make it available.

<span class="tutorialStep"></span> Update `site.ori` to define a `feed.json` resource:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = indexPage.ori(postData.ori)

  posts/ = Tree.mapExtension(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })

  <b>feed.json = Tree.json(feed.ori(postData.ori))</b>
}
</pre>

</clipboard-copy>

The new line calls `feed.ori` with the post data, then calls [`Tree.json`](/builtins/tree/json.html) to convert that to JSON text.

<span class="tutorialStep"></span> Refresh the Explorer tab and select `feed.json` from the left to inspect the feed.

Next you can make your feed available in the ubiquitous [RSS](https://cyber.harvard.edu/rss/) format. That format uses XML, which is slightly more awkward to construct — but Origami has a builtin function [`Origami.rss`](/builtins/origami/rss.html) that makes it trivial to convert a JSON Feed object to RSS.

<span class="tutorialStep"></span> Update `site.ori` to define a `feed.xml` resource in RSS:

<clipboard-copy>

<pre class="step">
// Define the site structure
{
  assets/
  index.html = indexPage.ori(postData.ori)

  posts/ = Tree.mapExtension(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })

  feed.json = Tree.json(feed.ori(postData.ori))
  <b>feed.xml = Origami.rss(feed.json)</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Explorer tab and select `feed.xml` from the left to inspect the RSS feed.

You can do two final things to make your blog's feeds more discoverable.

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

<span class="tutorialStep"></span> Update the `indexPage.ori` template to add visible links to the feeds so that visitors know the feeds exist.

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

The `feed.ori` file marks the _fourth_ time you’ve used `Tree.map` in this tiny site to accomplish a task. Tree maps are the transformation of one set of key/value pairs to another. Creating a site is fundamentally about transforming content for presentation; the general `Tree.map` function is extremely useful for transforming content in bulk.

## View the tree of the completed site

Your basic blog is now complete.

<span class="tutorialStep"></span> In the Explorer tab, select `site.ori` and click **SVG** to view your site's final structure:

<figure>
${ svg({
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

This is target site structure that was shown at the beginning of this tutorial.

You’ve built this site by creating some content files, and then transforming them into the desired files. This is the [Content/Transformation model](model.html) in practice.

You’ve done this with a couple of templates, a small data pipeline in `postData.ori`, and a concise `site.ori` with a handful of formulas:

<clipboard-copy>

```ori
// Define the site structure
{
  assets/
  index.html = indexPage.ori(postData.ori)

  posts/ = Tree.mapExtension(postData.ori, {
    extension: "->.html"
    value: postPage.ori
  })

  feed.json = Tree.json(feed.ori(postData.ori))
  feed.xml = Origami.rss(feed.json)
}
```

</clipboard-copy>

An important feature of having such a concise and (hopefully) legible site definition is that, if you were to need to make adjustments to the site several months from now, it would take just a moment to scan this file and recall how the whole site is built.

All the work here is done by functions you call and objects you create. If you want to achieve a different result, you can change which functions are called or how those objects are constructed. Origami itself isn’t imposing a particular idea of what a blog should be.

Ultimately, Origami isn’t a blog creation tool, or even a site creation tool — it’s a general tool for transforming content that you can use to create software artifacts like sites.

## Building static files

You have been previewing your blog with a local Origami server. You could deploy that server on the public web, but your site will be faster and much cheaper if you deploy it as _static_ files: regular files whose contents aren't expected to constantly change.

<span class="tutorialStep"></span> In the terminal, stop the server (e.g., with Ctrl+C) and type:

```console
$ npm run build
```

This runs an npm script that calls an Origami builtin, [`Dev.copy`](/builtins/dev/copy.html), to copy all the virtual files defined in `site.ori` into a real folder called `build`.

<span class="tutorialStep"></span> Inspect the contents of the `build` folder.

In addition to a copy of the original `assets` folder, the `build` folder now contains real copies of all the virtual files:

- A real `posts` folder with pages for each post
- A real `index.html` page with links to all the posts
- Generated `feed.json` and `feed.xml` resources

You can compare the `build` folder to the complete site diagram above and confirm for yourself that one is a copy of the other.

Because these are regular files, you can host these on any web hosting service to publish your site. Web hosting is beyond the scope of this tutorial, but one sample host that's well suited for static files is [Netlify](https://www.netlify.com/). For small projects with modest traffic, static file hosting on Netlify is often free.

## Done!

This concludes the Origami tutorial. You can continue exploring related topics:

- If you skipped the background reading on the [Content/Transformation model](model.html), take a look now.
- The [Origami expression language](/language/) you used to write formulas and template expressions has additional features not covered in this tutorial.
- View some [examples of Origami sites](examples.html).
- The npm `start` and `build` scripts call the [Origami command-line interface](/cli), a general-purpose tool for programming in the shell.
- The conceptual framework is built on an [async-tree library](/async-tree) that lets you do everything that you did here with formulas using JavaScript instead.
- You can implement sites with no Origami dependency at all using the [Map Tree pattern](/pattern). This approach may appeal to people who want to work as close to the metal as possible. That pattern is also a useful reference if you want to understand how Origami works under the hood.

&nbsp;

Back to [Overview](/language/)
