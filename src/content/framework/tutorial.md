---
title: Create a simple About Us site
numberHeadings: true
countries:
  - name: Australia
    abbreviation: AU
  - name: Brazil
    abbreviation: BR
  - name: China
    abbreviation: CN
teamByName: !ori (@map/keys(framework.ori/teamData.yaml, =_/name))
siteComplete:
  index.html: <h1>About Us</h1>
  team:
    Alice.html: <h1>Alice</h1>
    Bob.html: <h1>Bob</h1>
    Carol.html: <h1>Carol</h1>
  assets:
    personIcon.svg: ""
    styles.css: ""
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

One day your team decides:

> _We need an "About Us" area for our site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/demos/aboutUs/" target="_blank">sample About Us area</a>
and click on a few pages.

This tutorial will start with a few basic "Hello, world" concepts and then move on to building a small About Us site using the above site as a model.

## Start

<span class="tutorialStep"></span> Open the
<a href="https://glitch.com/edit/#!/origami-framework-intro" target="_blank">tutorial project on Glitch</a>, a free web-based code editor.

<span class="tutorialStep"></span> Click the **Remix** button (or Remix to Edit) to create your own copy of the project to work on.

In the Glitch window, you will see a list of files on the left and the currently-open file (the project's ReadMe) in the center.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then **Open Preview Pane** to open a preview pane on the right.

The page in the preview pane says: Hello

## Define a virtual file

In Graph Origami, you build things from a combination of real files that are stored permanently and virtual files that are created on demand according to your instructions. These virtual "files" can be anything from a single number or text string to a typical document or media file.

As you build a collection of virtual files, it's helpful to be able to think about their structure as a _tree_. Colloquially speaking, a tree is the sort of boxes-with-arrows diagram you often see depicting the structure of organizations or websites.

When you build a website, you're building a virtual tree of resources that will be served to the site's visitors. You can think of that virtual tree as a virtual folder hierarchy. In Graph Origami, you'll directly build this tree in one of several ways. The easiest way to define a tree is in a file with a `.ori` extension.

<span class="tutorialStep"></span> In the `src` folder, open `site.ori`:

```
{
  public = {
    index.html = "Hello"
  }
}
```

This Origami file defines three things:

1. A virtual tree at the project's top level. Everything in between the outermost `{` on the first line and the `}` on the last line will become part of that top-level virtual tree.
1. A virtual tree called `public`.
1. A virtual file called `index.html`. Unlike most programming languages, names in Graph Origami can include periods so you can define file names with extensions. For now, the `index.html` file is defined as a simple text string.

This tutorial project is already configured to serve the contents of the virtual `public` tree. The name "public" itself isn't special — you could configure the project to serve the top-level tree, or some other tree in that file with a different name.

You can edit your site by editing this `site.ori` file.

<span class="tutorialStep"></span> **Try it:** Edit the text in the formula for `index.html` to give it more content, like: Hello, world!

After a moment, the Glitch preview window should refresh to show: Hello, world!

## View your site as a tree

Graph Origami lets you visualize and explore the tree of pages and other resources you are building for your website.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then click **Preview in a new window**. This will open your site in a new window (or tab).

<span class="tutorialStep"></span> In the browser address bar for that new window, add `/!@svg` to the end of the URL. The new URL should look like `https://your-project-name.glitch.me/!@svg`

You'll see your site visually represented as a tree with just one branch:

<figure>
{{ svg.js {
index.html = 'Hello, world!'
} }}
</figure>

The little circle represents the `public` tree, and the box represents the `index.html` file.

<span class="tutorialStep"></span> Leaving the tree diagram window open, switch back to the main Glitch window. You'll return to the tree diagram occasionally to visually confirm the structure of your evolving site.

## Formulas can call JavaScript

The formulas you write to define virtual files can call JavaScript. You can do a lot in Graph Origami without JavaScript, but easy access to JavaScript offers extensibility.

<span class="tutorialStep"></span> View the file `src/greet.js`.

```{{'js'}}
{{ framework.ori/greet.js }}
```

This defines a function called `greet` which, given a person's name, returns a greeting in HTML. The person's name will be set in bold. You can call this JavaScript function in a Graph Origami formula.

**Example:** The following code defines a virtual file called `message` whose contents will be: Hello, **Alice**!

```greet
message = greet.js("Alice")
```

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the formula for `index.html` to remove the quoted string, and instead call the function in `greet.js`. Pass the text `"world"` to the function, so that the page ends up with "world" in bold: Hello, **world**!

<reveal-solution>

```
{
  public = {
    index.html = greet.js("world")
  }
}
```

</reveal-solution>

When you call `greet.js` in a formula like this, Graph Origami searches the current [scope](/language/scope.html) for a file with that name. If it finds one, it dynamically imports that JavaScript module, and invokes the module's default export — in this case, a function that returns a greeting.

## Defining the team data

Data in Graph Origami projects can come from pretty much anything. This sample project stores the data for your team members in a YAML file. It could just as easily use JSON or another data file format.

<span class="tutorialStep"></span> Open the team data file in `src/teamData.yaml`:

```{{"yaml"}}
{{ framework.ori/teamData.yaml }}
```

This defines an array of person records in YAML but _this data is too boring!_

<span class="tutorialStep"></span> In `teamData.yaml`, replace the people's names with your name and the names of family or friends.

## Formulas can extract data

You can use slash-separated paths to extract information out of a tree like a file system folder or the hierarchical team data.

**Example:** The following defines a virtual file whose value will be the location of the third team member. (Array indexes start with zero.)

```
carolLocation = teamData.yaml/2/location
```

You can use this slash-separated path syntax anywhere you can refer to something.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your formula for `index.html` to pass the `name` of the first team member to `greet`. The preview should show something like: Hello, **Alice**!

<reveal-solution>

```
{
  public = {
    index.html = greet.js(teamData.yaml/0/name)
  }
}
```

</reveal-solution>

## Define a template that creates text

Instead of creating HTML directly in JavaScript, you can use one of many JavaScript-based template systems. For this tutorial, you'll use the [template system built into Graph Origami](templates.html).

<span class="tutorialStep"></span> **Try it:** Using the Glitch user interface, create a new file called `index.orit`: Next to the `src` folder on the left, click the `⋮` icon, then **Add File to Folder**, then type `index.orit`. This will become the template file for your index page.

An Origami template in a `.orit` file (with an extra `t` for "template") can produce text content. Here you'll use it to define HTML, so in `index.orit` you can enter regular HTML; later, you'll add have the template include some live data.

<span class="tutorialStep"></span> Inside the `index.orit` template, enter the following:

<clipboard-copy>

```html
<h1>About Us</h1>
```

</clipboard-copy>

Your `.ori` file can then invoke the template as a function, just like you invoked `greet.js`.

**Example:** If you have a template `product.orit`, you can invoke it with:

```
product.html = product.orit()
```

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update your `index.html` formula to remove the call to `greet.js`, and instead invoke your `index.orit` template as a function.

<reveal-solution>

```
{
  public = {
    index.html = index.orit()
  }
}
```

</reveal-solution>

Now when you view the site's main page, the `index.orit` template will be invoked to obtain the HTML. The preview shows the heading: **About Us**

## Add an expression to a template

Graph Origami templates, like many template systems, let you insert data into boilerplate text using placeholders marked with double curly braces `\{\{` `}}`.

Inside the curly braces, you can do the same things you can in formulas in a `.ori` file: call JavaScript functions, reference real and virtual files, or extract specific data with slash-separated paths.

**Example:** A template can call the JavaScript function in `doStuff.js` with:

```html
<p>\{\{ doStuff.js() }}</p>
```

<span class="tutorialStep"></span> **Try it:** At the end of `index.orit` (after the heading), add a `\{\{ }}` placeholder. Inside the placeholder, call the JavaScript function `greet.js` and pass it the name "Bob".

<reveal-solution>

```html
<h1>About Us</h1>
\{\{ greet.js("Bob") }}
```

</reveal-solution>

The preview now includes a paragraph: Hello, **Bob**!

## Pass data to a template

When you call a Graph Origami template as a function like `index.orit()`, you can put things inside those parentheses to pass data to the template. Inside that template, you can refer to the data passed to it using an underscore (`_`).

<span class="tutorialStep"></span> **Try it:** Update `site.ori` to pass `teamData.yaml/0/name` to the `index.orit` template.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml/0/name)
  }
}
```

</reveal-solution>

<span class="tutorialStep"></span> Next, update the `index.orit` template to make use of the name you're passing to it. In the call to `greet.js`, replace the hard-coded name "Bob" with an underscore (`_`).

<reveal-solution>

```html
<h1>About Us</h1>
<p>\{\{ greet.js(_) }}</p>
```

</reveal-solution>

The preview updates to use the name you passed, like Hello, **Alice**!

## Creating a virtual folder with a map

You're almost ready to create the site — just one more fundamental concept to cover.

There are several places in this web site where you want to take one set of things and transform it to create a new set of things:

- For each team member in teamData.yaml, you want to create a tile on the index page.
- For each team member in teamData.yaml, you also want to create a page in a `team` area. For example, Alice should have a page at `team/Alice.html`.
- For each image in the `images` folder like `van.jpg`, you want to create a corresponding thumbnail image like `thumbnails/van.jpg`.

Such situations are very common in websites and other development tasks, where you say: "For each [thing] that exists, we'll need to create a [different thing]."

Whenever you have such a situation in Graph Origami, you can efficiently address it with a _map_.

A map is a many-to-many transformation: you give it a set of things (like a real folder, a virtual folder, the hierarchical tree of data in teamData.yaml, etc.) and a function. The function is a one-to-one transformation: it transforms a single existing thing into a single new thing. A map scales up a one-to-one transformation to produce a many-to-many transformation.

Earlier, you invoked the `greet` function to create a single file. That function performs a trivial one-to-one transformation of a text string (like "Our Amazing Team") to produce a new text string ("Hello, Our Amazing Team!").

But let's say you want to greet a bunch of people by name. You could create individual files for each of them, but that would be repetitive and error-prone.

Instead, you can use a built-in function called [@map/values](/language/@map.html#values). All built-in functions start with an `@` sign. The built-in `@map/values` function can apply the `greet` function to all of the people at once.

<span class="tutorialStep"></span> First, add the following formula for `team` to `site.ori`:

```
{
  public = {
    index.html = index.orit(teamData.yaml/0/name)
    team = @map/values(teamData.yaml, =_/name)
  }
}
```

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

The keys in this area are integers which are the indices of the array in teamData.yaml; the values are the people's names. The small expression `=_/name` in the `team` formula is an unnamed function that `@map/values` will apply to each person in `teamData.yaml`. The underscore (`_`) represents the person being operated on. The `/name` path will get the `name` field of that person.

In this way, `@map/values` performs a many-to-many transformation:

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
  <figcaption>(Partial) tree of teamData.yaml</figcaption>
  <figcaption>Mapped tree of names</figcaption>
</div>

The formula you give to `@map/values` can be arbitrarily complex.

<span class="tutorialStep"></span> **Try it**: In the Glitch editor window, in `site.ori`, update the expression `=_/name` so that, instead of just returning a `name`, it calls the `greet` function and passes in that person's name.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml/0/name)
    team = @map/values(teamData.yaml, =greet.js(_/name))
  }
}
```

