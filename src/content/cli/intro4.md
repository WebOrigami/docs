---
title: Transforming data and trees
numberHeadings: true
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
    \${body}
  </body>
</html>
`;
```

<span class="tutorialStep"></span> We can use ori to apply this template to data, potentially plucked out of a tree, to render that data as HTML:

```console
$ ori template.js greetings.yaml/Alice
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

## Transform a whole tree of stuff

Earlier you saw an `uppercase` function that takes a string argument and returns an uppercase version:

```console
$ ori uppercase.js greetings.yaml/Alice
HELLO, ALICE.
```

<span class="tutorialStep"></span> You can apply that `uppercase` transformation to an entire tree with the ori's built-in [`map`](/builtins/tree/map.html) function:

```console
$ ori map greetings.yaml, uppercase.js
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Carol: HELLO, CAROL.
```

It is easy to transform an entire async tree of one type of object into a new tree of a different type of object. You only need to identify or define a one-to-one transformation function that handles a single object, and ori can apply that as a many-to-many transformation of an entire tree.

The second argument to `map` is a function. Technically, the second argument can be any async tree, but for the moment, we'll use a regular JavaScript function.

The map example above takes the original greetings tree and creates a new tree where all the values are uppercase:

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/cli/greetings.yaml }
  </figure>
  <figure>
    ${ svg.js map samples.ori/cli/greetings.yaml, samples.ori/cli/uppercase.js }
  </figure>
  <figcaption>Original tree</figcaption>
  <figcaption>Mapped values</figcaption>
</div>

In this intro, we're just transforming text, but you can transform anything in bulk, including images and other binaries. If you can write a function to transform a single thing in JavaScript, you can use ori to apply that transformation to an entire tree of things.

## Traversing a transformed tree

<span class="tutorialStep"></span> If you ask for a specific value from a mapped tree, then only that value is computed:

```console
$ ori "map(greetings.yaml, uppercase.js)/Alice"
HELLO, ALICE.
```

`map` doesn't do all its work when invoked, but immediately returns a new async tree that will invoke the mapping function on demand. You can think of such an async tree as a _lazy dictionary_. The lazy dictionary doesn't have a permanent entry for "Alice", but if you ask for "Alice", the lazy dictionary will go and compute the desired value.

## Turn a transformed tree of stuff into files

<span class="tutorialStep"></span> You can transform a tree and save the results as files.

```console
$ ori "copy map(greetings.yaml, template.js), files/html"
$ ls html
Alice   Bob     Carol
```

<span class="tutorialStep"></span> Inspect the contents of the `html` directory to confirm that each greeting has been rendered into a separate file.

&nbsp;

Next: [Serving trees](intro5.html) »
