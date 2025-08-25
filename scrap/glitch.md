---
title: Create a simple site in Origami
subtitle: A hands-on walkthrough
numberHeadings: true
countries:
  - name: Australia
    abbreviation: AU
  - name: Brazil
    abbreviation: BR
  - name: China
    abbreviation: CN
siteComplete:
  index.html: <h1>About Us</h1>
  team:
    Alice.html: <h1>Alice</h1>
    Bob.html: <h1>Bob</h1>
    Carol.html: <h1>Carol</h1>
  assets:
    personIcon.svg: "..."
    styles.css: "..."
  images:
    kingfisher.jpg: "[binary data]"
    van.jpg: "[binary data]"
    venice.jpg: "[binary data]"
  thumbnails:
    kingfisher.jpg: "[binary data]"
    van.jpg: "[binary data]"
    venice.jpg: "[binary data]"
---

<script src="/components.js"></script>

You don't need to install anything to complete this tutorial. If you prefer a conceptual introduction first, see [Hello, world](hello.html).

_**Note:** The Glitch service that is used to host this tutorial project has had issues updating its servers so that they can run the latest version of Origami. Some notes below indicate places where the current Origami syntax has changed from what it shown._

## Scenario

One day your team decides:

> _We need an "About Us" site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/demos/aboutUs/" target="_blank">sample About Us site</a>
and click on a few pages to get a feel for it. (This would typically be part of a larger site, but for illustration purposes we'll consider it a site on its own.)

If you're the kind of person who can write spreadsheet formulas, you can use the Origami language to build a site like that.

## Start

<span class="tutorialStep"></span> Open the
<a href="https://glitch.com/edit/#!/origami-framework-intro" target="_blank">tutorial project on Glitch</a>, a free web-based code editor.

You can use any web tool with Origami; Glitch is used here because it's free and has no setup.

<span class="tutorialStep"></span> Click the **Remix** button (or Remix to Edit, either works) to create your own copy of the project.

You'll see a list of files on the left and the currently-open file (the project's ReadMe) in the center.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then **Open Preview Pane** to open a preview pane on the right.

The page in the preview pane says: Hello

## Edit a simple page

You'll define the complete set of pages and other resources your site will need in an Origami file with a `.ori` extension. This project is configured to serve the site defined in `src/site.ori`.

<span class="tutorialStep"></span> In the `src` folder, open `site.ori`:

```ori
{
  index.html = "Hello"
}
```

Everything between the `{ }` curly braces defines the top level of the site. For now, this defines a single thing you can think of as a "file" even though it's not stored anywhere. The name or _key_ for this file is "index.html". The contents or _value_ of this file is the text "Hello".

You're going to work on this `site.ori` file so that it creates the About Us site. The `index.html` page will eventually become the main About Us page.

<span class="tutorialStep"></span> **Try it:** Edit the quoted text in the formula for `index.html` to give it more content, like: Hello, world!

After a moment, the Glitch preview window should refresh to show: Hello, world!

## View your site as a tree

Origami lets you visualize and explore your site as a hierarchical _tree_ of pages and other resources.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then click **Preview in a new window**. This will open your site in a new window (or tab).

<span class="tutorialStep"></span> In the browser address bar for that new window, add `/!svg` to the end of the URL. The new URL should look like `https://your-project-name.glitch.me/!svg`

You'll see your site visually represented as a tree with just one branch:

<figure>
${ svg({
index.html = 'Hello, world!'
}) }
</figure>

The little circle represents the overall tree, and the box represents the `index.html` file.

<span class="tutorialStep"></span> In the tree diagram, click the box for `index.html` to view it.

<span class="tutorialStep"></span> Navigate back to the tree diagram.

<span class="tutorialStep"></span> Leaving the tree diagram open, switch back to the main Glitch window. You'll return to this tree diagram occasionally to view the structure of your evolving site and to explore the individual pages.

## Use a template to create text

The `index.html` file is currently defined with a short quoted string. You can create larger, more realistic HTML pages using _templates_. A template is a document with placeholders that will be filled with data.

For this tutorial, you'll use the [template system built into Origami](templates.html), but Origami can also work with other template systems.

<span class="tutorialStep"></span> View the file `src/greet.ori`. Glitch shows only a single file at a time, so opening `greet.ori` will replace `site.ori` in the editor window.

```${"html"}
${ demos/framework-intro/greet.ori }
```

