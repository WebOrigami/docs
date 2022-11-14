---
title: Map data to HTML fragments
---

## Use a map in a template

Most template languages have some form of iteration for repeating a fragment (of HTML, say) for each item in an array. In Origami templates, such things are handled with graph transformations such as maps.

If you look at the [example About Us index page](/samples/aboutUs), it contains a tile or card for each person on the team. In Origami, anytime you have a situation that can be described as, "For each X, create a Y", the situation can be handled with a graph transformation.

Above you mapped the graph of people to a graph of greetings. To create the index page you'll do something similar, but instead of creating a greeting, you'll create an HTML fragment defining a tile element for that person. You'll then combine those tile fragments to create the index page.

<span class="tutorialStep"></span> Update the `index.ori` template so that it contains:

```
<h1>\{\{ title }}</h1>
\{\{#map team.yaml}}
<li>\{\{ name }}</li>
\{\{/map}}
```

The `\{\{#`…`}}` syntax, with its `#` symbol, is a way of passing a template fragment to a function — here, the same `map` function you used earlier in the `greetings` formula. (There's nothing special about the `map` function here. It's easy to write your own functions so that they can accept template fragments, although that's beyond the scope of this tutorial.)

The fragment between the `\{\{#map}}` and `\{\{/map}}` will be passed as an addition argument to `map`. As with `greetings`, Graph Origami will evaluate that fragment in the scope of the individual person data being mapped.

<span class="tutorialStep"></span> Visit or fresh the `src/public` route in the served site to see a bulleted list of names.

## Flesh out the index page template

Now that you have a working index page, you can flesh it out with more elements.

<span class="tutorialStep"></span> From the `assets` folder, move or copy the contents of the `index.ori` template there into the `index.ori` template you've been working on in the `src` folder.

```html
{{ framework-intro/assets/index.ori }}
```

This version of `index.ori` is slightly more elaborate, but works the same way as before. The `#map` block in the middle generates a tile element for each person in `team.yaml`. The tile makes use of the same random avatar images you created with a graph transformation earlier.

<span class="tutorialStep"></span> Refresh the preview to see a fuller implementation of the team index page.

The index page is almost complete, but the images aren't working. The above template is looking for thumbnail images in a folder called `thumbnails`, but that folder doesn't exist — yet. You could create the thumbnails by hand, but that'd be work, and you already have the large images to work from. So you can have Graph Origami create a virtual `thumbnails` folder for you.

&nbsp;

Next: [Map images](intro7b.html) »
