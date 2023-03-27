---
title: Create a simple About Us site
numberHeadings: true
fakeImages:
  kingfisher.jpg: "[binary data]"
  van.jpg: "[binary data]"
  venice.jpg: "[binary data]"
countries:
  - name: Australia
    abbreviation: AU
  - name: Brazil
    abbreviation: BR
  - name: China
    abbreviation: CN
countriesByAbbreviation: !ori (@map/keys(countries, =abbreviation))
teamByName: !ori (@map/keys(framework-intro/src/teamData.yaml, =name))
siteWithTitle1:
  index.html: !ori framework-intro/src/greet(title)
  title: Our Amazing Team
siteWithTitle2:
  index.html: !ori framework-intro/src/greet('Our Amazing Team')
siteComplete:
  index.html: <h1>Our Amazing Team</h1>
  team:
    Alice.html: <h1>Alice</h1>
    Bob.html: <h1>Bob</h1>
    Carol.html: <h1>Carol</h1>
  assets: !ori framework-intro/src/assets
  images: !ori fakeImages
  thumbnails: !ori fakeImages
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

As you build a collection of virtual folders and files, it's helpful to be able to think about their structure as a _graph_. Colloquially speaking, a graph is the sort of boxes-with-arrows diagram you often see depicting the structure of organizations, processes, and websites.

Graph Origami lets you define a graph in several ways, and one way is to write formulas in a file with a `.graph` extension.

<span class="tutorialStep"></span> In the `src` folder, open `site.graph`:

```
public = {
  index.html = "Hello"
}
```

This graph file has formulas that define two things:

1. A virtual folder called `public`. The formulas nested inside the `{` `}` curly braces define virtual files in that folder.
2. A virtual file called `index.html`. Unlike most programming languages, names in Graph Origami can include periods so you can define file names with extensions. For now, the `index.html` file is defined as a simple text string.

A `.graph` file can define more than one top-level virtual folder or file. This tutorial project is configured to serve the contents of the virtual `public` folder. The name "public" itself isn't special — you could configure the project to serve a different real or virtual folder.

You can edit your site by editing this `site.graph` file.

<span class="tutorialStep"></span> **Try it:** Edit the text in the formula for `index.html` to give it more content, like: Hello, world!

After a moment, the Glitch preview window should refresh to show: Hello, world!

## View your site as a graph

Graph Origami lets you visualize and explore the graph you are building.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then click **Preview in a new window**. This will open your site in a new window (or tab).

<span class="tutorialStep"></span> In the browser address bar for that new window, add `/!svg` to the end of the URL. The new URL should look like `https://your-project-name.glitch.me/!svg`

You'll see your site visually represented as a graph:

<figure>
{{ @svg {
index.html = 'Hello, world!'
} }}
</figure>

The little circle represents the `public` folder, and the box represents the `index.html` file.

<span class="tutorialStep"></span> Leaving the graph diagram window open, switch back to the main Glitch window. You'll return to the graph diagram occasionally to visually confirm the structure of your evolving site.

## Formulas can call JavaScript

The formulas you write to define virtual files can call JavaScript. You can do a lot in Graph Origami without JavaScript, but easy access to JavaScript offers extensibility.

<span class="tutorialStep"></span> View the file `src/greet.js`.

```{{'js'}}
{{ framework-intro/src/greet.js }}
```

This defines a function called `greet` which, given a person's name, returns a greeting in HTML. The person's name will be set in bold. You can call this JavaScript function in a Graph Origami formula.

**Example:** The following code defines a virtual file called `message` whose contents will be: Hello, **Alice**!

```greet
message = greet("Alice")
```

<span class="tutorialStep"></span> **Try it:** In `site.graph`, update the formula for `index.html` to remove the quoted string, and instead call the `greet` function. Pass the text `"world"` to `greet`, so that the page ends up with "world" in bold: Hello, **world**!

<reveal-solution>

```
public = {
  index.html = greet("world")
}
```

</reveal-solution>