This Origami template starts with an `=` equals sign and encloses some HTML with &#96; &#96; backticks.

Inside the backticks, the placeholder marked with `\{\{ }}` curly braces contains an Origami expression. In this case, the `_` underscore tells Origami to insert any text passed to the template into the HTML at that point.

_**Note:** The Origami syntax for template placeholders recently changed from `\{\{ }}` to `\$\{ }`. For projects outside Glitch, use the newer `\$\{ }` style in templates._

You can call this template from an Origami formula.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the formula for `index.html` to remove the quoted string, and instead call the `greet.ori` template and pass it the text `"world"`.

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

So the page ends up with "world" in bold: Hello, **world**!

When you call `greet.ori` in a formula like this, Origami searches the current [scope](/language/scope.html) for that name. Origami will find the `src/greet.ori` template file and use it to create the home page.

## Defining the team data

Data in Origami projects can come from pretty much anything. This sample project stores the data for your team members in a file format called YAML, but it could just as easily use another format called JSON, or some other data file format, or data sitting on a server.

<span class="tutorialStep"></span> Open the team data file in `src/teamData.yaml`:

```${"yaml"}
${ demos/framework-intro/teamData.yaml }
```

This defines an array of person records but _this data is too boring!_

<span class="tutorialStep"></span> In `teamData.yaml`, replace the people's names with your name and the names of family or friends.

## Formulas can extract data

In Origami you can use slash-separated paths to extract information out of any hierarchical source, whether it's a file system folder or data like your team information.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your formula for `index.html` to pass the `name` of the first team member to `greet.ori`. Array indexes start with zero, so `/0/name` will get the name of the first person.

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(<b>teamData.yaml/0/name</b>)
}
</pre>

</clipboard-copy>

The preview should show something like: Hello, **Alice**!

## Incorporate data into your site's tree

You can incorporate folders and other sources of hierarchical data into your site's tree. For example, you can include all the data in `teamData.yaml` into a browsable part of your site.

<span class="tutorialStep"></span> **Try it:** Update `site.ori` to add a formula that defines `team` as equal to `teamData.yaml/` (with a trailing slash):

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml/0/name)
  <b>team = teamData.yaml/</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> In the tree diagram window, refresh the page to confirm that the tree now includes an `team` area with all the data from `teamData.yaml`. But for the `team` area to be useful, you'll need to transform that raw data into presentable HTML.

## Creating a virtual folder with a map

There are several places in this web site where you want to transform one set of things and into a new set of things:

1. For each team member in teamData.yaml, you want a page in the `team` area.
1. For each team member in teamData.yaml, you want a tile on the main About Us page.
1. For each image like `images/van.jpg`, you want a corresponding thumbnail image like `thumbnails/van.jpg`.

You can address all these situations in Origami with a _map_ in the [computer science sense of the word](<https://en.wikipedia.org/wiki/Map_(higher-order_function)>): an operation performed on every item in a collection to produce a new collection.

You can think of the result of a map as a virtual folder — a set of things you can browse and work with, but which aren't stored anywhere. This is an efficient way to create an entire area of a site from existing data or files.

Let's start by mapping the people defined in `teamData.yaml`: for each person, we'll create a tiny page in the `team` area.

<span class="tutorialStep"></span> **Try it:** In the Glitch editor window, update the formula in `site.ori` for `team` to:

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml/0/name)
  team = <b>map(teamData.yaml, =_/name)</b>
}
</pre>

</clipboard-copy>

This formula calls a built-in function called [`map`](/builtins/tree/map.html). All built-in functions start with an `@` sign.

This `team` formula says: starting with the tree of structured data in `teamData.yaml`, create a new tree. For each person in the data, evaluate the expression `=_/name`, which gets the `name` field of the person being operated on.

If you know JavaScript: the expression `=_/name` is like an arrow function: `(_) => _.name`

So the `team` formula transforms the team data into a corresponding tree of just the names:

<div class="sideBySide">
  <figure>
    ${ svg([
      { name: "Alice", image: "kingfisher.jpg" }
      { name: "Bob", image: "beach.jpg" }
      { name: "Carol", image: "venice.jpg" }
    ]) }
  </figure>
  <figure>
    ${ svg([
      "Alice"
      "Bob"
      "Carol"
    ]) }
  </figure>
  <figcaption>Tree structure of teamData.yaml</figcaption>
  <figcaption>Mapped tree of names</figcaption>
</div>

