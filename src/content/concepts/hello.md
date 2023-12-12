---
title: Hello, world
subtitle: Everything is trees, actually
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

Origami is a conceptual model and toolset that lets you quickly create websites and other things. This page covers the basics and introduces the three key concepts — _trees_, _scope_, and _maps_ — that make Origami unique.

## Trees

If you're a designer or developer, you often have to process a pile of one kind of content — text, images, etc. — into a new pile of transformed content. You might want to turn a bunch of markdown into HTML, or some raw data into a set of pages.

That information is often organized into hierarchical structures like file system folders, but rather than focus on where or how the data is stored, it can be productive to work at a more abstract level and think of such structured content as _trees_.

Here is a tree with just one branch:

<figure>
{{
  @svg {
    index.html: "Hello, world!"
  }
}}
</figure>

The _root_ of this tree is the circle on the left. The branch has a label or name, which we'll call a _key_, and that leads to a node or _value_. In many cases the key is a text string like "index.html", but keys could be numbers or other things. The value here also happens to be a text string ("Hello, world!"), but values can be anything: an image, a data file, etc.

## Conceptualizing websites as trees

We often browse websites a single page at a time, seeing the page's URL in the address bar. But step back and consider _all_ the pages on a site as a single entity: a tree of pages and other resources.

The <a href="/demos/aboutUs/" target="_blank">sample About Us site</a> defines a small set of pages:

- A home page. That page's URL [ends in a slash](/demos/aboutUs/), which in this case is a synonym for [index.html](/demos/aboutUs/index.html).
- Pages about different people, with URLs like [team/Alice.html](/demos/aboutUs/team/Alice.html).

You can think about this set of pages as a tree:

<figure>
{{
  @svg {
    index.html: "<h1>About Us</h1>"
    team: {
      Alice.html: "<h1>Alice</h1>"
      Bob.html: "<h1>Bob</h1>"
      Carol.html: "<h1>Carol</h1>"
    }
  }
}}
</figure>

This kind of diagram may clarify why programmers refer to URLs as _routes_: when you enter a URL like [team/Alice.html](/demos/aboutUs/team/Alice.html), you're picking one particular route through this map of the site's content. Conceptually speaking, the web server starts at the tree's root on the left and then follows the keys `team` and `Alice.html` through this map to find the web page it should send to your browser.

In addition to HTML pages, the full tree for a site also includes CSS stylesheets, image files, JavaScript files, or other resources referenced by the HTML. So the full tree for the About Us site is a little bigger:

<figure>
{{ @svg siteComplete }}
</figure>

This conceptual tree can help you envision and build a site. But in most web systems, a site's structure is only a hypothetical thing you must imagine; there is often no place where you can actually edit or visualize this tree.

Origami is different: you directly build this tree from various sources, and can see a direct visual representation of what you're building.

## Defining a simple tree

The concise Origami [language](/language) is specifically defined for building sites and other things with trees. If you're a JavaScript programmer, you can also do all of this in JavaScript.

In the Origami language, you define a site in a file with a name like `site.ori`. (The name is not significant; anything with the `.ori` extension will do.) If that file contains

```
{
  index.html = "Hello, world!"
}
```

that produces the tree with one branch shown earlier:

<figure>
{{
  @svg {
    index.html: "Hello, world!"
  }
}}
</figure>

In this Origami file, everything between the `{ }` curly braces defines the keys and values of the top level of the site tree. The name `index.html` defines a key in the tree; the expression to the right of the equals sign defines the value for that key.

File names often contain periods, so Origami lets you include periods in a name like `index.html`. This makes it much easier to create and work with files. (Many programming languages won't let you do that).

The Origami server lets you immediately browse this tree.

_Key points: A site's definition in Origami is extremely concise. You can immediately interact with the site you've defined. You can visualize the site as an interactive diagram._

## Tree scope

A formula you write in Origami defines a value, like `index.html` above. Your formulas can refer to other values. Origami works out what those references mean by defining a _scope_: the set of all the names that are available for you to use.

As a trivial example, you can recreate the "Hello, world!" page above by defining the "name" as a separate value:

```
{
  name = "world"
  index.html = `Hello, \{\{ name }}!`
}
```

The text enclosed by backtick characters will construct a text string. Origami evaluates the `name` expression inside `\{\{ \}\}` double curly braces. This finds the nearby `name` key, and incorporates its value into the final text.

<figure>
{{
  @svg {
    name: "world"
    index.html: "Hello, world!"
  }
}}
</figure>

## Tree scope is hierarchical

Origami resolves a reference like `name` by walking "up" the tree towards its root (in the diagrams, this is moving towards the left). As soon as it finds that key, it uses that value.

We can illustrate this by adding a level to our little tree so that the index page is available at `about/index.html`:

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
  @svg {
    name: "world"
    about: {
      index.html: "Hello, world!"
    }
  }
}}
</figure>

