---
title: Hello, world
subtitle: The concepts that make Origami unique
siteComplete:
  index.html: <h1>About Us</h1>
  team:
    Alice.html: <h1>Alice</h1>
    Bob.html: <h1>Bob</h1>
    Carol.html: <h1>Carol</h1>
  assets:
    personIcon.svg: "<svg ..."
    styles.css: "body { color: ..."
  images:
    kingfisher.jpg: "[binary data]"
    van.jpg: "[binary data]"
    venice.jpg: "[binary data]"
  thumbnails:
    kingfisher.jpg: "[binary data]"
    van.jpg: "[binary data]"
    venice.jpg: "[binary data]"
---

The Origami language lets you concisely define the structure of a website. This page introduces three key concepts — _trees_, _tree scope_, and _maps_ — and a template system that make the language unique. If you prefer a hands-on approach, start with the [tutorial](tutorial.html).

## A tiny site

HTML and CSS define the content inside web pages — but not how those pages are structured into an overall hierarchy your users can browse. That's what the Origami language is for.

The following Origami program defines a tiny site:

```ori
{
  index.html: "Hello, world!"
}
```

We can think of a site as a _tree_ of resources. The `{ }` curly braces and their contents define a tree with just one branch:

<figure>
${
  svg.js {
    index.html: "Hello, world!"
  }
}
</figure>

Some terminology: The _root_ of this tree is the circle on the left. The branch has a label or name, which we'll call a _key_, and that leads to a node or _value_. In cases like this, the key "index.html" is a text string, but a key could be a number or something else. The value here ("Hello, world!") also happens to be a string, but values can be anything: an image, a data file, etc.

File names often contain periods so, unlike many programming languages, Origami lets you include periods in a key like `index.html`.

There are a number of ways to run an Origami program like the one above. The Origami server lets you directly browse the virtual tree of resources implied by this program. The Origami [CLI](/cli) lets you extract a specific resource (like `index.html`) from the command line. You can also use the CLI to copy the virtual tree of resources into local files that you can deploy as a static site.

_Key points: An Origami file provides a concise way to define a site. You can interact with your site immediately and view it as an interactive diagram, or work with it in the command line, or build it into a static site._

## Websites as trees

We often design and browse websites a single page at a time, but you can step back and consider _all_ the pages on a site as a tree of pages and other resources.

Example: the small <a href="/demos/aboutUs/" target="_blank">About Us</a> site defines has the following pages:

- A home page. That page's URL [ends in a slash](/demos/aboutUs/), which in this case is a synonym for [index.html](/demos/aboutUs/index.html).
- Pages about different people, with URLs like [team/Alice.html](/demos/aboutUs/team/Alice.html).

You can think about this set of pages as a tree:

<figure>
${
  svg.js {
    index.html: "<h1>About Us</h1>"
    team: {
      Alice.html: "<h1>Alice</h1>"
      Bob.html: "<h1>Bob</h1>"
      Carol.html: "<h1>Carol</h1>"
    }
  }
}
</figure>

Website creators refer to URLs as _routes_: when you navigate to a URL like [team/Alice.html](/demos/aboutUs/team/Alice.html), you're picking one particular route through this site's tree. Conceptually speaking, the web server starts at the tree's root on the left and then follows the keys `team` and `Alice.html` to find the web page it will send to your browser.

The site's complete tree is a little bigger than what's shown above, because it also includes CSS stylesheets, image files, or other resources referenced by the HTML:

<figure>
${ svg.js _/siteComplete }
</figure>

This conceptual tree can help you envision and build a site. The structure you pick determines the routes that will be used to access each page and resource.

This structure is independent of how you choose to let your users navigate and experience your site. Your page designs — the links each page offers, and how those links create a flow — determine the experiences your users will have. But a site's tree structure and the navigation experience are often related. The above site presents a conceptual grouping of people into a "Team" area, so it's natural to group those people pages in a corresponding `/team` subtree.

Most web systems don't give you a way to directly edit or visualize a site's tree. In Origami you directly construct your site's tree, combining branches defined in different ways.

## Including a file folder in a tree

Trees are everywhere, and accessing those trees in a consistent, general way lets you work with all those trees with the same Origami language features.

