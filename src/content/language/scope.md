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
    site.ori: |
      index.html = greet.js(name)
      name = 'Alice'
site.ori: |
  index.html = greet.js(name)
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

Most Origami expressions contain references to named functions, files, data keys, etc., which must be resolved in order to evaluate the expression. For example, consider the formula:

```
message = greet.js()
```

Or the ori command:

```console
$ ori greet.js/
```

In these examples, where does Origami look for the definition of `greet.js` function? And if `greet.js` is defined in multiple places, which definition will be used? Origami answers these questions by defining a _scope_ that is used to evaluate any expression.

## Scope in Origami is based on trees

Suppose we have a project with a file system hierarchy like:

```
package.json
ReadMe.md
src/
  assets/
    image1.jpg
  greet.js
  site.ori
```

And suppose that the file `site.ori` defines a tree:

```${'yaml'}
${ site.ori }
```

The reference to `greet` is resolved by treating the entire project as a tree:

<figure>
${ svg.js projectExample }
</figure>

When Origami needs to resolve the `greet.js` reference, it walks "up" this tree:

- It starts by looking for `greet.js` inside the `site.ori` file. This defines `index.html` and `name`, but not `greet.js`, so Origami moves up a level to the `src` folder that contains the file.
- In the `src` folder, Origami _does_ find `greet.js`. It dynamically loads that module and takes its default export as `greet`. The search ends there.
- Depending on how Origami was invoked, if `src` didn't define `greet.js`, Origami could continue walking up the file system hierarchy into the project's root folder. (See [Define a project root](#define-a-project-root).)
- The last place Origami would look is the base scope, which by default is Origami's collection of built-in functions. (See [Define a custom base scope](#define-a-custom-base-scope).)

As with block scoping in programming languages (see below), in tree scoping the search only goes up the tree. If you want to go back deeper into the tree, you must make an explicit reference using paths:

- For example, a formula in `site.ori` could obtain the project's name via `package.json/name`, because `package.json` is in scope.
- If a formula in `site.ori` wants to reference the image `image1.jpg`, it will have to do that as `assets/image1.jpg`, because `assets` is in scope but `image1.jpg` isn't.

### Like block scope in programming languages

Tree scope in Origami is inspired by [block scope](<https://en.wikipedia.org/wiki/Scope_(computer_science)#Block_scope>) in traditional, block-oriented programming languages like JavaScript. Consider the following JavaScript sample:

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

Scope in Origami works the same way, but instead of working up a hierarchy of lexical programming blocks, Origami scope works its way up a hierarchy of folders and data.

## Scope depends on location

The scope used by an Origami expression depends on where that expression is defined, not how it is called.

Suppose a project has the following structure:

```
src/
  index.ori
  site.ori
```

And the `site.ori` program defines some data:

```ori
{
  data: {
    title: "My site"
  }
  index.html = index.ori()
}
```

where the data is of interest to the template in `index.ori`:

```ori
// Won't work
`<h1>\${ data/title }</h1>`
```

Even though the `site.ori` program is calling `index.ori`, the scope available to `index.ori` depends on where it is defined: in the `src` folder. So that scope in that file searches, in order:

- Inside `index.ori`
- The `src` folder
- The project's root folder
- The project's configuration (see below)
- The Origami built-in functions

The cleanest way to make the `data` available to `index.ori` is for `site.ori` to pass it as an argument:

```ori
// site.ori
${ samples.ori/cli/scope/site.ori }
```

which `index.ori` then accepts as a parameter:

```ori
// index.ori
${ samples.ori/cli/scope/index.ori }
```

This produces:

```console
$ ori site.ori/index.html
${ samples.ori/cli/scope/site.ori/index.html }
```

Another approach would be to have `index.ori` itself look for `site.ori` (which is in scope because that file is also in the `src` folder), and then extract the `data`:

```ori
// index.ori
${ samples.ori/cli/scope/index2.ori }
```

Even though both `site.ori` and `index.ori` are referencing each other, both references will work. In some cases this approach may be appropriate, but in most cases it will be simpler to pass the data as an argument as shown above.

## Extend the language by leveraging scope

You can use this system to make new functions available to any part of Origami — the ori CLI, the Origami [template system](templates.html), or `.ori` files to define trees. All you need to do is make a JavaScript file available somewhere in scope.

In the example above, placing a file like `greet.js` in the same folder as the `site.ori` file makes the `greet` function available to expressions in `site.ori`.

## Determine what's public with project structure

Tree scope lets you use the file system structure of your project as one way to configure what's available to your own code as well as what's available to end users.

You can take advantage of tree scope to hide internal details. If the sample project above publishes the contents of `site.ori`, a user will be able to browse to the `index.html` page defined in that file — but the user will not be able to see `greet.js` or `ReadMe.md`.

## Default scope

By default, Origami tools like the [ori](/cli) command-line interface (CLI) search in the current directory, then the collection of built-in functions.

If you ask ori to evaluate an expression that includes a deeper file system path, it will search from that deeper location up to the current directory.

To use that same folder tree as an example:

```
package.json
ReadMe.md
src/
  assets/
    image1.jpg
  greet.js
  site.ori
```

From the `src` folder, you can invoke:

```console
$ ori site.ori/index.html
```

The invokes `greet`, which works because Origami finds `greet.js` in the current folder.

You can also invoke the command from the project's root:

```console
$ ori src/site.ori/index.html
```

This also works, because Origami works from the tree defining `index.html` up to the current folder.

## config.ori

Let's consider what would happen in the above project if you moved `greet.js` from the `src` folder to the project root:

```
greet.js
package.json
ReadMe.md
src/
  assets/
    image1.jpg
  site.ori
```

In this situation, you'd still be able to issue the command from the project root:

```console
$ ori src/site.ori/index.html
```

But what you couldn't do is this command from inside the `src` folder:

```console
$ ori site.ori/index.html
```

In this situation, `greet.js` is _above_ the current folder (`src`), so it's out of scope.

You can fix this by defining a file called `config.ori` at the root level of your project. This configuration file has two roles. First, it marks the root of your project. Second, any tree defined in `config.ori` becomes part of the project's base scope.

For example, you could define `config.ori` like this:

```js
{
  message = "This message is defined in the Origami configuration file.";
}
```

Then, anywhere in your project:

```console
$ ori message
This message is defined in the Origami configuration file.
```

## Accessing scope in JavaScript functions

When the ori CLI calls a JavaScript function, the `this` value inside that function will be the scope defined at that point in the project. This allows a JavaScript function to use the same Origami scope mechanism inside JavaScript.

For example, suppose you have a file called `sample.txt`:

```txt
${ samples.ori/cli/sample.txt }
```

A JavaScript file `accessScope.js` in that same folder (or in a subfolder) can read the current Origami scope from the functions `this` value:

```js
${ samples.ori/cli/accessScope.js }
```

Evaluating this will display the file:

```console
$ ori accessScope.js/
This is a text file.
```
