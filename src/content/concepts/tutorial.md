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
and click on a few pages to get a feel for it.

If you're the kind of person who can write spreadsheet formulas, you can use Origami to build that site.

## Start

<span class="tutorialStep"></span> Open the
<a href="https://glitch.com/edit/#!/origami-framework-intro" target="_blank">tutorial project on Glitch</a>, a free web-based code editor.

<span class="tutorialStep"></span> Click the **Remix** button (or Remix to Edit) to create your own copy of the project to work on.

You'll see a list of files on the left and the currently-open file (the project's ReadMe) in the center.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then **Open Preview Pane** to open a preview pane on the right.

The page in the preview pane says: Hello

## Define a virtual file

You'll define the complete set of pages and other resources your site will need in an Origami file with a `.ori` extension.

<span class="tutorialStep"></span> In the `src` folder, open `site.ori`:

```
{
  index.html = "Hello"
}
```

This Origami file defines a site with a file called `index.html`:

- Everything in between the outermost `{` on the first line and the `}` on the last line defines the top level of the site.
- Names in Origami can include periods so you can define file names with extensions.
- For now, the `index.html` file is defined as a simple text string.

This tutorial project is configured to serve the site defined in `site.ori`.

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

<span class="tutorialStep"></span> Leaving the tree diagram open, switch back to the main Glitch window. You'll return to this tree diagram occasionally to view the structure of your evolving site.

## Formulas can call JavaScript

The `index.html` file is currently defined with a simple formula. These formulas can also call JavaScript. You can do a lot in Origami without JavaScript, but easy access to JavaScript offers extensibility.

<span class="tutorialStep"></span> View the file `src/greet.js`.

```{{'js'}}
{{ demos/framework-intro/greet.js }}
```

Given a name, this function returns a greeting in HTML; the name will be set in bold. You can call this JavaScript function in an Origami formula.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the formula for `index.html` to remove the quoted string, and instead call the function in `greet.js`. Pass the text `"world"` to the function.

<clipboard-copy>

```
{
  index.html = greet.js("world")
}
```

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

```
{
  index.html = greet.js(teamData.yaml/0/name)
}
```

</clipboard-copy>

The preview should show something like: Hello, **Alice**!

## Use a template to create text

In addition to creating HTML in JavaScript, you can also use one of many JavaScript-based template systems. For this tutorial, you'll use the [template system built into Origami](templates.html).

<span class="tutorialStep"></span> In the `src` folder, open `index.orit`.

<clipboard-copy>

```html
<h1>About Us</h1>
```

</clipboard-copy>

An Origami template in a `.orit` file (with an extra `t` for "template") can produce text like HTML.

You can call this `index.orit` template as a function, just like you invoked `greet.js`.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your `index.html` formula to remove the call to `greet.js` and instead invoke your `index.orit` template as a function.

<clipboard-copy>

```
{
  index.html = index.orit()
}
```

</clipboard-copy>

Now when you view the site's main page, the `index.orit` template will be invoked to obtain the HTML. The preview shows: **About Us**

## Add an expression to a template

Origami templates let you insert data using placeholders marked with double curly braces `\{\{` `}}`.

Inside the curly braces, you can do the same things you can in Origami formulas in a `.ori` file: call JavaScript functions, reference real and virtual files, or extract specific data with slash-separated paths.

<span class="tutorialStep"></span> **Try it:** At the end of `index.orit`, add a `\{\{ }}` placeholder. Inside the placeholder, call the JavaScript function `greet.js` and pass it a name.

<clipboard-copy>

```html
<h1>About Us</h1>
\{\{ greet.js("Bob") }}
```

</clipboard-copy>

The preview now includes a paragraph: Hello, **Bob**!

## Pass data to a template

When you call a Origami template as a function like `index.orit()`, you can put things inside those parentheses to pass data to the template. Inside that template, you can refer to the data passed to it using an underscore (`_`).

