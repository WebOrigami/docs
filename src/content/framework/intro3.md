---
title: Transform graphs with formulas
numberHeadings: true
intro = client/samples/frameworkIntro:
team.yaml = intro/team.yaml:
teamByName = mapKeys(team.yaml, =name):
greetings = map(team.yaml, =intro/greet(name)):
greetingsByName = map(teamByName, =intro/greet(name)):
---

## Transform a graph

We've seen how a formula can transform a single piece of data (a person's name, say) into some other form (a greeting). If you wanted to create a greeting page for multiple people, you could create a formula for each of them. But you can also write formulas that transform a set of things at once.

As a reminder, we can visualize the people in `team.yaml` as a graph:

<figure>
{{ svg team.yaml }}
</figure>

In Origami, a graph is a first-class data type that can be passed to functions. Create a new empty file called:

```console
greetings = map(team.yaml, greet)
```

... need to resolve different uses of greet ...

The earlier formulas each defined a single virtual file like `message` or `hello.html`. The `greetings` formula here defines a virtual _graph_ of things. It's essentially a virtual folder of virtual files.

The [map](/cli/builtins.html#map) function is a built-in function that applies a one-to-one map function like `greet` to a graph of object. The result is a new graph of transformed objects. In this case, the `greet` function maps a person to a greeting. Using `map` to apply `greet` to an graph of people produces a graph of greetings.

If you view the `src` folder through the server, you'll see a new entry for a virtual `greetings` folder. If you click on that `greetings` folder, you'll see a list of three links labeled with the indices of the array: "0", "1", "2". Clicking on one of those indices will take you to a page like `src/greetings/1`, which says "Hello, Bob!"

When you want to do work on multiple files or data values in the Origami framework, it's generally helpful to think about how you can best represent the source information as a graph, then identify the transformation you want to apply to each value in the graph. This will produce a new virtual graph of results.

<div class="two-up">
  <figure>
    {{ svg team.yaml }}
  </figure>
  <figure>
    {{ svg greetings }}
  </figure>
  <figcaption>Source graph of real values</figcaption>
  <figcaption>Result graph of virtual values</figcaption>
</div>

Some notes on using the `map` function:

- `map` and the other virtual graphs used by Origami are _lazy_. They only do work when they need to. Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `map` function here does not do any mapping work upon invocation — it only does the work when someone requests the mapped graph's keys or values. The `greetings` graph represents _potential_ work. In this case, the HTML greeting for a person like Carol is only generated when you actually try to visit that URL.
- Origami graphs can be arbitrarily deep. A `map` applied to a deep graph will return a new, deep graph of transformed values.
- In the example above, `map` transforms the graph values but leaves the keys (the arrow labels) unchanged. Below we'll see how to transform graph keys.

Using transformations like this, we can begin working towards transforming our `team.yaml` data into the About Us site we want to produce.

## Transforming a graph's keys

In the `greetings` graph shown above, the keys (labels) for the arrows are the array indices: 0, 1, 2. In our About Us site, we want the `team` route to incorporate a person's name: `Alice.html`, `Bob.html`, `Carol.html`.

To accomplish that, we can use another type of map called `mapKeys`, which changes a graph's keys. Create an empty file with the following formula name:

```console
teamByName = mapKeys(team.yaml, =name)
```

The `=name` part of the formula defines an unnamed function (called a "lambda") that will be evaluated in the context of the individual data values. In this case, the unnamed function will return the `name` property of a person. You could also define a separate JavaScript function to perform the same work, but in this case the function is simple enough to be inlined into the formula.

This `mapKeys` formula will result in a new graph using names as keys.

<div class="two-up">
  <figure>
    {{ svg team.yaml }}
  </figure>
  <figure>
    {{ svg teamByName }}
  </figure>
  <figcaption>Source graph with indices as keys</figcaption>
  <figcaption>Transformed graph with names as keys</figcaption>
</div>

## Applying multiple transformations

We can use the `teamByName` graph to rewrite our `greeting` formula. Edit the name of the file defining the `greeting` formula so that it refers to `teamByName` instead of directly referencing `team.yaml`:

```console
greeting = map(teamByName, greet)
```

This lets us transform `team.yaml` in two steps: 1) transform the integer keys to name keys, 2) transform the person data values into greeting values.

<div class="three-up">
  <figure>
    {{ svg team.yaml }}
  </figure>
  <figure>
    {{ svg teamByName }}
  </figure>
  <figure>
    {{ svg greetingsByName }}
  </figure>
  <figcaption>Source graph</figcaption>
  <figcaption>Transformed keys</figcaption>
  <figcaption>Transformed values</figcaption>
</div>

If you view the served site, you can inspect the intermediate `teamByName` graph as well as the final `greetings` graph. Being able to explore intermediate representations is, in fact, an extremely useful diagnostic feature of the Origami framework. Normally such intermediate representations are only indirectly viewable by setting debugger breakpoints and inspecting variable values in a properties panel — which is often cumbersome for complex data structures.

We've now roughed in the basic structure of the `team` route for the About Us site. The next step is to show something more interesting for a person than a simple greeting.

Next: [Templates](intro4.html) »