When you call `greet` in a formula like this, Graph Origami searches the current [scope](/language/scope.html) for a real or virtual file called `greet`. If it doesn't find one, it will also try searching for `greet.js`. Graph Origami defines a convention that the export(s) of a JavaScript file `greet.js` can be referenced as `greet`, so you can invoke a JavaScript function by using its file name.

## Defining the team data

Data in Graph Origami projects can come from pretty much anything. This sample project stores the data for your team members in a YAML file. It could just as easily use JSON or another data file format.

<span class="tutorialStep"></span> Open the team data file in `src/teamData.yaml`:

```{{"yaml"}}
{{ framework-intro/src/teamData.yaml }}
```

This defines an array of person records in YAML but _this data is too boring!_

<span class="tutorialStep"></span> In `teamData.yaml`, replace the people's names with your name and the names of family or friends.

## Formulas can extract data

You can use slash-separated paths to extract information out of a folder or a data file like the team data.

**Example:** The following defines a virtual file whose value will be the location of the third team member. (Array indexes start with zero.)

```
carolLocation = teamData.yaml/2/location
```

You can use this slash-separated path syntax anywhere you can refer to something.

<span class="tutorialStep"></span> **Try it:** In `site.graph`, update your formula for `index.html` to pass the `name` of the first team member to `greet`. The preview should show something like: Hello, **Alice**!

<reveal-solution>

```
public = {
  index.html = greet(teamData.yaml/0/name)
}
```

</reveal-solution>

## Formulas can reference real or virtual files

You can pass a real or virtual file to a function by name.

**Example:** The following defines a virtual file called `doubled`, whose content will be the `word` file content repeated twice.

```
word = "beep"
doubled = @repeat(2, word)
```

This calls a built-in `@repeat` function. (All built-in functions start with an `@` sign.) The value of `doubled` will be "beepbeep".

The order of the above definitions doesn't matter; `word` could just as well come after `doubled`.

<span class="tutorialStep"></span> **Try it:** In `site.graph`, define a new virtual file called `title` (no extension is required) to hold the title of your site (say, "Our Amazing Team").

<span class="tutorialStep"></span> Then update the formula for `index.html` to pass the `title` to `greet`.

<reveal-solution>

```
public = {
  index.html = greet(title)
  title = "Our Amazing Team"
}
```

</reveal-solution>

Since the order doesn't matter, you could also define `title` before `index.html`.

The preview now shows: Hello, **Our Amazing Team**!

## Controlling what is public

This project is configured to let a user browse the virtual `public` folder.

<span class="tutorialStep"></span> Switch to graph diagram window and refresh it to see its current structure.

<figure>
{{ @svg siteWithTitle1 }}
</figure>

The virtual `title` file is used by the formula for `index.html`. But you don't need make the `title` file itself part of your final site — it's only needed internally.

<span class="tutorialStep"></span> **Try it:** Move the line for `title` to the top level of `site.graph` so that it's outside the `{` `}` curly braces that define the `public` folder.

<reveal-solution>

```
public = {
  index.html = greet(title)
}

title = "Our Amazing Team"
```

</reveal-solution>

By putting `title` at the top level, the formulas inside `public` can reference it, but a user won't be able to browse to a URL like `/title` to see the title.

<span class="tutorialStep"></span> Refresh the graph diagram window to confirm that the public site no longer includes `title`:

<figure>
{{ @svg siteWithTitle2 }}
</figure>

<span class="tutorialStep"></span> Switch back to the Glitch window.

## Define a template that creates text

Instead of creating HTML directly in JavaScript, you can use one of many JavaScript-based template systems. For this tutorial, you'll use the template system built into Graph Origami.

**Example:** Graph Origami templates, like many template systems, let you insert data into boilerplate text using placeholders marked with double curly braces `\{\{` `}}`. If there's a piece of data called `name`, you could insert it into a paragraph like:

```html
<p>\{\{ name }}</p>
```

Inside the curly braces, you can do the same things you can in formulas: call JavaScript functions, reference real and virtual files, or extract specific data with slash-separated paths.