</reveal-solution>

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

A map in Graph Origami is an efficient way to create entire areas of a site. We'll also use it to create a set of people tiles for the index page.

## Pull in more resources

The `src` folder has two real subfolders you'll want to include in your `public` tree:

- `assets` contains a stylesheet and icon
- `images` contains sample images you can use to represent your team members

You can pull a folder or file into your tree by writing its name on a line by itself.

**Example:** To include a `styles` folder in the `public` tree you would write

```
{
  public = {
    styles
  }
}
```

<span class="tutorialStep"></span> **Try it:** In `site.ori`, update the formula for `public` to pull in the `assets` and `images` folders.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml/0/name)
    team = @map/values(teamData.yaml, =greet.js(_/name))
    assets
    images
  }
}
```

</reveal-solution>

<span class="tutorialStep"></span> Switch to tree diagram window and refresh it to see the updated site structure.

Your site now includes both real and virtual files. You can continue to grow this tree into your final About Us site.

## Create a virtual folder of thumbnails

You've now seen all the major concepts necessary to build the actual About Us site. Let's start by using what you've seen of the `@map` function to create small thumbnail images for each team member.

<span class="tutorialStep"></span> View the images in the `src/images` folder, which contains a few full-size images. Each person in `teamData.yaml` identifies one of these sample images as a profile photo.

For each full-size image, you will want to produce a corresponding thumbnail image that will appear on the index page. Instead of using an image-editing app to create a real folder of thumbnail images, you can create a virtual folder of thumbnail images on demand using a map.

In this case, the file `src/thumbnail.js` contains a small JavaScript function which, given the binary data for an image, invokes an image-editing library to generate a new image at a smaller size. This `thumbnail` function is a one-to-one transformation. You're going to use a map to apply that `thumbnail` function as a many-to-many transformation.

One question: In the `@map` formula above, you passed `name` to `greet` — but what should you pass to the `thumbnail` function? You want to transform an entire image, not some specific field that belongs to it.

**Example:** To pass an entire value being mapped, you can use an underscore on its own: `_`

```
mapped = @map/values(tree, =someFunction.js(_))
```

<span class="tutorialStep"></span> **Try it:** Switch to the Glitch editor window. In `site.ori`, update the `public` folder to define a new virtual subfolder called `thumbnails`. Using the `team` formula as a model, define `thumbnails` with a formula that uses the `@map/values` function. Use the `images` folder as the set of things to map and the `thumbnail.js` function as the one-to-one transformation. Pass an underscore (`_`) to the `thumbnail.js` function to give it the full image data.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml/0/name)
    team = @map/values(teamData.yaml, =greet.js(_/name))
    assets
    images
    thumbnails = @map/values(images, =thumbnail.js(_))
  }
}
```

