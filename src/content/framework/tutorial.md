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
countriesByAbbreviation = mapKeys(countries, =./abbreviation):
teamByName = mapKeys(framework-intro/src/teamData.yaml, =./name):
siteWithTitle1:
  index.html = framework-intro/src/greet(title):
  title: Our Amazing Team
siteWithTitle2:
  index.html = framework-intro/src/greet('Our Amazing Team'):
---

<script src="/components.js"></script>

One day your team decides:

> _We need an "About Us" area for our site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/demos/aboutUs/" target="_blank">sample About Us area</a>
and click on a few pages. The tutorial will use this sample as a model for the site you'll build.

## Start

<span class="tutorialStep"></span> Open the
<a href="https://glitch.com/edit/#!/origami-framework-intro" target="_blank">tutorial project on Glitch</a>, a free web-based code editor.

<span class="tutorialStep"></span> Click the **Remix** button (or Remix to Edit) to create your own copy of the project to work on.

In the Glitch window, you will see a list of files on the left and the currently-open file (the project's ReadMe) in the center.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then **Open Preview Pane** to open a preview pane on the right.

The page in the preview pane says: Hello

## Define a virtual file

In Graph Origami, you can build things from a combination of real files that are permanently stored, and virtual files that are created on demand according to your instructions. These virtual "files" are just data; a file could be tiny (like a single number or text string) or large (like an image).

As you build a collection of virtual folders and files, it's helpful to be able to think about their structure as a _graph_. Colloquially speaking, a graph is the sort of boxes-with-arrows diagram you often see depicting the structure of organizations, processes, and websites.

Graph Origami lets you define a graph in several ways. The most concise is to write formulas in a file with a `.graph` extension.

<span class="tutorialStep"></span> In the `src` folder, open `site.graph`, which defines a virtual folder called `public`. That virtual folder contains a single virtual file called `index.html` that currently says "Hello".

```
public = {
  index.html = 'Hello'
}
```

Each formula defines the name of a virtual folder or file as the result of an expression.

Unlike most programming languages, names in Graph Origami `.graph` files can include periods! This lets you easily create virtual files that include an extension like `index.html`.

On the right side of each `=` sign is an expression:

- The expression for the virtual folder `public` is a subgraph of formulas nested inside `{`…`}` curly braces. Each nested formula will define a folder or file inside `public`.
- The expression for `index.html` in this case is a text string in single quotes.

A `.graph` file can define more than one top-level virtual folder or file. This tutorial project is configured to serve the contents of the virtual `public` folder. The name "public" itself isn't special — you could configure the project to serve a different real or virtual folder.

You can edit your site by editing this `site.graph` file.

<span class="tutorialStep"></span> **Try it:** Edit the text in the expression for `index.html` to give it more content, like: Hello, world!

After a moment, the Glitch preview window should refresh to show: Hello, world!

## View your site as a graph

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then click **Preview in a new window**. This will open your site in a new tab or window.

<span class="tutorialStep"></span> In the browser address bar for that preview tab/window, add `/.svg` to the end of the URL. The new URL should look like `https://your-project-name.glitch.me/.svg`

You'll see your site visually represented as a graph:

<figure>
{{ svg yaml `
index.html: Hello, world!
` }}
</figure>

The little circle represents the `public` folder, and the box represents the `index.html` file.

In Graph Origami, this project diagram can be a useful way to visualize and explore the graph you are building, so we'll return to the graph diagram window occasionally.

(You can also view the diagram in the Glitch preview pane. A Glitch quirk prevents you from typing an address that starts with a period; instead, you can type `svg` first and insert a `.` before that.)

<span class="tutorialStep"></span> Leave the graph diagram window open and switch back to the main Glitch window.

## Formulas can call JavaScript

You can define virtual files with formulas that call JavaScript.

<span class="tutorialStep"></span> View the file `src/greet.js`.

```{{'js'}}
{{ framework-intro/src/greet.js }}
```

This defines a function called `greet` which, given a person's name, returns a greeting in HTML. The person's name will be set in bold. You can call this JavaScript function in a Graph Origami expression.

**Example:** The following code defines a virtual file called `message` whose contents will be: Hello, **Alice**!

```greet
message = greet('Alice')
```

<span class="tutorialStep"></span> **Try it:** In `site.graph`, update your definition of `index.html` to remove the quoted string, and instead call the `greet` function. Pass the text `'world'` to `greet`, so that the page ends up with "world" in bold: Hello, **world**!

<reveal-solution>

```
public = {
  index.html = greet('world')
}
```

</reveal-solution>

When you call `greet` in a formula like this, Graph Origami searches the current [scope](/language/scope.html) for a real or virtual file called `greet`. If it doesn't find one, it will also try searching for `greet.js`. Graph Origami defines a convention that the export(s) of a JavaScript file `greet.js` can be referenced as `greet`, so you can invoke a JavaScript function by name as long as it appears in the file name.

## Formulas can reference real or virtual files

You can pass a real or virtual file to a function by name.

**Example:** The following defines a virtual file called `doubled`, whose content will be the `word` file content repeated twice.

```
word = beep
doubled = repeat(2, word)
```

This calls a built-in `repeat` function. The value of `doubled` will be "beepbeep".

The order of the above definitions doesn't matter; `word` could just as well come after `doubled`.

<span class="tutorialStep"></span> **Try it:** In `site.graph`, define a new virtual file called `title` (no extension is required) to hold the name of your site (say, "Our Amazing Team").

<span class="tutorialStep"></span> Then update the formula for `index.html` to pass the title to `greet`.

<reveal-solution>

```
public = {
  index.html = greet(title)
  title = 'Our Amazing Team'
}
```

</reveal-solution>

Since the order doesn't matter, you could also define `title` before `index.html`.

The preview now shows: Hello, **Our Amazing Team**!

## Controlling what is public

This project is configured to let a user browse the virtual `public` folder.

<span class="tutorialStep"></span> Switch to graph diagram window and refresh it to see its current structure.

<figure>
{{ svg siteWithTitle1 }}
</figure>

The virtual `title` file is used by the expression that produces `index.html`. But you don't need make the `title` file itself part of your final site — it's only needed internally.

<span class="tutorialStep"></span> **Try it:** Move the line for `title` to the top level of `site.graph` so that it's outside the `public` folder.

<reveal-solution>

```
public = {
  index.html = greet(title)
}

title = 'Our Amazing Team'
```

</reveal-solution>

By putting `title` at the top level, the formulas inside `public` can reference it, but a user won't be able to browse to a URL like `/title` to see the title.

<span class="tutorialStep"></span> In the graph diagram window, confirm that the public site no longer includes `title`:

<figure>
{{ svg siteWithTitle2 }}
</figure>

<span class="tutorialStep"></span> Switch back to the Glitch window.

## Defining the team data

Data in Graph Origami projects can come from pretty much anything. This sample project stores the data for your team members in a YAML file.

<span class="tutorialStep"></span> Open the team data file in `src/teamData.yaml`:

```{{'yaml'}}
{{ framework-intro/src/teamData.yaml }}
```

This defines an array of person records in YAML but _this data is too boring!_

<span class="tutorialStep"></span> In `teamData.yaml`, replace the people's names with your name and the names of family or friends.

## Formulas can extract data

You can use slash-separated paths to extract information out of a folder or a data file like this team data file.

**Example:** The following defines a file whose value in the sample data will be "Venice". (Array indexes start with zero, so this gets the `location` from the third team member.)

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

title = 'Our Amazing Team'
```

</reveal-solution>

## Define a template that creates text

Instead of creating HTML directly in JavaScript, you can use one of many JavaScript-based template systems. For this tutorial, you'll use the template system built into Graph Origami.

**Example:** Graph Origami templates, like many template systems, let you insert data into boilerplate text using placeholders marked with double curly braces `\{\{` … `}}`. If there's a piece of data called `name`, you could insert it into a paragraph like:

```html
<p>\{\{ ./name }}</p>
```

Inside the curly braces, you can do the same things as in formulas: call JavaScript functions, reference real and virtual files, or extract specific data with slash-separated paths.

<span class="tutorialStep"></span> **Try it:** Using the Glitch user interface, create a new file called `index.ori`: Next to the `src` folder on the left, click the `⋮` icon, then **Add File to Folder**, then type `index.ori`. This will become the template file for your index page.

A `.ori` file can define any kind of text content. Here you'll use it to define HTML, so in `index.ori` you can enter regular HTML interspersed with curly brace placeholders.

<span class="tutorialStep"></span> Inside the template, enter an `h1` tag to create a heading, and inside the heading put a `\{\{` … `}}` placeholder that will display your site's title.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
```

</reveal-solution>

This template won't affect anything until you tell Graph Origami where to use it.

## Invoke a template as a function

**Example:** You invoke a Graph Origami template as a function like `greet`. If you have a template `product.ori`, you can invoke it with:

```
product.html = product.ori()
```

When invoking a JavaScript function, you don't need to include the `.js` extension — but you _do_ need to include the `.ori` extension to invoke a template as a function.

<span class="tutorialStep"></span> **Try it:** In `site.graph`, update your `index.html` formula to invoke your `index.ori` template as a function.

<reveal-solution>

```
public = {
  index.html = index.ori()
}

title = 'Our Amazing Team'
```

</reveal-solution>

Now when you view the site's main page, the `index.ori` template will be invoked to obtain the HTML. The preview shows a header: **Our Amazing Team**

## Creating a virtual folder with a map

Your index page should show a photo tile and link for each team member. Such situations are very common in websites, where you say: "For each [thing], create a [different thing]."

Whenever you have such a situation in Graph Origami, you can often efficiently address it with a _map_. A map is a many-to-many transformation: you give it a set of things (like a real folder, a virtual folder, or the array of people in teamData.yaml) and a function. The map then produces a virtual folder where the original things have each been transformed by that function.

Your virtual file `index.html` is created with the `greet` function. That function performs a trivial one-to-one transformation of a text string ("world") to produce a new text string ("Hello, world!").

You can use a `map` to apply the `greet` function to a set of names. The map turns the one-to-one transformation of `greet` into a many-to-many transformation.

<span class="tutorialStep"></span> **Try it:** First, pull in the array of names defined in `array.js` by adding `array` to the graph on a line by itself:

```
public = {
  index.html = index.ori()
  assets
  images
  array
}

title = 'Our Amazing Team'
```

<span class="tutorialStep"></span> In the graph diagram window, refresh the page to confirm that the graph now includes a small `array` area with some names in it.

<span class="tutorialStep"></span> In the Glitch editor window, in `site.graph` add the following `greetings` formula.

```
public = {
  index.html = index.ori()
  assets
  images
  array
  greetings = map(array, greet)
}

title = 'Our Amazing Team'
```

The `map()` function takes the `array` folder and returns a new virtual folder with the same structure as `array`, but applying the `greet` function to each value. Note that the formula passes the `greet` function without parentheses to the `map` function — `greet` is a reference to the function, whereas `greet()` would invoke it.

<span class="tutorialStep"></span> In the graph diagram window, refresh the page to see the virtual `greetings` folder.

You can visualize the many-to-many transformation this way:

<div class="sideBySide">
  <figure>
    {{ svg yaml `
- name: Alice
- name: Bob
- name: Carol
` }}
  </figure>
  <figure>
    {{ svg yaml `
- Alice
- Bob
- Carol
` }}
  </figure>
  <figcaption>teamData.yaml</figcaption>
  <figcaption>names</figcaption>
</div>

<div class="sideBySide">
  <figure>
    {{ svg yaml `
- name: Alice
- name: Bob
- name: Carol
` }}
  </figure>
  <figure>
    {{ svg yaml `
- <p>Hello, <strong>Alice</strong></p>
- <p>Hello, <strong>Bob</strong></p>
- <p>Hello, <strong>Carol</strong></p>
` }}
  </figure>
  <figcaption>teamData.yaml</figcaption>
  <figcaption>greetings</figcaption>
</div>

## Pull in resources

The `src` folder has two real subfolders you'll want to include in your `public` graph:

- `assets` contains a stylesheet and icon
- `images` contains sample images you can use to represent your team members

You can pull a real folder or file into your graph by writing its name on a line by itself.

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
  assets
  images
}