<span class="tutorialStep"></span> **Try it:** Using the Glitch user interface, create a new file called `index.ori`: Next to the `src` folder on the left, click the `⋮` icon, then **Add File to Folder**, then type `index.ori`. This will become the template file for your index page.

A `.ori` template file can define any kind of text content. Here you'll use it to define HTML, so in `index.ori` you can enter regular HTML interspersed with curly brace placeholders.

<span class="tutorialStep"></span> Inside the template, enter opening and closing `h1` tags to create a heading. Inside the heading tags, put a `\{\{` `}}` placeholder that displays your site's `title`.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
```

</reveal-solution>

Next you can tell Graph Origami when to use this template.

## Invoke a template as a function

You invoke a Graph Origami template as a function just like you invoked `greet`.

**Example:** If you have a template `product.ori`, you can invoke it with:

```
product.html = product.ori()
```

When invoking a JavaScript function, the `.js` extension is optional — but you _do_ need to include the `.ori` extension to invoke a template as a function.

<span class="tutorialStep"></span> **Try it:** In `site.graph`, update your `index.html` formula to invoke your `index.ori` template as a function.

<reveal-solution>

```
public = {
  index.html = index.ori()
}

title = "Our Amazing Team"
```

</reveal-solution>

Now when you view the site's main page, the `index.ori` template will be invoked to obtain the HTML. The preview shows a header: **Our Amazing Team**

## Creating a virtual folder with a map

You're almost ready to create the site — just one more fundamental concept to cover.

There are several places in this web site where you want to take one set of things and transform it to create a new set of things:

- For each team member in teamData.yaml, you want to create a tile on the index page.
- For each team member in teamData.yaml, you also want to create a page in a `team` area. For example, Alice should have a page at `team/Alice.html`.
- For each image in the `images` folder like `van.jpg`, you want to create a corresponding thumbnail image like `thumbnails/van.jpg`.

Such situations are very common in websites and other development tasks, where you say: "For each [thing] that exists, we'll need to create a [different thing]."

Whenever you have such a situation in Graph Origami, you can efficiently address it with a _map_.

A map is a many-to-many transformation: you give it a set of things (like a real folder, a virtual folder, the array of people in teamData.yaml, etc.) and a function. The function is a one-to-one transformation: it transforms a single existing thing into a single new thing. A map scales up a one-to-one transformation to produce a many-to-many transformation.

Earlier, you invoked the `greet` function to create a single file. That function performs a trivial one-to-one transformation of a text string (like "Our Amazing Team") to produce a new text string ("Hello, Our Amazing Team!").

But let's say you want to greet a bunch of people by name. You could create individual files for each of them, but that would be repetitive and error-prone.

Instead, you can use a `map` to apply the `greet` function to all of the people at once.

<span class="tutorialStep"></span> First, add the following formula for `team` to `site.graph`:

```
public = {
  index.html = index.ori()
  team = @map/values(teamData.yaml, =name)
}

title = "Our Amazing Team"
```

<span class="tutorialStep"></span> In the graph diagram window, refresh the page to confirm that the graph now includes an `team` area with the names from `teamData.yaml`.

<figure>
  {{ @svg {
    index.html = "<h1>Our Amazing Team</h1>"
    team = [
      "Alice"
      "Bob"
      "Carol"
    ]
  } }}
</figure>

The keys in this area are integers which are the indices of the array in teamData.yaml; the values are the people's names. The small expression `=name` in the `team` formula is an unnamed function that `@map` will apply to each person in `teamData.yaml`. In this case, the unnamed function returns a person's name.

In this way, `@map` performs a many-to-many transformation:

<div class="sideBySide">
  <figure>
    {{ @svg [
      { name: "Alice", image: "kingfisher.jpg" }
      { name: "Bob", image: "beach.jpg" }
      { name: "Carol", image: "venice.jpg" }
    ] }}
  </figure>
  <figure>
    {{ @svg [
      "Alice"
      "Bob"
      "Carol"
    ] }}
  </figure>
  <figcaption>(Partial) graph of teamData.yaml</figcaption>
  <figcaption>Mapped graph of names</figcaption>
</div>

The formula you give to `@map` can be arbitrarily complex.

<span class="tutorialStep"></span> **Try it**: In the Glitch editor window, in `site.graph`, update the expression `=name` so that, instead of just returning a `name`, it calls the `greet` function and passes in that person's name.

<reveal-solution>

```
public = {
  index.html = index.ori()
  team = @map/values(teamData.yaml, =greet(name))
}

