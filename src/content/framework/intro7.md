---
title: Transforms change a graph from one form to another
greetings = map(framework-intro/team.yaml, =framework-intro/greet(name)):
---

A graph _transform_ is a function that takes a graph as input and returns a new graph as output. Transforms let you think at a high level about how to process material in bulk.

## A map applies a one-to-one function to an entire graph's values

A basic type of a transform is a _map_. A map applies a one-to-one function to all the values in a graph, giving you a new graph with the same structure as the old one — all of the same keys — but with new values. The map turns the one-to-one function into a many-to-many function.

Consider a one-to-one function like the earlier `greet()`, which takes a person's name and returns a greeting using that person's name. You can apply this one-to-one `greet` to all of the team members by using a map.

Let's apply that `greet` function to the entire set of people on the team. As a reminder, we can visualize the people in `team.yaml` as a graph:

<figure>
{{ svg framework-intro/team.yaml }}
</figure>

In Origami, a graph like this is a first-class data type that can be passed to Origami expressions or JavaScript functions. A graph can be an in-memory object, a folder tree, data in a file, dynamically-generated data, and other forms. (If you're interested, you can read more about the different [graph variants](/core/variants.html) supported by Origami.)

<span class="tutorialStep"></span> Add a new `greetings` formula to the end of `+stuff.yaml`:

```yaml
title: Our Amazing Team
index.html = index.ori():
greetings = map(team.yaml, =greet(name)):
```

The earlier formulas each defined a single virtual file like `title` or `hello.html`. The new `greetings` formula here defines a virtual _graph_ of things — a virtual folder of virtual files. The new graph will have the same keys `team.yaml`, but the values will be determined by evaluating the sub-expression `=greet(name)`.

<span class="tutorialStep"></span> View the `src` folder in the served site. (If using StackBlitz, you can refresh the pane showing the site by clicking the small Refresh icon above that pane.)

You will see a new entry for a virtual `greetings` folder. If you click on that `greetings` folder, you'll see a list of links labeled with the indices of the array: 0, 1, 2, (and more if you entered more names). Clicking an index will take you to a page like `src/greetings/1`, which says "Hello, Bob!"

The [map](/cli/builtins.html#map) function is a built-in Origami function that applies a one-to-one map function to a graph of values. The result is a new, virtual graph of transformed values.

In this case, the `=greet(name)` part of the above formula defines an unnamed function (in technical jargon, a lambda expression). The `map()` function extends the current scope with the data in the value being transforms — in this case, the data for individual person is added to the scope, so keys like `name` and `bio` are available. In this case, the `name` is passed to `greet`.

Applying this `map` to the graph of people in `team.yaml` produces a new graph of greetings:

<div class="sideBySide fullWidth">
  <figure>
    {{ svg framework-intro/team.yaml }}
  </figure>
  <figure>
    {{ svg greetings }}
  </figure>
  <figcaption>Source graph of real data</figcaption>
  <figcaption>Result graph of virtual greetings</figcaption>
</div>

When you want to do work on multiple files or data values in the Origami framework, it's generally helpful to think about how you can best represent the source information as a graph, then identify the transformation you want to apply to each value in the graph. This will produce a new virtual graph of results.

Some notes on the `map` function:

- Virtual graphs produced by `map` and the other Origami functions are _lazy_. They only do work when they need to. Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `map` function here doesn't do much work upon invocation — it only does the real work of transformation when someone asks a mapped value. In this case, the greeting for a person like Carol is only generated when you actually try to visit that URL. The `greetings` graph represents _potential_ work.
- `map` only applies the mapping function to the top-level values of a graph. If you want to apply the mapping function to the deep values of a graph, use [mapDeep](/cli/builtins.html#mapDeep) instead to obtain a new, deep graph of transformed values.

Using maps, you can begin transforming your `team.yaml` data into an About Us site.

<span class="tutorialStep"></span> Update the `index.ori` template to:

```
<h1>\{\{ title }}</h1>
\{\{ greetings }}
```

This inserts the `greetings` values into the final HTML. We're moving step closer to turning the team data into a useful list of team members.

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
{{ framework-intro/../assets/index.ori }}
```

This version of `index.ori` is slightly more elaborate, but works the same way as before. The `#map` block in the middle generates a tile element for each person in `team.yaml`. The tile makes use of the same random avatar images you created with a graph transformation earlier.

<span class="tutorialStep"></span> Refresh the preview to see a fuller implementation of the team index page.

The index page is almost complete, but the images aren't working. The above template is looking for thumbnail images in a folder called `thumbnails`, but that folder doesn't exist — yet. You could create the thumbnails by hand, but that'd be work, and you already have the large images to work from. So you can have Graph Origami create a virtual `thumbnails` folder for you.

## Transform a graph of images

Until now, the graph transformations we've looked at deal with graphs of text, but graphs can contain values of any type. We want to have a `thumbnails` folder that's based on the `photos` folder, but scales the images to a smaller size.

<span class="tutorialStep"></span> Add a new formula to `+stuff.yaml`:

```yaml
title: Our Amazing Team
index.html = index.ori():
thumbnails = map(photos, =image/resize(@value, width=200)):
```

This formula transforms the `photos` graph. For each image in that folder, the formula invokes the built-in `image/resize` function. The `map()` function extends the scope with a `@value` entry that provides access to the value being mapped — that is, the original image data. This will be passed to `image/resize`, along with an instruction to resize the image value to 200 pixels in width.

<span class="tutorialStep"></span> Navigate to `/public/.svg` to see the current state of the site as a graph. In addition to the real `photos` folder, you can now see a virtual `thumbnails` folder. Click the little dot representing that virtual folder to browse into it.

You will see a listing of the virtual image files in the `thumbnails` folder. _These images do not exist._ Or, rather, they don't exist in any persistent form; they are created on demand when you ask for them.

<span class="tutorialStep"></span> Open one of the virtual thumbnail images to see one of the original images at a smaller size.

As mentioned earlier, explorable graphs are lazy. When you write a formula to define a virtual `thumbnails` folder, no real work happens. It's only when someone asks the server for a thumbnail like `/public/thumbnails/image1.jpg` that things happen:

1. The server asks the `public` folder for the `thumbnails` subfolder.
1. The formula for `thumbnails` invokes the `map()` function, which doesn't do any real work yet, but returns an explorable graph representing a virtual folder of potential, not-yet-created thumbnails.
1. The server asks the virtual `thumbnails` folder for `image1.jpg`.
1. The `map()` function asks the real `photos` folder for the real `image1.jpg` data.
1. The `map()` function takes the image data it receives and invokes the expression `=image/resize(@value, width=200)`.
1. The built-in `image/resize` function consumes the original image and returns the data for a thumbnail image.
1. The server responds to the browser with the thumbnail image, which you see in your browser.

&nbsp;

Next: [Graph tools](intro8.html) »
