---
title: Create index pages with nested templates
numberHeadings: true
intro = client/samples/frameworkIntro:
index.ori: |
  <h1>About Us</h1>
  {{#map teamByName}}
    <li>{{name}}</li>
  {{/map}}
indexTemplate:
  - <h1>About Us</h1>
  - "{{#map teamByName}}<li>{{name}}</li>{{/map}}"
indexText = results(this):
  0: "<h1>About Us</h1>"
  1 = map(intro/teamByName, =`<li>{{name}}</li>`):
index.html = index.ori(intro/team.yaml):
---

The last part of the About Us area to create is the main `index.html` page. By now it will not surprise you that you'll create that page with another graph transformation.

## Create an index page template

Let's rough in an index page.

<span class="tutorialStep"></span> Create a new file called `index.ori` that contains:

```html
<h1>About Us</h1>
```

This will be the basis for an Origami template for your index page.

<span class="tutorialStep"></span> Create a new, empty file called:

`index.html = index.ori()`

This formula specifies that, if someone asks for `index.html`, then the `index.ori` template should be invoked as a function. You don't need to pass data to that function; this particular template will ask for the data it wants.

You should now be able to visit `index.html` in the served site.

Tip: While the new index page will be more presentable, it can still be useful to view the previous default index page that listed real and virtual files. If you ever want to return that listing, navigate to the hidden route at `src/.index` that includes a period. This route is provided by the Origami server as a diagnostic tool so you can browse the virtual graph you're creating.

## Use a nested template

Most template languages have some form of iteration for repeating a fragment (of HTML, say) for each item in an array. In Origami, such things are handled with graph transformations.

If you look at the [example About Us index page](/samples/aboutUs), it contains a tile or card for each person on the team. In Origami, anytime you have a situation that can be described as, "For each X, create a Y", the situation can be handled with a graph transformation.

Earlier you mapped the graph of people to a graph of HTML pages. To create the index page you'll do something similar, but instead of creating a full HTML page for each person, you'll create an HTML fragment defining a tile element for that person. You'll then combine those tile fragments to create the index page.

<span class="tutorialStep"></span> Update the `index.ori` template so that it contains:

```html
{{index.ori}}
```

The `\{\{#…}}` syntax invokes the same `map` function you've already been using in formulas. The fragment between the `\{\{#map}}` and `\{\{/map}}` will be passed as an additional argument to the `map` function. That fragment will be evaluated in the context of the individual item being mapped.

Earlier you saw how applying an Origami template is a kind of graph transformation that produces a graph of strings. In the case of `index.ori`, this transformation produces a multi-level graph of strings.

<div class="sideBySide">
  <figure>
    {{ svg indexTemplate }}
  </figure>
  <figure>
    {{ svg indexText }}
  </figure>
  <figcaption>Graph for an index page template…</figcaption>
  <figcaption>
    …maps to graph that flattens to final text
  </figcaption>
</div>

As before, a boilerplate string like `<h1>About Us</h1>` is kept as is. The `#map` block in the template is a placeholder that is evaluated. It produces its own subgraph of strings: an HTML fragment like `<li>Alice</li>` for each person.

The entire deep graph of strings is concatenated in depth-first order to produce the final result, which is served as `index.html`.

<span class="tutorialStep"></span> Visit or fresh the `src` route in the served site. You should see a bulleted list of names.

## Flesh out the index page template

Now that you have a working index page, flesh it out with more elements.

<span class="tutorialStep"></span> From the `assets` folder, move or copy the `index.ori` template into the `src` folder.

```html
{{ intro/index.ori }}
```

This version of `index.ori` is slightly more elaborate, but works the same way as before. The `#map` block in the middle generates a tile element for each person in `teamByName`. The tile makes use of the same random avatar images you created with a graph transformation earlier.

<span class="tutorialStep"></span> Click on one of the tiles in the index page, which should take you to the `team` page for that individual.

&nbsp;

Next: [Deploying](intro7.html) »
