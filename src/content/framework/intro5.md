---
title: Create index pages with nested templates
numberHeadings: true
intro = client/samples/framework.yaml/intro:
index.ori: |
  <h1>About Us</h1>
  {{#map team.yaml}}
    <li>{{name}}</li>
  {{/map}}
indexTemplate:
  - <h1>About Us</h1>
  - "{{#map team.yaml}}<li>{{name}}</li>{{/map}}"
indexText = results(this):
  0: "<h1>About Us</h1>"
  1 = map(intro/team.yaml, =`<li>{{name}}</li>`):
index.html = index.ori(intro/team.yaml):
---

The last functional part of the About Us area we need to create is the main `index.html` page. By now it will not surprise you that we'll create that page with some more graph transformations.

## Creating an index page template

To rough in the index page, create a new file called `index.ori` with the following content:

```html
<h1>About Us</h1>
```

This will be the basis for an Origami template for our index page. To use it, create a new, empty file called

```console
index.html = index.ori()
```

You should now be able to visit `index.html` in the browser.

## Using a nested template

Most template languages have some form of iteration for repeating a fragment (of HTML, say) for each item in an array. In Origami, such things are handled with graph transformations.

... link to example ...

If you look at the sample `index.html` page, it contains a tile or card for each person on the team. In Origami, anytime you have a situation that can be described as, "For each _x_, we want a _y_", the situation can probably be handled with a graph transformation. That applies to this situation, too.

Earlier we mapped the graph of people to a graph of HTML pages. Here we'll do something similar, although instead of creating a full HTML page for each person on the team, we'll create an HTML fragment for that person's tile. We'll then combine those tiles to create the index page.

Update the `index.ori` template so that it contains:

```html
{{index.ori}}
```

The `\{\{#…}}` syntax lets us invoke the same `map` function we've been using to this point. Everything between the `\{\{#map}}` and `\{\{/map}}` will be passed as an argument to the `map` function. The fragment in between will be evaluated in the context of the item being mapped so, in this case, `\{\{name}}` will refer to the name of an individual person in `team.yaml`.

Earlier we saw how applying an Origami template was a kind of graph transformation that produced a graph of text. In the case of `index.ori`, this transformation will produce a deeper graph of text.

<div class="two-up">
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

As before, a fixed string like `<h1>About Us</h1>` is mapped directly into the graph of strings. The `#map` block in the template is a placeholder that is evaluated. It produces its own subgraph of strings: an HTML fragment like `<li>Alice</li>` for each person.

The entire deep graph of strings is concatenated in depth-first order to produce the final result, which is served as `index.html`.

If you now visit `index.html`, you should see a list of names.

## Flesh out the index page template

Now that we have a working index page, you can flesh it out with more elements. From the `assets` folder, move or copy the `index.ori` template into the `src` folder.

```html
{{ intro/index.ori }}
```

This version of `index.ori` is only slightly more elaborate than the rudimentary version above, but it works the same way. The `#map` block in the middle will generate a tile for each person in `team.yaml`. The tile will make use of the same generated avatar SVGs we created with a graph transformation earlier.
