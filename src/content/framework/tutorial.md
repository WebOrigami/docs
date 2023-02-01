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
countriesByAbbreviation = mapKeys(countries, =abbreviation):
teamByName = mapKeys(framework-intro/src/teamData.yaml, =name):
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

The preview says "Not found" because the index page has no content. Let's fix that.

## Define a virtual file

In Graph Origami, you can build things from a combination of real files that are permanently stored, and virtual files that are created on demand according to your instructions. These virtual "files" are just data; a file could be tiny (like a single number or text string) or large (like an image).

One way you can define virtual files is in a file with a `.vfiles` extension that contains information in YAML format. In that format, you enter key/value pairs separated with a colon, like `name: Alice`. You define hierarchy with indentation.

**Example:** The following defines a virtual folder called `test` containing two virtual files, `short.txt` and `long.txt`. There is an additional top-level file called `another`. (Not every file needs an extension.)

```yaml
test:
  short.txt: This is a short text file.
  long.txt: |
    This is a longer file whose content spans multiple lines. All lines indented
    like this will be treated as part of the file.

another: This is a file at the top level.
```

Each key — the name of the virtual folder or file — is followed by a colon. Everything after the colon and space becomes the content.

- For virtual folders, indent virtual files beneath it.
- For virtual files, enter text after the colon and a space character, like `key: value`
- You can use a `|` character to indicate the beginning of multi-line text.

<span class="tutorialStep"></span> In the `src` folder, open `site.vfiles`, which defines a virtual folder called `public`.

That virtual folder contains a single virtual file called `index.html` that currently has no content. Now you're going to start defining virtual files to bring your About Us site to life.

<span class="tutorialStep"></span> **Try it:** Following the examples above, edit the definition of `index.html` to give it some content, like Hello, world! Be sure to include a space after the colon.

Try doing this on your own, then check your solution.

<reveal-solution>

```yaml
public:
  index.html: Hello, world!
```

</reveal-solution>

The Glitch preview window should refresh after a moment to show: Hello, world!

This tutorial project just happens to be configured to serve the contents of the virtual `public` folder, but the name "public" itself isn't special. You could configure the project to serve a different real or virtual folder.

## View your site as a graph

As you build a collection of virtual folders and files, it's helpful to be able to visualize their structure as a _graph_. Colloquially speaking, a graph is the sort of boxes-with-arrows diagram you often see depicting the structure of organizations, processes, and websites.

<span class="tutorialStep"></span> Click the **Preview** button at the bottom of the window, then click **Preview in a new window**. This will open your site in a new tab or window.

<span class="tutorialStep"></span> In the browser address bar for that preview tab/window, add `/.svg` to the end of the URL. The new URL should look like `https://your-project-name.glitch.me/.svg`

You'll see your `public` folder visually represented as a graph:

<figure>
{{ svg yaml `
index.html: Hello, world!
` }}
</figure>

The little circle represents the `public` folder, and the box represents the `index.html` file.

In Graph Origami, this project diagram can be a useful way to visualize and explore the graph you are building, so we'll return to the graph diagram window occasionally.

(You can also view the diagram in the Glitch preview pane, but Glitch has a quirk that prevents you from typing an address that starts with a period. You would need to type `svg` first and then insert a `.` before that.)

<span class="tutorialStep"></span> Leave the graph diagram window open and switch back to the main Glitch window.

## Formulas can call JavaScript

You can define virtual files with formulas that call JavaScript.

<span class="tutorialStep"></span> View the file `src/greet.js`.

This defines a function called `greet` which, given a person's name, returns a greeting in HTML. The person's name will be set in bold.

**Example:** The following code defines a virtual file called `message` whose contents will be: Hello, **Alice**!

```yaml
message = greet('Alice'):
```

A formula goes in the _key_ half of a definition — the part before the colon. Often a formula won't have anything after the colon, so the value part will be empty.

Plain text arguments in formulas require single quotes.

Unlike most programming languages, in Graph Origami a name can include a period. The above could also have been written:

```yaml
message.html = greet('Alice'):
```

<span class="tutorialStep"></span> **Try it:** In `site.vfiles`, update your definition of `index.html` to call the `greet` function, passing in `'world'`. The page should end up with "world" in bold: Hello, **world**!.

