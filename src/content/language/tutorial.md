---
title: Create a simple site in Origami
subtitle: A live walkthrough
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
    personIcon.svg: "…"
    styles.css: "…"
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

You don't need to install anything to complete this tutorial. If you prefer a conceptual introduction first, visit [Hello, world](hello.html).

## Scenario

One day your team decides:

> _We need an "About Us" site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/demos/aboutUs/" target="_blank">sample About Us site</a>
and click on a few pages to get a feel for it. (This would typically be part of a larger site, but for illustration purposes we'll consider it a site on its own.)

If you're the kind of person who can write spreadsheet formulas, you can use the Origami language to build that site.

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

```
{
  index.html = "Hello"
}
```

Everything in between the `{ }` curly braces defines the top level of the site. For now, this defines a single thing you can think of as a file even though it's not stored anywhere. The name or _key_ for this file is "index.html". The contents or _value_ of this file is the text "Hello".

You're going to work on this `site.ori` file so that it creates the About Us site. The `index.html` page will eventually become the main About Us page.

<span class="tutorialStep"></span> **Try it:** Edit the text in the formula for `index.html` to give it more content, like: Hello, world!

After a moment, the Glitch preview window should refresh to show: Hello, world!

## View your site as a tree

Origami lets you visualize and explore your site as a hierarchical _tree_ of pages and other resources.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then click **Preview in a new window**. This will open your site in a new window (or tab).

<span class="tutorialStep"></span> In the browser address bar for that new window, add `/!@svg` to the end of the URL. The new URL should look like `https://your-project-name.glitch.me/!@svg`

You'll see your site visually represented as a tree with just one branch:

<figure>
{{ svg.js {
index.html = 'Hello, world!'
} }}
</figure>

The little circle represents the overall tree, and the box represents the `index.html` file.

<span class="tutorialStep"></span> In the tree diagram, click the box for `index.html` to view it.

<span class="tutorialStep"></span> Navigate back to the tree diagram.

<span class="tutorialStep"></span> Leaving the tree diagram open, switch back to the main Glitch window. You'll return to this tree diagram occasionally to view the structure of your evolving site and to explore the individual pages.

## Formulas can call JavaScript

The `index.html` file is currently defined with a simple formula. These formulas can also call JavaScript. You can do a lot in Origami without JavaScript, but easy access to JavaScript offers extensibility.

<span class="tutorialStep"></span> View the file `src/greet.js`. Glitch shows only a single file at a time, so opening `greet.js` will replace `site.ori` in the editor window.

```{{'js'}}
{{ demos/framework-intro/greet.js }}
```

Given a name, this function returns a greeting in HTML; the name will be set in bold. You can call this JavaScript function in an Origami formula.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the formula for `index.html` to remove the quoted string, and instead call the function in `greet.js`. Pass the text `"world"` to the function.

<clipboard-copy>

<pre class="step">
{
  index.html = <b>greet.js("world")</b>
}
</pre>

</clipboard-copy>

The page ends up with "world" in bold: Hello, **world**!

When you call `greet.js` in a formula like this, Origami searches the current [scope](/language/scope.html) for a file with that name. If it finds one, it dynamically imports that JavaScript module, and invokes what's there — in this case, a function that returns a greeting.

## Defining the team data

Data in Origami projects can come from pretty much anything. This sample project stores the data for your team members in a YAML file. It could just as easily use JSON, another data file format, or data sitting on a server.

<span class="tutorialStep"></span> Open the team data file in `src/teamData.yaml`:

```{{"yaml"}}
{{ demos/framework-intro/teamData.yaml }}
```

This defines an array of person records but _this data is too boring!_

<span class="tutorialStep"></span> In `teamData.yaml`, replace the people's names with your name and the names of family or friends.

## Formulas can extract data

You can use slash-separated paths to extract information out of any hierarchical source, whether it's a file system folder or data like your team information.

You can use this slash-separated path syntax anywhere you can refer to something.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your formula for `index.html` to pass the `name` of the first team member to `greet`. Array indexes start with zero, so `/0/name` here gets the name of the first person.

<clipboard-copy>

<pre class="step">
{
  index.html = greet.js(<b>teamData.yaml/0/name</b>)
}
</pre>

</clipboard-copy>

The preview should show something like: Hello, **Alice**!

## Use a template to create text

In addition to creating HTML in JavaScript, you can also use one of many JavaScript-based template systems. For this tutorial, you'll use the [template system built into Origami](templates.html).

<span class="tutorialStep"></span> In the `src` folder, open `index.ori`.

<clipboard-copy>

```{{"html"}}
=`<h1>About Us</h1>`
```

</clipboard-copy>

You can call this `index.ori` template as a function, just like you invoked `greet.js`.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your `index.html` formula to remove the call to `greet.js` and instead invoke your `index.ori` template as a function.

<clipboard-copy>

<pre class="step">
{
  index.html = <b>index.ori()</b>
}
</pre>

</clipboard-copy>

Now when you view the site's main page, the `index.ori` template will be invoked to obtain the HTML. The preview shows: **About Us**

## Add an expression to a template

Origami templates let you insert data using placeholders marked with double curly braces `\{\{` `}}`.

Inside the curly braces, you can do the same things you can in Origami formulas in a `.ori` file: call JavaScript functions, reference real and virtual files, or extract specific data with slash-separated paths.

<span class="tutorialStep"></span> **Try it:** At the end of `index.ori`, add a `\{\{ }}` placeholder. Inside the placeholder, call the JavaScript function `greet.js` and pass it a name.

<clipboard-copy>

<pre class="step">
=`&lt;h1>About Us&lt;/h1>
<b>\{\{ greet.js("Bob") }}</b>
`
</pre>

</clipboard-copy>

The preview now includes a paragraph: Hello, **Bob**!

## Pass data to a template

When you call a Origami template as a function like `index.ori()`, you can put things inside those parentheses to pass data to the template. Inside that template, you can refer to the data passed to it using an underscore (`_`).

<span class="tutorialStep"></span> **Try it:** For the first step, update `site.ori` to pass `teamData.yaml/0/name` to the `index.ori` template.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(<b>teamData.yaml/0/name</b>)
}
</pre>