This produces the same "Hello, world!" message as before. When Origami sees `name` in the `index.html` formula, it looks in that local `about` area of the tree for `name`. It doesn't see a `name` there, so moves up to the tree's top level, where it does find a `name`.

_Key point: Tree scoping in Origami works like block scoping in many programming language — with a twist…_

## Referencing a local file

The scope available in an Origami file _includes the surrounding files_. The Origami file is considered itself to be part of the larger file system tree.

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

and this will produce the _same page as before_.

<figure>
{{
  @svg {
    index.html: "Hello, world!"
  }
}}
</figure>

Here, when Origami looks for `name`, it doesn't find a `name` key inside the Origami file. Origami moves up into the surrounding folder and looks for `name` there. It finds the little `name` text file, so uses that file's contents as the name. By default, Origami will continue walking up the folder hierarchy, looking for `name`, until it reaches the directory where the Origami server was started. So all the folders and files in your project are available in the scope of your Origami formulas.

_Key points: Origami expressions can directly reference files in your project, making it easy for you to incorporate files into your site. Most programming languages require you to "import" or otherwise explicitly reference files in the file system._

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

This uses Origami's tree scoping to directly reference a file. In this case, we're using a slash-separated path `data.json/name` to extract the `name` value from that data file. This produces the same site as before:

<figure>
{{
  @svg {
    index.html: "Hello, world!"
  }
}}
</figure>

Many programming languages require you to parse data in formats like JSON. Origami includes built-in parsing for JSON and YAML files. You can drop in support for other parsers.

_Key point: Origami lets you easily read data from a data file. You can work with hierarchical data like any tree._

## Including a file folder in a tree

If your project folder contains a subfolder called `images`, you can include that entire folder in your site. Suppose your project looks like:

```
myProject/
  images/
    image1.jpg
    image2.jpg
    image3.jpg
```

You can reference this `images` folder name in the Origami file, and Origami will find it using the same tree scoping described above:

```
{
  images
}
```

This creates a site that looks like:

<figure>
{{
  @svg {
    images: {
      image1.jpg: "[binary data]"
      image2.jpg: "[binary data]"
      image3.jpg: "[binary data]"
    }
  }
}}
</figure>

So all these images are available at URLs like `images/image1.jpg`.

_Key point: You can quickly incorporate folders of resources like images, stylesheets, and JavaScript files into your site with a folder name._

## Turning a tree of stuff into something else

As mentioned at the top, you may often find yourself having process a pile of one kind of content — text, images, etc. — into a new pile of transformed content.

Suppose you want to turn a folder of markdown files into HTML. You can visualize that markdown folder as a tree:

<figure>
{{
  @svg {
    markdown: {
      Alice.md: "Hello, **Alice**!"
      Bob.md: "Hello, **Bob**!"
      Carol.md: "Hello, **Carol**!"
    }
  }
}}
</figure>

You can transform that tree of markdown files into a corresponding tree of HTML files. Origami includes a markdown-to-HTML command called [@mdHtml](/language/@mdHtml.html). That command works on a single file — but you can apply that command to all the files in the `markdown` folder using the [@map](/language/@map.html) command.

```
{
  html = @map(markdown, @mdHtml)
}
```

This produces a new tree of HTML pages which can be served:

<figure>
{{
  @svg {
    html: {
      Alice.html: "Hello, <strong>Alice</strong>!"
      Bob.html: "Hello, <strong>Bob</strong>!"
      Carol.html: "Hello, <strong>Carol</strong>!"
    }
  }
}}
</figure>
