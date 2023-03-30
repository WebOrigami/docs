---
title: Transforming data and graphs
numberHeadings: true
intro: !ori client/samples/cli.yaml
---

## Transform data into something presentable with a template

Template languages are useful for translating data into something you can present to a user. As a bare-bones template system, let's look at a function that renders HTML using a native JavaScript template literal:

```console
$ ori template.js
export default (body) => `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Zapfino, Segoe Script, cursive;
        color: darkred;
        font-size: 48px;
      }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>
`;
```

<span class="tutorialStep"></span> We can use ori to apply this template to data, potentially plucked out of a graph, to render that data as HTML:

```console
$ ori template greetings.yaml/Alice
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Zapfino, Segoe Script, cursive;
        color: darkred;
        font-size: 48px;
      }
    </style>
  </head>
  <body>
    Hello, Alice.
  </body>
</html>
```

You could save this output as an HTML file and open it in your browser, or in a minute you'll see another way to view such a page directly.

## Transform a whole graph of stuff

Earlier you saw an `uppercase` function that takes a string argument and returns an uppercase version:

```console
$ ori uppercase greetings.yaml/Alice
HELLO, ALICE.
```

<span class="tutorialStep"></span> You can apply that `uppercase` transformation to an entire graph with the ori's built-in [@map/values](builtins.html#mapValues) function:

```console
$ ori @map/values greetings.yaml, uppercase
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Carol: HELLO, CAROL.
```

It is easy to transform an entire explorable graph of one type of object into a new graph of a different type of object. You only need to identify or define a one-to-one transformation function that handles a single object, and ori can apply that as a many-to-many transformation of an entire graph.

The second argument to `@map/values` is a function. Technically, the second argument can be any explorable graph, but for the moment, we'll use a regular JavaScript function.

The map example above takes the original greetings graph:

<figure>
{{ @svg intro/greetings.yaml }}
</figure>

and creates a new graph where all the values are uppercase:

<figure>
{{ @svg @map/values(intro/greetings.yaml, intro/uppercase) }}
</figure>

In this intro, we're just transforming text, but you can transform anything in bulk, including images and other binaries. If you can write a function to transform a single thing in JavaScript, you can use ori to apply that transformation to an entire graph of things.

## Traversing a transformed graph

<span class="tutorialStep"></span> If you ask for a specific value from a mapped graph, then only that value is computed:

```console
$ ori "@map/values(greetings.yaml, uppercase)/Alice"
HELLO, ALICE.
```

`map` doesn't do all its work when invoked, but immediately returns a new explorable graph that will invoke the mapping function on demand. You can think of such an explorable graph as a _lazy dictionary_. The lazy dictionary doesn't have a permanent entry for "Alice", but if you ask for "Alice", the lazy dictionary will go and compute the desired value.

## Use a graph as a map

Above it was noted that the second argument passed to `map` can actually be any graph, not just a mapping function. This lets you use data to transform other data.

Suppose that you have base data, like an array of people:

```console
$ ori people.yaml
- Alice
- Carol
```

And some other data that associates a person's name with a greeting:

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

<span class="tutorialStep"></span> You can then treat both the base data and the greetings data as graphs, and pass those to `map`, to turn the list of specific people into a list of greetings:

```console
$ ori @map/values people.yaml, greetings.yaml
- Hello, Alice.
- Hello, Carol.
```

<div class="sideBySide">
  <figure>
    {{ @svg intro/people.yaml }}
  </figure>
  <figure>
    {{ @svg intro/greetings.yaml }}
  </figure>
  <figure>
    {{ @svg @map/values(intro/people.yaml, intro/greetings.yaml) }}
  </figure>
  <figcaption>List of people</figcaption>
  <figcaption>Greetings for everyone</figcaption>
  <figcaption>Map to create list of greetings</figcaption>
</div>

Here the second `greetings.yaml` graph is used as a function to transform the specific names coming from `people.yaml` into greetings.

## Turn a transformed graph of stuff into files

<span class="tutorialStep"></span> You can transform a graph and save the results as files.

```console
$ ori "@copy @map/values(greetings.yaml, template), @files/html"
$ ls html
Alice   Bob     Carol
```

<span class="tutorialStep"></span> Inspect the contents of the `html` directory to confirm that each greeting has been rendered into a separate file.

&nbsp;

Next: [Serving graphs](intro5.html) »