<span class="tutorialStep"></span> **Try it:** Update `site.ori` to pass `teamData.yaml/0/name` to the `index.orit` template.

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml/0/name)
}
```

</clipboard-copy>

The preview won't change until you complete the next step.

<span class="tutorialStep"></span> Next, update the `index.orit` template to make use of the name you're passing to it. In the call to `greet.js`, replace the hard-coded name with an underscore (`_`).

<clipboard-copy>

```html
<h1>About Us</h1>
<p>\{\{ greet.js(_) }}</p>
```

</clipboard-copy>

The preview updates to use the name you passed, like Hello, **Alice**!

## Creating a virtual folder with a map

There are several places in this web site where you want to transform one set of things and into a new set of things:

- For each team member in teamData.yaml, you want a tile on the index page.
- For each team member in teamData.yaml, you want a page in the `team` area.
- For each image like `images/van.jpg`, you want a corresponding thumbnail image like `thumbnails/van.jpg`.

You can address all these situations in Origami with a _map_.

<span class="tutorialStep"></span> **Try it:** Add the following formula for `team` to `site.ori`:

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml/0/name)
  team = @map(teamData.yaml, =_/name)
}
```

</clipboard-copy>

This formula calls a built-in function called [@map](/language/@map.html). All built-in functions start with an `@` sign.

This `team` formula says: starting with the tree of structured data in `teamData.yaml`, create a new tree — essentially, a virtual folder based on the original data. The keys of the new tree will be the same as in `teamData.yaml`.

The data for each person in `teamData.yaml` will be mapped using the expression `=_/name`. That defines a function called once for each person. The `_` underscore represents the person being operated on, so `_/name` gets the person's `name` field.

This `@map` transforms the structured data in `teamData.yaml` to a corresponding tree of names:

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
    index.html = "<h1>About Us</h1>"
    team = [
      "Alice"
      "Bob"
      "Carol"
    ]
  } }}
</figure>

## Call a function in a map

The formula you give to `@map` can be arbitrarily complex.

<span class="tutorialStep"></span> **Try it**: In the Glitch editor window, in `site.ori`, update the expression `=_/name` so that, instead of just returning a `name`, it calls the `greet` function and passes in that person's name:

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml/0/name)
  team = @map(teamData.yaml, =greet.js(_/name))
}
```

</clipboard-copy>

<span class="tutorialStep"></span> In the tree diagram window, refresh the page to see the updated `team` area.

<figure>
  {{ svg.js {
    index.html = "<h1>About Us</h1>"
    team = [
      "<p>Hello, <strong>Alice</strong>!</p>"
      "<p>Hello, <strong>Bob</strong>!</p>"
      "<p>Hello, <strong>Carol</strong>!</p>"
    ]
  } }}
</figure>

A map in Origami is an efficient way to create entire areas of a site.

## Pull in more resources

The `src` folder has two real subfolders you'll want to include in the tree for your site:

- `assets` contains a stylesheet and icon
- `images` contains sample images you can use to represent your team members

You can pull a real folder or file into your tree by writing its name on a line by itself.

<span class="tutorialStep"></span> **Try it:** Update `site.ori` to add lines that pull in the `assets` and `images` folders.

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml/0/name)
  team = @map(teamData.yaml, =greet.js(_/name))
  assets
  images
}
```

</clipboard-copy>

<span class="tutorialStep"></span> Switch to tree diagram window and refresh it to see the updated site structure.

Your site now includes both real files (the assets and images) and virtual files (the greetings in the `team` area).

## Create a virtual folder of thumbnails

Let's use the `@map` function to create small thumbnail images for each team member.

<span class="tutorialStep"></span> View the images in the `src/images` folder, which contains a few full-size images. Each person in `teamData.yaml` identifies one of these sample images as a profile photo.

For each full-size image, you want to produce a corresponding thumbnail image that will appear on the index page. Instead of using an image-editing app to create a real folder of thumbnail images, you can create a virtual folder of thumbnail images on demand.

The file `src/thumbnail.js` contains a small JavaScript function which, given the data for an image, invokes an image-editing library to generate a new image at a smaller size.

