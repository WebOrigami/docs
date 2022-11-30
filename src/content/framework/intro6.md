---
title: Scope determines what formulas can reference
step1:
  greet.js = framework-intro/src/greet.js:
  public = merge(framework-intro/src/public, this):
    title: Our Amazing Team
    index.html = framework-intro/src/greet('world'):
    team.yaml = framework-intro/src/public/team.yaml:
step2:
  greet.js = framework-intro/src/greet.js:
  public:
    images = framework-intro/src/public/images:
    index.html = framework-intro/src/greet(team.yaml/0/name):
    personIcon.svg = framework-intro/src/public/personIcon.svg:
    styles.css = framework-intro/src/public/styles.css:
    (team.yaml) = framework-intro/src/public/team.yaml:
jsScopeExample: |
  Math:
    pow: "[function]"
  "[module]":
    power: 2
    sumOfSquares: "[function]"
    "[function body]":
      total: "0"
      "[for]":
        i: 1
        "[for body]":
          squared: 1
          newTotal: "[What can this see?]"
---

An important question to settle early is: when Graph Origami evaluates a formula like `greet('world')`, how does it resolve the reference to `greet`? Or, as a programmer might ask: in a formula expression, what is in _scope_?

Most frameworks provide for some sort of extensibility — the ability to add custom functions like `greet` so that you can define new features beyond those built into the framework. Frameworks generally provide extensibility in one of two ways:

- Implicit scoping: the framework has some set of rules for automatically deciding what a name refers to. This can be easy to start with, but can quickly become problematic as you fight with the framework's built-in rules. This is particularly problematic if the framework's rules are not precisely defined somewhere, and so are essentially magic.
- Explicit scoping: you must write code or create configuration files that define what specific names should refer to. This approach gives you more control, but is harder to get started with, and can be tedious.

Graph Origami supports both approaches. The explicit definition of scope is beyond the scope of this tutorial, but in any event that option is rarely needed. Instead, the implicit definition of scope is quite flexible while also precisely defined, giving you control over how scope works.

## Comparison with block scope in programming languages