</reveal-solution>

Because Graph Origami treats real folders and virtual folders the same, you can browse your virtual folder of thumbnails.

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's updated structure.

The virtual `thumbnails` folder contains a set of thumbnail images _that do not exist_ in any persistent form. They are potential images that are only created when you ask for them.

<span class="tutorialStep"></span> In the tree diagram, click a box for a real image like `images/van.jpg` to preview it.

<span class="tutorialStep"></span> Navigate back and click a box for the corresponding thumbnail image like `thumbnails/van.jpg` to see the same image at a smaller size. This image is produced on demand.

<span class="tutorialStep"></span> Navigate back to the tree diagram.

## Incorporate input into a template

Let's now flesh out the index page with real content. Your index page will need to display a tile for each member that links to their individual page.

At the moment, the `site.ori` file is passing a single person's name to `index.orit`:

```
    index.html = index.orit(teamData.yaml/0/name)
```

We're going to change `index.orit` so that, instead of just accepting a single person's name, it accepts the entire hierarchical tree of team data.

<span class="tutorialStep"></span> **Try it:** Switch the Glitch editor window. Update the formula for `index.html` so that the entire `teamData.yaml` file is passed to the template.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml)
    team = @map/values(teamData.yaml, =greet.js(_/name))
    assets
    images
    thumbnails = @map/values(images, =thumbnail.js(_))
  }
}
```

</reveal-solution>

<span class="tutorialStep"></span> Next, replace the contents of the placeholder in the `index.orit` template so that, instead of calling `greet.js`, the template incorporates its entire input (`_`) into the result.

<reveal-solution>

```{{"html"}}
<h1>About Us</h1>
\{\{ _ }}
```

</reveal-solution>

The preview updates to show the entire contents of `teamData.yaml`. That's more data than you want to show; the next step will let you show just the portion of that data that's meaningful on an index page.

## Create a map inside a template

Inside a template's `\{\{` `}}` placeholders you can directly map a tree of data to text like HTML.

In `site.ori`, you've already created a map of `images` to `thumbnails`, and a map of `teamData.yaml` to a set of `team` greetings. You're now going to do the same kind of map inside the `index.ori` template. The map will translate the people in the incoming team data into a corresponding set of HTML text fragments for each person.

To do this, you will use a _nested_ template: a small template inside of `index.orit`.

**Example:** If you wanted to display paragraphs with the team member locations, you could write the following map of the input data to a nested template surrounded by backtick (`) characters:

```{{"html"}}
\{\{ @map/values(_, =`
  <p>\{\{ _/location }}</p>
`) }}

```

The two underscore (`_`) characters here both refer to inputs — but to different inputs. The first underscore represents the overall input to the template, which in this case is the entire `teamData.yaml` data file. The second underscore refers to the input to the nested template: an individual team member.

<span class="tutorialStep"></span> Update `index.orit` to replace the `_` in the placeholder with a map to a nested template like the one above. Display each person's name as a bullet item by surrounding it with `<li>` and `</li>` tags.

<reveal-solution>

```{{"html"}}
<h1>About Us</hi>
\{\{ @map/values(_, =`
  <li>\{\{ _/name }}</li>
`) }}

```

</reveal-solution>

The preview now shows a bulleted list of names.

## A nested template can span multiple lines

The text inside a backtick-delimited template can span multiple lines, so it can be as complex as you want.

<span class="tutorialStep"></span> To fill out the index page template, replace the contents of `index.orit` with:

<clipboard-copy>

```html
{{ @js/String framework.ori/index.orit }}
```

</clipboard-copy>

Functionally speaking, this is no more complex than the earlier template; it just has more elements.

The index page preview now shows a tile for each team member that includes their name and location. It also shows a thumbnail image pulled from the virtual `thumbnails` folder you created earlier.