</clipboard-copy>

The preview won't change until you complete the next step.

<span class="tutorialStep"></span> Next, update the `index.ori` template to make use of the name you're passing to it. In the call to `greet.js`, replace the quoted name with a `_` underscore.

<clipboard-copy>

<pre class="step">
=`&lt;h1>About Us&lt;/h1>
\{\{ greet.js<b>(_)</b> }}
`
</pre>

</clipboard-copy>

The preview updates to use the name you passed, like Hello, **Alice**!

## Creating a virtual folder with a map

There are several places in this web site where you want to transform one set of things and into a new set of things:

1. For each team member in teamData.yaml, you want a page in the `team` area.
1. For each team member in teamData.yaml, you want a tile on the main About Us page.
1. For each image like `images/van.jpg`, you want a corresponding thumbnail image like `thumbnails/van.jpg`.

You can address all these situations in Origami with a _map_. This is a "map" in the [computer science sense of the word](<https://en.wikipedia.org/wiki/Map_(higher-order_function)>): an operation performed on every item in a collection to produce a new collection.

You can think of the result of a map as a virtual folder — a set of things you can browse and work with, but which aren't stored anywhere. This is an efficient way to create an entire area of a site from existing data or files.

Let's start by mapping the people defined in `teamData.yaml`: for each person, we'll create a corresponding web page. Those web pages will be the `team` area for the About Us site.

<span class="tutorialStep"></span> **Try it:** Add the following formula for `team` to `site.ori`:

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml/0/name)
  <b>team = @map(teamData.yaml, =_/name)</b>
}
</pre>

</clipboard-copy>

This formula calls a built-in function called [@map](/language/@map.html). All built-in functions start with an `@` sign.

This `team` formula says: starting with the tree of structured data in `teamData.yaml`, create a new tree. For each person in the data, evaluate the expression `=_/name`. The `_` underscore represents the person being operated on, so the expression `_/name` gets the person's `name` field.

So the `team` formula transforms the team data into a corresponding tree of names:

<div class="sideBySide">
  <figure>
    {{ svg.js [
      { name: "Alice", image: "kingfisher.jpg" }
      { name: "Bob", image: "beach.jpg" }
      { name: "Carol", image: "venice.jpg" }
    ] }}
  </figure>
  <figure>
    {{ svg.js [
      "Alice"
      "Bob"
      "Carol"
    ] }}
  </figure>
  <figcaption>Tree structure of teamData.yaml</figcaption>
  <figcaption>Mapped tree of names</figcaption>
</div>

<span class="tutorialStep"></span> In the tree diagram window, refresh the page to confirm that the tree now includes an `team` area with the names from `teamData.yaml`.

<figure>
  {{ svg.js {
    index.html = "<h1>About Us</h1> Hello…"
    team = [
      "Alice"
      "Bob"
      "Carol"
    ]
  } }}
</figure>

## Call a function in a map

The formula you give to `@map` can be as complex as your situation requires.

<span class="tutorialStep"></span> **Try it**: In the Glitch editor window, in `site.ori`, update the expression `=_/name` so that, instead of just returning a `name`, it calls the `greet` function and passes in that person's name:

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml/0/name)
  team = @map(teamData.yaml, =<b>greet.js(_/name)</b>)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> In the tree diagram window, refresh the page to see the updated `team` area.