<reveal-solution>

```yaml
public:
  index.html = greet('world'):
```

</reveal-solution>

When you call `greet` in a formula like this, Graph Origami searches the current [scope](/language/scope.html) for a real or virtual file called `greet`. If it doesn't find one, it will also try searching for `greet.js`. Graph Origami defines a convention that the export(s) of a JavaScript file `greet.js` can be referenced as `greet`, so you can invoke a JavaScript function by name as long as it appears in the file name.

## Formulas can reference real or virtual files

You can pass a real or virtual file to a function by name.

**Example:** The following defines a virtual file called `doubled`, whose content will be the `word` file content repeated twice.

```yaml
word: beep
doubled = repeat(2, word):
```

This calls a built-in `repeat` function. The value of `doubled` will be "beepbeep".

The order of the above definitions doesn't matter; `word` could just as well come after `doubled`.

<span class="tutorialStep"></span> **Try it:** In `site.vfiles`, add a new top-level virtual file called `title` to hold the name of your site (say, "Our Amazing Team").

<span class="tutorialStep"></span> Then update the formula for `index.html` to pass the title to `greet`, so that the preview shows: Hello, **Our Amazing Team**!

<reveal-solution>

```yaml
public:
  index.html = greet(title):

title: Our Amazing Team
```

</reveal-solution>

By putting `title` at the top level, the formulas inside `public` can reference it, but a user won't be able to browse to a URL like `/title` to see the title. This particular project is configured to only let the user directly browse to the contents of the virtual `public` folder.

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

```yaml
carolLocation = teamData.yaml/2/location:
```

You can use this slash-separated path syntax anywhere you can refer to something.

<span class="tutorialStep"></span> **Try it:** In `site.vfiles`, update your formula for `index.html` to pass the `name` of the first team member to `greet`. The preview should show something like: Hello, **Alice**!

<reveal-solution>

```yaml
public:
  index.html = greet(teamData.yaml/0/name):

title: Our Amazing Team
```

</reveal-solution>

## Define a template that creates text

Instead of creating HTML directly in JavaScript, you can use one of many JavaScript-based template systems. For this tutorial, you'll use the template system built into Graph Origami.

**Example:** Graph Origami templates, like many template systems, let you insert data into boilerplate text using placeholders marked with curly braces `\{\{` … `}}`. If there's a piece of data called `name`, you could insert it into a paragraph like:

```html
<p>\{\{ name }}</p>
```

Inside the curly braces, you can do the same things as in formulas: call JavaScript functions, reference real and virtual files, or extract specific data with slash-separated paths.

<span class="tutorialStep"></span> **Try it:** Using the Glitch user interface, create a new file called `index.ori`: Next to the `src` folder on the left, click the `⋮` icon, then **Add File to Folder**, then type `index.ori`. This will become the template file for your index page.

A `.ori` file can define any kind of text content. Here you'll use it to define HTML, so in `index.ori` you can enter regular HTML interspersed with curly brace placholders.

<span class="tutorialStep"></span> Inside the template, enter an `h1` tag to create a heading, and inside the heading put a `\{\{` … `}}` placeholder that will display your site's title.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
```

</reveal-solution>

This template won't affect anything until you tell Graph Origami where to use it.

## Invoke a template as a function

**Example:** You invoke a Graph Origami template as a function like `greet`. If you have a template `product.ori`, you can invoke it with:

```yaml
product.html = product.ori():
```

When invoking a JavaScript function, you don't need to include the `.js` extension — but you _do_ need to include the `.ori` extension to invoke a template as a function.

<span class="tutorialStep"></span> **Try it:** In `site.vfiles`, update your `index.html` formula to invoke your `index.ori` template as a function.

<reveal-solution>

```yaml
public:
  index.html = index.ori():