Implicit scoping in Graph Origami is inspired by scoping in traditional, block-oriented programming languages. For well over half a century, many programming languages have answered the scoping question with [block scoping](<https://en.wikipedia.org/wiki/Scope_(computer_science)#Block_scope>).

Let's consider how block scoping works in a sample of JavaScript code:

```js
const power = 2;

// Return the sum of the squares from 1 to n.
function sumOfSquares(n) {
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
1. Variables defined inside the `function` block: `total`
1. Variables defined as function parameters: `n`
1. Variables defined at the module's top level: `sumOfSquares` and `power`
1. Global objects, like `Math`

When you write a statement like `newTotal = total + squared`, the language interpreter evaluates the references `total` and `squared` by searching through the blocks of the current scope in the above order, from innermost to outermost block. (In programming languages like JavaScript, variables only become available in scope if they are encountered _before_ the current line, but for the purposes of this analogy, we can set that refinement aside.)

We can visualize that scope as a graph. The first time through the loop, the scope looks like:

<figure class="fullWidth">
{{ svg jsScopeExample }}
</figure>

Visualized this way, looking up something in the current scope is a matter of walking metaphorically "up" the tree (here, that means moving to the left). The line for `newTotal` references `squared`, which is sitting right there in the same neighborhood of the graph; the reference to `total` requires walking up the tree a few levels to find that variable.

The search always goes "up" the tree and never goes back deeper into the tree. So the definition for `squared` can see the global math object `Math` but _not_ the `pow` function inside it. The definition for `squared` must reference the `pow` function as `Math.pow`: it lets the automatic search of scope go up to find `Math`, then explicitly goes deeper into the `Math` object to find the `pow` function.

The pervasiveness of block scoping in programming suggests that it is very effective. It is both automatic and precisely defined, so it's not too hard to learn. Given some code to read, programmers generally can correctly predict what is or isn't in scope.

## Scope in Graph Origami is based on graphs

Graph Origami applies block scoping to explorable graphs to define a _graph scope_.

Let's consider what your formula for `index.html` has access to. First, let's identify the graphs in which that formula exists, from innermost to outermost:

1. A graph defined by the `public` folder, including the additions in `+.yaml`
1. A graph defined by the `src` folder
1. A graph defined by the project's top-level folder
1. A graph defined by Graph Origami containing its global built-in functions

For space reasons, let's just visualize the first two steps: the portion of the scope graph defined by the `public` folder and the `src` folder:

<figure class="fullWidth">
{{ svg step1 }}
</figure>

When the formula for `index.html` in `+.yaml` references `greet`, Graph Origami walks up this scope graph looking for it. In this case, it finds `greet.js` and interprets that as something that defines a function called `greet`, so the search ends there.

That formula can also reference other things in scope.

<span class="tutorialStep"></span> Update the definition for `index.html` to reference the `title`.

```yaml
# Site title
title: Our Amazing Team

# Index page
index.html = greet(title):
```

<span class="tutorialStep"></span> Navigate to `index.html` to see "Hello, <strong>Our Amazing Team</strong>."

As with block scoping in programming languages, in graph scoping the search only goes "up" the graph. If you want to go back deeper into the graph, you have to make an explicit reference.

For the formulas in `+.yaml`, the `photos` folder is in scope, but the individual image files inside that folder or not, and would need to be referenced with a path like `photos/beach.jpg`.

Similarly, `team.yaml` is in scope, but the specific keys inside that data graph like `0` or `name` are not. You can reference a specific team member's name by first referencing `team.yaml`, and then providing a path that goes inside that graph.

<span class="tutorialStep"></span> Update the definition for `index.html` to reference `team.yaml/0/name`.

```yaml
# Site title
title: Our Amazing Team

# Index page
index.html = greet(team.yaml/0/name):
```

The `index.html` page now greets the first team member: "Hello, <strong>Alice</strong>."

## Project structure can determine what's public

In the final site, you want virtual files like `index.html` to be visible, but you don't need to expose internal data files like `team.yaml`. You can take advantage of graph scope to hide such internal details.

A convenient place to hide internal data like `team.yaml` is in the `src` folder. Everything in that folder is available to the formulas inside the `public` folder, but nothing at the `src` folder level is going to be visible to your site visitors.

<span class="tutorialStep"></span> Move the `team.yaml` file from `src/public` up to `src`. (If using Glitch: click the `⋮` button next to the file name, select _Rename_, then edit the name to be `src/team.yaml`.)

<span class="tutorialStep"></span> Refresh the browser preview `.svg` to review the new structure of the `src/public` folder.

With this change, the `team.yaml` data is no longer in the `public` folder — but it is still in scope, so it's still available in formulas like the one for `index.html`. That lets you focus the `public` folder on just those things which must be visible in the final site.

In short, graph scope lets you use the file system structure of your project as one way to configure what's available where.

## Hiding specific keys

In addition to project structure, there are other techniques to control what's publicly exposed in a graph. Another technique capitalizes on a ramification of how explorable graphs are defined.

As noted earlier, an explorable graph can support more keys than it makes public. This fact gives explorable graphs a great deal of flexibility, but for the moment we can focus on the fact that you can define a graph that has hidden keys.

This is similar to the way operating systems support hidden files: for example, files whose names begin with a `.` dot are normally excluded from directory listings.

In a Graph Origami metagraph, you can define a hidden key by surrounding its name with parentheses.

<span class="tutorialStep"></span> In `+.yaml`, add parentheses around the `title` key and update its comment:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page
index.html = greet(team.yaml/0/name):
```

<span class="tutorialStep"></span> Refresh the browser preview for the `.svg` to review the new structure of the `src/public` folder.

Now `title` is hidden from view in the `public` folder:

<figure>
{{ svg step2/public }}
</figure>

The `title` is just hidden; it's still there, it's still in scope, and it's still accessible if you know to ask for it.

<span class="tutorialStep"></span> Confirm that you can still inspect the title by navigating to `title`.

Hidden keys are a good way to define data or intermediate for internal use, or to define intermediate results — things which you won't need to include when you deploy the final site. In the case of this `title` data, you're soon going to use that data in multiple virtual files. Those virtual files will be part of the final site, but the `title` on its own won't need to be, so it can be hidden.

By considering the structure of your project to determine scope, and by deciding which keys are visible or hidden, you can shape the virtual `public` graph into the desired structure of your final site.

&nbsp;

Next: [Templates](intro7.html) »