## Index the team data by person name

The last phase of building your site involves fleshing out the pages in the `team` area for each person, so that `/team/Alice.html` shows the data for Alice along with a full-size image.

To lay the groundwork for that, you're first going to create an intermediate virtual tree with the same data as `teamData.yaml`, but where the files are named after the people on the team.

As you've seen, the top-level "file names" in `teamData.yaml` are integers, like `0` for the first person. So at the moment the `team` area pages are identified with integers too. But in your final website tree, you'd like the names of the pages in the `team` area to include the person's name, like `Alice.html`.

For this, Graph Origami provides a [@map/keys](/language/@map.html#keys) function that works like `@map/values`, but instead of mapping the values (the file contents), it maps the keys (the file names).

**Example:**

If you had an array of data objects about countries, you could index them by a country code abbreviation like this:

```
{
  countries = [
    { name: "Australia", abbreviation: "AU" }
    { name: "Brazil", abbreviation: "BR" }
    { name: "China", abbreviation: "CN" }
  ]

  countriesByAbbreviation = @map/keys(countries, =_/abbreviation)
}
```

This operation looks like:

<div class="sideBySide">
  <figure>
    {{ svg.js countries }}
  </figure>
  <figure>
    {{ svg.js @tree/map({ source: countries, keyMap: =_/abbreviation }) }}
  </figure>
  <figcaption>Countries with integer keys</figcaption>
  <figcaption>Countries with abbreviation keys</figcaption>
</div>

In the original `countries` definition, you could get the name of Australia with `countries/0/name`. With the mapped keys, you can get the name of Australia with `countriesByAbbreviation/AU/name`.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, define a new, top-level virtual tree called `teamByName` that maps the keys of `teamData.yaml` to the team member's names. Since this `teamByName` tree is only needed for internal use, it can go _outside_ the `public` definition and within the file's outermost pair of `\{ }` curly braces.

<span class="tutorialStep"></span> Then update the `team` formula to reference `teamByName` instead of `teamData.yaml`.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml)
    team = @map/values(teamByName, =greet.js(_/name))
    assets
    images
    thumbnails = @map/values(images, =thumbnail.js(_))
  }

  teamByName = @map/keys(teamData.yaml, =_/name)
}
```

</reveal-solution>

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to confirm that the `team` area is now indexed by names instead of integers:

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
  <figcaption>Before: indexed by integer</figcaption>
  <figcaption>After: indexed by name</figcaption>
</div>

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Virtual trees created with functions like `map()` will often change the type of the data, so as a convenience those functions allow you to add, change, or remove extensions.

The `map()` function supports this via an optional `extension` parameter, which takes a string describing how an extension should change.

**Example:** The following are two examples of the `extension` parameter. (Note that the `.ori` format allows comments that start with a `#` character.)

```
{
  # Add a .txt extension to the mapped file names
  textFiles = @map/values(data, fn, { extension: "->txt" })

  # Convert markdown files to HTML, replacing the .md extension with .html
  htmlFiles = @map/values(mdFiles, mdHtml, { extension: "md->html" })
}
```

