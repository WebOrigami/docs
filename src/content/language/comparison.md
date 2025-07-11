---
title: JavaScript comparison
subtitle: Differences between Origami and JavaScript expressions
---

If you're familiar with JavaScript, you can think of Origami as **JavaScript expressions plus paths**.

Origami also includes some minor adaptations that make it easier to define sites with expressions. An optional set of shortcuts are available when invoking Origami expressions from a command line.

This page enumerates the differences between Origami and JavaScript expressions.

## Identifiers and references

Like JavaScript, Origami is a dynamic language; you do not need to specify the type of something when defining it.

- Unlike JavaScript variable declarations (which are statements, not expressions), defining something in Origami is implicit; you do not need to prefix a declaration with `let` or `const`.
- In order to allow you to directly reference files by name, most file names are legal identifiers in Origami. For example, `index.html` is not a legal JavaScript identifier but is legal in Origami.
- The following special characters in identifiers must be escaped with a `\\` backslash:

```
(){}[]<>?!&|-=,/:`"'\#→⇒
```

- Web URLs like `https://example.com` are valid references in Origami.
- File paths like `/Users/alice/myProject/data.json` are valid references in Origami.
- [Scope](scope.html) in Origami is defined more broadly than in JavaScript. Code in a JavaScript module can only reference things outside the module via explicit `import` statements. Origami expressions can implicitly reference anything within a project.

## Numbers

Origami supports integers and floating point numbers. It does not yet support binary, octal, hexadecimal numeric literals, nor does it support exponential notation. These forms of numbers rarely come up in the creation of websites, but if necessary you can produce such numbers by calling the JavaScript [Number](/builtins/js.html) function and passing it a string:

```console
$ ori "Number('0xf')"
${ Number("0xf") + "\n" }
$ ori "Number('1e2')"
${ Number("1e2") + "\n" }
```

## Supported operators

Origami supports the following JavaScript [operators](operators.html):

- Conditional (ternary) operator `a ? b : c`
- Logical AND `&&`
- Logical OR `||`
- Logical NOT `!`
- Equality `==`
- Inequality `!=`
- Strict equality `===`
- Strict inequality `!==`
- Nullish coalescing operator `a ?? b`
- Math operators `+` `-` `*` `/` `%` `**`
- Bitwise operators `&` `|` `^` `~`
- Shift operators `<<` `>>` `>>>`
- Comma operator `,`

In order to let characters like `-` appear in references — see below —, spaces are _required_ around the math operators.

Origami does not currently support:

- Member access via `.`
- Optional chaining `x?.y`
- Computed member access `x[y]`

Because Origami only supports expressions and not statements, it does not support:

- Postfix and prefix operators `++`, `--`
- Assignment operators `=`, `+=`, `-=`, etc.

Origami has implicit imports (see below), so does not have JavaScript's `import()` operator.

## String literals

Strings with double quotes and single quotes are essentially the same as in JavaScript.

## Template literals

Origami template literals look like JavaScript's.

Expressions inside an Origami template placeholder can directly return complex values like arrays, objects, or trees. Origami will perform a depth-first traversal of the result and concatenate all the values into the final string result:

```
\`Some letters: \${["a", "b", "c"]}.\`    // Some letters: abc.
```

Origami templates will `await` asynchronous values that return a `Promise`.

Origami supports JavaScript [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates): you can prefix a template with the name of a function (see functions, below).

## Array and object literals

Origami's syntax for constructing array and object literals is very similar to JavaScript's:

```ori
{
  color: "Blue",
  size: 20,
  values: [2, 4, 6]
}
```

- A newline can be used as an alternative separator instead of a comma in array literals, object literals, and tree literals (below).
- Origami array and object literals support JavaScript [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals).
- An Origami object can define `get` methods (see below) but not `set` methods.

### Use slash syntax to access properties

JavaScript lets you access properties with the `.` operator, but the period is a legal character in Origami identifiers like `index.html` (see above). So you'll need to access properties using slightly different syntax in Origami.

Suppose you have an Origami reference to a JSON document like `package.json`, and you want to extract the `name` property from it. You can use any of the following:

- `(package.json).name` — Put the `.name` property reference immediately after a closing parenthesis
- `package.json .name` — Put a space before the `.name` property reference (a space before a `.` property reference is legal JavaScript syntax)
- `package.json/name` — Use Origami's `/` path syntax

When traversing objects like arrays and objects, Origami coerces them to an abstract tree structure. An Origami tree is like a minimalist, asynchronous JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). See the [AsyncTree interface](/async-tree/interface.html) for details.

### Local property references

In JavaScript, an object's own keys are not in scope.

```js
// Not allowed in JavaScript
{
  a: 1,
  b: a        // a is not in scope
}
```

But Origami [object properties can reference other local properties](syntax.html#object-properties-can-reference-other-local-properties)

### Property getters

Origami lets you define property getters with an abbreviated syntax that uses `=` equals signs instead of `:` colons:

```ori
{
  index.html = createPage()
}
```

Whenever this object is asked for the value of `index.html`, Origami will invoke the indicated expression — here, `createPage()` — and return that result. The above is roughly equivalent to the following JavaScript syntax:

```js
/* JavaScript approximation of the above */
{
  get ["index.html"]() { return createPage(); }
}
```

JavaScript doesn't prevent you from having a function like `createPage` be an asynchronous function, but _does_ prevent you from explicitly marking a property getter like this as `async`. Origami assumes that _any_ object property may be potentially async, and so will `await` its value before attempting to use it.

## No control structures

As an expression language, Origami does not include any of JavaScript's control structures like `for` or `while` loops.

## Function calls

Function calls in Origami work like JavaScript:

```
add(1, 2)
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

Origami lambda functions are more basic that JavaScript lambda functions:

- No default parameters
- No rest parameters
- No destructuring in parameters

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