<span class="tutorialStep"></span> In the tree diagram window, refresh the page to confirm that the tree now includes an `team` area with the names from `teamData.yaml`.

<figure>
  ${ svg({
    index.html = "<p>Hello, <strong>Alice</strong>!</p>"
    team = [
      "Alice"
      "Bob"
      "Carol"
    ]
  }) }
</figure>

## Use a template in a map

The formula you give to `map` can be as complex as your situation requires.

<span class="tutorialStep"></span> **Try it**: In the Glitch editor window, in `site.ori`, update the expression `=_/name` so that, instead of just returning a `name`, it calls the `greet.ori` template and passes in that person's name:

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml/0/name)
  team = map(teamData.yaml, =<b>greet.ori(_/name)</b>)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> In the tree diagram window, refresh the page to see the updated `team` area.

<figure>
  ${ svg({
    index.html = "<p>Hello, <strong>Alice</strong>!</p>"
    team = [
      "<p>Hello, <strong>Alice</strong>!</p>"
      "<p>Hello, <strong>Bob</strong>!</p>"
      "<p>Hello, <strong>Carol</strong>!</p>"
    ]
  }) }
</figure>

## Pull in more resources

The `src` folder has two real subfolders you'll want to include in the tree for your site:

- `assets` contains a stylesheet and icon
- `images` contains sample images you can use to represent your team members

You can pull a real folder or file into your tree by writing its name on a line by itself.

<span class="tutorialStep"></span> **Try it:** Update `site.ori` to add lines that pull in the `assets` and `images` folders.

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml/0/name)
  team = map(teamData.yaml, =greet.ori(_/name))
  <b>assets
  images</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to tree diagram window and refresh it to see the updated site structure.

Your site now includes both real files (the assets and images) and virtual files (the greetings in the `team` area).

## Formulas can call JavaScript

You can do a lot in Origami without JavaScript, but JavaScript programmers can extend Origami with JavaScript. We'll briefly look at that; you won't need to know JavaScript to complete this step.

<span class="tutorialStep"></span> In the Glitch editor window, view the images in the `src/images` folder. Each person in `teamData.yaml` identifies one of these full-size images as a profile photo.

For each full-size image, you want to produce a corresponding thumbnail image for the main About Us page. Instead of using an image-editing app to create a real folder of thumbnail images, you can create virtual thumbnail images on demand.

<span class="tutorialStep"></span> View the file `src/thumbnail.js`. This contains a small JavaScript function which can invoke an image-processing library to generate a small thumbnail copy of an image.

```${'js'}
${ demos/framework-intro/thumbnail.js }
```

<span class="tutorialStep"></span> **Try it:** In `site.ori`, add a new formula for `small.jpg` that calls `thumbnail.js` as a function and passes in the file `images/van.jpg`.

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml/0/name)
  team = map(teamData.yaml, =greet.ori(_/name))
  assets
  images
  <b>small.jpg = thumbnail.js(images/van.jpg)</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it.

<span class="tutorialStep"></span> In the tree diagram, click the box for the real image in `images/van.jpg` to preview it.

<span class="tutorialStep"></span> Navigate back to the diagram and click the box for `small.jpg` to see the same image at a smaller size. The formula you created above produces this thumbnail on demand.

<span class="tutorialStep"></span> Navigate back to the tree diagram.

## Create a virtual folder of thumbnails

You could write formulas to create a thumbnail for each image in the `images` folder — but the Origami `map` function lets you define the transformation of all the images with a single line.

<span class="tutorialStep"></span> **Try it:** Switch to the Glitch editor window. In `site.ori`, delete the formula for `small.jpg` and replace it with the following `thumbnails` formula:

<clipboard-copy>

<pre class="step">
{
  index.html = greet.ori(teamData.yaml/0/name)
  team = map(teamData.yaml, =greet.ori(_/name))
  assets
  images
  <b>thumbnails = map(images, thumbnail.js)</b>
}
</pre>

</clipboard-copy>

This `thumbnails` formula applies the `thumbnail.js` function to each of the images. In that `map` function, the second parameter is just the file name `thumbnail.js`, which is a shorthand for writing the longer form `=thumbnail.js(_)`

Because Origami treats real folders and virtual folders the same, you can browse your virtual folder of thumbnails.

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's updated structure.

The virtual `thumbnails` folder in the diagram now contains a set of thumbnail images that _do not exist_ in any persistent form. They are potential images. If you click on one, it will be created at that moment.