title: Our Amazing Team
```

</reveal-solution>

Now when you view the site's main page, the `index.ori` template will be invoked to obtain the HTML. The preview shows a header: **Our Amazing Team**

## Merge real and virtual folders

In addition to processing individual items like a text string, Graph Origami lets you perform operations on folders. One thing you can do is merge together two or more folders together to create into a single virtual folder.

**Example:** If you have three folders `folder1`, `folder2`, and `folder3`, you can merge the contents of all three folders in a new virtual folder called `everything`:

```yaml
everything = merge(folder1, folder2, folder3):
```

At this point, your project has two folders of interest:

1. You've created a virtual `public` folder that contains a virtual `index.html` file.
2. Your project also has a real `static` folder that contains resources necessary for the site to work, including a stylesheet and images.

For your site, you will want to have the files in _both_ of these together. You can create a new virtual folder that combines them both.

<span class="tutorialStep"></span> **Try it:** In `site.vfiles`, rename your existing `public` folder to `virtual` to reflect the fact it contains virtual files. Then add a new top-level formula for a `public` folder that is the result of merging the real `static` folder and the `virtual` folder.

<reveal-solution>

```yaml
public = merge(static, virtual):

virtual:
  index.html = index.ori():

title: Our Amazing Team
```

</reveal-solution>

The order in which you define these folders doesn't matter. The formulas now define the `public` folder to be the result of merging the real files in the `static` folder with a folder called `virtual`.

<span class="tutorialStep"></span> Switch to graph diagram window and refresh it to see the new, combined `public` folder.

Your site now includes both real and virtual files:

<figure>
{{ svg merge(framework-intro/src/static, meta(yaml `
index.html: <h1>Our Amazing Team</h1>
`)) }}
</figure>

You can continue to grow this into your final About Us site.

## Consolidate the public folder definition

Before moving on, you can make one refinement to make the definition of the `public` folder more concise. That formula relies on a separate `virtual` folder definition that isn't used anywhere else. You can fold that `virtual` definition into the defintion of `public`.

As you've seen, Graph Origami formulas in YAML format appear to the left of a colon; they're effectively a complex name for something. So far, nothing has appeared to the right of the colon; the value of the key/value pair has been empty.

But in some situations, it can be convenient and concise to put data in that value. Graph Origami provides a `this` keyword that lets a formula to the left of a colon refer to the value to the right of the colon.

**Example:** The two invocations `greet` below both produce: Hello, **world**.

```yaml
message1 = greet('world'):
message2 = greet(this): world
```

<span class="tutorialStep"></span> Switch to the Glitch window. Edit `site.vfiles` to eliminate the need for a separate `virtual` folder. Move the formula for `index.html` to be under the `public` definition, and use the `this` keyword instead of `virtual` in the `merge()` function.

<reveal-solution>

```yaml
public = merge(static, this):
  index.html = index.ori():

title: Our Amazing Team
```

</reveal-solution>

The `this` keyword refers to everything indented on the following lines. The formula can now be read as: "To create the `public` folder, merge the `static` folder with the set of files indented beneath here."

<span class="tutorialStep"></span> Switch the graph diagram window. Refresh it to confirm that, although the site definition has changed, the site structure has remained the same.

## Create a virtual folder of thumbnails

In your site's index page, you eventually will want to show a small thumbnail image for each team member.

<span class="tutorialStep"></span> View the images in the `src/static/images` folder. Each person in `teamData.yaml` identifies one of these sample images as a profile photo.

Instead of using an image-editing app to create a real folder of thumbnail images, you can create a virtual folder of thumbnail images.

You can do this kind of transformation in Graph Origami with a _map_. A map is a many-to-many transformation: you give it a set of things (like a real folder, a virtual folder, or the array of people in teamData.yaml). You also give the map a function that can perform a one-to-one transformation. The map will generate a virtual folder with the same structure as the original set, but with the values transformed.

**Example:** Above you saw a function called `greet()` that transforms a name like "Alice" into a greeting like "Hello, **Alice**!" This is a one-to-one transformation. If you have a virtual folder of names, you can perform a many-to-many transformation of that folder to create a new virtual folder of greetings:

```yaml
names:
  - Alice
  - Bob
  - Carol

greetings = map(names, greet):
```

The `map()` function takes the `names` folder and returns a new folder with the same structure as `names`, but applying the `greet` function to each value. The formula needs to pass `greet` to the `map()` function, so it refers to the function as `greet` without parentheses. (Refering to the function as `greet()` would call the `greet` function and pass its result.)

You can visualize the many-to-many transformation this way:

<div class="sideBySide">
  <figure>
    {{ svg yaml `
- Alice
- Bob
- Carol
` }}
  </figure>
  <figure>
    {{ svg yaml `
