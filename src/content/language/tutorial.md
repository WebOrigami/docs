---
title: Create a simple site in Origami
subtitle: A hands-on walkthrough
numberHeadings: true
---

<script src="/components.js"></script>

This tutorial walks you through the basics of Origami in a simple, live project. If you prefer a conceptual introduction first, see [Hello, world](hello.html).

## Scenario

One day your team decides:

> _We need an "About Us" site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/demos/aboutUs/" target="_blank">sample About Us site</a>
and click on a few pages to get a feel for it. (This would typically be part of a larger site, but for illustration purposes we'll consider it a site on its own.)

If you're the kind of person who can write spreadsheet formulas, you can use the Origami language to build a site like that.

## Start

You can run this tutorial on GitHub Codespaces a popular editor for professional software developers that uses a web-based version of Microsoft Visual Studio Code. Basic GitHub accounts include some free use of Codespaces. As an alternative, you can clone the project locally and use whatever code editor you prefer.

<span class="tutorialStep"></span> Open the
<a href="https://github.com/WebOrigami/language-intro" target="_blank">introduction on GitHub</a>.

<span class="tutorialStep"></span> Create your own copy of the project by clicking the **Fork** button near the top.

<span class="tutorialStep"></span> In your newly-created copy of the pattern intro project, click the **Code** button, then the **Codespaces** tab, then click **Create codespace on main** or the `+` button.

A VS Code project editor will start. Eventually you'll see a list of files on the left.

<span class="tutorialStep"></span> Click the **Run and Debug** button (▷) in the left bar, then **▷ Launch via npm**. This will start the small Origami server.

<span class="tutorialStep"></span> A notification should appear saying, "Your application running on port 5000 is available." Click the **Open in Browser** button to open the running tutorial site in a separate window tab.

You're going to be switching back and forth between these two browser windows. Let's call the first one the Code window and the new one the Preview window. (In a moment you'll open a third window.)

The page in the Preview window should say: Hello

## Edit a simple page

You'll define the complete set of pages and other resources your site will need in an Origami file with a `.ori` extension. This project is configured to serve the site defined in `src/site.ori`.

<span class="tutorialStep"></span> In the Code window, click the code Explorer (an icon with two overlapping documents) in the left bar. Expand the `src` folder and open `site.ori`:

```ori
{
  index.html = "Hello"
}
```

Everything between the `{ }` curly braces defines the top level of the site. For now, this defines a single thing you can think of as a "file" even though it's not stored anywhere. The name or _key_ for this file is "index.html". The contents or _value_ of this file is the text "Hello".

You're going to work on this `site.ori` file so that it creates the About Us site. The `index.html` page will eventually become the main About Us page.

<span class="tutorialStep"></span> **Try it:** Edit the quoted text in the formula for `index.html` to give it more content, like: Hello, world!

The code editor will auto-save the text.

<span class="tutorialStep"></span> In the Preview window, refresh the page to see: Hello, world!

## View your site as a tree

Origami lets you visualize and explore your site as a hierarchical _tree_ of pages and other resources.

<span class="tutorialStep"></span> Open the Preview window, copy its URL, then open a new tab, and paste in that URL. Add `/!svg` to the end of the URL. The new URL should now look like `https://your-project-name.app.github.dev/!svg`. Press Return.

You'll see your site visually represented as a tree with just one branch:

<figure>
${ svg.js({
index.html = 'Hello, world!'
}) }
</figure>

The little circle represents the overall tree, and the box represents the `index.html` file.

Let's refer to this browser window as the Tree Diagram window.

<span class="tutorialStep"></span> In the Tree Diagram window, click the box for `index.html` to view it.

<span class="tutorialStep"></span> Click the browser's Back button to navigate back to the main tree diagram.

You'll return to the Tree Diagram window occasionally to view the structure of your evolving site and to explore the individual pages.

<span class="tutorialStep"></span> Switch back to the Code window.

## Use a template to create text

The `index.html` file is currently defined with a short quoted string. You can create larger, more realistic HTML pages using _templates_. A template is a document with placeholders that will be filled with data.

For this tutorial, you'll use the [template system built into Origami](templates.html), but Origami can also work with other template systems.

<span class="tutorialStep"></span> View the file `src/greet.ori`.

```${"html"}
${ demos/framework-intro/greet.jse }
```

This template defines a function: something that accepts input and produces output. In this case, the function in `greet.ori` accepts a name and returns an HTML greeting that incorporates that name.

Inside the &#96; &#96; backticks, the placeholder marked with `$\{ }` curly braces contains an Origami expression. In this placeholder, the `name` reference tells Origami to insert the `name` passed to the template into the HTML at that point.

You can call this template from an Origami formula. Origami lets one file reference another using a _path_ inside `< >` angle brackets.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the formula for `index.html` to remove the quoted string, and instead reference the `greet.ori` template name. Call this template as a function and pass it the text `"world"`.

<clipboard-copy>

<pre class="step">
{
  index.html = <b>greet.ori("world")</b>
}
</pre>

</clipboard-copy>

When someone visits `index.html`, Origami will now generate the HTML for it:

```html
<p>Hello, <strong>world</strong>!</p>
```

<span class="tutorialStep"></span> Refresh the Preview window to confirm the page now has "world" in bold: Hello, **world**!

When you call `greet.ori` in a formula like this, Origami searches the current [scope](/language/scope.html) for that name. Origami will find the `src/greet.ori` template file and use it to create the home page.

## Defining the team data

Data in Origami projects can come from pretty much anything. This sample project stores the data for your team members in a file format called YAML, but it could just as easily use another format called JSON, or some other data file format, or data sitting on a server.

<span class="tutorialStep"></span> In the Code window, open the team data file in `src/teamData.yaml`:

```${"yaml"}
${ demos/framework-intro/teamData.yaml }
```

This defines an array of person records but _this data is too boring!_

<span class="tutorialStep"></span> In `teamData.yaml`, replace the people's names with your name and the names of family or friends.

## Formulas can extract data

In Origami you can use slash-separated paths to extract information out of any hierarchical source, whether it's a file system folder or data like your team information.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your formula for `index.html` to pass the `name` of the first team member to `greet.ori`. Array indexes start with zero, so `[0].name` will get the name of the first person.

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(<b>teamData.yaml[0].name</b>)
}
</pre>

</clipboard-copy>

Refresh the Preview window to see something like: Hello, **Alice**!

## Incorporate data into your site's tree

You can incorporate folders and other sources of hierarchical data into your site's tree. For example, you can include all the data in `teamData.yaml` into a browsable part of your site.

<span class="tutorialStep"></span> **Try it:** In the Code window, update `site.ori` to add a formula that defines `team` as equal to `teamData.yaml/` (with a trailing slash):

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml[0].name)
  <b>team = teamData.yaml/</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> In the Tree Diagram window, refresh the page to confirm that the tree now includes an `team` area with all the data from `teamData.yaml` as navigable parts of the site.