## Use a map inside a template

The main About Us page should display a tile for each member that links to their individual page.

<span class="tutorialStep"></span> In the `src` folder, open `index.ori`. This template will form the basis of the final home page.

<clipboard-copy>

```${"html"}
=`<h1>About Us</h1>
<ul>
  \{\{ map(_, =`
    <li>\{\{ _/name }}</li>
  `) \}\}
</ul>
`
```

</clipboard-copy>

In `site.ori`, you've already created a map of images to thumbnails, and a map of team data to a set of greetings. The `index.ori` template uses the same kind of map to transform the team data into corresponding bits of HTML.

The `index.ori` file defines two templates, an outer template and an inner template:

- The outer template spans all lines and defines the overall page. This outer template will accept the entire collection of team data as input; that's what the `_` underscore immediately following `map` will receive.
- The inner, nested template is defined on the middle line as part of the `map`. That inner template will receive a single team member at a time as input; that's what the `_` underscore in `_/name` will refer to. This template generates a list item containing that person's name.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your `index.html` formula to remove the call to `greet.ori` and instead invoke the `index.ori` template, passing in the `teamData.yaml` data.

<clipboard-copy>

<pre class="step">
{
  index.html = <b>index.ori(teamData.yaml)</b>
  team = map(teamData.yaml, =greet.ori(_/name))
  assets
  images
  thumbnails = map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

The preview now shows: the heading **About Us** and a bulleted list of names.

## A nested template can span multiple lines

The text inside a template can be as complex as you want.

<span class="tutorialStep"></span> **Try it:** Copy and paste this fuller template into `index.ori`:

<clipboard-copy>

```${"html"}
${ demos/framework-intro/index.ori }
```

</clipboard-copy>

(Note: the last line contains a backtick character; be sure to copy that too.)

Functionally speaking, this is no more complex than the earlier template; it just has more elements.

The preview for `index.html` now shows a tile for each team member that includes their name and location. It also shows a thumbnail image pulled from the virtual `thumbnails` folder you created earlier. As far as the `<img>` tag above knows, that thumbnail is a real image — but actually that image is being created on demand.

## Use a person template

You can use a template for the people pages in the `team` area too.

<span class="tutorialStep"></span> In the src folder, view the `person.ori` template:

<clipboard-copy>

```${"html"}
=`<h1>\{\{ _/name }}</h1>`
```

</clipboard-copy>

This template displays a person's name in a header. You can use this in the `map` that defines the `team` area.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, edit the `team` formula to replace the `=greet.ori(_/name)` with `person.ori`.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = map(teamData.yaml, <b>person.ori</b>)
  assets
  images
  thumbnails = map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the tree diagram window to see that the pages in the `team` area now use your `person.ori` template.

<figure>
  ${ svg({
    0: "<h1>Alice</h1>"
    1: "<h1>Bob</h1>"
    2: "<h1>Carol</h1>"
  }) }
</figure>

## Use people names as file names

As you've seen, the top-level keys in `teamData.yaml` are numbers, like `0` for the first person, so at the moment the `team` area pages are identified with numbers too. But in your final website tree, you'd like the keys in the `team` area to include the person's name, like `Alice.html`.

So you want to transform both the keys and values of the team data. You can do this with an expanded form of the `map` function.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the `team` formula so that the second parameter is a set of options in `{ }` curly braces. Turn the existing `person.ori` reference into a `valueMap` option.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = map(teamData.yaml, <b>{
    valueMap: person.ori
  }</b>)
  assets
  images
  thumbnails = map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

This will use `person.ori` to transform values just as before.

<span class="tutorialStep"></span> Now add a `keyMap` option that will change the keys (names) of the team pages:

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = map(teamData.yaml, {
    <b>keyMap: =_/name</b>
    valueMap: person.ori
  })
  assets
  images
  thumbnails = map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

_**Note:** The Origami syntax for map recently changed. For projects outside Glitch, use `key` instead of `keyMap` and `value` instead of `valueMap`._

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to confirm that the `team` area is now using names instead of numbers:

<div class="sideBySide">
  <figure>
    ${ svg([
      "<p>Hello, <strong>Alice</strong>!<p>"
      "<p>Hello, <strong>Bob</strong>!<p>"
      "<p>Hello, <strong>Carol</strong>!<p>"
    ]) }
  </figure>
  <figure>
    ${ svg({
      Alice: "<p>Hello, <strong>Alice</strong>!<p>"
      Bob: "<p>Hello, <strong>Bob</strong>!<p>"
      Carol: "<p>Hello, <strong>Carol</strong>!<p>"
    }) }
  </figure>
  <figcaption>Before: pages have numbers</figcaption>
  <figcaption>After: pages have names</figcaption>
</div>

## Add an HTML extension

We want the pages in the `team` area to end in a `.html` extension because that helps indicate the type of data the files contain. One way you can do that in an Origami map is defining a `keyMap` with a small template.

<span class="tutorialStep"></span> In `site.ori`, update the `team` formula's `keyMap` option to add a`.html` extension to the keys.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = map(teamData.yaml, {
    keyMap: =<b>`\{\{ _/name }}.html`</b>
    valueMap: person.ori
  })
  assets
  images
  thumbnails = map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to confirm that the `team` pages now have names that end in `.html`:

