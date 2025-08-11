---
title: JavaScript comparison
subtitle: Differences between Origami and JavaScript expressions
---

If you're familiar with JavaScript, Origami is essentially **JavaScript expressions plus paths**. It also includes minor adaptations that make it easier to define sites with expressions.

Origami language features are generally opt-in; you don't have to use them, and can write JavaScript expressions however you'd prefer. Origami does enforce one stylistic rule: you have to put spaces around math operators.

# Quick reference

<table>
  <tr>
    <th align="left"><b>Origami</b></th>
    <th align="left"><b>Equivalent JavaScript and notes</b></th>
  </tr>
  <tr>
    <td><code>src/data.json</code></td>
    <td>
      <code>await fs.readFile("src/data.json")</code>
      <p>A file name or path in source code reads that file.</p>
    </td>
  </tr>
  <tr>
    <td><code>3 / 2</code></td>
    <td>
      <code>3 / 2</code> or <code>3/2</code>
      <p>Slashes are used for paths; put spaces around them for division.</p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;My File.txt></code></td>
    <td>
      <code>await fs.readFile("My File.txt")</code>
      <p>Use angle brackets if a path contains spaces, parentheses, quotes, etc.</p>
    </td>
  </tr>
  <tr>
    <td><code>(data.json).name</code></td>
    <td>
      <code>JSON.parse(await fs.readFile("data.json")).name</code>
      <p>Reading data out of a file implicitly parses it.</p>
    </td>
  </tr>
  <tr>
    <td><code>https://example.com</code></td>
    <td>
      <code>await fetch("https://example.com)</code>
      <p>A path can also fetch network resources.</p>
    </td>
  </tr>
  <tr>
    <td><code>"hello"</code></td>
    <td>
      <code>export default "hello";</code>
      <p>An Origami file implicitly exports the value of its top-level expression.</p>
    </td>
  </tr>
  <tr>
    <td><code>fn(a, b)</code></td>
    <td>
      <code>await fn(await a, await b)</code>
      <p>All functions and values are potentially async.</p>
    </td>
  </tr>
  <tr>
    <td><pre><code>{
  a: 1,
  b: a
}</code></pre></td>
    <td>
      <pre><code>const a = 1;
const object = {
  a,
  b: a
};
</code></pre>
      <p>An object's properties can reference its other properties.</p>
    </td>
  </tr>
  <tr>
    <td><pre><code>{
  a = fn()
}</code></pre></td>
    <td>
      <pre><code>{
  get a() {
    return fn();
  }
}</code></pre>
      <p>Define a getter with an equals sign.</p>
    </td>
  </tr>
  <tr>
    <td><pre><code>{
  (a): 1
}</code></pre></td>
    <td>
      <pre><code>Object.defineProperty(object, "a", {
  configurable: true,
  enumerable: false,
  value: 1,
  writable: true
});</code></pre>
      <p>A property name in parentheses makes it non-enumerable.</p>
    </td>
  </tr>
  <tr>
    <td><pre><code>{
  a: 1
  b: 2
}
</code></pre></td>
    <td><pre><code>{
  a: 1,
  b: 2
}
</code></pre>
      <p>Newlines can be used as separators in arrays, objects, and parameters.</p>
    </td>
  </tr>
  <tr>
    <td><code>() => { a: 1 }</code></td>
    <td>
      <code>() => ({ a: 1 })</code>
      <p>A function can directly return an object without surrounding parentheses.</p>
    </td>
  </tr>
  <tr>
    <td><pre><code>{
  index.html: "Hi"
}</code></pre></td>
    <td><pre><code>{
  "index.html": "Hi"
}</code></pre>
      <p>Object keys can be file names without having to be quoted.</p>
    </td>
  </tr>
  <tr>
    <td><code>a → b → c</code></td>
    <td>
      <code>c(b(a))</code>
      <p>The pipe operator lets left-to-right order indicate the order of evaluation.</p>
    </td>
  </tr>
</table>

When evaluating Origami expressions on the command line, some additional [shell shorthand](syntax.html#shell-shorthand) features are also available.

## Path literals

You can directly place file names, file paths, and URLs directly in Origami expressions:

```ori
Origami.mdHtml(ReadMe.md)
```

This expression passes the `ReadMe.md` file to Origami's builtin [`mdHtml`](/builtins/origami/mdHtml.html) function.

### File name heuristic

The period in `Origami.mdHtml` above is standard JavaScript syntax for property access, but the period in `ReadMe.md` is just a character in a file name. Origami uses the following heuristic to determine how to interpret a period:

- In a sequence `a.b.c`, Origami looks at the part before the first period: `a`. If that is the name of a local variable, Origami treats the `a` as a reference to that local variable, and the `.b` and `.c` as property access.
- Next Origami considers whether `a` is the name of a global variable. If so, the `a` references that global variable and the `.b` and `.c` are property access.
- If there's a local variable whose entire name is `a.b.c` (see [property keys with periods](#property-keys-with-periods)), Origami treats this as a reference to that local variable.
- Otherwise Origami treats the name `a.b.c` as a reference to a local file or folder that will be located using Origami [scope](scope.html).

In the example above, `Origami` is a global. In addition to the [standard JavaScript built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects), Origami defines just two globals itself: `Origami` and `Tree`. Here `Origami.mdHtml` gets the `mdHtml` property of the global `Origami` object.

In this example Origami treats `ReadMe.md` as the name of a local file or folder because there are no local variables and there is no global variable called `ReadMe`.

Origami allows the JavaScript math symbols `+`, `-`, `*`, and `~` to appear in a name: e.g., `package-lock.json`. To invoke a binary math operator, add spaces around it; see [Operators](#operators).

### Paths

A sequence of characters with slashes is treated as a _path_.

```ori
package.json/name
```

In a path, the first part of the path (here, `package.json`) will _always_ be treated as a single name. If that name matches a local variable, then the path will be evaluated using that variable as the start. Otherwise Origami assumes the path starts with the name of a local file or folder.

- A path beginning with `~/` will be taken as a reference to the user's home directory.
- If you want to reference an absolute path that starts with a slash, use angle brackets (below). This avoids conflict with JavaScript's regular expression syntax: `/test/`.

### URLs

If a sequence starts with a scheme (protocol) and a colon, Origami treats it as a URL: `https://example.com`.

### Angle brackets

You can explicitly define a path or URL by enclosing it in `< >` angle brackets:

```ori
<src/data.json>
```

The first part of the path (here, `src`) will be resolved using Origami scope; the rest of the path keys will be used to traverse across folders and data to retrieve a final value.

Angle brackets are also useful if your path includes spaces or other characters that aren't valid in JavaScript identifiers:

```ori
<markdown/My File with Spaces (and Parens).md>
```

Although Origami can always recognize URLs that start with a protocol, you can also put a URL in angle brackets:

```ori
<https://example.com>
```

### Result of a path literal

A path returns the raw contents of the indicated file.

- For a file name or path, this will be a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).
- For a URL, this will be an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

Origami has built-in handlers that can parse the contents of common [file types](http://localhost:5000/language/fileTypes.html) such as JSON and markdown with front matter; see that page for details. This allows you to, for example, obtain your project's version number from its `package.json` file via:

```ori
(package.json).version
```

Or you can download a file and extract data from it:

```ori
(https://example.com/data.json).users[0].name
```

You can also use angle brackets for this:

```ori
<https://example.com/data.json>.users[0].name
```

## Numbers

Origami supports integers and floating point numbers.

Origami does not yet support binary, octal, hexadecimal numeric literals, nor does it support exponential notation. If necessary you can create such numbers with the JavaScript [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) function:

```ori
Number('0xf')     // ${ Number("0xf") }
Number('1e2')     // ${ Number("1e2") }
```

## Strings

Strings with double quotes and single quotes are essentially the same as in JavaScript.

### Templates

Expressions inside an Origami template can directly return complex values like arrays, objects, or trees. Origami will perform a depth-first traversal of the result and concatenate all the values into the final string:

```
\`Some letters: \${["a", "b", "c"]}.\`    // "Some letters: abc."
```

Origami templates will `await` asynchronous values that return a `Promise`.

Origami supports JavaScript [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates): you can prefix a template with the name of a function (see functions, below).

## Operators

Origami supports nearly all JavaScript [operators](operators.html), but does not currently support the optional chaining operator `x?.y`.

Origami requires spaces around binary math operators:

- `x + y`
- `x - y`
- `x * y`
- `x / y`

Without the spaces, Origami interprets a slash as part of a path: `x/y` is a path. Similarly, math operators without surrounding spaces are treated as part of a file name: `package-lock.json` is a file name, not a subtraction operation.

Spaces are not required around unary operators: `-foo` negates the value of `foo`. If you mean to reference a local file that starts with a hyphen, put the name in angle brackets: `<-foo>`.

Because Origami only supports expressions and not statements, it does not support operators with side effects like:

- Postfix and prefix operators `++`, `--`
- Assignment operators `=`, `+=`, `-=`, etc.

Instead of JavaScript's `import()` operator, use a path literal (above).

## Implied exports

Evaluating any Origami file with the `.ori` extension returns an evaluation of the file's top-level expression — unlike JavaScript, there is no need to explicitly `export` a value.

This `message.ori` file evaluates to a string:

```ori
// message.ori
"This file exports this message."
```

It is equivalent to this JavaScript:

```js
// message.js
export default "This file exports this message.";
```

## Array and object literals

Origami's syntax for constructing array and object literals is essentially the same as JavaScript. One convenience: a newline can be used as an alternative separator instead of a comma in arrays, function parameters, and object literals.

### Property keys with periods

To make it easy to create virtual files, an object's key can contain `.` period characters even if the key isn't quoted:

```ori
{
  index.html: "Welcome to my site!"
}
```

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

## No control structures

As an expression language, Origami does not include any of JavaScript's control structures like `for` or `while` loops.

## Function calls

Function calls in Origami work like JavaScript:

```
add(1, 2)
```

You can call a function defined in a JavaScript file by referencing its file name and then invoking it with parentheses:

```ori
greet.js("Alice")
```

or with an explicit path in angle brackets:

```ori
<greet.js>("Alice")
```

Origami assumes that any function might be asynchronous, so implicitly uses `await` when calling all functions.

The Origami language runtime itself is written in JavaScript, so types such as numbers, strings, and objects are actually the same as in JavaScript. E.g., if you pass an Origami object to a JavaScript function, the value will be a regular JavaScript object.

## Lambda functions

Origami supports JavaScript's lambda function syntax:

```
(x) => fn(x)
```

Origami lambda functions are currently more limited than JavaScript's:

- No default parameters
- No rest parameters
- No parameter destructuring
