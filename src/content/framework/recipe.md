---
title: Create a simple About Us site
numberHeadings: true
---

<script src="/components.js"></script>

One day one of your teammates says:

> _We need an "About Us" area for our site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/samples/aboutUs" target="_blank">sample About Us area</a>
and click on a few pages. The tutorial will use this sample as a model for the site you'll build.

## Start

<span class="tutorialStep"></span> Open the
<a href="https://glitch.com/edit/#!/origami-framework-intro" target="_blank">tutorial project on Glitch</a>, a free web-based code editor.

<span class="tutorialStep"></span> Click the <strong>Remix</strong> button (or Remix to Edit) to create your own copy of the project to work on.

In the Glitch window, you will see a list of files on the left, the currently-open file in the middle, and a preview window on the right. The preview initially says "Not found", because your site is missing an index page.

## Define a virtual file

In Graph Origami, you can build things from a combination of real files that are permanently stored, and virtual files that are created on demand according to your instructions.

<span class="tutorialStep"></span> In the `src` folder, open the file called `site.vfiles`.

This is where you’re going to define virtual files that will complete the About Us site.

<span class="tutorialStep"></span> Copy/paste the following into `site.vfiles`:

<clipboard-copy>

```yaml
public:
  index.html: Hello, world!
```

</clipboard-copy>

The first line defines a virtual folder called `public`. The name "public" is not special; you could configure Graph Origami to serve a different real or virtual folder as the site.

Anything indented with two spaces beneath the first line becomes a virtual file in the `public` folder.

The second line defines a virtual file called `index.html`. Everything after the colon on that line becomes the text content of that virtual file.

The Glitch preview window updates to show: Hello, world!

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

You can refer to the names of real or virtual files in formulas to pass those files to functions.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = greet(title):

title: Our Amazing Team
```

</clipboard-copy>

This defines a new virtual file called `title` that your formulas can reference, but isn’t accessible through the site because it is not in the virtual `public` folder.

## Formulas can extract data

You can use slash-separated paths to get something out of a virtual folder or file.

<span class="tutorialStep"></span> Open the team data file in `src/team.yaml`:

```{{'yaml'}}
{{ framework-intro/src/public/team.yaml }}
```

This defines an array of person records — but this data is too boring!

<span class="tutorialStep"></span> Update the names in `team.yaml` to use your name and the names of family members or friends.

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = greet(team.yaml/0/name):

title: Our Amazing Team
```

</clipboard-copy>

This gets the first team member (the one with index `0`) defined in `team.yaml`, then gets their name. The preview now shows something like: Hello, **Alice**!

## Define a template that creates text

Instead of creating HTML in JavaScript, you can also use a template. You can use any JavaScript-based template system, but for this tutorial you'll use the template system built into Graph Origami.

<span class="tutorialStep"></span> In the src folder, create a new file called `index.ori` and paste this into it:

<clipboard-copy>

```html
<h1>\{\{ title }}</h1>
```

</clipboard-copy>

Everything inside of the curly braces `\{\{` … `}}` is treated as an expression. You can do the same things in those expressions as you can in the formulas in `site.vfiles`: you can call JavaScript function, and you can reference real and virtual files.

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
  names = map(team.yaml, =name):

title: Our Amazing Team
```

</clipboard-copy>

The `names` formula says: for each entry in `team.yaml`, return that person's name.

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

```{{'html'}}
<h1>\{\{ title }}</h1>
<ul>
\{\{ names }}
</ul>
```

</clipboard-copy>

Now the preview shows a list of team members — although the names are crammed together without spacing.

## Use a template in a formula

<span class="tutorialStep"></span> Update the `names` formula in `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():
  names = map(team.yaml, =`<li>\{\{ name }}</li>`):

title: Our Amazing Team
```

</clipboard-copy>

For each team member, the `map()` will evaluate its second argument, which here is a small template. The template is surrounded with backticks (``). It will turn a name like "Alice" into an HTML fragment: `<li>Alice</li>`.

The preview now shows a bulleted list of names.

## Use a nested template

Since the virtual `names` folder is only used in `index.ori`, you can move it inline.

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

```{{'html'}}
<h1>\{\{ title }}</h1>
<ul>
\{\{ map(team.yaml, =`<li>\{\{ name }}</li>`) }}
</ul>
```

</clipboard-copy>

The second argument to `map()` here is a smaller template instead the larger `index.ori` template.

<span class="tutorialStep"></span> In `site.vfiles`, remove the `names` formula, since you no longer need it.

## A nested template can span multiple lines

<span class="tutorialStep"></span> Update `index.ori` to:

<clipboard-copy>

```html
{{ framework-intro/assets/index.ori }}
```

</clipboard-copy>

This is functionally the same as the earlier template; it just has more elements.

The images aren't working: they reference a `thumbnails` folder that doesn't exist yet.

## Create a virtual folder of thumbnails

<span class="tutorialStep"></span> Update `site.vfiles` to:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=400)):

title: Our Amazing Team
```

</clipboard-copy>

## Index the team data by person name

<span class="tutorialStep"></span> Add a new formula to the bottom of `site.vfiles`:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=400)):

title: Our Amazing Team
teamByName = mapKeys(team.yaml, =name):
```

</clipboard-copy>

## Create a folder of pages for each team member

<span class="tutorialStep"></span> In the src folder, create a new file called `person.ori` and paste this into it:

<clipboard-copy>

```html
<h1>\{\{ name }}</h1>
```

</clipboard-copy>

<span class="tutorialStep"></span> Add a new formula to the `public` section of `site.vfiles`:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=400)):
  team = map(teamByName, person.ori):

title: Our Amazing Team
teamByName = mapKeys(team.yaml, =name):
```

</clipboard-copy>

## Add an HTML extension

<span class="tutorialStep"></span> Update the `team` formula in `site.vfiles`:

<clipboard-copy>

```yaml
public:
  index.html = index.ori():
  thumbnails = map(static/images, =image/resize(@value, width=400)):
  team = map(teamByName, person.ori, extension='->html'):

title: Our Amazing Team
teamByName = mapKeys(team.yaml, =name):
```

</clipboard-copy>

## Fill out the person template

<span class="tutorialStep"></span> Update `person.ori` to:

<clipboard-copy>

```html
{{ framework-intro/assets/person.ori }}
```

</clipboard-copy>

The site is now complete.

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
