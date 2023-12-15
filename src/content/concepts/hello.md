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

Origami lets you create websites and other things. The web platform provides you a way to create invidiual web pages with HTML and CSS — but those don't give you any way to define your site's overall structure. You could use JavaScript for that, but that could be quite complex.

Origami offers you a language to define the overall site you want. (If you're a JavaScript programmer, you can also combine what you know about JavaScript with Origami's concepts and library to more quickly and easily define a site's structure.)

This page introduces the three key concepts — _trees_, _scope_, and _maps_ — that make Origami unique, as well as a template system with unique features. If you prefer to just dive in and try things out first, start with the [tutorial](tutorial.html).

## Trees

You can view many of the things you work with — folders and files, data in data files — as _trees_.

Here is a tree with just one branch:

<figure>
{{
  svg.js {
    index.html: "Hello, world!"
  }
}}
</figure>

The _root_ of this tree is the circle on the left. The branch has a label or name, which we'll call a _key_, and that leads to a node or _value_. In many cases the key is a text string like "index.html", but keys could be numbers or other things. The value here also happens to be a text string ("Hello, world!"), but values can be anything: an image, a data file, etc.

## Conceptualizing websites as trees

We often design or browse websites a single page at a time, but step back and consider _all_ the pages on a site as a tree of pages and other resources.

The <a href="/demos/aboutUs/" target="_blank">sample About Us site</a> defines a small set of pages:

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

Website creators refer to URLs as _routes_: when you enter a URL like [team/Alice.html](/demos/aboutUs/team/Alice.html), you're picking one particular route through this map of the site's content. Conceptually speaking, the web server starts at the tree's root on the left and then follows the keys `team` and `Alice.html` through this map to find the web page it should send to your browser.

The full tree for a site is a little bigger than what's shown above, because it also includes CSS stylesheets, image files, or other resources referenced by the HTML:

<figure>
{{ svg.js siteComplete }}
</figure>

This conceptual tree can help you envision and build a site. How your _users_ experience your site is a separate concern. It's up to you to decide how your pages should be linked to create the experience you want your users to have.

Most web systems don't give you a way to directly edit or visualize a site's tree. In Origami you directly build your site's tree, grafting together branches defined in different ways.

## Defining a simple tree

The concise Origami [language](/language) lets you build sites and other things with trees.

In the Origami language, you define a site in an Origami file with a name like `site.ori`. The name isn't significant; anything with the `.ori` extension will do. If an Origami file contains:

```
{
  index.html = "Hello, world!"
}
```

that produces the tree with one branch shown earlier:

<figure>
{{
  svg.js {
    index.html: "Hello, world!"
  }
}}
</figure>

In this Origami file, everything between the `{ }` curly braces defines the keys and values of the top level of the site tree. The name `index.html` defines a key in the tree; the expression to the right of the equals sign defines the value for that key.

File names often contain periods so, unlike many programming languages, Origami lets you include periods in a name like `index.html`.

The Origami server lets you immediately browse this tree.

_Key points: A site's definition in Origami is extremely concise. You can immediately interact with the site you've defined. You can visualize the site as an interactive diagram._

## Tree scope

A formula you write in Origami defines a key and a value, like the `index.html` and text above. Those formulas can refer to other values.

Origami works out what those references mean by defining a _scope_: the set of all the names that are available for you to use. As a trivial example, you can recreate the "Hello, world!" page above by defining the "name" as a separate value:

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

## Tree scope is hierarchical

Origami resolves a reference like `name` by walking from the location of the reference towards the tree's root (left, in these diagrams). As soon as Origami finds a matching key, it uses that value.

We can see tree scope in action by adding a level to our little tree so that the index page is available at `about/index.html`:

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

This produces the same "Hello, world!" message as before. When Origami sees `name` in the `index.html` formula, it looks in that local `about` area of the tree for `name`. It doesn't see a `name` there, so moves up to the tree's top level, where it does find a `name`.

_Key point: Tree scoping in Origami works like block scoping in many programming languages._

## Referencing a local file

The scope available in an Origami file includes the surrounding files. The tree you define in an Origami file is considered to be part of the larger file system tree.

Let's say the `site.ori` file is part of a folder called `myProject`:

```
myProject/
  name
  site.ori
```

In addition to `site.ori`, this folder has a file called `name` that contains the plain text:

```
world
```

We can write this in `site.ori`:

```
{
  index.html = `Hello, \{\{ name }}!`
}
```

to produce the same result as before:

<figure>
{{
  svg.js {
    index.html: "Hello, world!"
  }
}}
</figure>

Here, when Origami looks for `name`, it doesn't find a `name` key inside the Origami file. Origami moves up into the surrounding folder and finds the little `name` text file there, so uses that file's contents as the name.

By default, Origami will continue walking up the folder hierarchy, looking for `name`, until it reaches the directory where the Origami server was started. The folders and files in your project are available in the scope of your Origami formulas. In most programming languages, you must first "import" or otherwise explicitly load files from the file system.

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

You may often find yourself creating content in one form — text, images, etc. — that you want to process into some other form before sharing it on your site.

Suppose you want to write your site content as a folder of markdown files that you will turn into HTML. You can visualize that markdown folder as a tree:

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
    html: {
      Alice.html: "Hello, <strong>Alice</strong>!"
      Bob.html: "Hello, <strong>Bob</strong>!"
      Carol.html: "Hello, <strong>Carol</strong>!"
    }
  }
}}
</figure>

You can browse the transformed HTML immediately. Other programming environments have similar maps, but Origami's are "lazy" (they don't do work to create something until you ask for it), can work on deep trees (not just flat arrays), and can be applied equally to any data source.

If you wanted the mapped HTML pages to be the entire site instead of just the `html` area, you could update `site.ori` to just return the map:

```
@map(markdown, @mdHtml)
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

Many website creation tools use templates: text documents with placeholders to mark where data should go. You can use those template systems with Origami, but Origami also comes with a built-in template system that understands trees of files and data.

An Origami project for a blog might have a structure like:

```
myProject/
  posts/
    post1.html
    post2.html
  src/
    index.orit
    post.orit
    site.ori
```

where each post contains some HTML and some data at the top.

```
---
title: My first post
---
Here's my first post!
```

The `post.orit` file contains an Origami template that mixes HTML with `\{\{ }}` curly brace placeholders to incorporate data:

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
  firstPost.html = page.orit(posts/post1.html)
}
```

Producing a site with one page:

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
  pages = @map(posts, page.orit)
}
```

producing:

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

Continuing the blog example above, you can define an `index.orit` template that will create links for each post:

```html
<html>
  <head>
    <title>Posts</title>
  </head>
  <body>
    <ul>
      \{\{ @map(posts, =`
      <li><a href="pages/{{ @key }}">\{{ _/title }}</a></li>
      \`) }}
    </ul>
  </body>
</html>
```

Origami looks up references inside the template like `posts` using the same tree scope discussed above. Inside the `@map`, the `@key` expression returns the name of the page file like "post1.html".

Tree scope erases the boundary between the files outside the template and the HTML and instructions inside the template, so you can generate HTML reflecting the contents of the original `posts` folder.

Invoke this template to create the index page:

```
{
  index.html = index.orit()
  pages = @map(posts, page.orit)
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
