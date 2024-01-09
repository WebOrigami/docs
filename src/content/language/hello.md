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
    personIcon.svg: <svg …
    styles.css: "body { color: …"
  images:
    kingfisher.jpg: "[binary data]"
    van.jpg: "[binary data]"
    venice.jpg: "[binary data]"
  thumbnails:
    kingfisher.jpg: "[binary data]"
    van.jpg: "[binary data]"
    venice.jpg: "[binary data]"
---

The Origami language lets you concisely define the structure of a website. This page introduces the three key concepts — _trees_, _scope_, and _maps_ — and a template system that make the language unique. If you prefer a hands-on approach, start with the [tutorial](tutorial.html).

## A tiny site

HTML and CSS define the content inside web pages — but not how those pages are structured into an overall hierarchy your users can browse. That's what the Origami language is for.

The following Origami file defines a tiny site:

```
{
  index.html = "Hello, world!"
}
```

Everything between the `{ }` curly braces creates a site _tree_ with just one branch:

<figure>
{{
  svg.js {
    index.html: "Hello, world!"
  }
}}
</figure>

Some terminology: The _root_ of this tree is the circle on the left. The branch has a label or name, which we'll call a _key_, and that leads to a node or _value_. In cases like this, the key "index.html" is a text string, but a key could be a number or something else. The value here ("Hello, world!") also happens to be a string, but values can be anything: an image, a data file, etc.

File names often contain periods so, unlike many programming languages, Origami lets you include periods in a key like `index.html`.

The Origami server lets you immediately browse this tree. The server can produce the kind of diagram shown above so you can confirm your site's structure and explore what you're building.

_Key points: An Origami file provides a concise way to define a site. You can interact with your site immediately and view it as an interactive diagram._

## Websites as trees

We often design and browse websites a single page at a time, but you can step back and consider _all_ the pages on a site as a tree of pages and other resources.

Example: the small <a href="/demos/aboutUs/" target="_blank">About Us</a> site defines has the following pages:

- A home page. That page's URL [ends in a slash](/demos/aboutUs/), which in this case is a synonym for [index.html](/demos/aboutUs/index.html).
- Pages about different people, with URLs like [team/Alice.html](/demos/aboutUs/team/Alice.html).

You can think about this set of pages as a tree:

<figure>
{{
  svg.js {
    index.html: "<h1>About Us</h1>"
    team: {
      Alice.html: "<h1>Alice</h1>"
      Bob.html: "<h1>Bob</h1>"
      Carol.html: "<h1>Carol</h1>"
    }
  }
}}
</figure>

Website creators refer to URLs as _routes_: when you navigate to a URL like [team/Alice.html](/demos/aboutUs/team/Alice.html), you're picking one particular route through this site's tree. Conceptually speaking, the web server starts at the tree's root on the left and then follows the keys `team` and `Alice.html` to find the web page it will send to your browser.

The site's complete tree is a little bigger than what's shown above, because it also includes CSS stylesheets, image files, or other resources referenced by the HTML:

<figure>
{{ svg.js siteComplete }}
</figure>

This conceptual tree can help you envision and build a site. The structure you pick determines the routes that will be used to access each page and resource.

How your users navigate and experience your site is a separate decision. The designs you choose for each page — the links each page offers, and how those links create a flow — determine the experiences your users will have.

Most web systems don't give you a way to directly edit or visualize a site's tree. In Origami you directly construct your site's tree, combining branches defined in different ways.

## Tree scope

A formula you write in Origami defines a key and a value, like the `index.html` and text above. Those formulas can refer to other values.

Origami determines the meaning of those references by defining a _scope_: the set of all the names available for use. As a trivial example, you can recreate the "Hello, world!" page above by defining the "name" as a separate value:

```
{
  name = "world"
  index.html = `Hello, \{\{ name }}!`
}
```

The text enclosed by backtick characters constructs a text string. Origami evaluates the `name` reference inside the `\{\{ \}\}` double curly braces. Origami finds the nearby `name` key, so incorporates the corresponding value into the final text.

<figure>
{{
  svg.js {
    name: "world"
    index.html: "Hello, world!"
  }
}}
</figure>

_Key point: The scope available to an Origami expression is determined by the tree structure containing the expression._

## Tree scope is hierarchical

Origami resolves a reference like `name` by searching from the location of the reference towards the tree's root (left, in these diagrams). As soon as Origami finds a matching key, it uses that value.

We can observe tree scope in action by adding a level to our little tree, making the index page available at `about/index.html`:

```
{
  name = "world"
  about = {
    index.html = `Hello, \{\{ name }}!`
  }
}
```

<figure>
{{
  svg.js {
    name: "world"
    about: {
      index.html: "Hello, world!"
    }
  }
}}
</figure>