title = 'Our Amazing Team'
```

</reveal-solution>

<span class="tutorialStep"></span> Switch to graph diagram window and refresh it to see the updated `public` folder.

Your site now includes both real and virtual files:

<figure>
{{ svg merge(siteWithTitle2, {
  assets = framework-intro/src/assets
  images = framework-intro/src/images
}) }}
</figure>

You can continue to grow this into your final About Us site.

## Create a virtual folder of thumbnails

In your site's index page, you eventually will want to show a small thumbnail image for each team member.

<span class="tutorialStep"></span> View the images in the `src/images` folder. Each person in `teamData.yaml` identifies one of these sample images as a profile photo.

Instead of using an image-editing app to create a real folder of thumbnail images, you can create a virtual folder of thumbnail images.

The above example is transforming text values, but you can use a `map` to transform things like images the same way.

The file `src/thumbnail.js` contains a small JavaScript function which, given the binary data for an image, invokes an image-editing library to generate a new image at a smaller size.

<span class="tutorialStep"></span> **Try it:** Switch to the Glitch editor window. In `site.graph`, update the `public` folder to define a new virtual subfolder called `thumbnails` with a formula. Use a `map()` function, passing in the `images` folder as the set of things to map, and the `thumbnail` function as the one-to-one function that will do the mapping.

<reveal-solution>

```
public = merge(static, {
  index.html = index.ori()
  thumbnails = map(static/images, thumbnail)
})

