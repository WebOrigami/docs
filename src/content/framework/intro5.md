---
title: Render data with templates
numberHeadings: true
intro = client/samples/frameworkIntro:
teamByName = intro/teamByName:
team = intro/team:
team2 = intro/team2:
template:
  - Hello, <strong>
  - "{{name}}"
  - </strong>!
application:
  - Hello, <strong>
  - Alice
  - </strong>!
---

## Transform data into HTML with a template

You can transforming data into HTML with plain JavaScript, but for that task, a template language can be more appropriate.

You can use any template system with Origami, but for this tutorial you'll use the template system built into Origami. These Origami templates reuse the same expression language as Origami formulas and the ori command-line interface.

<span class="tutorialStep"></span> In the `src` folder, create a file called `person.ori` and type or copy/paste the following HTML:

```hbs
{{ intro/person.ori }}
```

Like most template languages, Origami templates let you mix boilerplate text with dynamic content represented with placeholders. In Origami templates, placeholders are delineated with curly braces.

Here, the `\{\{name}}` placeholder indicates that you'd like to evaluate the expression `name` in the context of the data for a single person to produce the text that should be shown.

## Apply a template as a function

A template is essentially a function for turning data into a text format like HTML, so Origami allows you to invoke a template as a function.

<span class="tutorialStep"></span> Create an empty file in the `src` folder with a formula that looks like this. If you entered more interesting names, in both places, substitute a name from your team file for "Alice".

```console
Alice.html = person.ori(teamByName%Alice)
```

This formula creates a virtual file called `Alice.html`. The virtual file contains the HTML obtained by applying the `person.ori` template to the data for Alice in `team.yaml`:

```html
{{ intro/person.ori(teamByName%Alice) }}
```

<span class="tutorialStep"></span> Open `Alice.html` in the served site to view the result: Hello, **Alice**.

The `%` percent sign is used in file name formulas as an alternative to a regular `/` slash separator, since operating systems and code editors don't like slashes in file names. The above is equivalent to `teamByName/Alice`, and will extract Alice's data from the `teamByName` graph.

At this point, you're successfully transforming the data for a single person, Alice, to create a single web page for that person.

## A template is a graph transformation

You can consider the application of a template itself as a graph transformation.

In the case of the above template, you can view the elements of the template as an array:

```\yaml
{{ yaml template }}
```

The first and last items in this array are boilerplate strings holding HTML; the middle element is a placeholder. As with other arrays, you can model this array as a graph.

When you apply this template to the data for a person like Alice, you transform the array graph into a new graph. Boilerplate strings in the source graph are carried over as is, while expressions in placeholders are evaluated in the context of the data. This results in a new graph of strings:

<div class="sideBySide">
  <figure>
    {{ svg template }}
  </figure>
  <figure>
    {{ svg application }}
  </figure>
  <figcaption>Graph for a person template…</figcaption>
  <figcaption>…maps to graph of plain strings</figcaption>
</div>

To get the final result of the template, Origami performs a depth-first traversal of the string graph, and returns the concatenation of all the strings. This produces the result: Hello, **Alice**.

Treating template application as a graph transformation results in a flexible templating system that can be extended in interesting ways, as you'll see in a bit with nested templates.

Expressions inside an Origami template's placeholders have access to same language facilities as Origami formulas used in file names or the ori command-line interface. Among other things, this means you can call your own JavaScript functions (like `greet`, earlier) inside template placeholders.

## Transform a data graph into HTML pages

Earlier you created a `greetings` graph that mapped the team members to a graph of greetings using a JavaScript function. You can also map the team members to HTML pages using your `person.ori` template.

<span class="tutorialStep"></span> Create a new, empty file named:

```console
team = map(teamByName, person.ori)
```

<span class="tutorialStep"></span> Visit the `team` route in the served site, and select a person's name to see a rudimentary HTML page for that person.

You have transformed the people data into HTML.

<div class="sideBySide">
  <figure>
    {{ svg teamByName }}
  </figure>
  <figure>
    {{ svg team }}
  </figure>
  <figcaption>Graph of people by name…</figcaption>
  <figcaption>…maps to HTML pages for each person</figcaption>
</div>

## Flesh out the person template

Let's make the `person.ori` template a bit more realistic. The project's `assets` folder contains a fuller `person.ori` template with some more elements:

```html
{{ intro/person2.ori }}
```

<span class="tutorialStep"></span> Move or copy that `person.ori` template from the `assets` folder to the `src` folder.

<span class="tutorialStep"></span> Also move or copy the `main.css` and `personIcon.svg` files referenced by the updated template.

When you view the pages in the `team` route now, you should see a somewhat more presentable web page. The page contains a missing image that you'll fix in just a minute.

## Add an HTML extension

We often use extensions at the end of file names to indicate the type of data they contain. Graph transformations will often want to change these extensions to reflect a change in the type of data. For this reason, functions like `map` allow you to add, change, or remove extensions.

In this case, you want to map a person object with a key like `Alice` to an HTML file name like `Alice.html` to reflect the fact that that transformed graph value contains HTML.

<span class="tutorialStep"></span> Update the name of the formula file for the `team` so that it reads:

```console
team = map(teamByName, person.ori, '', '.html')
```

The third parameter (`''`) indicates that you don't want to _remove_ anything from the graph keys, because they don't have any extension. The fourth parameter (`'.html'`) indicates that you want to _add_ `.html` to the graph keys. The transformation now looks like:

<div class="sideBySide">
  <figure>
    {{ svg teamByName }}
  </figure>
  <figure>
    {{ svg team2 }}
  </figure>
  <figcaption>Graph of people by name…</figcaption>
  <figcaption>…maps to a .html file for each person</figcaption>
</div>

<span class="tutorialStep"></span> Observe that the pages in the `team` route now end in `.html`.

## Bonus: Add avatars

A typical About Us area like our [example](/samples/aboutUs) shows headshot photographs for each team member. If you have pictures you'd like to use, you could use those here.

But for the sake of simplicity, you can use programmatically generated avatar images from a service like [DiceBear Avatars](https://avatars.dicebear.com/). Given an arbitrary string (like a name), that service always returns the same generated image.

<span class="tutorialStep"></span> From the `assets` folder, move or copy the `avatar.js` file to the `src` folder.

This file contains a function that maps an input string and returns a SVG file from the random avatar service.

```\js
{{ intro/avatar.js }}
```

It's not important to understand this JavaScript, only to recognize that it can do whatever it needs to do to obtain a resource from the web.

With that, you can map the `teamByName` graph to create a corresponding virtual folder of avatars.

<span class="tutorialStep"></span> Create a new, empty file named:

```console
avatars = map(teamByName, =avatar(name), '', '.svg')
```

You should now be able to see avatars for the people on their HTML pages.

In the served site, you can navigate to the `src/avatars` folder to see a virtual folder of the generated avatar images. As noted earlier, an important property of building content with Origami is that intermediate results are explorable in the browser or the command line. This virtual folder looks indistinguishable from a real folder of real images.

A common feature of working with Origami is that you can smoothly move between using real and virtual files. You could use these generated avatar SVGs to get started. Later, you could delete the `avatars` formula and create a real `avatars` folder containing manually-curated images or headshot photos.

With the addition of the avatars, you've completed the essential functions of the `team` route within the About Us area of the site you're designing. You could add more data fields to `team.yaml` and render those in the `person.ori` template, but from a functional standpoint, you're done with that part of the task.

&nbsp;

Next: [Nested templates](intro6.html) »