<span class="tutorialStep"></span> **Try it:** Switch to the Glitch editor window. In `site.ori`, add the following `thumbnails` formula.

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml/0/name)
  team = @map(teamData.yaml, =greet.js(_/name))
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
```

</clipboard-copy>

This `thumbnails` formula applies the `thumbnail.js` function to each of the images. Because Origami treats real folders and virtual folders the same, you can browse your virtual folder of thumbnails.

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's updated structure.

The virtual `thumbnails` folder contains a set of thumbnail images _that do not exist_ in any persistent form. They are potential images that are only created when you ask for them.

<span class="tutorialStep"></span> In the tree diagram, click a box for a real image like `images/van.jpg` to preview it.

<span class="tutorialStep"></span> Navigate back and click a box for the corresponding thumbnail image like `thumbnails/van.jpg` to see the same image at a smaller size. This image is produced on demand.

<span class="tutorialStep"></span> Navigate back to the tree diagram.

## Incorporate input into a template

Your index page should display a tile for each member that links to their individual page.

At the moment, the `site.ori` file is passing a single person's name to `index.orit`:

```
  index.html = index.orit(teamData.yaml/0/name)
```

We're going to change `index.orit` so that, instead of just accepting a single person's name, it accepts the entire hierarchical tree of team data.

<span class="tutorialStep"></span> **Try it:** Switch the Glitch editor window. Update the formula for `index.html` so that the entire `teamData.yaml` file is passed to the template.

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml)
  team = @map(teamData.yaml, =greet.js(_/name))
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
```

</clipboard-copy>

<span class="tutorialStep"></span> Next, replace the contents of the placeholder in the `index.orit` template so that, instead of calling `greet.js`, the template incorporates its entire input (`_`) into the result.

<clipboard-copy>

```{{"html"}}
<h1>About Us</h1>
\{\{ _ }}
```

</clipboard-copy>

The preview updates to show the entire contents of `teamData.yaml`. That's more data than you want to show! The next step will let you show just the data that's meaningful.

## Create a map inside a template

In `site.ori`, you've already created a map of `images` to `thumbnails`, and a map of `teamData.yaml` to a set of `team` greetings. You're now going to do the same kind of map inside the `index.ori` template to translate the data for the team members into a corresponding set of HTML blocks.

<span class="tutorialStep"></span> Copy and paste the following into `index.orit`.

<clipboard-copy>

```{{"html"}}
<h1>About Us</hi>
\{\{ @map(_, =`
  <li>\{\{ _/name }}</li>
`) }}

```

</clipboard-copy>

The `=` equals sign and backticks define a _nested_ template: a small template inside of the main template.

The two underscore (`_`) characters here both refer to template inputs — but to different inputs. The first underscore represents the overall input to the template: the entire `teamData.yaml` data file. The second underscore refers to the input to the nested template: an individual team member.

The preview now shows a bulleted list of names.

## A nested template can span multiple lines

The text inside a template can be as complex as you want.

<span class="tutorialStep"></span> **Try it:** Copy and paste this fuller template into `index.orit`:

<clipboard-copy>

```html
{{ @js/String demos/framework-intro/index.orit }}
```

</clipboard-copy>

Functionally speaking, this is no more complex than the earlier template; it just has more elements.

The index page preview now shows a tile for each team member that includes their name and location. It also shows a thumbnail image pulled from the virtual `thumbnails` folder you created earlier. As far as the `<img>` tag above knows, that thumbnail is a real image — but actually that image is being created on demand.

## Create a person template

You can use a template for the people pages in the `team` area too.

<span class="tutorialStep"></span> In the src folder, view the `person.orit` template:

<clipboard-copy>

```html
<h1>\{\{ _/name }}</h1>
```

</clipboard-copy>

