---
title: Create a simple About Us site
numberHeadings: true
---

<script src="/components.js"></script>

One day one of your teammates says:

> _We need an "About Us" area for our site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/samples/aboutUs/site.vfiles/public/" target="_blank">sample About Us area</a>
and click on a few pages. The tutorial will use this sample as a model for the site you'll build.

## Start

<span class="tutorialStep"></span> Open the
<a href="https://glitch.com/edit/#!/origami-framework-intro" target="_blank">tutorial project on Glitch</a>, a free web-based code editor.

<span class="tutorialStep"></span> Click the <strong>Remix</strong> button (or Remix to Edit) to create your own copy of the project to work on.

In the Glitch window, you will see a list of files on the left, the currently-open file in the middle, and a preview window on the right. The preview initially says "Not found", because your site is missing an index page.

## Define a virtual file

In Graph Origami, you can build things from a combination of real files that are permanently stored, and virtual files that are created on demand according to your instructions.

One way you can define virtual files is in a file with a `.vfiles` extension that contains information in YAML format. In that format, you enter key/value pairs separated with a colon, like `name: Alice`. You define hierarchy with indentation.

**Example:** The following defines a virtual folder called `test` containing two virtual files, `short.txt` and `long.txt`.

```yaml
test:
  short.txt: This is a short text file.
  long.txt: |
    This is a longer file whose content spans multiple lines. All lines indented
    like this will be treated as part of the file.
```

Each key — the name of the virtual folder or file — is followed by a colon. Everything after the colon becomes the content. For virtual folders, indent virtual files beneath it. For virtual files, you can enter text after the colon. You can use a `|` character to indicate the beginning of multi-line text.

Now you’re going to start defining virtual files to bring your About Us site to life.

<span class="tutorialStep"></span> **Try it:** In the `src` folder, open `site.vfiles`. Following the example above, edit the file to define a virtual folder called `public`. Give it a single virtual file called `index.html` with the content: Hello, world!

Try doing this on your own, then click below to check your solution.

<reveal-answer>

```yaml
public:
  index.html: Hello, world!
```

</reveal-answer>

The Glitch preview window should now show: Hello, world!

This tutorial project just happens to be configured to serve the contents of the virtual `public` folder, but the name "public" itself isn't special. You could configure the project to serve a different real or virtual folder.

## Formulas can call JavaScript

You can define virtual files with formulas that call JavaScript.

<span class="tutorialStep"></span> View the file `src/greet.js`.

This defines a function called `greet` which, given a person’s name, returns a greeting in HTML.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```{{'yaml'}}
public:
  index.html = greet('world'):
```

</clipboard-copy>

This formula defines the contents of index.html as the result of calling the greet function.
Formulas end with a colon. Text arguments in formulas require single quotes.

When you write `greet` in a formula like this, Graph Origami searches the current [scope](/language/scope.html) for a real or virtual file called `greet`. If it doesn't find one, it will try searching for "greet.js". In this case, it finds `greet.js`, and assumes the file's top-level export is the function you want to call.

The preview window now shows: Hello, **world**!

## Formulas can reference real or virtual files

You can pass a real or virtual file to a function by name.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = greet(title):

title: Our Amazing Team
```

</clipboard-copy>

This defines a new virtual file called `title` that your formulas can reference, but isn’t accessible through the site because it is not in the virtual `public` folder.

The formula passes the contents of the virtual `title` file to the `greet()` function.

The preview now shows: Hello, **Our Amazing Team**!

## Formulas can extract data

You can use slash-separated paths to extract information out of a folder or a data file.

<span class="tutorialStep"></span> Open the team data file in `src/teamData.yaml`:

```{{'yaml'}}
{{ framework-intro/src/teamData.yaml }}
```

This defines an array of person records — but this data is too boring!

<span class="tutorialStep"></span> Update the names in `teamData.yaml` to use your name and the names of family or friends.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = greet(teamData.yaml/0/name):

title: Our Amazing Team
```

</clipboard-copy>

This gets the name of the first team member (the one with index `0`) defined in `teamData.yaml`.

The preview shows something like: Hello, **Alice**!

## Define a template that creates text

Instead of creating HTML directly in JavaScript, you can use any JavaScript-based template system. For this tutorial, you'll use the template system built into Graph Origami.

<span class="tutorialStep"></span> In the src folder, create a new file called `index.ori` and paste this into it:

<clipboard-copy>

```html
<h1>\{\{ title }}</h1>
```

</clipboard-copy>

Inside the curly braces `\{\{` … `}}` you can do the same things as in formulas: call JavaScript function, reference real and virtual files, extract specific data, etc.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():

title: Our Amazing Team
```

</clipboard-copy>

Now when you view the site's main page, the `index.ori` template will be invoked as a function that returns HTML with a header. The preview shows: **Our Amazing Team**

## Create a virtual folder with a `map`

You can write a formula that, on demand, will create a virtual folders of things.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():
  names = map(teamData.yaml, =name):

title: Our Amazing Team
```

</clipboard-copy>

