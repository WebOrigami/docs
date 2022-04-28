---
title: Rendering data with templates
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

Transforming data into HTML can be done with plain JavaScript, but for many cases that's overkill.

If all we want to do is pour data into a template, a template language can be more appropriate. You can use any template system with Origami, but for this tutorial we'll use the template system built into Origami. These Origami templates reuse the same expression language as Origami formulas and the ori command-line interface.

In the `src` folder, create a file called `person.ori` and type or copy/paste the following HTML:

```hbs
{{ intro/person.ori }}
```

Like most template languages, Origami templates let you mix boilerplate text with dynamic content represented with placeholders. In Origami templates, placeholders are delineated with `\{\{}}` curly braces. Here, the `\{\{name}}` placeholder indicates that we'd like to evaluate the expression `name` to produce the text that should be shown at that point. That expression will be evaluated in the context of the data for a given person.

## Applying a template as a function

A template is essentially a function for turning data into a text format like HTML, so Origami allows you to invoke a template as a function. All you have to do is give that function the data it should transform.

Create an empty file in the `src` folder with a formula that looks like this. _For both occurrences of the name "Alice", substitute a name from your team file._

```console
Alice.html = person.ori(teamByName%Alice)
```

This formula creates a virtual file called `Alice.html`. The contents of that virtual file will be the HTML obtained by applying the `person.ori` template to the data for Alice in `team.yaml`.

The `%` percent sign is used in file name formulas like this as an alternative to a regular `/` slash separator — operating systems and code editors discourage or prevent the use of slashes in file names. The above is equivalent to `teamByName/Alice`, and will extract Alice's data from the `teamByName` graph.

The content of the virtual `Alice.html` file will be:

```html
{{ intro/person.ori(teamByName%Alice) }}
```

Open `Alice.html` in the served site to view the result: Hello, **Alice**.

At this point, we're successfully transforming the data for a single person, Alice, to create a single web page for that person.

## A template is a graph transformation

We can also consider the application of a template as a graph transformation.

In the case of the above template, we can view the elements of the template as an array:

```\yaml
{{ yaml template }}
```

The first and last items in this array are boilerplate strings holding HTML; the middle element is a placeholder. As with other arrays, we can model this array as a graph.

When we apply this template to the data for a person like Alice, we transform the array graph into a new graph. Boilerplate strings in the source graph are carried over as is, while expressions in placeholders are evaluated in the context of the data. This results in a new graph of only string values.

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

Treating template application as a graph transformation results in a flexible templating system that can be extended in interesting ways, as we'll see in a bit when we look at nested templates.

The other point to note here is the expressions inside an Origami template's placeholders have access to same language facilities as Origami formulas used in file names or the ori command-line interface. Among other things, this means you can call your own JavaScript functions (like `greet`, earlier) inside template placeholders.

## Transform a data graph into HTML pages

We can use the `person.ori` template as a function that we pass to `map`. Earlier we created a `greetings` graph that mapped the team members to a graph of greetings using a JavaScript function. Let's now map the team members to HTML pages using the `person.ori` template instead.

Create a new, empty file named

```console
team = map(teamByName, person.ori)
```

If you now visit the `team` route in the served site, you'll be able to select a person's name to see a rudimentary HTML page for that person. The people data has been mapped to HTML.

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

Move or copy that `person.ori` template from the `assets` folder to the `src` folder.

Additionally, move or copy the `main.css` and `personIcon.svg` files referenced by the updated template.

When you view the pages in the `team` route now, you should see a somewhat more presentable web page. The page will contain a missing image; we'll fix that in just a minute.

## Add an HTML extension

We often use extensions at the end of file names or web routes to indicate the type of data they contain. Graph transformations will often want to change these extensions to reflect the fact that the type of data has changed. For this reason, functions like `map` allow you to add, change, or remove extensions.

In this case, we want to map a person object with a key like `Alice` to a key like `Alice.html` to reflect the fact that that transformed graph value contains HTML.

Edit the name of the formula file for the `team` so that it reads:

```console
team = map(teamByName, person.ori, '', '.html')
```

The third parameter (`''`) indicates that we don't want to remove anything from the graph keys. The fourth parameter (`'.html'`) indicates that we want to add `.html` to the graph keys. The transformation now looks like:

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

The pages in the `team` route should now end in `.html`.

## Bonus: Add avatars

A typical About Us area like our [example](/samples/aboutUs) shows headshot photographs for each team member. If you have pictures you'd like to use, you could certainly use those here.

For the sake of this tutorial, however, we'll use programmatically generated avatar images provided by a service called [Lorem Picsum](https://picsum.photos). Given an arbitrary string (like a name), that service will always return the same generated image.

From the `assets` folder, move or copy the `avatar.js` file to the `src` folder. This file contains a function that maps an input string and returns an JPEG file from the random image service.

```\js
{{ intro/avatar.js }}
```

It's not important to understand this JavaScript, only to recognize that it can do whatever it needs to do to obtain a resource from the web.

With that, you can then map the `teamByName` graph to create a corresponding graph of avatars. Create an empty file named:

```console
avatars = map(teamByName, =avatar(name), '', '.jpg')
```

You should now be able to see avatars for the people on their HTML pages.

In the served site, you can navigate to the `src/avatars` folder to see a virtual folder of the generated JPEG images. This virtual folder looks indistinguishable from a real folder of real JPEG images. As noted earlier, an important property of building content with Origami is that intermediate results are explorable in the browser or the command line.

A common feature of working with Origami is that you can smoothly move between using real and virtual files. You could use these generated avatar SVGs to get started. Later, you could delete the `avatars` formula and create a real `avatars` folder containing manually-curated images or headshot photos.

With the addition of the avatars, we've completed the essential functions of the `team` route within the About Us area of the site we're designing. We could add more data fields to `team.yaml` and render those in the `person.ori` template, but from a functional standpoint, we're done with that part of the task.

Next: [Nested templates](intro5.html) »