title = "Our Amazing Team"
```

</reveal-solution>

<span class="tutorialStep"></span> In the graph diagram window, refresh the page to see the updated `team` area.

<figure>
  {{ @svg {
    index.html = "<h1>Our Amazing Team</h1>"
    team = [
      "<p>Hello, <strong>Alice</strong>!</p>"
      "<p>Hello, <strong>Bob</strong>!</p>"
      "<p>Hello, <strong>Carol</strong>!</p>"
    ]
  } }}
</figure>

A map in Graph Origami is an efficient way to create entire areas of a site. We'll also use it to create a set of people tiles for the index page.

## Pull in more resources

The `src` folder has two real subfolders you'll want to include in your `public` graph:

- `assets` contains a stylesheet and icon
- `images` contains sample images you can use to represent your team members

You can pull a folder or file into your graph by writing its name on a line by itself.

**Example:** To include a `styles` folder in the `public` graph you would write

```
public = {
  styles
}
```

<span class="tutorialStep"></span> **Try it:** In `site.graph`, update the formula for `public` to pull in the `assets` and `images` folders.

<reveal-solution>

```
public = {
  index.html = index.ori()
  team = @map/values(teamData.yaml, =greet(name))
  assets
  images
}

title = "Our Amazing Team"
```

</reveal-solution>

<span class="tutorialStep"></span> Switch to graph diagram window and refresh it to see the updated site structure.

Your site now includes both real and virtual files. You can continue to grow this into your final About Us site.

## Create a virtual folder of thumbnails

You've now seen all the major concepts necessary to build the actual About Us site. Let's start by using what you've seen of the `@map` function to create small thumbnail images for each team member.

<span class="tutorialStep"></span> View the images in the `src/images` folder, which contains a few full-size images. Each person in `teamData.yaml` identifies one of these sample images as a profile photo.

For each full-size image, you will want to produce a corresponding thumbnail image that will appear on the index page. Instead of using an image-editing app to create a real folder of thumbnail images, you can create a virtual folder of thumbnail images on demand using a map.

In this case, the file `src/thumbnail.js` contains a small JavaScript function which, given the binary data for an image, invokes an image-editing library to generate a new image at a smaller size. This `thumbnail()` function is a one-to-one transformation. You're going to use a map to apply that `thumbnail()` function as a many-to-many transformation.

One question: In the `@map` formula above, you passed `name` to `greet` — but what should you pass to the `thumbnail()` function? You want to transform an entire image, not some specific field that belongs to it. The solution requires a new bit of syntax to pass an entire value being mapped to a function.

**Example:** To pass an entire value being mapped, you can use the built-in `@value` variable:

```
mapped = @map/values(graph, =function(@value))
```

<span class="tutorialStep"></span> **Try it:** Switch to the Glitch editor window. In `site.graph`, update the `public` folder to define a new virtual subfolder called `thumbnails`. Using the `team` formula as a model, define `thumbnails` with a formula that uses the `map()` function. Use the `images` folder as the set of things to map and the `thumbnail` function as the one-to-one transformation. Pass `@value` to the `thumbnail` function to give it the full image data.

<reveal-solution>

```
public = {
  index.html = index.ori()
  team = @map/values(teamData.yaml, =greet(name))
  assets
  images
  thumbnails = @map/values(images, =thumbnail(@value))
}