The file system, for example, is also a tree that Origami can work with. This lets you blend trees from different sources to create a site. Suppose your project's file system structure looks like this:

```
myProject/
  images/
    image1.jpg
    image2.jpg
    image3.jpg
  site.ori
```

You can reference the `images` folder name in the `site.ori` Origami file:

```ori
{
  index.html: "Hello, world!"
  images
}
```

This creates a site that looks like:

<figure>
${
  svg.js {
    index.html: "Hello, world!"
    images: {
      image1.jpg: "[binary data]"
      image2.jpg: "[binary data]"
      image3.jpg: "[binary data]"
    }
  }
}
</figure>

All these images are available at URLs like `/images/image1.jpg`.

_Key point: You can quickly incorporate folders of resources like images, stylesheets, and JavaScript files into your site with a file or folder name._

## Merging trees

Origami includes features for defining and manipulating trees. One such feature lets you merge one tree into another.

The above site offers a set of images via a route like `/images/image1.jpg`, but perhaps you want those images to be available at the site's root like `/image1.jpg`. You can merge the `images` folder into the top level of the site with:

```ori
{
  index.html: "Hello, world!"
  ...images
}
```

This creates a site that looks like:

<figure>
${
  svg.js {
    index.html: "Hello, world!"
    image1.jpg: "[binary data]"
    image2.jpg: "[binary data]"
    image3.jpg: "[binary data]"
  }
}
</figure>

_Key point: Origami's `...` operator for merging trees lets you create sites that are a blend of static content (like `images`) and dynamic content generated at runtime._

## Tree scope

Origami determines what an identifier like `images` refers to through a rigorously-defined [tree scope](scope.html): the set of all the names available to an Origami expression based on where it is being evaluated in a tree.

- At any given point in a tree, the tree scope encompasses all the keys in that tree node, and the keys in that tree's parent node, and so on up the hierarchy.
- A file like `site.ori` is considered to have its containing file system folder as a parent, so the keys of that folder — i.e., the names of the files it contains — are also in tree scope.
- Tree scope extends up the file system folder structure to the project's root folder.
- The project's root folder, conceptually speaking, sits beneath a collection of Origami's [built-in functions](/builtins), so all those functions are always in tree scope.

Origami resolves a reference like `images` by searching up this tree scope; as soon as it finds a matching key, it uses the corresponding value. Here Origami resolves the `images` reference to indicate the project's `images` folder and so includes that folder in the site's tree of resources.

This means one Origami expression can reference the output of another. As a trivial example, you can recreate the "Hello, world!" page above by defining the "name" as a separate value:

```ori
{
  name: "world"
  index.html: `Hello, \$\{ name }!`
}
```

So tree scope in Origami works very similar to block scoping in many programming languages — with the difference that the scope continues up outside the program file.

You could change the above program and move the text "world" into a tiny file called `name`:

```
world
```

and keep the same reference to `name` in the Origami program:

```ori
{
  index.html: `Hello, \$\{ name }!`
}
```

Origami will find that `name` file in the file system and the `index.html` value will be the same.

For this reason, Origami programs don't have to explicitly `import` the things they need from the file system or other locations. References to file system files are automatically resolved using tree scope.

_Key point: The tree scope available to an Origami expression is determined by the tree structure containing the expression. Scoping in Origami works like block scoping in other programming languages but includes the surrounding file system._

## Calling functions

You can have an Origami expression call a JavaScript function by file name.

If you have

```js
// uppercase.js
export default (x) => x.toUpperCase();
```

then you can call that in an Origami expression:

```ori
{
  index.html: uppercase.js("hello, world.")
}
```

The value of `index.html` will be "HELLO, WORLD."

_Key point: You can easily call JavaScript functions from Origami._

## Defining subtrees

An Origami tree can define subtrees:

```ori
{
  index.html: "Home page"
  about: {
    index.html: "About page"
  }
}
```

which produces the following site:

<figure>
${
  svg.js {
    index.html: "Home page"
    about: {
      index.html: "About page"
    }
  }
}
</figure>

## Data can be a tree too

You can view hierarchical data as a tree too. Suppose a project has a data file called `data.json`:

```
myProject/
  siteInfo.json
  site.ori
```

and this `siteInfo.json` file contains information that describes the site:

```json
{
  "name": "My Site"
}
```

