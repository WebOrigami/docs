---
title: Scope determines what formulas can reference
step1:
  greet.js = framework-intro/src/greet.js:
  public = merge(framework-intro/src/public, this):
    title: Our Amazing Team
    index.html = framework-intro/src/greet('world'):
  team.yaml = framework-intro/src/team.yaml:
jsScopeExample:
  Math:
    pow: (function)
  (module):
    power: 2
    sumOfSquares: (function)
    (function body):
      total: "0"
      (for):
        i: 1
        (for body):
          squared: 1
          newTotal: (What can this see?)
---

An important question to settle early is: when Graph Origami is evaluating a formula like `greet('world')`, how does it resolve the reference to `greet`? Or, as a programmer might ask, "What is the _scope_ available in formulas?"

Many frameworks provide extensibility in one of two ways:

- Implicit references: the system has some set of rules for automatically deciding what a name refers to. This can be easy to start with, but can quickly become problematic as you fight with the system's built-in rules. This is particularly problematic if the system's rules are not precisely defined somewhere, and so are essentially magic.
- Explicit references: you must write code or create configuration files that define what specific names should refer to. This approach gives you more control, but is harder to get started with, and can be tedious.

Graph Origami supports both approaches. The explicit definition of scope is beyond the scope of this tutorial, but in any event that option is rarely needed. Instead, the implicit definition of scope is quite flexible while also precisely defined, giving you control over how scope works.

Let's answer this question by first looking at a very successful approach to defining scope: traditional, block-oriented programming languages.

## Comparison with block scope in programming languages

For well over half a century, many programming languages have answered the scoping question with [block scoping](<https://en.wikipedia.org/wiki/Scope_(computer_science)#Block_scope>). Let's consider how block scoping works in a language like JavaScript by looking at some sample code:

```js
const power = 2;

// Return the sum of the squares from 1 to n.
function sumOfSquares(n) {
  let total = 0;
  for (const i = 1; i <= n; i++) {
    const squared = Math.pow(i, power);
    const newTotal = total + squared; // What variables can be referenced here?
    total += newTotal;
  }
  return total;
}
```

A sample scope question to consider is: on the line that defines `newTotal`, what variables are in scope? That is, what can you write to the right of the `=` equals sign?

The answer in JavaScript and many other programming languages is that the definition of `newTotal` can "see" the following variables in scope, each defined by a different level of the programming language's hierarchical block structure:

1. Variables defined inside the same `for` block: `squared`
1. Variables defined by the `for` loop itself: `i`
1. Variables defined inside the `function` block: `total`
1. Variables defined as function parameters: `n`
1. Variables defined at the module's top level: `sumOfSquares` and `power`
1. Global objects, like `Math`

When you write a statement like `newTotal = total + squared`, the language interpreter evaluates the references `total` and `squared` by searching through the blocks of the current scope in the above order, from innermost to outermost block. (In programming languages like JavaScript, block scope only applies to variables on lines which appear _before_ the current line, but for the purposes of this analogy, we can set that refinement aside.)

We can visualize that scope as a graph. The first time through the loop, the scope looks like:

<figure class="fullWidth">
{{ svg jsScopeExample }}
</figure>

Visualized this way, looking up something in the current scope is a matter of walking metaphorically "up" the tree (here, that means moving to the left). The line for `newTotal` references `squared`, which is sitting right there in the same neighborhood of the graph; the reference to `total` requires walking up the tree a few levels.

The search always goes "up" the tree and never goes back deeper into the tree. So the definition for `squared` can see the global math object `Math` but _not_ the `pow` function inside it. The definition for `squared` must reference the `pow` function as `Math.pow`: it lets the automatic search of scope go up to find `Math`, then explicitly goes deeper into the `Math` object to find the `pow` function.

The pervasiveness of block scoping in programming suggests that it is very effective. It is both automatic and precisely defined, so it's not too hard to learn, and programmers can usually correctly predict what is or isn't in scope as they write their code.

## Scope in Graph Origami is based on graphs

Graph Origami uses block scoping as inspiration, applying the same idea to graphs.

Let's consider what your formula for `index.html` has access to. First, let's identify the graphs in which that formula exists, from innermost to outermost:

1. A graph defined by the `public` folder, including the additions in `+stuff.yaml`
1. A graph defined by the `src` folder
1. A graph defined by the project's top-level folder
1. A graph defined by Graph Origami containing its global built-in functions

For space reasons, let's just visualize the portion of the scope graph defined by the `src` folder and below:

<figure class="fullWidth">
{{ svg step1 }}
</figure>

So when the formula for `index.html` in `+stuff.yaml` references `greet`, Graph Origami walks up this scope graph looking for it. In this case, it finds `greet.js` and interprets that as something that defines a function called `greet`, so the search ends there.

That formula can also reference other things in scope.

<span class="tutorialStep"></span> Update the definition for `index.html` to reference the `title`.

```yaml
title: Our Amazing Team
index.html = greet(title):
```

<span class="tutorialStep"></span> Navigate to `index.html` to see "Hello, <strong>Our Amazing Team</strong>."

As with block scoping in programming languages, the search only goes "up" the graph. If you want to go back deeper into the graph, you have to make an explicit reference.

For the formulas in `+stuff.yaml`, the `photos` folder is in scope, but the individual image files inside that folder or not, and would need to be referenced with a path like `photos/beach.jpg`.

Similarly, `team.yaml` is in scope, but the specific keys inside that data graph like `0` or `name` are not. You can reference a specific team member's name by first referencing `team.yaml`, and then providing a path that goes inside that graph.

<span class="tutorialStep"></span> Update the definition for `index.html` to reference `team.yaml/0/name`.

```yaml
title: Our Amazing Team
index.html = greet(team.yaml/0/name):
```

The `index.html` page now greets the first team member: "Hello, <strong>Alice</strong>."

Creating HTML in JavaScript functions like `greet` is certainly a common and powerful technique, but in many cases it can be overkill. Often all that's needed is a way to define the boilerplate structure of the final file (content like "Hello"), leaving placeholders for the data we want to add (like a person's name). This leads us to a discussion of templates.

&nbsp;

Next: [Templates](intro6.html) »