The `names` formula says: for each entry in `teamData.yaml`, evaluate the expression `=name`. That expression will return the person's name. This type of formula is called a _map_: it creates a new virtual folder with the same structure as the original folder or data (here, teamData.yaml), but with the original contents mapped to new values.

<span class="tutorialStep"></span> In the fake address bar above the Glitch preview, enter: `names`

The virtual `names` folder contains entries for three virtual files called `0`, `1`, and `2`. These files contain the corresponding name from an entry in `teamData.yaml`.

<span class="tutorialStep"></span> In the Glitch preview address bar, clear the address to return to the index page.

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

```{{'html'}}
<h1>\{\{ title }}</h1>
<ul>
\{\{ names }}
</ul>
```

</clipboard-copy>

Now the preview shows the names of your team members — although the names are crammed together without spacing.

## Use a template in a formula

<span class="tutorialStep"></span> Update the `names` formula in `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():
  names = map(teamData.yaml, =`<li>\{\{ name }}</li>`):

title: Our Amazing Team
```

</clipboard-copy>

For each team member, the `map()` will evaluate its second argument, which here is a small template surrounded with backticks (``). The template will insert a name like "Alice" into an HTML fragment: `<li>Alice</li>`.

The preview now shows a bulleted list of names.

## Use a nested template

Since the virtual `names` folder is only used in `index.ori`, you can move it inline.

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

```{{'html'}}
<h1>\{\{ title }}</h1>
<ul>
\{\{ map(teamData.yaml, =`<li>\{\{ name }}</li>`) }}
</ul>
```

</clipboard-copy>

The second argument to `map()` here is a smaller template instead the larger `index.ori` template.

<span class="tutorialStep"></span> In `site.vfiles`, remove the `names` formula, since you no longer need it.

<clipboard-copy>

```yaml
public:
  index.html = index.ori():

title: Our Amazing Team
```

</clipboard-copy>

## A nested template can span multiple lines

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

```html
{{ framework-intro/assets/index.ori }}
```

</clipboard-copy>

This is functionally the same as the earlier template; it just has more elements.

The styling is incomplete on this page because it can't see the styles and other resources in `styles.css` yet. The page is also trying to reference thumbnail images in a `thumbnails` folder that doesn't yet exist. Let's fix those problems in turn.

## Merge real and virtual folders

You've created a virtual `public` folder that contains a virtual `index.html` file. Separately, your project has a real `static` file that contains resources necessary for the site to work, including a stylesheet and images. You can merge those folders together.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public = merge(static, virtual):

virtual:
  index.html = index.ori():

title: Our Amazing Team
```

This redefines the `public` folder to be the result of merging the real files in the `static` folder with a new folder called `virtual`. That `virtual` folder will hold all the virtual files that should become part of the public site.

The preview now looks better, with appropriate styling and a little person icon. The thumbnail images still need to be fixed.

</clipboard-copy>

## Create a virtual folder of thumbnails

In the `index.ori` template, you're using a `map()` function to turn data in `teamData.yaml` into HTML text. You can also use a `map()` to convert a folder of real images into a virtual folder of modified images. In this case, you'll create a virtual folder of thumbnails.

<span class="tutorialStep"></span> View the images in the `src/static/images` folder. Each person in `teamData.yaml` identifies one of these sample images as a profile photo.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public = merge(static, virtual):

virtual:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=200)):

title: Our Amazing Team
```

</clipboard-copy>

With this, the index page can now load thumbnail images from the virtual `thumbnails` folder.

<span class="tutorialStep"></span> In the Glitch preview address bar, enter: `thumbnails`

The virtual `names` folder contains a set of thumbnail images. _These images do not exist._ Or rather they don't exist in persistent form; they are potential images that are only created when you ask for them.

<span class="tutorialStep"></span> Open one of the virtual thumbnail images to see one of the original images at a smaller size.

Note: on "retina" displays with high pixel densities, the thumbnails will look blurry. You can double the resolution of the thumbnails by doubling the thumbnail width to `width=400`. It's beyond the scope of this tutorial, but you could use the techniques described here to create [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images), with multiple formulas formatting or scaling images to target displays with specific pixel densities.

<span class="tutorialStep"></span> Clear the address bar above the Glitch preview to return to the index page.

## Index the team data by person name

The last part of your site you need to make is a virtual folder containing an HTML for each team member. To lay the groundwork for that, you're first going to create an intermediate folder with the same data as `teamData.yaml`, but where the files are named after the people on the team.

The reason for this is that, as you've seen, the top-level "file" names in `teamData.yaml` are integers, like `0` for the first person. But in your final website graph, you'd like the keys of the pages in the `team` area to include the person's name, like `Alice.html`.

<span class="tutorialStep"></span> Add a new formula to the bottom of `site.vfiles`:

<clipboard-copy>

```yaml
public = merge(static, virtual):

virtual:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=200)):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
```

</clipboard-copy>

You'll use this `teamByName` folder in the next step.

## Create a folder of pages for each team member

