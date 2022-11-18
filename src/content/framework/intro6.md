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
  team.yaml = framework-intro/src/public/team.yaml:
  title: Our Amazing Team
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

Graph Origami uses block scoping as inspiration, applying the same idea to graphs to define a _graph scope_.

Let's consider what your formula for `index.html` has access to. First, let's identify the graphs in which that formula exists, from innermost to outermost:

1. A graph defined by the `public` folder, including the additions in `+public.yaml`
1. A graph defined by the `src` folder
1. A graph defined by the project's top-level folder
1. A graph defined by Graph Origami containing its global built-in functions

For space reasons, let's just visualize the portion of the scope graph defined by the `src` folder and below:

<figure class="fullWidth">
{{ svg step1 }}
</figure>

So when the formula for `index.html` in `+public.yaml` references `greet`, Graph Origami walks up this scope graph looking for it. In this case, it finds `greet.js` and interprets that as something that defines a function called `greet`, so the search ends there.

That formula can also reference other things in scope.

<span class="tutorialStep"></span> Update the definition for `index.html` to reference the `title`.

```yaml
title: Our Amazing Team
index.html = greet(title):
```

<span class="tutorialStep"></span> Navigate to `index.html` to see "Hello, <strong>Our Amazing Team</strong>."

As with block scoping in programming languages, in graph scoping the search only goes "up" the graph. If you want to go back deeper into the graph, you have to make an explicit reference.

For the formulas in `+public.yaml`, the `photos` folder is in scope, but the individual image files inside that folder or not, and would need to be referenced with a path like `photos/beach.jpg`.

Similarly, `team.yaml` is in scope, but the specific keys inside that data graph like `0` or `name` are not. You can reference a specific team member's name by first referencing `team.yaml`, and then providing a path that goes inside that graph.

<span class="tutorialStep"></span> Update the definition for `index.html` to reference `team.yaml/0/name`.

```yaml
title: Our Amazing Team
index.html = greet(team.yaml/0/name):
```

The `index.html` page now greets the first team member: "Hello, <strong>Alice</strong>."

Creating HTML in JavaScript functions like `greet` is certainly a common and powerful technique, but in many cases it can be overkill. Often all that's needed is a way to define the boilerplate structure of the final file (content like "Hello"), leaving placeholders for the data you want to add (like a person's name). This leads us to a discussion of templates.

## Controlling what's public

In the final site, you want virtual files like `index.html` to be visible, but you don't need to expose internal details like the `title`. You can take advantage of graph scope to hide such internal details.

A convenient place to hide internal details like `title` is in the `src` folder. Everything in that folder is available to the formulas inside the `public` folder, but nothing at the `src` folder level is going to be visible to your site visitors.

Just as you created a `+public.yaml` file in the `public` folder for virtual values that should be public, you can create a file in the `src` folder to hold virtual values that should stay private.

<span class="tutorialStep"></span> In the `src` folder, create a file called `+private.yaml`. As before, it doesn't matter what you call the file, as long as it starts with a `+` and ends with `.yaml` or `.yml`.

<span class="tutorialStep"></span> Move the `title` definition from `+public.yaml` to `+private.yaml`.

With that change, `+private.yaml` now contains:

```yaml
title: Our Amazing Team
```

And `+public.yaml` contains:

```yaml
index.html = greet(team.yaml/0/name):
```

Along the same lines, you can make the team data in `team.yaml` private.

<span class="tutorialStep"></span> Move the `team.yaml` file from `src/public` up to `src`. (If using Glitch: click the `⋮` button next to the file name, select _Rename_, then edit the name to be `src/team.yaml`.)

<span class="tutorialStep"></span> Refresh the browser preview for the `.svg` to review the new structure of the `src/public` folder.

<figure>
{{ svg step2/public }}
</figure>

With this change, the `title` and `team.yaml` are no longer in the `public` folder — but they are still in scope, so they're still available in formulas like the one for `index.html`. That lets you focus the `public` folder on just those things which must be visible in the final site.

Graph scope lets use the file system structure of any project as a way to configure what's available where.

&nbsp;

Next: [Templates](intro7.html) »