- <p>Hello, <strong>Alice</strong></p>
- <p>Hello, <strong>Bob</strong></p>
- <p>Hello, <strong>Carol</strong></p>
` }}

  </figure>
  <figcaption>names</figcaption>
  <figcaption>greetings</figcaption>
</div>

The above example is transforming text values, but you can use a `map` to transform things like images the same way.

The file `src/thumbnail.js` contains a small JavaScript function which, given the binary data for an image, invokes an image-editing library to generate a new image at a smaller size.

<span class="tutorialStep"></span> **Try it:** Switch to the Glitch editor window. In `site.vfiles`, update the `public` folder to define a new virtual subfolder called `thumbnails` with a formula. Use a `map()` function, passing in the `images` folder as the set of things to map, and the `thumbnail` function as the one-to-one function that will do the mapping.

<reveal-solution>

```yaml
public = merge(static, this):
  index.html = index.ori():
  thumbnails = map(static/images, thumbnail):

title: Our Amazing Team
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

<span class="tutorialStep"></span> Navigate back and click a box for the corresponding thumbnail image like `thumbnails/van.jpg` to see the same image at a smaller size.

<span class="tutorialStep"></span> Navigate back to the graph diagram.

## Create a virtual folder by mapping data

You can also use a `map` to create a virtual folder based on data, not just files.

**Example:** The following formula uses the team data as the basis for a new virtual folder called `locations`. This will contain a virtual file for each person in teamData.yaml. Each virtual file will just contain the name of a single location.

```yaml
locations = map(teamData.yaml, =location):
```

The `locations` formula says: for each entry in `teamData.yaml`, evaluate the expression `=location`. That last bit defines a little unnamed function. It will be evaluated in the context of a team member and return the person's location.

The result of the above will be a new virtual folder called `locations` with the same keys (names) as `teamData.yaml`. Since the top level of `teamData.yaml` is an array, the keys will be integers.

<span class="tutorialStep"></span> **Try it:** Add a new virtual folder inside `public` called `names`. Define this `names` folder with a `map` like the one above. Map the team members to their names.

<reveal-solution>

```yaml
public = merge(static, this):
  index.html = index.ori():
  thumbnails = map(images, thumbnail):
  names = map(teamData.yaml, =name):

title: Our Amazing Team
```

</reveal-solution>

<span class="tutorialStep"></span> Refresh the graph diagram window to see that your site now includes a `names` folder.