<span class="tutorialStep"></span> Update the `team` formula and add an `extension` parameter that adds an `html` extension to the mapped file names.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml)
    team = @map/values(teamByName, =greet.js(_/name), { extension: "->html" })
    assets
    images
    thumbnails = @map/values(images, =thumbnail.js(_))
  }

  teamByName = @map/keys(teamData.yaml, =_/name)
}
```

</reveal-solution>

## Create a person template

The last step in building your site is creating a page template for the people in the `team` area.

<span class="tutorialStep"></span> **Try it:** In the src folder, create a new template called `person.orit`. Inside the template, create a `<h1>` heading with a `\{\{` `}}` placeholder. Inside the placeholder, enter the expression `_/name`.

<reveal-solution>

```html
<h1>\{\{ _/name }}</h1>
```

</reveal-solution>

<span class="tutorialStep"></span> Edit the `team` formula in `site.ori` so that, instead of passing a name to `greet.js`, it passes a person to the `person.orit` template. As with the `thumbnails` map earlier, you'll want to use an underscore `_` to pass the entire team member object as an argument to the `person.orit` template.

<reveal-solution>

```
{
  public = {
    index.html = index.orit(teamData.yaml)
    team = @map/values(teamByName, =person.orit(_), { extension: "->html" })
    assets
    images
    thumbnails = @map/values(images, =thumbnail.js(_))
  }

  teamByName = @map/keys(teamData.yaml, =_/name)
}
```

</reveal-solution>

<span class="tutorialStep"></span> Refresh the tree diagram window to see that the pages in the `team` area now use your `person.orit` template.

<figure>
  {{ svg.js {
    Alice.html: "<h1>Alice</h1>"
    Bob.html: "<h1>Bob</h1>"
    Carol.html: "<h1>Carol</h1>"
  } }}
</figure>

## Fill out the person template

The only thing left to do is complete the `person.orit` template.

<span class="tutorialStep"></span> Replace the contents of `person.orit` with:

<clipboard-copy>

```{{"html"}}
{{ @js/String framework.ori/person.orit }}
```

</clipboard-copy>

<span class="tutorialStep"></span> In the site preview, you can now click a person tile on the index page to navigate to the page for that person.

## View the tree of the completed site

<span class="tutorialStep"></span> Switch to the tree diagram window and refresh it to view your site's complete structure. You can click on the circles or boxes in that window to explore what you've made.

<figure>
{{ svg.js siteComplete }}
</figure>

Stepping back, consider that you've created this entire site with a few resources, a couple of templates, and a rather concise `site.ori`:

```
{
  public = {
    index.html = index.orit(teamData.yaml)
    team = @map/values(teamByName, =person.orit(_), { extension: "->html" })
    assets
    images
    thumbnails = @map/values(images, =thumbnail.js(_))
  }

  teamByName = @map/keys(teamData.yaml, =_/name)
}
```

From a functional standpoint, you've achieved your goal. The site is now complete.

## Optional: Comments

Each of the lines in `site.ori` defines some important area of the site. In a real project, it can be worth adding comments to remind you what each line does, like:

<clipboard-copy>

```
{
  # The public tree is what users can browse.
  public = {
    # Generate the index page from the index.orit template.
    index.html = index.orit(teamData.yaml)

    # Generate a page in the team area for each team member.
    team = @map/values(teamByName, =person.orit(_), { extension: "->html" })

    # These are static resources
    assets
    images

    # Generate the thumbnails by reducing the full-size images.
    thumbnails = @map/values(images, =thumbnail.js(_))
  }

  # Index the team members by name.
  teamByName = @map/keys(teamData.yaml, =_/name)
}
```

</clipboard-copy>

## Building static files

You have been viewing your About Us site using a small Graph Origami server which is running in the background. But since this particular site is fundamentally static in nature, Glitch can automatically render all the pages and other necessary resources as static files. This lets Glitch serve the site faster and more cheaply; static sites on Glitch are free.

Glitch will build the static files automatically, but you can manually trigger the build process to see it in action.

<span class="tutorialStep"></span> In the main Glitch editor window, click the **Terminal** button in the toolbar at the bottom of the Glitch window.

<span class="tutorialStep"></span> In the Glitch terminal, type the following command:

```console
$ npm run build
```

This invokes a Graph Origami tool called `ori`, and instructs it to copy the contents of the entire virtual `public` tree to a real file system folder called `build`. This turns the virtual files into real files.

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

As long as you're working on your site, the Graph Origami server will be used to serve the content. At some point after you close the Glitch window, Glitch will rebuild the static files and stop the live server. From that point on, Glitch will serve the static files directly. After that point, the files will load much more quickly.

## Learn more

This concludes the Graph Origami framework tutorial. You can continue exploring related aspects of Graph Origami:

- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The [Origami expression language](/language) you've been using to write formulas and template expressions has additional features not covered in this tutorial.
- The Graph Origami framework is built on an [async-tree](/async-tree) library that can let you do everything that you did here with formulas using JavaScript instead. This can be useful in more complex projects, or if you prefer more direct control.
- You can implement sites like this About Us site completely from scratch using the [async tree pattern](/pattern) and no library or framework at all. That approach may appeal to people who want to work as close to the metal as possible, and that pattern is also a useful reference if you want to understand how the Graph Origami framework works under the hood.

&nbsp;

Back to [Framework](/framework/)
