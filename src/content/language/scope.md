---
title: Scope
subtitle: How references in Origami expressions are resolved
projectExample:
  package.json: |
    { "name": "Sample" }
  ReadMe.md: About this project
  src:
    assets:
      image1.jpg: "[binary data]"
    greet.js: export default function greet() ...
    site.graph: |
      index.html = 'Hello, Alice!'
      name = 'Alice'
site.graph: |
  index.html = greet(name)
  name = 'Alice'
jsScopeExample:
  Math:
    pow: "[function]"
  "[module]":
    power: 2
    sumSquares: "[function]"
    "[function body]":
      n: 3
      total: "0"
      "[for]":
        i: 1
        "[for body]":
          squared: 1
          newTotal: "[What can this see?]"
---

## What is scope?

Most Origami expressions will contain references to named functions, files, data keys, etc., which must be resolved in order to evaluate the expression. For example, consider the framework formula:

```
message = greet()
```

Or the Origami CLI command:

```console
$ ori greet
```

In these examples, where does Origami look for the definition of `greet` function? And if `greet` is defined in multiple places, which definition will be used? Graph Origami answers these questions by defining a _scope_ that is used to evaluate any expression.

A scope is essentially an ordered list of key/value pairs. When Origami needs to resolve a reference like `greet`, it consults the scope. The first appearance of the key `greet` that has a defined value (i.e., not the JavaScript `undefined` value) will be used. Keys may appear multiple times in a scope, but only the first defined value will be used.

Given the graph-focused nature of Origami, it's natural that the scope is expressed as an explorable graph.

## Implicit and explicit scoping

Most frameworks provide for some sort of extensibility — the ability to add custom functions like `greet` so that you can define new features beyond those built into the framework. Frameworks generally provide extensibility in one of two ways:

- Implicit scoping: the framework has a set of rules for automatically deciding what a name refers to. This can be easy to start with, but can quickly become problematic as you fight with the framework's built-in rules. This is particularly problematic if the framework's rules are not precisely defined somewhere, and so are essentially magic.
- Explicit scoping: you must write code or create configuration files that define what specific names should refer to. This approach gives you more control, but is harder to get started with, and can be tedious.

Graph Origami supports both approaches. The Origami CLI and Origami framework both provide a default scope that should meet most needs. Its definition is fairly simple and quite flexible, so it hopefully avoids the problems with implicit scoping in other frameworks.

If you encounter a situation where the default scope is inadequate, you can construct an explicit scope yourself to tightly control how references in Origami expressions are resolved. You construct the scope with graphs and, given that there are many ways to define graphs in Graph Origami, this hopefully avoids the problems with explicit scoping in other frameworks.

## Scope in Graph Origami is based on graphs

Graph Origami applies the principle of block scoping to explorable graphs to define a _graph scope_.

Suppose we have a project with a file system hierarchy like:

```
package.json
ReadMe.md
src/
  assets/
    image1.jpg
  greet.js
  site.graph
```

And suppose that the file `site.graph` defines a graph:

```{{'yaml'}}
{{ site.graph }}
```

To determine how this `greet()` reference in `site.graph` will be resolved, let's model the whole project as a graph, including the graph inside `site.graph`:

<figure class="fullWidth">
{{ svg projectExample }}
</figure>

When Graph Origami evaluates the formula for `index.html`, it will evaluate the expression `greet(name)`. To resolve those references, it walks up the tree, considering the following graph nodes in term:

1. The graph defined by `site.graph`: defines `name` and `index.html = greet('name')`. The latter implicitly defines a virtual file called `index.html`.
1. The graph defined by the `src` folder: defines `assets`, `greet.js`, and `site.graph`. The `greet.js` file is text, but implicitly defines a virtual value called, `greet`, which is the actual exported JavaScript function.
1. The graph defined by the project's top-level folder: defines `package.json`, `ReadMe.md`, and `src`.
1. The graph defined by Graph Origami's built-in functions.

When looking for `greet`, Graph Origami doesn't find that key in the first graph (the contents of `site.graph`), so it moves up a level to the `src` folder. There it _does_ find `greet`, so the search ends.

As with block scoping in programming languages, in graph scoping the search only goes "up" the graph. If you want to go back deeper into the graph, you must make an explicit reference using paths:

- If a formula in `site.graph` wants to reference the image `image1.jpg`, it will have to do that as `assets/image1.jpg`, because `assets` is in scope but `image1.jpg` isn't.
- A formula in `site.graph` can obtain its own project name via `package.json/name`, because `package.json` is in scope.

## Project structure can determine what's public

Graph scope lets you use the file system structure of your project as one way to configure what's available to your own code as well as what's available to end users.

You can take advantage of graph scope to hide internal details. If the little project defined above publishes the virtual contents of `site.graph`, a user will be able to browse to `index.html` — but will not be able to see `greet.js` or `ReadMe.md`.

## Comparison with block scope in programming languages

Implicit scoping in Graph Origami is inspired by scoping in traditional, block-oriented programming languages. For well over half a century, many programming languages have answered the scoping question with [block scoping](<https://en.wikipedia.org/wiki/Scope_(computer_science)#Block_scope>).

Let's consider how block scoping works in a sample of JavaScript code:

```js
const power = 2;

// Return the sum of the squares from 1 to n.
function sumSquares(n) {
  let total = 0;
  for (const i = 1; i <= n; i++) {
    const squared = Math.pow(i, power);
    const newTotal = total + squared; // What variables can be referenced here?
    total = newTotal;
  }
  return total;
}
```

A sample scope question to consider is: on the line that defines `newTotal`, what variables are in scope? That is, what can you write to the right of the `=` equals sign?

The answer in JavaScript and many other programming languages is that the definition of `newTotal` can "see" the following variables in scope, each defined by a different level of the programming language's hierarchical block structure:

1. Variables defined inside the same `for` block, like: `squared`
1. Variables defined by the `for` loop itself: `i`
1. Variables defined inside the `function`: `n` and `total`
1. Variables defined at the module's top level: `sumSquares` and `power`
1. Global objects, like `Math`

When you write a statement like `newTotal = total + squared`, the language interpreter evaluates the references `total` and `squared` by searching through the blocks of the current scope in the above order, from innermost to outermost block. (In programming languages like JavaScript, variables only become available in scope if they are encountered _before_ the current line, but for the purposes of this analogy, we can set that refinement aside.)

We can visualize that scope as a graph. If we invoke `sumSquares(3)`, the first time through the loop, the scope looks like:

<figure class="fullWidth">
{{ svg jsScopeExample }}
</figure>

Visualized this way, looking up something in the current scope is a matter of walking metaphorically "up" the tree (here, that means moving to the left). The line for `newTotal` references `squared`, which is sitting right there in the same neighborhood of the graph; the reference to `total` requires walking up the tree a few levels to find that variable.

The search always goes "up" the tree and never goes back deeper into the tree. So the definition for `sumSquares` can see the global math object `Math` but _not_ the `pow` function inside it. The definition for `sumSquares` must reference the `pow` function as `Math.pow`: it lets the automatic search of scope go up to find `Math`, then explicitly goes deeper into the `Math` object to find the `pow` function.

The pervasiveness of block scoping in programming suggests that it is very effective. It is both automatic and precisely defined, so it's not too hard to learn. Given some code to read, programmers generally can correctly predict what is or isn't in scope.