But for the `team` area to actually be useful, you'll need to transform that raw data into presentable HTML.

## Creating a virtual folder with a map

There are several places in this web site where you want to transform one set of things and into a new set of things:

1. For each team member in teamData.yaml, you want a page in the `team` area.
1. For each team member in teamData.yaml, you want a tile on the main About Us page.
1. For each image like `images/van.jpg`, you want a corresponding thumbnail image like `thumbnails/van.jpg`.

You can address all these situations in Origami with a _map_ in the [computer science sense of the word](<https://en.wikipedia.org/wiki/Map_(higher-order_function)>): an operation performed on every item in a collection to produce a new collection.

You can think of the result of a map as a virtual folder — a set of things you can browse and work with, but which aren't stored anywhere. This is an efficient way to create an entire area of a site from existing data or files.

Let's start by mapping the people defined in `teamData.yaml`: for each person, we'll create a tiny page in the `team` area.

<span class="tutorialStep"></span> **Try it:** In the Code window, update the formula in `site.ori` for `team` to:

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml[0].name)
  team = <b>Tree.map(teamData.yaml, (person) => person.name)</b>
}
</pre>

</clipboard-copy>

This formula calls a built-in function called [`Tree.map`](/builtins/tree/map.html).

This `team` formula says: starting with the tree of structured data in `teamData.yaml`, create a new tree. For each person in the data, evaluate the expression `person.name`, which gets the `name` field of the person being operated on.

If you know JavaScript, such a function is the same as a JavaScript arrow function.

So the `team` formula transforms the team data into a corresponding tree of just the names:

<div class="sideBySide">
  <figure>
    ${ svg.js([
      { name: "Alice", image: "kingfisher.jpg" }
      { name: "Bob", image: "beach.jpg" }
      { name: "Carol", image: "venice.jpg" }
    ]) }
  </figure>
  <figure>
    ${ svg.js({
      "0/": "Alice"
      "1/": "Bob"
      "2/": "Carol"
    }) }
  </figure>
  <figcaption>Tree structure of teamData.yaml</figcaption>
  <figcaption>Mapped tree of names</figcaption>