title = 'Our Amazing Team'
```

</reveal-solution>

Note: the formula for `thumbnails` can refer to `static/images` (as shown above) or just `images`. The `thumbnails` formula is defined inside of a `merge` and, inside a merged graph, a formula in one graph being merged can see everything defined in the other graphs being merged (like `static`).

Because Graph Origami treats real folders and virtual folders the same, you can browse your virtual folder of thumbnails.

<span class="tutorialStep"></span> Switch to the graph diagram window and refresh it to view your site's updated structure.

<figure>
{{ svg merge(framework-intro/src/static, meta(yaml `
index.html: <h1>Our Amazing Team</h1>
thumbnails = fakeImages:
`)) }}
</figure>

The virtual `thumbnails` folder contains a set of thumbnail images _that do not exist._ They are potential images that are only created when you ask for them.

<span class="tutorialStep"></span> In the graph diagram, click a box for a real image like `images/van.jpg` to preview it.

<span class="tutorialStep"></span> Navigate back and click a box for the corresponding thumbnail image like `thumbnails/van.jpg` to see the same image at a smaller size. This image is produced on demand.

<span class="tutorialStep"></span> Navigate back to the graph diagram.

## Create a virtual folder by mapping data

You can also use a `map` to create a virtual folder based on data instead of files.

**Example:** The following formula uses the team data as the basis for a new virtual folder called `locations`. This will contain a virtual file for each person in teamData.yaml. Each virtual file will just contain the name of a single location.

```
locations = map(teamData.yaml, =./location)
```

The `locations` formula says: for each entry in `teamData.yaml`, evaluate the expression `=./location`. That last bit defines a little unnamed function. It will be evaluated in the context of a team member and return the person's location.

The result of the above will be a new virtual folder called `locations` with the same keys (names) as `teamData.yaml`. Since the top level of `teamData.yaml` is an array, the keys will be integers.

<span class="tutorialStep"></span> **Try it:** Add a new virtual folder inside `public` called `names`. Define this `names` folder with a `map` like the one above. Map the team members to their names.

<reveal-solution>

```
public = merge(static, {
  index.html = index.ori()
  thumbnails = map(static/images, thumbnail)
  names = map(teamData.yaml, =./name)
})

