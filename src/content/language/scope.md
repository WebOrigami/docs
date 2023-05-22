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
      index.html = greet(name)
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

## Scope in Graph Origami is based on graphs

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

The reference to `greet` is resolved by treating the entire project as a graph:

<figure>
{{ @svg projectExample }}
</figure>

When Graph Origami needs to resolve the `greet` reference, it walks "up" this graph:

- It starts by looking for `greet` inside the `site.graph` file. This defines `index.html` and `name`, but not `greet`, so Graph Origami moves up a level to the `src` folder that contains the file.
- In the `src` folder, Graph Origami doesn't find `greet`, but _does_ find `greet.js`. It dynamically loads that module and takes its default export as `greet`. The search ends there.
- Depending on how Graph Origami was invoked, if `src` didn't define `greet` or `greet.js`, Graph Origami could continue walking up the file system hierarchy into the project's root folder. (See [Define a project root](#define-a-project-root).)
- The last place Graph Origami would look is the base scope, which by default is Graph Origami's collection of built-in functions. (See [Define a custom base scope](#define-a-custom-base-scope).)

As with block scoping in programming languages (see below), in graph scoping the search only goes up the graph. If you want to go back deeper into the graph, you must make an explicit reference using paths:

- For example, a formula in `site.graph` could obtain the project's name via `package.json/name`, because `package.json` is in scope.
- If a formula in `site.graph` wants to reference the image `image1.jpg`, it will have to do that as `assets/image1.jpg`, because `assets` is in scope but `image1.jpg` isn't.

### Project structure determines what's public

Graph scope lets you use the file system structure of your project as one way to configure what's available to your own code as well as what's available to end users.

You can take advantage of graph scope to hide internal details. If the little project defined above publishes the virtual contents of `site.graph`, a user will be able to browse to `index.html` — but will not be able to see `greet.js` or `ReadMe.md`.

### Extend the language by taking advantage of scope

Most frameworks let you call custom functions like `greet` so that you can define new features beyond those built into the framework. Some frameworks does this with implicit heuristics that guess what a name should refer to. This can be easy to start with, but can become problematic as you fight with the framework’s built-in rules. Other frameworks use explicit configuration: you write code or create configuration files to define what specific names should refer to. This gives you more control, but is harder to get started with and can be tedious.

The graph scope system described here attempts to balance simplicity and flexibility. You can use this system to make new functions available to any part of Graph Origami — the ori CLI, the framework's [template system](/framework/templates.html), or the framework's `.graph` files.

## Comparison with block scope in programming languages

Graphe scope in Graph Origami is inspired by [block scope](<https://en.wikipedia.org/wiki/Scope_(computer_science)#Block_scope>) in traditional, block-oriented programming languages like JavaScript. Consider the following JavaScript sample:

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

The line that defines `newTotal` can "see" the following variables in scope, each defined by a different level of the code's block structure:

- `squared` is defined inside the same `for` block
- `i` is defined by the `for` loop
- `n` and `total` is defined inside the same function
- `sumSquares` and `power` are defined at the module's top level
- `Math` and other global objects are defined by the language and the environment

Block scoping is both automatic and precisely defined, so it's not too hard to learn. Given some code to read, programmers generally can correctly predict what is or isn't in scope.

## Define a project root

By default, Graph Origami tools like the [ori](/cli) command-line interface (CLI) search in the current directory. If you ask ori to evaluate an expression that includes a deeper file system path, it will search from that deeper location up to the current directory.

To use that same folder tree as an example:

```
package.json
ReadMe.md
src/
  assets/
    image1.jpg
  greet.js
  site.graph
```

From the `src` folder, you can invoke:

```console
$ ori site.graph/index.html
```

The invokes `greet`, which works because Graph Origami finds `greet.js` in the current folder.

You can also invoke the command from the project's root:

```console
$ ori src/site.graph/index.html
```

This also works, because Graph Origami works from the graph defining `index.html` up to the current folder.

### An example that doesn't work

Let's consider what would happen if you moved `greet.js` from the `src` folder to the project root:

```
greet.js
package.json
ReadMe.md
src/
  assets/
    image1.jpg
  site.graph
```

In this situation, you'd still be able to issue the command from the project root:

```console
$ ori src/site.graph/index.html
```

But what you couldn't do is this command from inside the `src` folder:

```console
$ ori site.graph/index.html
```

In this situation, `greet.js` is _above_ the current folder (`src`), so it's out of scope.

### Define a project root with ori.config.js

You can address the above situation by defining a file called `ori.config.js` at the root level of your project. This configuration file has two roles: 1) it marks the root of your project, and 2) it defines the project's base scope.

The simplest definition of `ori.config.js` is to export the Graph Origami built-in functions:

```js
// ori.config.js
import { builtins } from "@graphorigami/origami";
export default builtins;
```

With such a file in place, instead of stopping its search of the file system hierarchy at the current folder, it will continue searching up to the project root. As a last resort, it will search inside the graph exported by the configuration file — here, the Graph Origami built-in functions.

## Define a custom base scope

You can make additional custom commands available throughout your project by including them in the graph exported by `ori.config.js`.

For example, you could rewrite `ori.config.js` to include a custom `uppercase` command in the base scope for your project:

```js
// ori.config.js
import { builtins, MergeGraph } from "@graphorigami/origami";
export default new MergeGraph(
  {
    uppercase(s) {
      return s.toUpperCase();
    },
  },
  builtins
);
```
