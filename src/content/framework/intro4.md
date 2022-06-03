---
title: Transform graphs with formulas
numberHeadings: true
intro = client/samples/frameworkIntro:
team.yaml = intro/team.yaml:
teamByName = mapKeys(team.yaml, =name):
greetings = map(team.yaml, =intro/greet(name)):
greetingsByName = map(teamByName, =intro/greet(name)):
---

You've seen how a formula can transform a single piece of data like a single person's name into some other form like a greeting. If you wanted to create virtual greetings for multiple people, you could create a formula for each of them. But you can also write a formula that transforms a bunch of things at once.

## Transform a graph

Let's apply the `greet` function to the entire set of people on the team. As a reminder, we can visualize the people in `team.yaml` as a graph:

<figure>
{{ svg team.yaml }}
</figure>

In Origami, a graph like this is a first-class data type that can be passed to Origami expressions or JavaScript functions. A graph can be an in-memory object, a folder tree, data in a file, dynamically-generated data, and other forms. (If you're interested, you can read more about the different [graph variants](/core/variants.html) supported by Origami.)

<span class="tutorialStep"></span> In the `src` folder, create a new empty file called:

`greetings = map(team.yaml, =greet(name))`

The earlier formulas each defined a single virtual file like `message` or `hello.html`. The `greetings` formula here defines a virtual _graph_ of things — a virtual folder of virtual files.

<span class="tutorialStep"></span> View the `src` folder in the served site. You will see a new entry for a virtual `greetings` folder. If you click on that `greetings` folder, you'll see a list of links labeled with the indices of the array: 0, 1, 2, (and more if you entered more names). Clicking an index will take you to a page like `src/greetings/1`, which says "Hello, Bob!"

The [map](/cli/builtins.html#map) function is a built-in Origami function that applies a one-to-one map function to a graph of values. The result is a new, virtual graph of transformed values.

In this case, the `=greet(name)` part of the above formula defines an unnamed function (in technical jargon, a lambda expression) that's evaluated in the context of each individual person record. This extracts a person's name and passes it to the `greet` function.

Applying this `map` to the graph of people in `team.yaml` produces a new graph of greetings:

<div class="sideBySide">
  <figure>
    {{ svg team.yaml }}
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

Using formulas like this, you can begin transforming your `team.yaml` data into an About Us site.

## Transform a graph's keys

In the example above, `map` transforms the graph values but leaves the keys (the arrow labels) unchanged.

In the `greetings` graph shown above, the keys (labels) for the arrows are the array indices: 0, 1, 2. But in your About Us site, you want the route for a person's page to incorporate their name. To accomplish that, you can use another type of map called [mapKeys](/cli/builtins.html#mapKeys), which changes a graph's keys.

<span class="tutorialStep"></span> In the `src` folder, create an empty file with the following formula name:

`teamByName = mapKeys(team.yaml, =name)`

In this case, the `=name` expression will evaluated in the context of an individual person, and will return that person's `name` property.

This `mapKeys` formula will result in a new graph using names as keys.

<div class="sideBySide">
  <figure>
    {{ svg team.yaml }}
  </figure>
  <figure>
    {{ svg teamByName }}
  </figure>
  <figcaption>team.yaml: array indices as top-level keys</figcaption>
  <figcaption>teamByName: names as top-level keys</figcaption>
</div>

## Apply multiple transformations

You can use the `teamByName` graph to rewrite our `greeting` formula so that, instead of directly referencing `team.yaml`, it refers to `teamByName`.

<span class="tutorialStep"></span> Update the name of the file defining the `greeting` formula to be:

`greetings = map(teamByName, =greet(name))`

This lets us transform `team.yaml` in two steps: 1) transform the integer keys to name keys, 2) transform the person data values into greeting values.

<div class="sideBySide">
  <figure>
    {{ svg team.yaml }}
  </figure>
  <figure>
    {{ svg teamByName }}
  </figure>
  <figure>
    {{ svg greetingsByName }}
  </figure>
  <figcaption>team.yaml: source data</figcaption>
  <figcaption>teamByName: transformed keys</figcaption>
  <figcaption>greetings: transformed values</figcaption>
</div>

<span class="tutorialStep"></span> In the served site, inspect the intermediate `teamByName` graph as well as the final `greetings` graph.

Being able to explore intermediate representations is a valuable debugging facility of the Origami framework. Normally you can only view such intermediate representations by setting debugger breakpoints and inspecting variable values in a properties panel, which is often cumbersome for complex data structures.

You've now roughed in the basic structure of the `team` route for the About Us site. The next step is to show something more interesting for a person than a simple greeting.

&nbsp;

Next: [Templates](intro5.html) »