<figure>
  {{ svg.js {
    index.html = "<h1>About Us</h1> Hello…"
    team = [
      "<p>Hello, <strong>Alice</strong>!</p>"
      "<p>Hello, <strong>Bob</strong>!</p>"
      "<p>Hello, <strong>Carol</strong>!</p>"
    ]
  } }}
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
  index.html = index.ori(teamData.yaml/0/name)
  team = @map(teamData.yaml, =greet.js(_/name))
  <b>assets
  images</b>
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to tree diagram window and refresh it to see the updated site structure.

Your site now includes both real files (the assets and images) and virtual files (the greetings in the `team` area).

## Create a virtual folder of thumbnails

Let's use the `@map` function to create small thumbnail images for each team member.

<span class="tutorialStep"></span> View the images in the `src/images` folder, which contains a few full-size images. Each person in `teamData.yaml` identifies one of these sample images as a profile photo.

For each full-size image, you want to produce a corresponding thumbnail image that will appear on the main About Us page. Instead of using an image-editing app to create a real folder of thumbnail images, you can create a virtual folder of thumbnail images on demand.

The file `src/thumbnail.js` contains a small JavaScript function which, given the data for an image, invokes an image-editing library to generate a new image at a smaller size.

<span class="tutorialStep"></span> **Try it:** Switch to the Glitch editor window. In `site.ori`, add the following `thumbnails` formula.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml/0/name)
  team = @map(teamData.yaml, =greet.js(_/name))
  assets
  images
  <b>thumbnails = @map(images, thumbnail.js)</b>
}
</pre>

</clipboard-copy>

This `thumbnails` formula applies the `thumbnail.js` function to each of the images. Because Origami treats real folders and virtual folders the same, you can browse your virtual folder of thumbnails.

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's updated structure.

The virtual `thumbnails` folder in the diagram contains a set of thumbnail images _that do not exist_ in any persistent form. They are potential images that are only created when you ask for them.

<span class="tutorialStep"></span> In the tree diagram, click a box for a real image like `images/van.jpg` to preview it.

<span class="tutorialStep"></span> Navigate back and click a box for the corresponding thumbnail image like `thumbnails/van.jpg` to see the same image at a smaller size. This image is produced on demand.

<span class="tutorialStep"></span> Navigate back to the tree diagram.

## Incorporate input into a template

The main About Us page should display a tile for each member that links to their individual page.

At the moment, the `site.ori` file is passing a single person's name to `index.ori`:

```
  index.html = index.ori(teamData.yaml/0/name)
```

We're going to change `index.ori` so that, instead of just accepting a single person's name, it accepts the entire hierarchical tree of team data.

<span class="tutorialStep"></span> **Try it:** Switch the Glitch editor window. In `site.ori`, update the formula for `index.html` so that the entire `teamData.yaml` file is passed to the template.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(<b>teamData.yaml</b>)
  team = @map(teamData.yaml, =greet.js(_/name))
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Next, replace the contents of the placeholder in the `index.ori` template so that, instead of calling `greet.js`, the template incorporates its entire input (`_`) into the result.

<clipboard-copy>

<pre class="step">
=`&lt;h1>About Us&lt;/h1>
<b>\{\{ _ }}</b>
`
</pre>

</clipboard-copy>

The preview updates to show the entire contents of `teamData.yaml`. That's more data than you want to show! The next step will let you show just the data that's meaningful.

## Create a map inside a template

In `site.ori`, you've already created a map of `images` to `thumbnails`, and a map of `teamData.yaml` to a set of `team` greetings. You're now going to do the same kind of map inside the `index.ori` template to translate the data for the team members into corresponding bits of HTML, each of which defines a card showing a person's thumbnail and name.

<span class="tutorialStep"></span> Copy and paste the following into `index.ori`.

<clipboard-copy>

```{{"html"}}
=`<h1>About Us</h1>
\{\{ @map(_, =`<li>\{\{ _/name }}</li>`) }}
`
```

</clipboard-copy>

The `=` equals sign and backticks define a _nested_ template: a small template inside of the main template.

The two underscore (`_`) characters here both refer to template inputs — but to different inputs. The first underscore represents the overall input to the template: the entire `teamData.yaml` data file. The second underscore refers to the input to the nested template: an individual team member.

The preview now shows a bulleted list of names.

## A nested template can span multiple lines

The text inside a template can be as complex as you want.

<span class="tutorialStep"></span> **Try it:** Copy and paste this fuller template into `index.ori`:

<clipboard-copy>

```{{"html"}}
{{ @js/String demos/framework-intro/index.ori }}
```

</clipboard-copy>

Functionally speaking, this is no more complex than the earlier template; it just has more elements.

The preview for `index.html` now shows a tile for each team member that includes their name and location. It also shows a thumbnail image pulled from the virtual `thumbnails` folder you created earlier. As far as the `<img>` tag above knows, that thumbnail is a real image — but actually that image is being created on demand.