This defines a little tree:

<figure>
${
  svg.js {
    name: "My Site"
  }
}
</figure>

The Origami file can incorporate that data into the `index.html` page with:

```ori
{
  index.html: `Welcome to \$\{ siteInfo.json/name }!`
}
```

This uses tree scope to find the `siteInfo.json` file. The `/name` path tells Origami that it should parse the `siteInfo.json` file, and the `.json` extension lets Origami know it should parse the file as JSON. Origami includes built-in parsing for JSON and YAML files; you can drop in support for other parsers.

The result is a home page that says, "Welcome to My Site".

_Key point: Origami lets you easily read data from a data file. You can treat hierarchical data like any tree and get things out of it with slash-separated paths._

## Recalculating a value

In the example above, data will be read from `siteInfo.json` when the Origami file is loaded, and once the file is loaded, the value of `index.html` will always be the same — even if the contents of `siteInfo.json` subsequently change.

You can arrange to have an Origami expression reevaluated each time a value is requested by using an `=` equal sign instead of a `:` colon.

```ori
{
  index.html = `Welcome to \$\{ siteInfo.json/name }!`
}
```

When serving this site with the Origami server, Origami will regenerate the text for `index.html` each time you visit the page. If you are editing `siteInfo.json` in a separate window, then changes to the data in that file will be reflected when you refresh `index.html` in your browser.

## Turning a tree of stuff into something else

You may often find yourself creating content in one form — text, images, etc. — that you want to process into some other form before publishing it on your site.

For example, an Origami project for a blog might have a folder structure like:

```
myProject/
  markdown/
    post1.md
    post2.md
  src/
    index.ori
    post.ori
    site.ori
```

where each post contains some markdown and some data at the top.

```
---
title: My first post
---

Here's my *first* post!
```

You can visualize this `markdown` folder as a tree of data objects that are small trees themselves.

<figure>
${
  svg.js({
    post1.md: {
      title: "My first post"
      @text: "Here's my *first* post!"
    }
    post2.md: {
      title: "Second post"
      @text: "This is the *second* post."
    }
  })
}
</figure>

Here the key `@text` is used to label the property holding the text of the markdown document.

You can transform this tree of markdown objects into a corresponding tree of HTML objects. Origami includes a markdown-to-HTML command called [`mdHtml`](/builtins/text/mdHtml.html). That command works on a single file, so you can use it to process a single blog post:

```ori
{
  firstPost = mdHtml(markdown/post1.md)
}
```

This produces a tree with one post object whose text is in HTML:

<figure>
${
  svg.js {
    firstPost: {
      title: "My first post"
      @text: "Here's my <strong>first</strong> post!"
    }
  }
}
</figure>

But instead of translating just one file a time, you can arrange for all the files in the `markdown` folder to be translated to HTML by calling Origami's built-in [`map`](/builtins/tree/map.html) function:

```ori
{
  html = map(markdown, mdHtml)
}
```

The `map` built-in function accepts the `markdown` tree and returns a new tree in which the `mdHtml` has been applied to each of the posts:

<figure>
${
  svg.js {
    html: {
      post1.html: {
        title: "My first post"
        @text: "Here's my <strong>first</strong> post!"
      }
      post2.html: {
        title: "Second post"
        @text: "This is the <strong>second</strong> post."
      }
    }
  }
}
</figure>

When used inside a `map`, the `mdHtml` function translates both the keys (from `.md` names to `.html` names) and the `@text` property (from markdown to HTML).

## Templates

To turn the blog post objects with HTML into complete HTML pages, you can use a _template_.

Many site creation tools use templates, which generally take the form of text documents with placeholders to indicate where data should go. You can use any template system with Origami, but Origami also comes with a built-in [template system](templates.html) that understands trees of files and data.

The `post.ori` file contains an Origami template that mixes HTML with `\$\{ }` placeholders to incorporate data:

```${"html"}
(post) => `<!DOCTYPE html>
<html>
  <head>
    <title>\${ post/title }</title>
  </head>
  <body>
    \${ post/text }
  </body>
</html>
`
```

This `post.ori` template defines a function you can apply to all the HTML objects in a `map`:

```ori
{
  html = map(markdown, mdHtml)
  posts = map(html, post.ori)
}
```