title = "Our Amazing Team"
```

</reveal-solution>

Because Graph Origami treats real folders and virtual folders the same, you can browse your virtual folder of thumbnails.

<span class="tutorialStep"></span> Switch to the graph diagram window and refresh it to view your site's updated structure.

The virtual `thumbnails` folder contains a set of thumbnail images _that do not exist_ in any persistent form. They are potential images that are only created when you ask for them.

<span class="tutorialStep"></span> In the graph diagram, click a box for a real image like `images/van.jpg` to preview it.

<span class="tutorialStep"></span> Navigate back and click a box for the corresponding thumbnail image like `thumbnails/van.jpg` to see the same image at a smaller size. This image is produced on demand.

<span class="tutorialStep"></span> Navigate back to the graph diagram.

## Incorporate a virtual folder into a template

Let's now flesh out the index page with real content. Your index page will need to display a tile for each member that links to their individual page. To do that, let's explore an interesting feature of Origami templates.

If you have a virtual folder that contains text, you can reference that folder inside a template. Graph Origami will take all the text values in that virtual folder and inline them into the template's output.

**Example:** If you had a folder called `fragments` that contained HTML fragments, you could inline them all into a template with:

```html
\{\{ fragments }}
```

<span class="tutorialStep"></span> **Try it:** Switch the Glitch editor window. At the bottom of the `index.ori` template, add a `\{\{` `}}` placeholder to incorporate the virtual `team` folder into the template.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
\{\{ team }}
```

</reveal-solution>

Now the preview shows the greetings to your team members.

## Create a map inside a template

You can do anything inside a template's `{{` `}}` placeholders that you can do in a `.graph` formula. This means that you can do things like map data directly inside a template.

<span class="tutorialStep"></span> **Try it:** From the `team` formula in `site.graph`, copy the right side of the formula (the `map` and everything after the `=` sign) and paste that into `index.ori` in place of the `team` reference.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
\{\{ @map/values(teamData.yaml, =greet(name)) }}
```

</reveal-solution>

This produces the same result as before, but without relying on a separate definition of `team` elsewhere.

## Use a nested template

Earlier you updated the formula for `index.html` to replace an invocation of `greet()` with the `index.ori` template. In `index.ori`, you're now invoking `greet()` inside of a `{{` `}}` placeholder. You can replace _that_ invocation too — with a nested template.

**Example:** If you want to display paragraphs with the team member locations, you could write:

```{{"html"}}
\{\{ @map/values(teamData.yaml, =`<p>\{\{ location }}</p>`) }}
```

The second argument to `@map` here is a smaller template nested inside the larger template. The nested template is surrounded by backtick (`) characters.

