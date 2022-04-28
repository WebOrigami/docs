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

The last functional part of the About Us area we need to create is the main `index.html` page. By now it will not surprise you that we'll create that page with another graph transformation.

## Creating an index page template

To rough in the index page, create a new file called `index.ori` with the following content:

```html
<h1>About Us</h1>
```

This will be the basis for an Origami template for our index page. To use it, create a new, empty file called

```console
index.html = index.ori()
```

This formula specifies that, if someone asks for `index.html`, then the `index.ori` template should be invoked as a function. You don't need to pass data to that function; this particular template will eventually ask for the data it wants.

You should now be able to visit `index.html` in the served site. If you ever want to return to the listing of files, you can always navigate to a hidden route called `.index`. This route is provided by the Origami server as a diagnostic tool, so you can always browse all parts of the virtual graph you're creating.

## Using a nested template

Most template languages have some form of iteration for repeating a fragment (of HTML, say) for each item in an array. In Origami, such things are handled with graph transformations.

If you look at the [example About Us index page](/samples/aboutUs), it contains a tile or card for each person on the team. In Origami, anytime you have a situation like this that can be described as, "For each _x_, create a _y_", the situation can probably be handled with a graph transformation.

Earlier we mapped the graph of people to a graph of HTML pages. Here we'll do something similar, but instead of creating a full HTML page for each person on the team, we'll create an HTML fragment defining a tile element for that person. We'll then combine those tile fragments to create the index page.

Update the `index.ori` template so that it contains:

```html
{{index.ori}}
```

The `\{\{#…}}` syntax invokes the same `map` function we've already been using in formulas. The fragment between the `\{\{#map}}` and `\{\{/map}}` will be passed as an additional argument to the `map` function. That fragment will be evaluated in the context of the item being mapped. In this case, `\{\{name}}` will refer to the name of an individual person in `team.yaml`.

Earlier we saw how applying an Origami template was a kind of graph transformation that produced a graph of text. In the case of `index.ori`, this transformation produces a multi-level graph of text.

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

As before, a boilerplate string like `<h1>About Us</h1>` is mapped directly into the graph of strings. The `#map` block in the template is a placeholder that is evaluated. It produces its own subgraph of strings: an HTML fragment like `<li>Alice</li>` for each person.

The entire deep graph of strings is concatenated in depth-first order to produce the final result, which is served as `index.html`.

If you now visit `index.html` in the served site, you should see a list of names.

## Flesh out the index page template

Now that we have a working index page, you can flesh it out with more elements. From the `assets` folder, move or copy the `index.ori` template into the `src` folder.

```html
{{ intro/index.ori }}
```

This version of `index.ori` is slightly more elaborate, but works the same way as the one above. The `#map` block in the middle will generate a tile element for each person in `teamByName`. The tile will make use of the same random avatar images we created with a graph transformation earlier.

If you click on one of the tiles in the index page, it should take you to the `team` page for that individual.

Next: [Deploying](intro6.html) »