This adds a `posts` area to the site:

<figure>
${
  svg.js {
    html: {
      post1.html: {
        title: "My first post"
        text: "Here's my <strong>first</strong> post!"
      }
      post2.html: {
        title: "Second post"
        text: "This is the <strong>second</strong> post."
      }
    }
    posts: {
      post1.html: "...<title>My first post</title>..."
      post2.html: "...<title>Second post</title>..."
    }
  }
}
</figure>

Where the full text of `posts/post1.html` is:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My first post</title>
  </head>
  <body>
    Here's my <strong>first</strong> post!
  </body>
</html>
```

You can browse the pages in the `posts` area immediately. Other programming environments like JavaScript have maps too, but Origami's are "lazy" — they don't do work to create something until you ask for it. They can also work on deep trees, not just flat arrays, and can be applied equally to any data source.

_Key point: You can use template systems in Origami to turn files and data into text. Origami comes with a built-in template system._

## Hiding parts of a tree

The blog site above includes an `html` area and a `posts` area, but the `html` area is an intermediate step that's only needed for internal use; it doesn't need to appear in your final site.

You can rearrange the `site.ori` definition to hide the `html` area:

```ori
{
  html = map(markdown, mdHtml)
  public = {
    posts = map(html, post.ori)
  }
}/public
```

This defines a `public` subtree containing everything that should be publicly visible. Inside the `public` subtree, Origami's tree scope (discussed above) lets the `posts` formula reference the `html` branch defined at the top level of the file. Since the `html` branch is outside the `public` area, it behaves like a private variable inside the file.

The path `/public` at the end of the file indicates that only this `public` subtree should be returned as the result of evaluating `site.ori`. So the blog site now only has a `posts` area:

<figure>
${
  svg.js {
    posts: {
      post1.html: "...<title>My first post</title>..."
      post2.html: ".....<title>Second post</title>..."
    }
  }
}
</figure>

## Using a map in a template

A unique feature of Origami templates is that you can use maps inside them to process a collection of documents or data into HTML. You can use this to make page elements for navigation that reflect the structure of the original content.

Continuing the blog example above, you can define an index page for the blog with an `index.ori` template that creates links for each post:

```html
(html) => `<!DOCTYPE html>
<html>
  <head>
    <title>Blog index</title>
  </head>
  <body>
    <ul>
      \${ map(html, (post, fileName) => `
      <li><a href="posts/\${ fileName }">\${ post/title }</a></li>
      \`) }
    </ul>
  </body>
</html>
`
```

The `page.ori` template above defines a function that accepts a single post. This `index.ori` template defines a function that accepts a collection of post objects.

Inside this `index.ori` template, the `map` built-in maps each post object to an HTML fragment with a list item containing a link. The link text will be the post's title; the link's destination will be the corresponding page in the `posts` area.

You can then invoke `index.ori` to create the index page, passing in the same set of HTML post objects used to generate the `posts` area:

```ori
{
  html = map(markdown, mdHtml)
  public = {
    index.html = index.ori(html)
    posts = map(html, post.ori)
  }
}/public
```

The site now looks like:

<figure>
${
  svg.js {
    index.html: "...<title>Blog index</title>....."
    posts: {
      post1.html: "...<title>My first post</title>..."
      post2.html: "...<title>Second post</title>..."
    }
  }
}
</figure>

and the index page will link to all the posts:

```html
<html>
  <head>
    <title>Blog index</title>
  </head>
  <body>
    <ul>
      <li><a href="pages/post1.html">My first post</a></li>
      <li><a href="pages/post2.html">Second post</a></li>
    </ul>
  </body>
</html>
```

This index page effectively flattens the tree structure of the posts collection into an HTML list.

For a larger blog example that handles features such as showing posts in reverse chronological order and the generation of feeds, see this [sample blog](https://github.com/WebOrigami/pondlife).

_Key points: Origami's built-in template system lets you create navigation elements and other parts of web pages that are based on collections of things._

## Conclusion

This covers the key unique concepts in Origami. The examples shown here are very basic, but you can apply these to create real sites.

If you'd like to try building a simple site this way, try the [tutorial](tutorial.html). If you'd like to try Origami on your own machine, copy the [origami-start](https://github.com/WebOrigami/origami-start) project.