This template displays a person's name in a header. You can use this in the `@map` that defines the `team` area.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, edit the `team` formula to replace the `=greet.js(_/name)` with `person.orit`.

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml)
  team = @map(teamData.yaml, person.orit)
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
```

</clipboard-copy>

<span class="tutorialStep"></span> Refresh the tree diagram window to see that the pages in the `team` area now use your `person.orit` template.

<figure>
  {{ svg.js {
    0: "<h1>Alice</h1>"
    1: "<h1>Bob</h1>"
    2: "<h1>Carol</h1>"
  } }}
</figure>

## Use people names as file names

As you've seen, the top-level keys in `teamData.yaml` are numbers, like `0` for the first person, so at the moment the `team` area pages are identified with numbers too. But in your final website tree, you'd like the names of the pages in the `team` area to include the person's name, like `Alice.html`.

To support this, the `@map` function has another form in which the second parameter isn't a single thing like `greet.js` or `person.orit`, but a set of options that can designate multiple functions. The function you've seen so far for mapping values can be specified as the `valueMap` option.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the `team` formula so that the second parameter is a set of options in `{ }` single curly braces. Turn the existing `person.orit` reference into a `valueMap` option.

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml)
  team = @map(teamData.yaml, {
    valueMap: person.orit
  })
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
```

</clipboard-copy>

<span class="tutorialStep"></span> Now add a `keyMap` option that will change the keys (names) of the team pages:

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml)
  team = @map(teamData.yaml, {
    keyMap: =_/name
    valueMap: person.orit
  })
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
```

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

```
{
  index.html = index.orit(teamData.yaml)
  team = @map(teamData.yaml, {
    keyMap: =`\{\{ _/name }}.html`
    valueMap: person.orit
  })
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
```

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

The only thing left to do is complete the `person.orit` template.

<span class="tutorialStep"></span> Replace the contents of `person.orit` with:

<clipboard-copy>

```{{"html"}}
{{ @js/String demos/framework-intro/person.orit }}
```

</clipboard-copy>

<span class="tutorialStep"></span> In the site preview, you can now click a person tile on the index page to navigate to the page for that person.

## View the tree of the completed site

The site is now complete.

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's final structure. In that diagram (not the one below) you can click on the circles or boxes to explore what you've made.

<figure>
{{ svg.js siteComplete }}
</figure>

Stepping back, consider that you've created this entire site with a few resources, a couple of templates, and a concise `site.ori` with a handful of formulas:

<clipboard-copy>

```
{
  index.html = index.orit(teamData.yaml)
  team = @map(teamData.yaml, {
    keyMap: =`\{\{ _/name }}.html`
    valueMap: person.orit
  })
  assets
  images
  thumbnails = @map(images, thumbnail.js)
}
```

</clipboard-copy>

## Building static files

You have been viewing your About Us site using a small Origami server which is running in the background. But since the members of your team aren't going to change every minute, Glitch can automatically render all the pages and other necessary resources as static files. That makes the site faster — and free!

Glitch will build the static files automatically after you stop editing the site, but you can manually trigger the build process to see it in action.

<span class="tutorialStep"></span> In the main Glitch editor window, click the **Terminal** button in the toolbar at the bottom of the Glitch window.

<span class="tutorialStep"></span> In the Glitch terminal, type the following command:

```console
$ npm run build
```

This invokes a Origami tool called `ori`, and instructs it to copy the contents of the entire virtual `public` tree to a real file system folder called `build`. This turns the virtual files into real files.

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

Because these static files are all in native web formats, your static site can be extremely fast. There are opportunities around the margins to make your site even faster, but this is already a good start on a performant site.

## View your final site

<span class="tutorialStep"></span> Find your site's shareable URL by clicking **Share** button in the upper right, then copy the URL for the **Live site**.

Your site will have a URL like `https://<something>.glitch.me`.

<span class="tutorialStep"></span> Open a new browser tab and navigate to that URL to see how your site will look to visitors.

While you're working on your site, the Origami server is used to serve the content. At some point after you close the Glitch window, Glitch will rebuild the static files and stop the live server. From that point on, Glitch will serve the static files directly and more quickly.

## Learn more

This concludes the Origami tutorial. You can continue exploring related topics:

- The [Origami expression language](/language) you used to write formulas and template expressions has additional features not covered in this tutorial.
- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The conceptual framework is built on an [async-tree](/async-tree) library that lets you do everything that you did here with formulas using JavaScript instead.
- You can implement sites completely from scratch using the [async tree pattern](/pattern) and no library or framework at all. That approach may appeal to people who want to work as close to the metal as possible, and that pattern is also a useful reference if you want to understand how Origami works under the hood.

&nbsp;

Back to [Concepts](/concepts/)