<span class="tutorialStep"></span> Update `index.ori` to remove the call to `greet()`. Instead, display each name as a bullet item — that is, surround the each name with a `<li>` and `</li>` tags. Since you'll be defining a nested template, you'll need to use backtick (`) characters.

<reveal-solution>

```{{"html"}}
<h1>\{\{ title }}</h1>
\{\{ @map/values(teamData.yaml, =`<li>\{\{ name }}</li>`) }}
```

</reveal-solution>

The preview now shows a bulleted list of names.

## A nested template can span multiple lines

The text inside a backtick-delimited template can span multiple lines, so it can be as complex as you want.

<span class="tutorialStep"></span> To fill out the index page template, replace the contents of `index.ori` with:

<clipboard-copy>

```html
{{ @js/String framework-intro/src/index.ori }}
```

</clipboard-copy>

Functionally speaking, this is no more complex than the earlier template; it just has more elements.

The index page preview now shows a tile for each team member that includes their name and location. It also shows a thumbnail image pulled from the virtual `thumbnails` folder you created earlier.

## Index the team data by person name

The last phase of building your site involves fleshing out the pages in the `team` area for each person, so that `/team/Alice.html` shows the data for Alice along with a full-size image.

To lay the groundwork for that, you're first going to create an intermediate folder with the same data as `teamData.yaml`, but where the files are named after the people on the team.

As you've seen, the top-level "file names" in `teamData.yaml` are integers, like `0` for the first person. So at the moment the `team` area pages are identified with integers too. But in your final website graph, you'd like the names of the pages in the `team` area to include the person's name, like `Alice.html`.

For this, Graph Origami provides a `@map/keys()` function that works like `@map/values()`. Instead of mapping the values (the file contents), it maps the keys (the file names).

**Example:**

If you had an array of data objects about countries, you could index them by a country code abbreviation like this:

```
countries = [
  { name: "Australia", abbreviation: "AU" }
  { name: "Brazil", abbreviation: "BR" }
  { name: "China", abbreviation: "CN" }
]

countriesByAbbreviation = @map/keys(countries, =abbreviation)
```

This operation looks like:

<div class="sideBySide">
  <figure>
    {{ @svg countries }}
  </figure>
  <figure>
    {{ @svg countriesByAbbreviation }}
  </figure>
  <figcaption>Countries with integer keys</figcaption>
  <figcaption>Countries with abbreviation keys</figcaption>
</div>

In the original `countries` definition, you could get the name of Australia with `countries/0/name`. With the mapped keys, you can get the name of Australia with `countriesByAbbreviation/AU/name`.

<span class="tutorialStep"></span> **Try it:** In `site.graph`, define a new, top-level virtual folder called `teamByName` that maps the keys of `teamData.yaml` to the team member's names. Since this `teamByName` folder is only needed for internal use, it can go outside of the `public` definition.

<span class="tutorialStep"></span> Then update the `team` formula to reference `teamByName` instead of `teamData.yaml`.

<reveal-solution>

```
public = {
  index.html = index.ori()
  team = @map/values(teamByName, =greet(name))
  assets
  images
  thumbnails = @map/values(images, =thumbnail(@value))
}

title = "Our Amazing Team"
teamByName = @map/keys(teamData.yaml, =name)
```

</reveal-solution>

<span class="tutorialStep"></span> Switch to the graph diagram window and refresh it to confirm that the `team` area is now indexed by names instead of integers:

<div class="sideBySide">
  <figure>
    {{ @svg [
      "<p>Hello, <strong>Alice</strong>!<p>"
      "<p>Hello, <strong>Bob</strong>!<p>"
      "<p>Hello, <strong>Carol</strong>!<p>"
    ] }}
  </figure>
  <figure>
    {{ @svg {
      Alice: "<p>Hello, <strong>Alice</strong>!<p>"
      Bob: "<p>Hello, <strong>Bob</strong>!<p>"
      Carol: "<p>Hello, <strong>Carol</strong>!<p>"
    } }}
  </figure>
  <figcaption>Before: indexed by integer</figcaption>
  <figcaption>After: indexed by name</figcaption>
</div>

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Virtual folders created with functions like `map()` will often change the type of the data, so as a convenience those functions allow you to add, change, or remove extensions.

The `map()` function supports this via an optional `extension` parameter, which takes a string describing how an extension should change.

**Example:** The following are two examples of the `extension` parameter. (Note that the `.graph` format allows comments that start with a `#` character.)

```
# Add a .txt extension to the mapped file names
textFiles = @map/values(data, fn, { extension: "->txt" })

# Convert markdown files to HTML, replacing the .md extension with .html
htmlFiles = @map/values(mdFiles, mdHtml, { extension: "md->html" })
```

<span class="tutorialStep"></span> Update the `team` formula and add an `extension` parameter that adds an `html` extension to the mapped file names.

<reveal-solution>

```
public = {
  index.html = index.ori()
  team = @map/values(teamByName, =greet(name), { extension: "->html" })
  assets
  images
  thumbnails = @map/values(images, =thumbnail(@value))
}

title = "Our Amazing Team"
teamByName = @map/keys(teamData.yaml, =name)
```

</reveal-solution>

## Create a person template

The last step in building your site is creating a page template for the people in the `team` area.

As review, recall that an early iteration of your index page template displayed a heading with:

```html
<h1>\{\{ title }}</h1>
```

You're now going to create a similarly skeletal template for an individual person.

<span class="tutorialStep"></span> **Try it:** In the src folder, create a new template called `person.ori`. Inside the template, create a `<h1>` heading with a `\{\{` `}}` placeholder that displays the person's name.

<reveal-solution>

```html
<h1>\{\{ name }}</h1>
```

</reveal-solution>

<span class="tutorialStep"></span> Edit the `team` formula in `site.graph` to use the `person.ori` template as the function that should be invoked. As with the `thumbnails` map earlier, you'll want to use `@value` to pass the entire team member object as an argument to the `person.ori` template.

<reveal-solution>

```
public = {
  index.html = index.ori()
  team = @map/values(teamByName, =person.ori(@value))
  assets
  images
  thumbnails = @map/values(images, =thumbnail(@value))
}

title = "Our Amazing Team"
teamByName = @map/keys(teamData.yaml, =name)
```

</reveal-solution>

<span class="tutorialStep"></span> Refresh the graph diagram window to see that the pages in the `team` area now use your `person.ori` template.

<figure>
  {{ @svg {
    Alice.html: "<h1>Alice</h1>"
    Bob.html: "<h1>Bob</h1>"
    Carol.html: "<h1>Carol</h1>"
  } }}
</figure>

## Fill out the person template

The only thing left to do is complete the `person.ori` template.

<span class="tutorialStep"></span> Replace the contents of `person.ori` with:

<clipboard-copy>

```{{"html"}}
{{ @js/String framework-intro/src/person.ori }}
```

</clipboard-copy>

<span class="tutorialStep"></span> In the site preview, you can now click a person tile on the index page to navigate to the page for that person.

## View the graph of the completed site

<span class="tutorialStep"></span> Switch to the graph diagram window and refresh it to view your site's complete structure. You can click on the circles or boxes in that window to explore what you've made.

<figure>
{{ @svg siteComplete }}
</figure>

Stepping back, consider that you've created this entire site with a few resources, a couple of templates, and a rather concise `site.graph`:

```
public = {
  index.html = index.ori()
  team = @map/values(teamByName, =person.ori(@value), { extension: "->html" })
  assets
  images
  thumbnails = @map/values(images, =thumbnail(@value))
}

title = "Our Amazing Team"
teamByName = @map/keys(teamData.yaml, =name)
```

From a functional standpoint, you've achieved your goal. The site is now complete.

## Optional: Comments

Each of the lines in `site.graph` defines some important area of the site. In a real project, it can be worth adding comments to remind you what each line does, like:

<clipboard-copy>

```
# The public folder is what users can browse.
public = {
  # Generate the index page from the index.ori template.
  index.html = index.ori()

  # Generate a page in the team area for each team member.
  team = @map/values(teamByName, =person.ori(@value), { extension: "->html" })

  # These are static resources
  assets
  images

  # Generate the thumbnails by reducing the full-size images.
  thumbnails = @map/values(images, =thumbnail(@value))
}

# Define the title here so both page templates can use it.
title = "Our Amazing Team"

# Index the team members by name.
teamByName = @map/keys(teamData.yaml, =name)
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

This invokes a Graph Origami tool called `ori`, and instructs it to copy the contents of the entire virtual `public` graph to a real file system folder called `build`. This turns the virtual files into real files.

<span class="tutorialStep"></span> In the Glitch terminal, type:

```console
$ refresh
```

This refreshes the files shown in the main portion of the Glitch window.

<span class="tutorialStep"></span> Close the Glitch terminal.

<span class="tutorialStep"></span> Click the `build` folder on the left side of the Glitch window and view the files it contains.

In addition to copies of the real files in the `assets` and `images` folders, the `build` folder now contains real copies of all the virtual files you defined in `site.graph`:

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
- The Graph Origami framework is built on a [core library](/core) that can let you do everything that you did here with formulas using JavaScript instead. This can be useful in more complex projects, or if you prefer more direct control.
- You can implement sites like this About Us site completely from scratch using the [explorable graph pattern](/pattern) and no library or framework at all. That approach may appeal to people who want to work as close to the metal as possible, and that pattern is also a useful reference if you want to understand how the Graph Origami framework works under the hood.

&nbsp;

Back to [Framework](/framework/)