</div>

<span class="tutorialStep"></span> In the Tree Diagram window, refresh the page to confirm that the tree now includes an `team` area with the names from `teamData.yaml`.

<figure>
  ${ svg.js({
    index.html: "<p>Hello, <strong>Alice</strong>!</p>"
    team = {
      "0/": "Alice"
      "1/": "Bob"
      "2/": "Carol"
    }
  }) }
</figure>

## Use a template in a map

The formula you give to `map` can be as complex as your situation requires.

<span class="tutorialStep"></span> **Try it**: In the Code window, in `site.ori`, update the `team` formula so that, instead of just returning a `name`, it calls the `greet.ori` template and passes in that person's name:

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml[0].name)
  team = Tree.map(teamData.yaml, (person) => <b>greet.ori(person.name)</b>)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> In the Tree Diagram window, refresh the page to see the updated `team` area.

<figure>
  ${ svg.js({
    index.html = "<p>Hello, <strong>Alice</strong>!</p>"
    team = {
      "0/": "<p>Hello, <strong>Alice</strong>!</p>"
      "1/": "<p>Hello, <strong>Bob</strong>!</p>"
      "2/": "<p>Hello, <strong>Carol</strong>!</p>"
    }
  }) }
</figure>

## Pull in more resources

The `src` folder has two real subfolders you'll want to include in the tree for your site:

- `assets` contains a stylesheet and icon
- `images` contains sample images you can use to represent your team members

You can pull a real folder or file into your tree by writing a `<path>` on a line by itself. The file will be added to the tree using the folder or file name at the end of the path.

<span class="tutorialStep"></span> **Try it:** Update `site.ori` to add lines that pull in the `assets` and `images` folders.

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml[0].name)
  team = Tree.map(teamData.yaml, (person) => greet.ori(person.name))
  <b>assets
  images</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to Tree Diagram window and refresh it to see the updated site structure.

Your site now includes both real files (the assets and images) and virtual files (the greetings in the `team` area).

## Formulas can call JavaScript

You can do a lot in Origami without JavaScript, but JavaScript programmers can extend Origami with JavaScript. We'll briefly look at that; you won't need to know JavaScript to complete this step.

<span class="tutorialStep"></span> In the Code window, view the images in the `src/images` folder. Each person in `teamData.yaml` identifies one of these full-size images as a profile photo.

For each full-size image, you want to produce a corresponding thumbnail image for the main About Us page. Instead of using an image-editing app to create a real folder of thumbnail images, you can create virtual thumbnail images on demand.

<span class="tutorialStep"></span> View the file `src/thumbnail.js`. This contains a small JavaScript function which can invoke an image-processing library to generate a small thumbnail copy of an image.

```${'js'}
${ demos/framework-intro/thumbnail.js }
```

<span class="tutorialStep"></span> **Try it:** In `site.ori`, add a new formula for `small.jpg` that calls `thumbnail.js` as a function and passes in the individual file `images/van.jpg`.

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml[0].name)
  team = Tree.map(teamData.yaml, (person) => greet.ori(person.name))
  assets
  images
  <b>small.jpg = thumbnail.js(images/van.jpg>)</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to the Tree Diagram window and refresh it.

<span class="tutorialStep"></span> In the tree diagram, click the box for the real image in `images/van.jpg` to preview it.

<span class="tutorialStep"></span> Navigate back to the main diagram and click the box for `small.jpg` to see the same image at a smaller size. The formula you created above produces this thumbnail on demand.

<span class="tutorialStep"></span> Navigate back to the main diagram.

## Create a virtual folder of thumbnails

You could write formulas to create a thumbnail for each image in the `images` folder — but the Origami `map` function lets you define the transformation of all the images with a single line.

<span class="tutorialStep"></span> **Try it:** Switch to the Code window. In `site.ori`, delete the formula for `small.jpg` and replace it with the following `thumbnails` formula:

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml[0].name)
  team = Tree.map(teamData.yaml, (person) => greet.ori(person.name))
  assets
  images
  <b>thumbnails = Tree.map(images, thumbnail.js)</b>
}
</pre>

</clipboard-copy>

This `thumbnails` formula applies the `thumbnail.js` function to each of the images. In that `map` function, the second parameter is just the file name `thumbnail.js`, which is a shorthand for writing the longer form `(x) => thumbnail.js(x)`

Because Origami treats real folders and virtual folders the same, you can browse your virtual folder of thumbnails.

<span class="tutorialStep"></span> Switch to the Tree Diagram window and refresh it to view your site's updated structure.

