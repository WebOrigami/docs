---
title: JavaScript comparison
subtitle: Differences between Origami and JavaScript expressions
---

The Origami language is an expression language modeled after basic expressions in JavaScript.

Origami is focused on tasks like defining a website at a high level and can also be a useful scripting language. Towards those ends Origami deviates from JavaScript's syntax in some places and omits many JavaScript features. This page enumerates the differences between Origami and JavaScript expressions.

## Identifiers and references

Like JavaScript, Origami is a dynamic language; you do not need to specify the type of something when defining it.

- Unlike JavaScript variable declarations, defining something in Origami is implicit; you do not need to prefix a declaration with `let` or `const`.
- In order to allow you to directly reference files by name, most file names are legal identifiers in Origami. For example, `index.html` is not a legal JavaScript identifier but is legal in Origami.
- The following special characters in identifiers must be escaped with a `\\` backslash:

```
(){}[]<>-=,/:`"'\#→⇒
```

- Web URLs like `https://example.com` are valid references in Origami.
- [Scope](scope.html) in Origami is defined more broadly than in JavaScript. Code in a JavaScript module can only reference things outside the module via explicit `import` statements. Origami expressions can implicitly reference anything within a project.

## Basic numbers but no math

Origami has signed integers and floating point numbers so that you can pass numeric values to functions. Beyond that:

- No binary, octal, hex, exponential notation
- No math operators
- No logical operators
- No bitwise operators
- No ternary operator
- No nullish coalescing operator

## String literals

- Strings with double quotes and single quotes are essentially the same.

## Template literals

- Expressions inside an Origami template placeholder can directly return complex values like arrays, objects, or trees. Origami will perform a depth-first traversal of the result and concatenate all the values into the final string result.
- Origami template literals do not support JavaScript's tagged templates.

## Array and object literals

Origami's syntax for constructing array and object literals is essentially the same as JavaScript's:

```
{
  color: "Blue"
  size: 20
  values: [2, 4, 6]
}
```

- A newline can be used as an alternative separator instead of a comma in array literals, object literals, and tree literals (below).
- Trailing commas are allowed.
- An Origami object cannot define `get` or `set` methods. (Although you can define a tree with members that behave like `get` methods; see below.)
- An Origami object cannot define indirect property accessors. JavaScript in contrast allows accessors defined in `[ ]` square brackets.
- To reference a specific object value in Origami, use `/` path syntax instead of JavaScript's `.` period. If the above object is available as `obj`, then `obj/color` will be "Blue".
- Likewise, to reference a specific array value in Origami, use `/` path syntax instead of JavaScript's `[ ]` brackets. Here `obj/values/0` will be 2.
- Origami object literals support JavaScript [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals), but Origami array literals do not.

## No control structures

As an expression language, Origami does not include any of JavaScript's control structures like `for` or `while` loops.

## Function calls

Function calls in Origami look similar to functions in JavaScript:

```
myFunction()
fn(a, b, c)
```

To use Origami to call a function defined in a JavaScript file, you must use the JavaScript file's name, including the `.js` (or `.mjs`) extension:

```
greet.js("Alice")
```

Origami assumes that any function might be `async`, so implicitly uses `await` when calling them.

The Origami language runtime itself is written in JavaScript, so types described below such as numbers, strings, and objects are also the same.

## Lambda functions

Origami supports a lambda function syntax similar to JavaScript's:

```
(x) => fn(x)
```

Origami requires the parenthesis around the lambda parameters; JavaScript allows you to omit the parenthesis for a lambda with a single parameter.

For ease of use in a command shell with the Origami [CLI](/cli), the language also supports a shorthand lambda syntax:

```
=fn x
```

This avoids the need to escape the `>` greater than sign or `()` parentheses, which are typically interpreted by a shell.

## Tree literals

For many operations, Origami converts all associative types — like arrays and objects — to an abstract tree structure. See the [AsyncTree interface](/async-tree/interface.html) for details.

You can define a tree literal in Origami using a syntax that's similar to an object literal, but where keys and values are separated with `=` equal signs instead of `:` colons:

```
{
  index.html = createPage()
}
```

This type of Origami declaration will invoke the indicated expression — here, `createPage()` — whenever the value of `index.html` is retrieved. This behaves something like the JavaScript syntax for objects with `get` methods:

```js
/* JavaScript approximation of the above */
{
  get indexDotHtml() { return createPage(); }
}
```

On difference is that the Origami example permits the `createPage` function to be `async`, while JavaScript prohibits the declaration of `async` getters.

## Implied exports and imports

Any Origami file with the `.ori` extension will have its contents interpreted as an Origami expression. The result of this expression is implicitly exported and available from outside the file — unlike JavaScript, there is no need to explicitly `export` a value.

This JavaScript:

```js
// message.js
export default "This file exports this message.";
```

does the same thing as this `message.ori` file, which implies a default `export`:

```
"This file exports this message."
```

Likewise, because Origami [scope](scope.html) includes the surrounding files, it is not necessary to explicitly `import` values; you can directly refer to files by their names.

A JavaScript file might import the above message and incorporate it into an object with:

```js
// console.js
import message from "./message.js";

export default {
  "index.html": message,
};
```

An Origami file could do the same thing with:

```
{
  index.html: message.ori/
}
```

Here the trailing `/` slash is used to get the evaluated contents of `message.ori`.
