---
title: Transform graphs with formulas
numberHeadings: true
---

## Transform a graph

If you want to create a greeting page for several people, you could create a formula for each of them like the one for `alice.html` above. But you can also write formulas that transform a set of things at once.

Create a new file called `team.yaml` and enter an array of names:

```{{'yaml'}}
{{ client/samples/framework.yaml/hello/team.yaml }}
```

If you prefer JSON, you can go through this exercise by creating a `team.json` file instead:

```json
{{ client/samples/framework.yaml/hello/team.json }}
```

Since YAML can be a little easier to read and write by hand (particularly when text needs to span multiple lines), the rest of this introduction will use YAML.

Either way, the data file defines an array. We can visualize that array as a graph:

<figure>
  <img src="/figures/arrayGraph.svg">
  <figcaption>Graph defined by an array in a real YAML or JSON file</figcaption>
</figure>

In Origami, a graph is a first-class data type, so you can transform a graph like this with a formula. Create a new empty file called:

```console
greetings = map(team.yaml, greet)
```

The earlier formulas each defined a single virtual file like `message` or `hello.html`. The `greetings` formula here defines a virtual _graph_ of things.

The [map](/cli/builtins.html#map) function is a built-in function that applies a one-to-one map function like `greet` to a graph of object. The result is a new graph of transformed objects. In this case, the `greet` function maps a string to an HTML fragment. Using `map` to apply `greet` to an array of strings will produce a graph of HTML fragments.

Your `greetings` formula transforms the array in `team.yaml` into a new graph of HTML fragments.

<figure>
  <img src="/figures/greetingsGraph.svg">
  <figcaption>Virtual graph of HTML fragments produced by transforming real data values</figcaption>
</figure>

If you open http://localhost:5000/hello/, you'll see a new entry for a virtual `greetings` folder. If you click on that `greetings` name, you'll see a list of three links labeled with the indices of the array: "0", "1", "2". Clicking on one of those indices will take you to a page like http://localhost:5001/src/step2/greetings/1, which says "Hello, **Bob**!"

When you want to do work on multiple files or data values in the Origami framework, it's generally helpful to think about how you can best represent the source information as a graph, then identify the transformation you want to apply to each value in the graph. This will produce a new virtual graph of results.

<div class="two-up">
  <figure>
    <img src="/figures/arrayGraph.svg">
  </figure>
  <figure>
    <img src="/figures/greetingsGraph.svg">
  </figure>
  <figcaption>Source graph of real values</figcaption>
  <figcaption>Result graph of virtual values</figcaption>
</div>

Some notes on using the `map` function:

- `map` and the other virtual graphs used by Origami are _lazy_. They only do work when they need to. Unlike a JavaScript [Array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), the `map` function here does not do any mapping work upon invocation — it only does the work when someone requests the mapped graph's keys or values. The `greetings` graph represents _potential_ work. In this case, the HTML greeting for a person like Carol is only generated when you actually try to visit that URL.
- Origami graphs can be arbitrarily deep. A `map` applied to a deep graph will return a new, deep graph of transformed values.
- In the example above, `map` transforms the graph values but leaves the keys (the arrow labels) unchanged. You can also transform graph keys.

## Transform data into HTML with a template

Transforming data into HTML can be done with plain JavaScript, but for many cases that's overkill.

If all you want to do is pour data into a template, a template language can be more appropriate. Origami comes with built-in support for a minimalist template language called [Handlebars](https://handlebarsjs.com) whose focused feature set complements Origami very well. We'll use Handlebars in this introduction. If you prefer a different template language, you can use it with Origami but doing so is beyond the scope of this intro.

The `step3` folder also contains a Handlebars template called `person.hbs` designed to work with the above data schema. The primary user-visible content of that template is as follows:

... template goes here ..

A template is essentially a function for turning data into a text format like HTML, so Origami allows you to invoke a Handlebars template as a function. All you have to do is give that function data to transform.

In the `step3` folder, create a new, empty file called

```console
alice.html = person.hbs(alice.yaml)
```

This formula creates a virtual file called `alice.html`. The contents of that virtual file will be the HTML obtained by applying the `person.hbs` template to the data in `alice.yaml`. In this case, the primary content of the virtual `alice.html` file will be:

```html
<img
  class="avatar large"
  src="/src/assets/headshots/alice.jpg"
  alt="Alice Wijaya"
/>
<h2 class="name">Alice Wijaya</h2>
<div class="position">Experience Designer, Jakarta</div>
<p class="bio">
  Alice opens the line of communication between clients, customers, and
  businesses to get projects done. With over 15 years in both public and private
  sectors, she has experience in management consultation, team building,
  professional development, strategic implementation, and company collaboration.
  She has a passion for helping people and businesses succeed, and is always
  looking for ways to improve the world.
</p>
```

Open http://localhost:5000/step3/alice.html in your browser to view the result. It will look approximately like this:

![](person.png)

--> graph with one key/value
--> transformed graph

At this point, we're successfully transforming the data for a single person, Alice, to create a single web page for that person.

## Transform an entire graph of data into HTML

It's very common to want to transform an entire set of things to create a new set of things. For this sample About Us area, we want to transform a set of data about team members to create a corresponding set of HTML pages — one page for each person.

In the previous `step3` folder, we had data for a single individual, Alice, stored in a file `alice.yaml`.

In the `step4` folder, you'll find a consolidated data file, `team.yaml`, which contains data for 10 team members.

```yaml
alice:
  id: alice
  name: Alice Wijaya
  location: Jakarta
  position: Experience Designer
  bio: |
    Alice opens the line of communication between clients, customers, and
    businesses to get projects done. With over 15 years in both public and
    private sectors, she has experience in management consultation, team
    building, professional development, strategic implementation, and company
    collaboration. She has a passion for helping people and businesses succeed,
    and is always looking for ways to improve the world.
imani:
  id: imani
  name: Imani Davenhall
  location: Los Angeles
  position: President
  bio:
# ... data continues ...
```

Each block of data for an individual person has a key. The field we use for the key could be anything unique; here we'll use some identifier we've designated as safe to make publicly visible, as it will appear in URLs. At the moment, the key we're using (like `alice`) duplicates the value of the `id` field; we can remove the redundancy later.

We can represent the above data set as a graph:

--> graph

The `step4` folder also contains the same `person.hbs` Handlebars template that can transform the data for a single person into an HTML page for that person. We now want to apply that `person.hbs` template as a function to the entire set of team members.

In the `step4` folder, create a new, empty file called

```console
team = shallowMap(team.yaml, person.hbs)
```

This transforms the above graph of data into a new graph of virtual HTML files:

--> graph

You've now seen the basics of Origami: creating virtual files with formulas, invoking JavaScript from formulas, and using formulas to transform graphs.

Next: [Begin tackling a practical example](intro2.html)
