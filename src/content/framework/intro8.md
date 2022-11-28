---
title: Transforms change a graph from one form to another
greetings = map(framework-intro/src/public/team.yaml, =framework-intro/src/greet(name)):
---

A graph _transform_ is a function that takes a graph as input and returns a new graph as output. Transforms let you think at a high level about processing material in bulk.

## A map applies a one-to-one function to an entire graph's values

A common type of a transform is a _map_, which applies a one-to-one function to all the values in a graph. A map gives you a new graph with the same structure as the old one — all of the same keys, but with new values. The map turns the one-to-one function into a many-to-many function.

Consider a one-to-one function like the earlier `greet`, which takes a person's name and returns a greeting using that person's name. You can apply this one-to-one `greet` to all your team members by using a map.

Let's apply that `greet` function to the entire set of people on the team. As a reminder, we can visualize the people in `team.yaml` as a graph:

<figure class="constrain">
{{ svg client/samples/frameworkIntro/focusedTeam.yaml }}
</figure>

In Origami, a graph like this is a first-class data type that can be passed to Origami expressions or JavaScript functions.

<span class="tutorialStep"></span> Add a new `greetings` formula to the end of `+stuff.yaml`:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page obtained by invoking the index .ori template
index.html = index.ori():

# Graph of greetings for each team member by name
greetings = map(team.yaml, =greet(name)):
```

The earlier formula for `index.html` defined a single virtual file. The new `greetings` formula here defines a virtual _graph_ of things: a virtual folder of virtual files. The new graph will have the same integer keys as `team.yaml`, but the values will be determined by evaluating the sub-expression `=greet(name)`.

<span class="tutorialStep"></span> View the `.svg` page in the served site.

You will see a new entry for a virtual `greetings` folder. If you click on that `greetings` folder, you'll see a list of links labeled with the indices of the array: 0, 1, 2, (and more if you entered more names). Clicking an index will take you to a page like `src/greetings/1`, which says "Hello, Bob!"

The [map](/cli/builtins.html#map) function is a built-in Origami function that applies a one-to-one map function to a graph of values. The result is a new, virtual graph of transformed values.

In this case, the `=greet(name)` part of the above formula defines an unnamed function (in technical jargon, a lambda expression). The `map()` function extends the current scope with the data in the value being transforms — in this case, the data for individual person is added to the scope, so keys like `name` and `bio` are available. In this case, the `name` is passed to `greet`.

Applying this `map` to the graph of people in `team.yaml` produces a new graph of greetings:

<div class="sideBySide fullWidth">
  <figure class="constrain">
    {{ svg client/samples/frameworkIntro/focusedTeam.yaml }}
  </figure>
  <figure>
    {{ svg greetings }}
  </figure>
  <figcaption>Source graph of real data</figcaption>
  <figcaption>Result graph of virtual greetings</figcaption>
</div>

When you want to do work on multiple files or data values in the Origami framework, it's generally helpful to think about how you can best represent the source information as a graph, then identify the transformation you want to apply to each value in the graph. This will produce a new virtual graph of results.

Some notes on the `map` function:

- Virtual graphs produced by `map` and the other Origami functions are _lazy_. They only do work when they need to. Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `map` function here doesn't do much work upon invocation — it only does the real work of transformation when someone asks a mapped value. In this case, the greeting for a person like Carol is only generated when you actually try to visit that virtual page. The `greetings` graph represents _potential_ work.
- `map` only applies the mapping function to the top-level values of a graph. If you want to apply the mapping function to the deep values of a graph, use [mapDeep](/cli/builtins.html#mapDeep) instead to obtain a new, deep graph of transformed values.

Using maps, you can begin transforming your `team.yaml` data into an About Us site.

<span class="tutorialStep"></span> Update the `index.ori` template to:

```
<h1>\{\{ title }}</h1>
\{\{ greetings }}
```

This inserts the `greetings` values into the final HTML.

```html
<h1>\{\{ title }}</h1>
{{ greetings }}
```

This index page is still not what you want, but you've moved one step closer to turning the team data into a useful list of team members.

## Clean up

In the next step, you're going to replace the `greetings` graph with something more useful, so you can remove it from your site.

<span class="tutorialStep"></span> Update `+stuff.yaml` to remove the `greetings` formula, leaving just:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page obtained by invoking the index .ori template
index.html = index.ori():
```

&nbsp;

Next: [Map data to HTML fragments](intro8a.html) »