title = 'Our Amazing Team'
```

</reveal-solution>

<span class="tutorialStep"></span> Refresh the graph diagram window to see that your site now includes a `names` folder.

<figure>
{{ svg merge(framework-intro/src/static, meta(yaml `
index.html: <h1>Our Amazing Team</h1>
thumbnails = fakeImages:
names = map(framework-intro/src/teamData.yaml, =./name):
`)) }}
</figure>

The `names` folder contains entries for three virtual files called `0`, `1`, and `2`. These files contain the corresponding name from an entry in `teamData.yaml`.

## Incorporate a virtual folder into a template

If you have a folder that contains text, you can reference that folder inside a template. Graph Origami will take all the values (file contents) and inline them into the result.

**Example:** If you had a folder called `fragments` that contained HTML fragments, you could inline them all into a template with:

```html
\{\{ fragments }}
```

<span class="tutorialStep"></span> **Try it:** Switch the Glitch editor window. At the bottom of the `index.ori` template, add a `\{\{`…`}}` placeholder to incorporate the virtual `names` folder into the template.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
\{\{ names }}
```

</reveal-solution>

Now the preview shows the names of your team members — although the names are crammed together without spacing. We'll fix that in a moment.

## Create a map inside a template

If you're only going to use a virtual folder like `names` in one place in a template like `index.ori`, you can move it inline.

