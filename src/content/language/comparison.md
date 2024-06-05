---
title: JavaScript comparison
subtitle: Differences between Origami and JavaScript expressions
---

If you're coming to Origami from JavaScript, it might help you to know that Origami is:

- an expression language modeled closely after expressions in JavaScript…
- with a few changes in syntax to support Origami's intended focus on defining web sites and being usable as a scripting language in a command shell.

This page enumerates the differences between Origami and JavaScript expressions.

## Identifiers and references

Like JavaScript, Origami is a dynamic language; you do not need to specify the type of something when defining it.

- Unlike JavaScript variable declarations (which are statements, not expressions), defining something in Origami is implicit; you do not need to prefix a declaration with `let` or `const`.
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

Origami could potentially support these features; so far they haven't been needed in practice.

## String literals

Strings with double quotes and single quotes are essentially the same as in JavaScript.

## Template literals

Origami template literals look like JavaScript's.

Expressions inside an Origami template placeholder can directly return complex values like arrays, objects, or trees. Origami will perform a depth-first traversal of the result and concatenate all the values into the final string result:

```
\`Some letters: \${["a", "b", "c"]}.\`    // Some letters: abc.
```

Origami templates will `await` an asynchronous substitution that returns a `Promise`.

Origami does not support JavaScript [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates).

## Array and object literals

Origami's syntax for constructing array and object literals is very similar to JavaScript's:

```
{
  color: "Blue",
  size: 20,
  values: [2, 4, 6]
}
```

- A newline can be used as an alternative separator instead of a comma in array literals, object literals, and tree literals (below).
- Origami array and object literals support JavaScript [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals).
- An Origami object cannot define indirect property accessors the way JavaScript can with `[ ]` [bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#bracket_notation).
- An Origami object cannot define `get` or `set` methods. (Although you can define a tree with members that behave like `get` methods; see below.)

Because Origami identifiers (above) like `index.html` can include periods, in Origami, you must reference object properties with `/` path syntax instead of JavaScript's `.` period operator. If the above object is available as `obj`, then `obj/color` will be "Blue".

Likewise, to reference a specific array value in Origami, use `/` [path syntax](syntax.html#paths) instead of JavaScript's `[ ]` brackets. Here `obj/values/0` will be 2.

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

The Origami language runtime itself is written in JavaScript, so types such as numbers, strings, and objects are actually the same as in JavaScript. E.g., if you pass an Origami object to a JavaScript function, the value will be a regular JavaScript object.

## Lambda functions

Origami supports a lambda function syntax similar to JavaScript's:

```
(x) => fn(x)
```

Origami requires the parenthesis around the lambda parameters. (JavaScript allows you to omit the parenthesis for a lambda with a single parameter.)

For ease of use in a command shell with the Origami [CLI](/cli), the language also supports a shorthand lambda syntax:

```
=fn x
```

This avoids the need to escape the `>` greater than sign or `()` parentheses, which are typically interpreted by a shell.

## Tree literals

For many operations, Origami converts associative types — like arrays and objects — to an abstract tree structure. An Origami tree is like a minimalist, asynchronous JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). See the [AsyncTree interface](/async-tree/interface.html) for details.

You can define a tree literal in Origami using a syntax that's similar to an object literal, but where keys and values are separated with `=` equal signs instead of `:` colons:

```
{
  index.html = createPage()
}
```

This type of Origami declaration will invoke the indicated expression — here, `createPage()` — whenever the value of `index.html` is retrieved. This behaves roughly like the JavaScript syntax for objects with `get` methods:

```js
/* JavaScript approximation of the above */
{
  get indexDotHtml() { return createPage(); }
}
```

JavaScript doesn't prevent you from having a function like `createPage` be an asynchronous function, but _does_ prevent you from explicitly marking a property getter like this as `async`. Origami tree entries like `index.html` are always presumed to be `async`.

## Implied exports and imports

Any Origami file with the `.ori` extension will have its contents interpreted as an Origami expression. The result of this expression is implicitly exported and available from outside the file — unlike JavaScript, there is no need to explicitly `export` a value.

This JavaScript:

```js
// message.js
export default "This file exports this message.";
```

does the same thing as this `message.ori` file which implies a default `export`:

```js
// message.ori
"This file exports this message.";
```

Likewise, because Origami [scope](scope.html) includes the surrounding files, it is not necessary to explicitly `import` values; you can directly reference files by their names.

A JavaScript file might import the above message and incorporate it into an object with:

```js
// site.js
import message from "./message.js";

export default {
  "index.html": message,
};
```

An Origami file could do the same thing with:

```js
// site.ori
{
  index.html: message.ori/
}
```

Here the trailing `/` slash is used to get the evaluated contents of `message.ori`.