The virtual `thumbnails` folder in the diagram now contains a set of thumbnail images that _do not exist_ in any persistent form. They are potential images. If you click on one, it will be created at that moment.

## Use a map inside a template

The main About Us page should display a tile for each member that links to their individual page.

<span class="tutorialStep"></span> In the Code window, open `src/index.ori`. This template will form the basis of the final home page.

<clipboard-copy>

```${"html"}
(people) => `<h1>About Us</h1>
<ul>
  $\{ Tree.map(people, (person) => `
    <li>$\{ person.name }</li>
  `) }
</ul>
`
```

</clipboard-copy>

In `site.ori`, you've already created a map of images to thumbnails, and a map of team data to a set of greetings. The `index.ori` template uses the same kind of map to transform the team data into corresponding bits of HTML.

The `index.ori` file defines two templates, an outer template and an inner template:

- The outer template spans all lines and defines the overall page. This outer template will accept the entire collection of people data as input.
- The inner, nested template is defined on the middle line as part of the `map`. That inner template will receive a single person at a time as input. This template generates a list item containing that person's name.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your `index.html` formula to remove the call to `greet.ori` and instead invoke the `index.ori` template, passing in the list of people in `teamData.yaml`.

<clipboard-copy>

<pre class="step">
{
  index.html = <b>index.ori(teamData.yaml)</b>
  team = Tree.map(teamData.yaml, (person) => greet.ori(person.name))
  assets
  images
  thumbnails = Tree.map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Preview window to see the heading **About Us** and a bulleted list of names.

## A nested template can span multiple lines

The text inside a template can be as complex as you want.

<span class="tutorialStep"></span> **Try it:** Copy and paste this fuller template into `index.ori`:

<clipboard-copy>

```${"html"}
${ demos/framework-intro/index.jse }
```

</clipboard-copy>

(Note: the last line contains a backtick character; be sure to copy that too.)

Functionally speaking, this is no more complex than the earlier template; it just has more elements.

<span class="tutorialStep"></span> Refresh the Preview window to see a tile for each team member that includes their name and location. It also shows a thumbnail image pulled from the virtual `thumbnails` folder you created earlier. As far as the `<img>` tag above knows, that thumbnail is a real image — but actually you're creating that image on demand.

## Use a person template

You can use a template for the people pages in the `team` area too.

<span class="tutorialStep"></span> In the Code window, view the `src/person.ori` template:

<clipboard-copy>

```${"html"}
(person) => `<h1>$\{ person.name }</h1>`
```

</clipboard-copy>

This template displays a person's name in a header. You can use this in the `map` that defines the `team` area.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, edit the `team` formula to replace the `(person) => greet.ori(person.name)` expression with `person.ori`.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = Tree.map(teamData.yaml, <b>person.ori</b>)
  assets
  images
  thumbnails = Tree.map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Tree Diagram window to see that the pages in the `team` area now use your `person.ori` template.

<figure>
  ${ svg.js({
    "0/": "<h1>Alice</h1>"
    "1/": "<h1>Bob</h1>"
    "2/": "<h1>Carol</h1>"
  }) }
</figure>

## Use people names as file names

As you've seen, the top-level keys in `teamData.yaml` are numbers, like `0` for the first person, so at the moment the `team` area pages are identified with numbers too. But in your final website tree, you'd like the keys in the `team` area to include the person's name, like `Alice.html`.

So you want to transform both the keys and values of the team data. You can do this with an expanded form of the `map` function.

<span class="tutorialStep"></span> **Try it:** In the Code window, edit `site.ori` and its `team` formula so that the second parameter is a set of options in `{ }` curly braces. Turn the existing `person.ori` reference into a `value` option.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = Tree.map(teamData.yaml, <b>{
    value: person.ori
  }</b>)
  assets
  images
  thumbnails = Tree.map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

This will use `person.ori` to transform values just as before.

<span class="tutorialStep"></span> Now add a `key` option that will change the keys (names) of the team pages:

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = Tree.map(teamData.yaml, {
    <b>key: (person) => person.name</b>
    value: person.ori
  })
  assets
  images
  thumbnails = Tree.map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Tree Diagram window to confirm that the `team` area is now using names instead of numbers:

<div class="sideBySide">
  <figure>
    ${ svg.js({
      "0/": "<p>Hello, <strong>Alice</strong>!<p>"
      "1/": "<p>Hello, <strong>Bob</strong>!<p>"
      "2/": "<p>Hello, <strong>Carol</strong>!<p>"
    }) }
  </figure>
  <figure>
    ${ svg.js({
      Alice: "<p>Hello, <strong>Alice</strong>!<p>"
      Bob: "<p>Hello, <strong>Bob</strong>!<p>"
      Carol: "<p>Hello, <strong>Carol</strong>!<p>"
    }) }
  </figure>
  <figcaption>Before: pages have numbers</figcaption>
  <figcaption>After: pages have names</figcaption>
</div>

## Add an HTML extension

We want the pages in the `team` area to end in a `.html` extension because that helps indicate the type of data the files contain. One way you can do that in an Origami map is defining a `key` with a small template.

<span class="tutorialStep"></span> In `site.ori`, update the `team` formula's `key` option to add a`.html` extension to the keys.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = Tree.map(teamData.yaml, {
    key: (person) => <b>`$\{ person.name }.html`</b>
    value: person.ori
  })
  assets
  images
  thumbnails = Tree.map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the Tree Diagram window to confirm that the `team` pages now have names that end in `.html`:

<figure>
  ${ svg.js({
    Alice.html: "<p>Hello, <strong>Alice</strong>!<p>"
    Bob.html: "<p>Hello, <strong>Bob</strong>!<p>"
    Carol.html: "<p>Hello, <strong>Carol</strong>!<p>"
  }) }
</figure>

## Fill out the person template

The only thing left to do is complete the `person.ori` template.

<span class="tutorialStep"></span> Replace the contents of `person.ori` with:

<clipboard-copy>

```${"html"}
${ demos/framework-intro/person.jse }
```

</clipboard-copy>

(Note: the last line contains a backtick character; be sure to copy that too.)

<span class="tutorialStep"></span> In the Preview window, you can now click a person tile on the main About Us page to navigate to the specific page for that team member.

## View the tree of the completed site

The site is now complete.

<span class="tutorialStep"></span> Switch to the Tree Diagram window and refresh it to view your site's final structure. In that diagram (not the one below) you can click on the circles or boxes to explore what you've made.

<figure>
${ svg.js(tutorialSite.yaml) }
</figure>

To review, you've created this entire site with a few resources, a couple of templates, and a concise `site.ori` with a handful of formulas:

<clipboard-copy>

```ori
{
  index.html = index.ori(teamData.yaml)
  team = Tree.map(teamData.yaml, {
    key: (person) => `$\{ person.name }.html`
    value: person.ori
  })
  assets
  images
  thumbnails = Tree.map(images, thumbnail.js)
}
```

</clipboard-copy>

## Building static files

You have been viewing your About Us site using a small Origami server running in the background. Since the members of your team aren't going to change every minute, you can turn the whole site into static files: regular files whose contents aren't expected to constantly change.

Publishing a site as static files is faster and cheaper than running a live web server.

<span class="tutorialStep"></span> In the Code window, click on the Terminal area at the bottom of page.

<span class="tutorialStep"></span> In the Terminal, type the following command. (The `$` dollar sign comes from the terminal — don't type it.)

```console
$ npm run build
```

That copies all the virtual files defined inside `site.ori` into a real folder called `build`.

<span class="tutorialStep"></span> On the left side of the Code window, expand the `build` folder in the list of files on the left and view the files it contains.

In addition to copies of the real files in the `assets` and `images` folders, the `build` folder now contains real copies of all the virtual files you defined in `site.ori`:

- A real `thumbnails` folder with real thumbnail versions of each image.
- A real `index.html` page with HTML that includes a tile for each team member.
- A real `team` folder with real HTML pages for each team member.

Because these are regular "static" files, you can host these on many different web hosting services to publish your site. Web hosting is beyond the scope of this tutorial, but one sample web host that's well suited for hosting static files is [Netlify](https://www.netlify.com/). For small projects with modest traffic, static file hosting on Netlify is often free.

## Done!

This concludes the Origami tutorial. If you'd like to try working with Origami on your own machine, you can copy the [origami-start](https://github.com/WebOrigami/origami-start) project.

You can continue exploring related topics:

- The [Origami expression language](/language/) you used to write formulas and template expressions has additional features not covered in this tutorial.
- View some [examples of Origami sites](examples.html).
- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The conceptual framework is built on an [async-tree](/async-tree) library that lets you do everything that you did here with formulas using JavaScript instead.
- You can implement sites completely from scratch using the [async tree pattern](/pattern) and no library or framework at all, an approach may appeal to people who want to work as close to the metal as possible. That pattern is also a useful reference if you want to understand how Origami works under the hood.

&nbsp;

Back to [Overview](/language/)