<span class="tutorialStep"></span> **Try it:** From `site.graph`, cut out the expression used to define `names`, then remove the rest of that `names=` line since you will no longer need it.

<span class="tutorialStep"></span> In the `index.ori` template, replace the `names` reference and paste in the expression you copied above.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
\{\{ map(teamData.yaml, =./name) }}
```

</reveal-solution>

This produces the same result as before, but without relying on a separate definition of `names` elsewhere.

## Use a nested template

The names are all crammed together on the index page because the `map` is producing a set of names with no surrounding text. Instead of calling `=name` to get just the name, you can use a nested template to format the name.

**Example:** This template will cram all the locations together:

```html
\{\{ map(teamData.yaml, =./location) }}
```

You could improve that by formatting the locations. The code below puts each location into a separate paragraph.

```{{'html'}}
\{\{ map(teamData.yaml, =`<p>\{\{ ./location }}</p>`) }}
```

The second argument to `map()` here is a smaller template nested inside the larger template. The nested template is surrounded by backtick (`) characters.

<span class="tutorialStep"></span> Update `index.ori` to make each name a separate bullet item — that is, surround the each name with a `<li>` and `</li>` tags. Since you'll be defining a nested template, you'll need to use backtick (`) characters instead of single quotes.

<reveal-solution>

```{{'html'}}
<h1>\{\{ title }}</h1>
\{\{ map(teamData.yaml, =`<li>\{\{ ./name }}</li>`) }}
```

</reveal-solution>

The preview now shows a bulleted list of names.

## A nested template can span multiple lines

The text inside a backtick-delimited template can span multiple lines, so it can be as complex as you want.

<span class="tutorialStep"></span> To fill out the index page template, replace the contents of `index.ori` with:

<clipboard-copy>

```html
{{ framework-intro/src/index.ori }}
```

</clipboard-copy>

This is functionally the same as the earlier template; it just has more elements.

The index page preview now shows a tile for each team member that includes their name and location. It also shows a thumbnail image pulled from the virtual `thumbnails` folder you created earlier.

## Index the team data by person name

The last phase of building your site involves creating a `team` area for each person, so that `/team/Alice.html` shows the data for Alice along with a full-size image.

To lay the groundwork for that, you're first going to create an intermediate folder with the same data as `teamData.yaml`, but where the files are named after the people on the team.

As you've seen, the top-level "file" names in `teamData.yaml` are integers, like `0` for the first person. But in your final website graph, you'd like the keys of the pages in the `team` area to include the person's name, like `Alice.html`.

For this, Graph Origami provides a `mapKeys()` function that works like `map()`. Instead of mapping the values (the file contents), it maps the keys (the file names).

**Example:**

```yaml
countries:
  - name: Australia
    abbreviation: AU
  - name: Brazil
    abbreviation: BR
  - name: China
    abbreviation: CN

countriesByAbbreviation = mapKeys(countries, =./abbreviation):
```

This operation looks like:

<div class="sideBySide">
  <figure>
    {{ svg countries }}
  </figure>
  <figure>
    {{ svg countriesByAbbreviation }}
  </figure>
  <figcaption>Countries with integer keys</figcaption>
  <figcaption>Countries with abbreviation keys</figcaption>
</div>

In the original `countries` definition, you could get the name of Australia with `countries/0/name`. With the mapped keys, you can get the name of Australia with `countriesByAbbreviation/AU/name`.

<span class="tutorialStep"></span> **Try it:** In `site.graph`, define a new top-level virtual folder called `teamByName` that maps the keys of `teamData.yaml` to the team member's names.

<reveal-solution>

```
public = merge(static, {
  index.html = index.ori()
  thumbnails = map(static/images, thumbnail)
})

title = 'Our Amazing Team'
teamByName = mapKeys(teamData.yaml, =./name)
```

</reveal-solution>

You'll use this `teamByName` folder in the next step.

## Create a folder of pages for each team member

As review, recall that an early iteration of your index page template displayed a heading with:

```html
<h1>\{\{ ./title }}</h1>
```

You're now going to create a similarly skeletal template for an individual person.

<span class="tutorialStep"></span> **Try it:** In the src folder, create a new template called `person.ori`. Inside the template, create a `<h1>` heading with a `\{\{ … }}` placeholder that displays the person's name.

<reveal-solution>

```html
<h1>\{\{ ./name }}</h1>
```

</reveal-solution>

The next step is to combine two ideas you've already worked with: 1) a `map` can invoke a function once for each file in a folder, and 2) you can invoke a Graph Origami template as a function like `index.ori()`.

<span class="tutorialStep"></span> Edit the `public` folder in `site.graph` to define a new subfolder called `team`. Use a formula to define the `team` folder as a `map` of the `teamByName` folder. Use `person.ori` as the function that should be invoked.

<reveal-solution>

```
public = merge(static, {
  index.html = index.ori()
  thumbnails = map(static/images, thumbnail)
  team = map(teamByName, person.ori)
})

title = 'Our Amazing Team'
teamByName = mapKeys(teamData.yaml, =./name)
```

</reveal-solution>

The `team` folder takes all the team members from `teamByName` and creates an HTML page for each one.

<span class="tutorialStep"></span> In the preview address bar, enter: `team`

This lists the files in the virtual `team` folder.

<span class="tutorialStep"></span> Click a name like `Alice`

The preview will show a heading with a person's name like: **Alice**

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Virtual folders created with functions like `map()` will often change the type of data, so as a convenience those functions allow you to add, change, or remove extensions.

The `map()` function supports via an optional `extension` parameter. This takes a string that can describe how an extension should change.

**Example:** The following are two examples of the `extension` parameter. (Note that `.graph` allow comments that start with a `#` character.)

```
# Add a .txt extension to the mapped file names
textFiles = map(data, fn, { extension: '->txt' })

# Convert markdown files to HTML, replacing the .md extension with .html
htmlFiles = map(mdFiles, mdHtml, { extension: 'md->html' })
```

<span class="tutorialStep"></span> Update the `team` formula and add an `extension` parameter that adds a `html` extension to the mapped file names.

<reveal-solution>

```
public = merge(static, {
  index.html = index.ori()
  thumbnails = map(static/images, thumbnail)
  team = map(teamByName, person.ori, { extension: '->html' })
})

title = 'Our Amazing Team'
teamByName = mapKeys(teamData.yaml, =./name)
```

</reveal-solution>

<span class="tutorialStep"></span> In the preview address bar, ensure you're viewing the address: `/team`

You can see that the files in the `team` folder now have names that end in `.html`.

<span class="tutorialStep"></span> Click a name like `Alice.html` to open that page.

The page for a team member like Alice uses the `person.ori` template you created earlier. It shows a heading with their name.

<span class="tutorialStep"></span> Clear the preview address to return to the index page.

<span class="tutorialStep"></span> In the preview of the index page, click the tile for a team member to navigate to that person's page.

## Fill out the person template

The last step is to fill out the template for a person.

<span class="tutorialStep"></span> Replace the contents of `person.ori` with:

<clipboard-copy>

```html
{{ framework-intro/src/person.ori }}
```

</clipboard-copy>

<span class="tutorialStep"></span> Visit the page for a team member to see their information and a full-size photo.

<span class="tutorialStep"></span> In the preview address bar, clear the address to return to the index page.

## View the graph of the completed site

<span class="tutorialStep"></span> Switch to the graph diagram window and refresh it to view your site's complete structure.

Your site now looks like:

<figure>
{{ svg merge(framework-intro/src/static, meta(yaml `
index.html: <h1>Our Amazing Team</h1>
team = map(teamByName, framework-intro/src/person.ori):
thumbnails = fakeImages:
`)) }}
</figure>

You can click on the circles or boxes in this diagram to explore what you've made.

From a functional standpoint, you've achieved your goal. The site is now complete.

## Optional: Comments

Stepping back, consider that you've created this site with some templates and a rather concise `site.graph`:

```
public = merge(static, {
  index.html = index.ori()
  thumbnails = map(static/images, thumbnail)
  team = map(teamByName, person.ori, { extension: '->html' })
})

title = 'Our Amazing Team'
teamByName = mapKeys(teamData.yaml, =./name)
```

Each of the lines defining the virtual `public` folder and its subfolders creates some important area of the site.

In a real project, it can be worth adding comments to remind you what each line does, like:

<clipboard-copy>

```
# The public folder is the static folder plus some virtual files and folders.
public = merge(static, {
  # Generate the index page from the index.ori template.
  index.html = index.ori()

  # Generate the thumbnails by reducing the full-size images.
  thumbnails = map(static/images, thumbnail)

  # Generate a page in the team area for each team member.
  team = map(teamByName, person.ori, { extension: '->html' })
})

# Define the title here so both page templates can use it.
title = 'Our Amazing Team'

# Index the team members by name.
teamByName = mapKeys(teamData.yaml, =./name)
```

</clipboard-copy>

## Building static files

You have been viewing your About Us site using a small Graph Origami server which is running in the background. But since this particular site is fundamentally static in nature, Glitch can automatically render all the pages and other necessary resources as static files. This lets Glitch serve the site faster and more cheaply — static sites on Glitch are free.

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

In addition to copies of the real files in the `src/static` folder, the `build` folder now contains real copies of all the virtual files you defined:

- A real `thumbnails` folder with real thumbnail versions of each image.
- A real `index.html` page with HTML that includes a listing for each team member.
- A real `team` folder with real HTML pages for each team member.

Because these static files are all in native web formats, your static site can be extremely fast. There are opportunities around the margins to make your site even faster, but this is already a good start on a performant site.

## View your final site

<span class="tutorialStep"></span> Find your site's shareable URL by clicking **Share** button in the upper right, then copy the URL for the **Live site**.

Your site will have a URL like `https://<something>.glitch.me`.

<span class="tutorialStep"></span> Open a new browser tab and navigate to that URL to see how your site will look to visitors.

As long as you're working on your site, the Graph Origami server will be used to serve the content. At some point after you close the Glitch window, Glitch will rebuild the static files and stop the live server. From that point on, Glitch will serve the static files directly. After that point, the files will load much faster.

## Learn more

This concludes the Graph Origami framework tutorial. You can continue exploring related aspects of Graph Origami:

- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The [Origami expression language](/language) you've been using to write formulas and template expressions has additional features which were not covered in this tutorial.
- The Graph Origami framework is built on a [core library](/core) that can let you do everything you did here with formulas, but using JavaScript instead. This can be useful in more complex projects, or if you prefer more control.
- You can implement sites like this About Us site completely from scratch using the [explorable graph pattern](/pattern) and no library or framework at all. That approach may appeal to people who want to work as close to the metal as possible, and is also useful reference if you want to understand the basics of how the Graph Origami framework works under the hood.

&nbsp;

Back to [Framework](/framework/)
