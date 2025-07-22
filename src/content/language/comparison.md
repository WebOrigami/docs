---
title: JavaScript comparison
subtitle: Differences between Origami and JavaScript expressions
---

If you're familiar with JavaScript, Origami is essentially **JavaScript expressions plus paths**. It also includes some minor adaptations that make it easier to define sites with expressions.

<table>
  <tr>
    <th align="left"><b>Origami</b></th>
    <th align="left"><b>Equivalent JavaScript and notes</b></th>
  </tr>
  <tr>
    <td><code>data.json</code></td>
    <td>
      <code>await fs.readFile("data.json")</code>
      <p>A file path in source code reads that file.</p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;my-file.txt></code></td>
    <td>
      <code>await fs.readFile("my-file.txt")</code>
      <p>Use angle brackets if a path contains spaces or JS operators.</p>
    </td>
  </tr>
  <tr>
    <td><code>(data.json).name</code></td>
    <td>
      <code>JSON.parse(await fs.readFile("data.json")).name</code>
      <p>Traversing into a file implicitly parses it.</p>
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
    <td><code>{ a: 1, b: a }</code></td>
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
    <td><code>{ a = fn() }</code></td>
    <td>
      <code>{ get a() { return fn(); } }</code>
      <p>Define a getter with an equals sign.</p>
    </td>
  </tr>
  <tr>
    <td><code>{ (a): 1 }</code></td>
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
      <p>A function can directly return an object without parentheses.</p>
    </td>
  </tr>
  <tr>
    <td><pre><code>{
  index.html: "Hi"
}</code></pre></td>
    <td><pre><code>{
  "index.html": "Hi"
}</code></pre>
      <p>Object keys which are file names don't have to be quoted.</p>
    </td>
  </tr>
  <tr>
    <td><code>a → b → c</code></td>
    <td>
      <code>c(b(a))</code>
      <p>The pipe operator may clarify the order of function calls.</p>
    </td>
  </tr>
</table>

When evaluating Origami expressions on the command line, some additional [shell shorthand](syntax.html#shell-shorthand) features are also available.

## Path literals

You can directly place file paths and URLs directly in Origami expressions:

```ori
Origami.mdHtml(ReadMe.md)
```

Origami recognizes that `ReadMe.md` is a local file path and that `Origami.mdHtml` is a reference to the `mdHtml` property of the builtin `Origami` global object, so this passes the indicated file to Origami's builtin [`mdHtml`](/builtins/text/mdHtml.html) function.

Origami identifies potential paths by looking for sequences of names that may contain periods, and where the names may be joined with slashes.

In some cases, Origami can unambiguously recognize a path. If a sequence starts with a protocol, it's a URL: `https://example.com`. If a sequence doesn't start with a protocol but ends with a trailing slash, it's a path to a local folder: `src/assets/`.

### Heuristics

But for something like `x/y.z`, Origami has to decide:

- Is this a standard JavaScript expression dividing `x` by the object property `y.z`?
- Or is this a file system path to a folder `x` containing a file `y.z`?

Origami answers this question with heuristics that leverage its knowledge of which global and local variables are defined. In addition to the [standard JavaScript built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects), Origami defines two globals itself: `Origami` and `Tree`. You define local variables yourself whenever you create a function with named parameters or an object with property keys (see below).

**Step 1:** Look at the initial segment before the first slash (or if there's no slash, the whole sequence). If there is a local or global variable with that exact name, the whole sequence is a JavaScript expression.

Example:

```ori
{
  number.txt: "42"
  parsed: parseInt(number.txt)
}
```

Here the function call argument is `number.txt`. Because there's a local variable with that exact name, this sequence refers to that local variable. This will take precedence over any file system file called `number.txt`.

**Step 2:** If the first segment contains a period, take portion that segment before the first period. If there's a local or global variable with that name, the whole sequence is a JavaScript expression.

Example:

```ori
Math.PI/2
```

Here Origami looks at the initial portion of the `Math.PI` segment, which begins with `Math`. That matches the name of the global [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object, so the whole sequence is interpreted as a regular JavaScript expression dividing pi by 2.

Step 3: If none of the above apply, the whole sequence is interpreted as a local file path.

```ori
feed.json
```

There is no local or global variable called `feed.json` or `feed`, so the sequence `feed.json` will be interpreted as a file path.

### Angle brackets

The above heuristics are generally accurate enough to correctly identify file paths and URLs. You can explicitly define a path or URL by enclosing it in `< >` angle brackets:

```ori
<src/data.json>
```

By default Origami assumes that a path references the local file system. The head of the path (above, `src`) will be located using Origami [scope](scope.html). The remainder of the path will be used to traverse from that point to the indicated file.

You can also use a URL as a path:

```ori
<https://example.com>
```

A path returns the raw contents of the indicated file. For a file path, this will be a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)); for a URL this will be an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

Origami has built-in handlers that can parse the contents of common [file types](http://localhost:5000/language/fileTypes.html) such as JSON and markdown with front matter; see that page for details. This allows you to, for example, obtain your project's version number from its `package.json` file via:

```
<package.json>.version
```

## Numbers

Origami supports integers and floating point numbers.

Origami does not yet support binary, octal, hexadecimal numeric literals, nor does it support exponential notation. These forms of numbers rarely come up in the creation of websites, but if necessary you can pass them to the JavaScript [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) function:

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

Origami supports nearly all JavaScript [operators](operators.html), but does not currently support:

- Optional chaining `x?.y`

Because Origami only supports expressions and not statements, it does not support operators with side effects like:

- Postfix and prefix operators `++`, `--`
- Assignment operators `=`, `+=`, `-=`, etc.

Instead of JavaScript's `import()` operator, use a `<path>` literal (below).

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

You can call a function defined in a JavaScript file by importing it with a path and then invoking it. You can do this with an implicit path:

```ori
greet.js("Alice")
```

or with an explicit path in angle brackets:

```ori
<greet.js>("Alice")
```

Origami assumes that any function might be `async`, so implicitly uses `await` when calling them.

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