## Create a person template

You can use a template for the people pages in the `team` area too.

<span class="tutorialStep"></span> In the src folder, view the `person.ori` template:

<clipboard-copy>

```{{"html"}}
=`<h1>\{\{ _/name }}</h1>`
```

</clipboard-copy>

This template displays a person's name in a header. You can use this in the `@map` that defines the `team` area.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, edit the `team` formula to replace the `=greet.js(_/name)` with `person.ori`.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = @map(teamData.yaml, <b>person.ori</b>)
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the tree diagram window to see that the pages in the `team` area now use your `person.ori` template.

<figure>
  {{ svg.js {
    0: "<h1>Alice</h1>"
    1: "<h1>Bob</h1>"
    2: "<h1>Carol</h1>"
  } }}
</figure>

## Use people names as file names

As you've seen, the top-level keys in `teamData.yaml` are numbers, like `0` for the first person, so at the moment the `team` area pages are identified with numbers too. But in your final website tree, you'd like the keys of the pages in the `team` area to include the person's name, like `Alice.html`.

So you want to transform both the keys and values of the team data. You can do this with an expanded form of the `@map` function.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the `team` formula so that the second parameter is a set of options in `{ }` curly braces. Turn the existing `person.ori` reference into a `valueMap` option.

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = @map(teamData.yaml, <b>{
    valueMap: person.ori
  }</b>)
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Now add a `keyMap` option that will change the keys (names) of the team pages:

<clipboard-copy>

<pre class="step">
{
  index.html = index.ori(teamData.yaml)
  team = @map(teamData.yaml, {
    <b>keyMap: =_/name</b>
    valueMap: person.ori
  })
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to confirm that the `team` area is now indexed by names instead of numbers:

<div class="sideBySide">
  <figure>
    {{ svg.js [
      "<p>Hello, <strong>Alice</strong>!<p>"
      "<p>Hello, <strong>Bob</strong>!<p>"
      "<p>Hello, <strong>Carol</strong>!<p>"
    ] }}
  </figure>
  <figure>
    {{ svg.js {
      Alice: "<p>Hello, <strong>Alice</strong>!<p>"
      Bob: "<p>Hello, <strong>Bob</strong>!<p>"
      Carol: "<p>Hello, <strong>Carol</strong>!<p>"
    } }}
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
  team = @map(teamData.yaml, {
    keyMap: =<b>`\{\{ _/name }}.html`</b>
    valueMap: person.ori
  })
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to confirm that the `team` pages now have names that end in `.html`:

<figure>
  {{ svg.js {
    Alice.html: "<p>Hello, <strong>Alice</strong>!<p>"
    Bob.html: "<p>Hello, <strong>Bob</strong>!<p>"
    Carol.html: "<p>Hello, <strong>Carol</strong>!<p>"
  } }}
</figure>

## Fill out the person template

The only thing left to do is complete the `person.ori` template.

<span class="tutorialStep"></span> Replace the contents of `person.ori` with:

<clipboard-copy>

```{{"html"}}
{{ @js/String demos/framework-intro/person.ori }}
```

</clipboard-copy>

<span class="tutorialStep"></span> In the site preview, you can now click a person tile on the main About Us page to navigate to the specific page for that team member.

## View the tree of the completed site

The site is now complete.

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's final structure. In that diagram (not the one below) you can click on the circles or boxes to explore what you've made.

<figure>
{{ svg.js siteComplete }}
</figure>

To review, you've created this entire site with a few resources, a couple of templates, and a concise `site.ori` with a handful of formulas:

<clipboard-copy>

```
{
  index.html = index.ori(teamData.yaml)
  team = @map(teamData.yaml, {
    keyMap: =`\{\{ _/name }}.html`
    valueMap: person.ori
  })
  assets
  images
  thumbnails = @map(images, thumbnail.js)
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

<span class="tutorialStep"></span> In the tree diagram window, edit the URL to remove the `!@svg` part.

This is how your site will look to visitors.

If you'd like to keep your site, you can create a Glitch account. Your site will have a permanent URL like `https://<something>.glitch.me` that you can share with other people.

If you don't want to create an account, Glitch will keep the site for some time before removing it.

## Done!

This concludes the Origami tutorial. You can continue exploring related topics:

- The [Origami expression language](/language/) you used to write formulas and template expressions has additional features not covered in this tutorial.
- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The conceptual framework is built on an [async-tree](/async-tree) library that lets you do everything that you did here with formulas using JavaScript instead.
- You can implement sites completely from scratch using the [async tree pattern](/pattern) and no library or framework at all, an approach may appeal to people who want to work as close to the metal as possible. That pattern is also a useful reference if you want to understand how Origami works under the hood.

&nbsp;

Back to [Overview](/language/)