<figure>
{{ svg merge(framework-intro/src/static, meta(yaml `
index.html: <h1>Our Amazing Team</h1>
thumbnails = fakeImages:
names = map(framework-intro/src/teamData.yaml, =name):
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

<span class="tutorialStep"></span> **Try it:** In the `index.ori` template, inside the `\{\{ names }}` placeholder, replace `names` with a call to the `map` function directly. Use the same arguments to `map` as you used when defining `names` in `site.vfiles`. Tip: When invoking a function in a template, there's no need to put a colon after it; a trailing colon is only necessary when defining a formula in YAML format.

<reveal-solution>

```html
<h1>\{\{ title }}</h1>
\{\{ map(teamData.yaml, =name) }}
```

</reveal-solution>

This produces the same result as before, but without relying on a separate definition of `names` elsewhere.

<span class="tutorialStep"></span> In `site.vfiles`, remove the `names` formula, since you no longer need it.

## Use a nested template

The names are all crammed together on the index page because the `map` is producing a set of names with no surrounding text. Instead of calling `=name` to get just the name, you can use a nested template to format the name.

**Example:** This template will cram all the locations together:

```html
\{\{ map(teamData.yaml, =location) }}
```

You could improve that by formatting the locations. The code below puts each location into a separate paragraph.

```{{'html'}}
\{\{ map(teamData.yaml, =`<p>\{\{ location }}</p>`) }}
```

The second argument to `map()` here is a smaller template nestead inside the larger template. The nested template is surrounded by backtick (`) characters.

<span class="tutorialStep"></span> Update `index.ori` to make each name a separate bullet item — that is, surround the each name with a `<li>` and `</li>` tags. Since you'll be defining a nested template, you'll need to use backtick (`) characters instead of single quotes.

<reveal-solution>

```{{'html'}}
<h1>\{\{ title }}</h1>
\{\{ map(teamData.yaml, =`<li>\{\{ name }}</li>`) }}
```

</reveal-solution>

The preview now shows a bulleted list of names.

## A nested template can span multiple lines

The text inside a backtick-delimited template can span multiple lines, so it can be as complex as you want.

<span class="tutorialStep"></span> To fill out the index page template, replace the contents of `index.ori` with:

<clipboard-copy>

```html
{{ framework-intro/assets/index.ori }}
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

countriesByAbbreviation = mapKeys(countries, =abbreviation):
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

<span class="tutorialStep"></span> **Try it:** In `site.vfiles`, define a new top-level virtual folder called `teamByName` that maps the keys of `teamData.yaml` to the team member's names.

<reveal-solution>

```yaml
public = merge(static, this):
  index.html = index.ori():
  thumbnails = map(images, thumbnail):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
```

</reveal-solution>

You'll use this `teamByName` folder in the next step.

## Create a folder of pages for each team member

As review, recall that an early iteration of your index page template displayed a heading with:

```html
<h1>\{\{ title }}</h1>
```

You're now going to create a similarly skeletal template for an invidual person.

<span class="tutorialStep"></span> **Try it:** In the src folder, create a new template called `person.ori`. Inside the template, create a `<h1>` heading with a `\{\{ … }}` placeholder that displays the person's name.

<reveal-solution>

```html
<h1>\{\{ name }}</h1>
```

</reveal-solution>

The next step is to combine two ideas you've already worked with: 1) a `map` can invoke a function once for each file in a folder, and 2) you can invoke a Graph Origami template as a function like `index.ori()`.

<span class="tutorialStep"></span> Edit the `public` folder in `site.vfiles` to define a new subfolder called `team`. Use a formula to define the `team` folder as a `map` of the `teamByName` folder. Use `person.ori` as the function that should be invoked.

<reveal-solution>

```yaml
public = merge(static, this):
  index.html = index.ori():
  thumbnails = map(images, thumbnail):
  team = map(teamByName, person.ori):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
```

</reveal-solution>

The `team` folder takes all the team members from `teamByName` and creates an HTML page for each one.

<span class="tutorialStep"></span> In the preview address bar, enter: `team`

This lists the files in the virtual `team` folder.

<span class="tutorialStep"></span> Click a name like `Alice`

The preview will show a heading with a person's name like: **Alice**

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Virtual folders created with functions like `map()` will often change the type of data, so as a convenience those functions allow you to add, change, or remove extensions.

The `map()` function supportss via an optional `extension` parameter. This takes a string that can describe how an extension should change.

**Example:** The following are two examples of the `extension` parameter. (Note that YAML files allow comments that start with a `#` character.)

```yaml
# Add a .txt extension to the mapped file names
textFiles = map(data, fn, extension='->txt'):

# Convert markdown files to HTML, replacing the .md extension with .html
htmlFiles = map(mdFiles, mdHtml, extension='md->html'):
```

<span class="tutorialStep"></span> Update the `team` formula and add an `extension` parameter that adds a `html` extension to the mapped file names.

<reveal-solution>

```yaml
public = merge(static, this):
  index.html = index.ori():
  thumbnails = map(images, thumbnail):
  team = map(teamByName, person.ori, extension='->html'):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
```

</reveal-solution>

<span class="tutorialStep"></span> In the preview address bar, ensure you're still viewing the address: `/team`

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
{{ framework-intro/assets/person.ori }}
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
team = map(teamByName, framework-intro/assets/person.ori):
thumbnails = fakeImages:
`)) }}
</figure>

You can click on the circles or boxes in this diagram to explore what you've made.

From a functional standpoint, you've achieved your goal. The site is now complete.

## Optional: Comments

Stepping back, consider that you've created this site with some templates and a rather concise `site.vfiles`:

```yaml
public = merge(static, this):
  index.html = index.ori():
  thumbnails = map(images, thumbnail):
  team = map(teamByName, person.ori, extension='->html'):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
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
  thumbnails = map(images, thumbnail)

  # Generate a page in the team area for each team member.
  team = map(teamByName, person.ori, extension: '->html')

})

# Define the title here so both page templates can use it.
title = 'Our Amazing Team'

# Index the team members by name.
teamByName = mapKeys(teamData.yaml, =name)
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