This produces the same "Hello, world!" message as before. When Origami sees `name` in the `index.html` formula, it searches the local `about` area of the tree for `name`. It doesn't see a `name` there, so moves up to the tree's top level, where it does find a `name`.

_Key point: Tree scoping in Origami works like block scoping in many programming languages._

## Referencing a local file

You can view many of the things you work with, such as folders and files or data in data files, as trees too. For example, the tree you define in an Origami file is considered to be part of the larger file system tree, so those surrounding files are also in scope.

Let's say we have a folder called `myProject` that contains:

```
myProject/
  name
  site.ori
```

Here `site.ori` is an Origami file (indicated by the `.ori` extension) that contains:

```
{
  index.html = `Hello, \{\{ name }}!`
}
```

And the separate `name` file contains a bit of plain text:

```
world
```

Given this arrangement, the `site.ori` file produces the same tiny site shown before:

<figure>
{{
  svg.js {
    index.html: "Hello, world!"
  }
}}
</figure>

Here, when Origami looks for `name`, it doesn't find a `name` key in the Origami file, so it moves up into the surrounding folder. It finds the little `name` text file there, so uses that file's contents as the name.

By default, Origami will continue searching up the folder hierarchy, looking for `name`, until it reaches the directory where the Origami server was started. The folders and files in your project are available in the scope of your Origami formulas. In most programming languages, you must first "import" or otherwise explicitly load files from the file system.

_Key points: Origami expressions can directly reference files in your project, making it easy for you to incorporate files into your site._

## Data can be a tree too

You can view hierarchical data as a tree too. Suppose our project has a data file called `data.json`:

```
myProject/
  data.json
  site.ori
```

and this `data.json` file contains:

```json
{
  "name": "world"
}
```

The Origami file can incorporate that data into the `index.html` page with:

```
{
  index.html = `Hello, \{\{ data.json/name }}!`
}
```

This uses Origami's tree scoping to directly reference a file. In this case, we're using a slash-separated path `data.json/name` to extract the `name` value from that data file. This produces the same result as before:

<figure>
{{
  svg.js {
    index.html: "Hello, world!"
  }
}}
</figure>

Many programming languages require you to parse data in formats like JSON. Origami includes built-in parsing for JSON and YAML files. You can drop in support for other parsers.

_Key point: Origami lets you easily read data from a data file. You can treat hierarchical data like any tree and get things out of it with slash-separated paths._

## Including a file folder in a tree

You can incorporate folders from your project into your site. Suppose your project looks like:

```
myProject/
  images/
    image1.jpg
    image2.jpg
    image3.jpg
  site.ori
```

You can reference this `images` folder name in the Origami file, and Origami will find it using the tree scoping described above:

```
{
  images
}
```

This creates a site that looks like:

<figure>
{{
  svg.js {
    images: {
      image1.jpg: "[binary data]"
      image2.jpg: "[binary data]"
      image3.jpg: "[binary data]"
    }
  }
}}
</figure>

All these images are available at URLs like `images/image1.jpg`.

_Key point: You can quickly incorporate folders of resources like images, stylesheets, and JavaScript files into your site with a folder name._

## Turning a tree of stuff into something else

You may often find yourself creating content in one form — text, images, etc. — that you want to process into some other form before publishing it on your site.

For instance, you might want to write your site content in a folder of markdown files that you will convert to HTML. You can visualize that markdown folder as a tree:

<figure>
{{
  svg.js {
    markdown: {
      Alice.md: "Hello, **Alice**!"
      Bob.md: "Hello, **Bob**!"
      Carol.md: "Hello, **Carol**!"
    }
  }
}}
</figure>

You can transform that tree of markdown files into a corresponding tree of HTML files. Origami includes a markdown-to-HTML command called [@mdHtml](/language/@mdHtml.html). That command works on a single file, so you can use it to turn a single markdown file into HTML.

```
{
  Alice.html = @mdHtml(markdown/Alice.md)
}
```

<figure>
{{
  svg.js {
    Alice.html: "Hello, <strong>Alice</strong>!"
  }
}}
</figure>

Instead of translating just one file a time, you can transform all the files in the `markdown` folder with one instruction using the [@map](/language/@map.html) command:

```
{
  html = @map(markdown, @mdHtml)
}
```

This turns the tree of markdown files into a tree of HTML pages:

<figure>
{{
  svg.js {
    Alice.md: "Hello, <strong>Alice</strong>!"
    Bob.md: "Hello, <strong>Bob</strong>!"
    Carol.md: "Hello, <strong>Carol</strong>!"
  }
}}
</figure>

This isn't quite what's wanted — the values are HTML, but the keys (file names) still end in `.md`. A slightly longer `@map` expression can change both the keys and the values:

```
{
  html = @map(markdown, { extensions: "md->html", valueMap: @mdHtml })
}
```

which gives

<figure>
{{
  svg.js {
    html: {
      Alice.html: "Hello, <strong>Alice</strong>!"
      Bob.html: "Hello, <strong>Bob</strong>!"
      Carol.html: "Hello, <strong>Carol</strong>!"
    }
  }
}}
</figure>

You can browse the transformed HTML immediately. Other programming environments have maps too, but Origami's are "lazy", meaning they don't do work to create something until you ask for it. They can also work on deep trees, not just flat arrays, and can be applied equally to any data source.

If you wanted the mapped HTML pages to be the entire site instead of just the `html` area, you could update `site.ori` to return the map itself:

```
  @map(markdown, { extensions: "md->html", valueMap: @mdHtml })
```

which puts all the transformed HTML pages at the top level:

<figure>
{{
  svg.js {
    Alice.html: "Hello, <strong>Alice</strong>!"
    Bob.html: "Hello, <strong>Bob</strong>!"
    Carol.html: "Hello, <strong>Carol</strong>!"
  }
}}
</figure>

_Key point: You can use Origami maps to efficiently transform collections of content in bulk._

## Templates

Many website creation tools use templates: text documents with placeholders to indicate where data should go. You can use any template system with Origami, but Origami also comes with a built-in [template system](templates.html) that understands trees of files and data.

An Origami project for a blog might have a structure like:

```
myProject/
  posts/
    post1.html
    post2.html
  src/
    index.ori
    post.ori
    site.ori
```

where each post contains some HTML and some data at the top.

```
---
title: My first post
---
Here's my first post!
```

The `post.ori` file contains an Origami template that mixes HTML with `\{\{ }}` curly brace placeholders to incorporate data:

```html
<html>
  <head>
    <title>\{{ _/title }}</title>
  </head>
  <body>
    \{{ _/@text }}
  </body>
</html>
```

You can apply this template as a function to a single post. The `_/title` expression will extract the `title` from whatever input you give to the template. The `_/@text` expression will incorporate the body of the input document.

You can call this template in the `site.ori` file:

```
{
  firstPost.html = page.ori(posts/post1.html)
}
```

This produces a site with one page:

<figure>
{{
  svg.js {
    firstPost.html: "<html><head><title>My First Post</title>…"
  }
}}
</figure>

where the `firstPost.html` page contains:

```html
<html>
  <head>
    <title>My First Post</title>
  </head>
  <body>
    Here's my first post!
  </body>
</html>
```

You can apply a page template in a map to process all your posts at once:

```
{
  pages = @map(posts, page.ori)
}
```

This produces:

<figure>
{{
  svg.js {
    pages: {
      post1.html: "…<title>My First Post</title>…"
      post2.html: "…<title>My Second Post</title>…"
    }
  }
}}
</figure>

_Key point: You can use template systems in Origami to turn files and data into text. Origami comes with a built-in template system._

## Using a map in a template

A unique feature of Origami templates is that you can use maps inside them to process a collection of documents or data into HTML. You can use this to make page elements for navigation that reflect the structure of the original content.

Continuing the blog example above, you can define an `index.ori` template that will create links for each post:

```html
<html>
  <head>
    <title>Posts</title>
  </head>
  <body>
    <ul>
      \{\{ @map(posts, =`
      <li><a href="pages/\{{ @key }}">\{{ _/title }}</a></li>
      \`) }}
    </ul>
  </body>
</html>
```

Origami looks up references like `posts` inside the template using the same tree scope discussed earlier. Inside the `@map`, the `@key` expression returns the name of the page file like "post1.html".

Tree scope erases the boundary between the files outside the template and the HTML and instructions inside the template, letting you generate HTML that reflects the contents of the original `posts` folder.

Invoke this template to create the index page:

```
{
  index.html = index.ori()
  pages = @map(posts, page.ori)
}
```

The site looks like:

<figure>
{{
  svg.js {
    index.html: "…<title>Posts</title>…"
    pages: {
      post1.html: "…<title>My First Post</title>…"
      post2.html: "…<title>My Second Post</title>…"
    }
  }
}}
</figure>

and the index page will link to all the posts:

```html
<html>
  <head>
    <title>Posts</title>
  </head>
  <body>
    <ul>
      <li><a href="pages/post1.html">My First Post</a></li>
      <li><a href="pages/post2.html">My Second Post</a></li>
    </ul>
  </body>
</html>
```

_Key points: Origami's built-in template system lets you create navigation elements and other parts of web pages that are based on collections of things._

## That's basically it

This covers the key unique concepts in Origami. The examples shown here are very basic, but you can apply these to create real sites.

If you'd like to try building a simple site this way, try the [tutorial](tutorial.html).