<figure>
  ${ svg({
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
${ demos/framework-intro/person.ori }
```

</clipboard-copy>

(Note: the last line contains a backtick character; be sure to copy that too.)

<span class="tutorialStep"></span> In the site preview, you can now click a person tile on the main About Us page to navigate to the specific page for that team member.

## View the tree of the completed site

The site is now complete.

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's final structure. In that diagram (not the one below) you can click on the circles or boxes to explore what you've made.

<figure>
${ svg.js _/siteComplete }
</figure>

To review, you've created this entire site with a few resources, a couple of templates, and a concise `site.ori` with a handful of formulas:

<clipboard-copy>

```ori
{
  index.html = index.ori(teamData.yaml)
  team = map(teamData.yaml, {
    keyMap: =`\{\{ _/name }}.html`
    valueMap: person.ori
  })
  assets
  images
  thumbnails = map(images, thumbnail.js)
}
```

</clipboard-copy>

## Building static files

You have been viewing your About Us site using a small Origami server running in the background. Since the members of your team aren't going to change every minute, you can turn the whole site into static files: regular files whose contents aren't expected to constantly change.

Defining a site as static files is generally faster and cheaper than running a live web server. On services like Glitch, static file websites are free!

Glitch will build your site's static files automatically after you stop editing the site, but you can manually trigger the build process to see it in action.

<span class="tutorialStep"></span> In the main Glitch editor window, click the **Terminal** button in the toolbar at the bottom of the Glitch window.

<span class="tutorialStep"></span> In the Glitch terminal, type the following command. (The `$` dollar sign comes from the terminal — don't type it.)

```console
$ npm run build
```

That copies everything in your running website to a real folder called `build`.

<span class="tutorialStep"></span> In the Glitch terminal, type:

```console
$ refresh
```

This refreshes the files shown in the main portion of the Glitch window.

<span class="tutorialStep"></span> Close the Glitch terminal.

<span class="tutorialStep"></span> Click the `build` folder on the left side of the Glitch window and view the files it contains.

In addition to copies of the real files in the `assets` and `images` folders, the `build` folder now contains real copies of all the virtual files you defined in `site.ori`:

- A real `thumbnails` folder with real thumbnail versions of each image.
- A real `index.html` page with HTML that includes a tile for each team member.
- A real `team` folder with real HTML pages for each team member.

At some point after you close the Glitch window, Glitch will rebuild and serve these static files instead of using the Origami server. Because the static files all use native web formats, your site will be extremely fast.

## View your final site

<span class="tutorialStep"></span> In the tree diagram window, edit the URL to remove the `!svg` part.

This is how your site will look to visitors.

If you'd like to keep your site, you can create a Glitch account. Your site will have a permanent URL like `https://<something>.glitch.me` that you can share with other people.

If you don't want to create an account, Glitch will keep the site for some time before removing it.

## Done!

This concludes the Origami tutorial. If you'd like to try working with Origami on your own machine, you can copy the [origami-start](https://github.com/WebOrigami/origami-start) project.

You can continue exploring related topics:

- The [Origami expression language](/language/) you used to write formulas and template expressions has additional features not covered in this tutorial.
- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The conceptual framework is built on an [async-tree](/async-tree) library that lets you do everything that you did here with formulas using JavaScript instead.
- You can implement sites completely from scratch using the [async tree pattern](/pattern) and no library or framework at all, an approach may appeal to people who want to work as close to the metal as possible. That pattern is also a useful reference if you want to understand how Origami works under the hood.

&nbsp;

Back to [Overview](/language/)
