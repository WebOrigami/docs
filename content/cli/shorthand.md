---
title: Shorthand syntax
subtitle: Additional features for ease of use in the command line
---

The Origami [CLI](/cli) can evaluate any expression in the Origami [language](/language), but a shell will also apply its own parsing to the text you enter on a command line. Such parsing often prevents the direct use of Origami's JavaScript-based syntax. For example, a shell will typically interpret a `>` greater-than sign as output redirection, preventing you from using it as part of a `=>` Origami function definition.

To accommodate the direct use of Origami on the command line, the `ori` CLI supports additional shorthand syntax.

### Implicit parentheses for function arguments

To make it easier for you to invoke functions in the command line, the CLI lets you use implicit parentheses for function calls.

For example, the above discussion of calling functions uses this example:

```console
$ ori "uppercase.js(sample.txt)"
THIS IS A TEXT FILE.
```

To avoiding having to quote the parentheses, you can rewrite this in shell shorthand:

```console
$ ori uppercase.js sample.txt
THIS IS A TEXT FILE.
```

In some situations, you can also avoid the need for parentheses by using a `/` slash; see below.

### Invoking functions with slash syntax

In Origami, functions are a type of tree, so a function can also be invoked with slash syntax. This isn't shorthand syntax, but an emergent behavior of Origami that can be particularly useful in the shell.

As an example, suppose you have a JavaScript function that accepts a `name` parameter.

```console
$ ori greet.js
export default (name = "world") => `Hello, \${name}.`;
```

To pass a string value for that parameter, you must escape the use of parentheses in the function call:

```console
$ ori "greet.js('David')"
Hello, David.
```

A function call using a slash like this lets you avoid having to quote parentheses:

```console
$ ori greet.js/David
Hello, David.
```

If the `greet.js` function here is invoked with a trailing slash, that invokes the function with an `undefined` value for the `name` parameter:

```console
$ ori greet.js/
Hello, world.
```

This use of slash syntax to invoke a function isn't limited to the command line; it works in Origami [paths](/language/expressions.html#paths) too.

### Shorthand functions

The Origami CLI supports a shorthand syntax for defining a function with a single `_` parameter.

In normal Origami you define a function that takes a single argument like this:

```ori
(x) => fn(x)
```

In the command you line you would need to escape both the `>` greater than sign and the `()` parentheses to avoid having the shell itself interpret those. As a convenience, the Origami CLI lets you shorten the above to:

```ori
=fn _
```

The function's single parameter will be available as `_`.

### Guillemet strings

Since command lines often process both single and double quotes, Origami also supports the use of European `«` and `»` guillemet quote characters. Either character can start a string; the complementary character ends it.

```console
$ ori «France»
France
$ ori »Denmark«
Denmark
```

On macOS, you can type the `«` character with Option+Backslash, and the `»` character with Option+Shift+Backslash. On Windows, you can type Alt+0171 and Alt+0187, respectively.
