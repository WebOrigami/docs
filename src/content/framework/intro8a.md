---
title: Map data to HTML fragments
---

## Use a map in a template

Most template languages have some form of iteration for repeating a fragment (of HTML, say) for each item in an array. In Origami templates, such things are handled with graph transforms like maps.

If you look at the
<a href="/samples/aboutUs" target="_blank">example About Us index page</a>,
it contains a tile or card for each person on the team. In Origami, anytime you have a situation that can be described as, "For each X, create a Y", you can probably handle that situation with a graph transform.

In the last step you mapped the graph of people to a graph of greetings. To create the real index page content you'll do something similar, but instead of creating a greeting, you'll make each person to an HTML fragment defining a tile element for that person. You'll then combine those tile fragments to create the index page.

<span class="tutorialStep"></span> Update the `index.ori` template so that it contains:

```
<h1>\{\{ title }}</h1>
<ul>
  \{\{#map team.yaml }}
  <li>\{\{ name }}</li>
  \{\{/map}}
</ul>
```

The `\{\{#`…`}}` syntax, with its `#` symbol, is a way of passing a template fragment to any function — here, the same `map` function you used earlier in the `greetings` formula. The `map` function is just a JavaScript function, and it's easy enough to write your own JavaScript functions so that they can accept template fragments with this syntax too (although that's beyond the scope of this tutorial).

The `map` function takes at least two arguments. Above, the first argument is the `team.yaml` graph. The second argument is all the text between the `\{\{#map}}` and `\{\{/map}}` markers.

In this case, the second argument to `map()` will be `<li>\{\{name}}</li>`. That looks like it's just text, but it's actually a little template function. Just like `index.ori` is a template that can be called like a function, this little template for a list item can also be called like a function.

Graph Origami will evaluate this unnamed template function in the scope of the individual person data being mapped. The result is:

```html
<h1>Our Amazing Team</h1>
<ul>
  {{#map framework-intro/src/team.yaml }}
  <li>{{ name }}</li>
  {{/map}}
</ul>
```

<span class="tutorialStep"></span> Visit or refresh the index page to see a bulleted list of names.

Now you have a way of picking out just the data you want from the team data and formatting it any way you'd like.

## Flesh out the index page template

The next step is to flesh out the index page template with more elements.

<span class="tutorialStep"></span> Copy and paste the following into the `index.ori` template. (You can also find this in `/assets/index.ori`.)

```html
{{ framework-intro/assets/index.ori }}
```

This version of `index.ori` is slightly more elaborate, but works just like the earlier bullet list version. The `#map` block in the middle generates a tile element for each person in `team.yaml`. Each tile includes the person's name, location, and an image.

<span class="tutorialStep"></span> Refresh the preview to see a fuller implementation of the team index page.

The thumbnail images aren't working yet. The above template is looking for thumbnail images in a folder called `thumbnails`, but that folder doesn't exist — yet. You could create the thumbnails by hand, but that'd be work, and you already have the large images to work from. So you can have Graph Origami create a virtual `thumbnails` folder for you.

&nbsp;

Next: [Transform images with a map](intro8b.html) »