<span class="tutorialStep"></span> In the src folder, create a new file called `person.ori` and paste this into it:

<clipboard-copy>

```html
<h1>\{\{ name }}</h1>
```

</clipboard-copy>

<span class="tutorialStep"></span> Add a new `team` formula to the `public` section of `site.vfiles`:

<clipboard-copy>

```yaml
public = merge(static, virtual):

virtual:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=200)):
  team = map(teamByName, person.ori):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
```

The `team` folder takes all the team members from `teamByName` and creates an HTML page for them.

</clipboard-copy>

<span class="tutorialStep"></span> In the Glitch preview address bar, enter: `team`

This will list the files in the virtual `team` folder.

<span class="tutorialStep"></span> Click a name like `Alice`

The preview will show a heading with a person's name like: **Alice**

<span class="tutorialStep"></span> Clear the Glitch preview address to return to the index page.

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Virtual folders created with functions like `map()` will often change the type of data, so as a convenience those functions allow you to add, change, or remove extensions.

<span class="tutorialStep"></span> Update the `team` formula in `site.vfiles`:

<clipboard-copy>

```yaml
public = merge(static, virtual):

virtual:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=200)):
  team = map(teamByName, person.ori, extension='->html'):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
```

</clipboard-copy>

<span class="tutorialStep"></span> In the preview of the index page, click the entry for a team member.

This will open a page at a URL that includes the `.html` extension, like `team/Alice.html`.

## Fill out the person template

The last step is to fill out the template for a person.

<span class="tutorialStep"></span> Update `person.ori` to:

<clipboard-copy>

```html
{{ framework-intro/assets/person.ori }}
```

</clipboard-copy>

<span class="tutorialStep"></span> Refresh or visit the page for a team member to see their information and a full-size photo.

## Consolidate the public folder definition

Before wrapping up, we can make one refinement to make the definition of the `public` folder more concise. That formula relies on a separate `virtual` folder definition that isn't used anywhere else. You can fold that `virtual` definition into the defintion of `public`.

<span class="tutorialStep"></span> Update `site.vfiles`:

<clipboard-copy>

```yaml
public = merge(static, this):
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=200)):
  team = map(teamByName, person.ori, extension='->html'):

title: Our Amazing Team
teamByName = mapKeys(teamData.yaml, =name):
```

</clipboard-copy>

The `this` keyword in `merge(static, this)` refers to everything indented on the following lines. The formula can now be read as: "The `public` folder is the result of merge the `static` folder with the following virtual files…"

The site is now complete. You could add more data to `teamData.yaml`, or enhance the templates for the index page or people pages, but form a functional standpoint, you've achieved your goal.

## Building static files

You have been viewing your About Us site using the small Graph Origami server which is running in the background. But since this particular site is fundamentally static in nature, Glitch can automatically render all the pages and other necessary resources as static files. This lets Glitch serve the site faster and more cheaply — static sites on Glitch are free.

Glitch will build the static files automatically, but if you can manually trigger the build process to see it in action.

<span class="tutorialStep"></span> Click the **Terminal** button in the toolbar at the bottom of the Glitch window.

<span class="tutorialStep"></span> In the Glitch terminal, type the following command:

```console
$ npm run build
```

This invokes a Graph Origami tool called `ori`, and instructs it to copy the contents of the entire virtual `public` graph to a real file system folder called `build`.

<span class="tutorialStep"></span> In the Glitch terminal, type:

```console
$ refresh
```

This refreshes the files shown in the main portion of the Glitch window.

<span class="tutorialStep"></span> Close the Glitch terminal.

<span class="tutorialStep"></span> Click the `build` folder on the left side of the Glitch window and view the files it contains.

In addition to copies of the real files in the `src/static` folder, the `build` folder will contain:

- A real `thumbnails` folder with real thumbnail versions of each image.
- A real `index.html` page with HTML that includes a listing for each team member.
- A real `team` folder with real HTML pages for each team member.

Because these static files are all in native web formats, your static site can be extremely fast. There are opportunities around the margins to make your site even faster, but this is already a good start on a performant site.

<span class="tutorialStep"></span> Find your site's shareable URL by clicking **Share** button in the upper right, then copy the URL for the **Live site**.

Your site will have a URL like `https://<something>.glitch.me`.

<span class="tutorialStep"></span> Open a new browser tab and navigate to that URL to see how your site will look to visitors.

## Learn more

This concludes the Graph Origami framework tutorial. You can continue exploring related aspects of Graph Origami:

- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The [Origami expression language](/language) you've been using to write formulas and template expressions has additional features which were not covered in this tutorial.
- The Graph Origami framework is built on a [core library](/core) that can let you do everything you did here with formulas, but using JavaScript instead. This can be useful in more complex projects, or if you prefer more control.
- You can implement sites like this About Us site completely from scratch using the [explorable graph pattern](/pattern) and no library or framework at all. That approach may appeal to people who want to work as close to the metal as possible, and is also useful reference if you want to understand the basics of how the Graph Origami framework works under the hood.

&nbsp;

Back to [Framework](/framework/)
