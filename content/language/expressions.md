---
title: Origami expressions
subtitle: Differences from JavaScript
---

If you're familiar with JavaScript, Origami is essentially **JavaScript expressions plus paths**. It also includes minor adaptations that make it easier to define sites with expressions.

Origami language features are generally opt-in; you don't have to use them, and can write JavaScript expressions however you'd prefer. Origami does enforce one stylistic rule: you have to put spaces around math operators.

## Quick reference

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
      <p>A URL can fetch network resources.</p>
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

## Identifiers

As in JavaScript, an Origami identifier is a sequence of characters that can reference a local variable, global variable, function parameter. Additionally, in Origami an identifier can also refer to a local file or folder.

All valid JavaScript identifiers like `name` or `postal_code` are valid Origami identifiers — but to allow identifiers to more easily refer to files, Origami identifiers are more permissive than JavaScript's.

- Any character allowed in a JavaScript identifier, including characters like digits that are only allowed after the start, are allowed at any position in an Origami identifier. (Specifically, any character can be drawn from the the Unicode [ID_Continue](https://www.unicode.org/reports/tr31/#D1) class.)
- Origami identifiers can also include these anywhere: `.` `@` `~`
- Origami identifiers can include these after the first position: `!` `%` `&` `*` `+` `-` `^` `|`

Examples of identifiers which are not valid in JavaScript but which _are_ valid in Origami:

```
index.md
404.html
my-pictures
```

An identifier can appear on its own or as part of a [path](#paths).

A sequence of digits and no other characters like `123` is treated as a [number](#numbers); if you need to reference a file or folder whose name is only digits, use [angle brackets](#angle-brackets).

### File name heuristic

You can directly place file names, file paths, and URLs directly in Origami expressions:

```ori
Origami.mdHtml(ReadMe.md)
```

This expression passes the `ReadMe.md` file to Origami's builtin [`mdHtml`](/builtins/origami/mdHtml.html) function.

The period in `Origami.mdHtml` above is standard JavaScript syntax for property access, but the period in `ReadMe.md` is just a character in a file name. Origami distinguishes these cases using a heuristic.

To determine how to interpret a period in a sequence like `a.b.c`:

1. If there's a local variable whose entire name is `a.b.c`, Origami treats it as a reference to that local variable.
1. Next Origami looks at the part before the first period: `a`. If that is the name of a local variable, Origami treats the `a` as a reference to that local variable, and the `.b` and `.c` as property access.
1. Origami then considers whether `a` is the name of a global variable. If so, the `a` references that global variable and the `.b` and `.c` are property access. In addition to the [standard JavaScript built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects), Origami defines the globals `Dev`, `Origami`, `Protocol`, and `Tree`.
1. Otherwise Origami treats the complete name `a.b.c` as a reference to a local file or folder that will be located using Origami [scope](scope.html).

In the above example of `Origami.mdHtml(ReadMe.md)`:

- `Origami` is a global, so `Origami.mdHtml` gets the `mdHtml` property of the global `Origami` object. The value of that is a builtin function.
- There is no global variable called `ReadMe`, and assuming there is no local variable with that name, Origami treats `ReadMe.md` as the name of a local file or folder.

Origami allows the JavaScript math symbols `+`, `-`, `*`, and `~` to appear in a name: e.g., `package-lock.json`. To invoke a binary math operator, add spaces around it; see [Operators](#operators).

### Name conflicts

One reason the above heuristic generally works well is that most JavaScript globals start with or contain uppercase letters, while development projects often use lowercase names for folder and file names. This reduces the chances for name collisions.

That said, the following JavaScript globals or keywords are available in Origami and are entirely lowercase letters:

```
async
await
atob
bota
console
crypto
escape
eval
false
fetch
import
navigator
null
performance
process
true
typeof
undefined
unescape
void
```

If your project happens to have a folder or file that is, or starts with, one of these names, you can surround the path with [angle brackets](#angle-brackets). Example: `performance.yaml` starts with `performance`; to avoid conflicting with the `performance` global, use angle brackets: `<performance.yaml>`.

Another potential source of name conflicts are file names that begin with the same name as a local:

```ori
{
  index.html = index.ori(posts.ori)
  posts/ = Tree.map(markdown/, postPage.ori)
}
```

Here the `posts.ori` reference won’t find the expected local file. Instead, it will match the local `posts/` variable; see [local property references](#local-property-references) below. Origami will then search that result for a non-existent `ori` property. To fix this, rename `posts.ori` or surround it with angle brackets: `<posts.ori>`.

Note that the following does not produce a conflict:

```ori
{
  posts/ = Tree.map(markdown/, posts.ori)
}
```

When defining an object key like `posts/` here, the expression that defines the value will never match the key being defined. (Otherwise this would create an infinite loop.) So `posts.ori` in this case can’t match the `posts/` local variable, and will find the file as expected.

## Paths

A sequence of [identifiers](#identifiers) separated with slashes is treated as a _path_.

```ori
package.json/name
```

In a path, the first part of the path (here, `package.json`) will _always_ be treated as a single name. If that name matches a local variable, then the path will be evaluated using that variable as the start. Otherwise Origami assumes the path starts with the name of a local file or folder.

- A path beginning with `~/` will be taken as a reference to the user's home directory.
- If you want to reference an absolute path that starts with a slash, use [angle brackets](#angle-brackets). This avoids conflict with JavaScript's regular expression syntax: `/test/`.

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

Although Origami can always recognize [URLs](#urls) that start with a protocol, you can also put a URL in angle brackets:

```ori
<https://example.com>
```

### Trailing slashes

Paths in Origami follow a [trailing slash convention](http://localhost:5000/async-tree/interface.html#trailing-slash-convention):

- If a trailing slash is present, then the value is definitely a traversable subtree.
- If a trailing slash is not present, the value may or may not be a subtree. That is, a tree isn’t obligated to append slashes to any or all of its keys for traversable subtrees.

In practice, when writing a path to a container such as a folder, you have the _option_ to end the path with a trailing slash. If your project includes a folder called "markdown", both of these paths will find the folder:

```
markdown
markdown/
```

You may find the latter form clearer, as the trailing slash suggests that "markdown" represents a tree of content (here, a folder of files).

A trailing slash on a path to a file containing data [unpacks](fileTypes.html#unpacking-files) the file content into data; see below.

### Result of a path

A path to a file returns the raw contents of the indicated file.

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

If a file path ends in a trailing slash, Origami will [unpack](fileTypes.html#unpacking-files) the file content into data. For example, if `posts/post1.md` is a markdown file, the expression:

```ori
posts/post1.md
```

returns the file content as a `Uint8Array`. If you want to work with that as text, you can pass that to [`Origami.string`](/builtins/origami/string.html). If, however, you want to work with that as a [document](documents.html) object, you can append a trailing slash:

```ori
posts/post1.md/
```

Note that most Origami [builtin functions](/builtins) that expect a [treelike](/async-tree/treelike.html) argument will automatically unpack a file or resource (such as `Uint8Array` or `ArrayBuffer`) value if the path to that file or resource includes a known file extension.

## URLs

If a sequence starts with a scheme (protocol) and a colon, Origami treats it as a URL: `https://example.com`.

## Numbers

Origami supports integers and floating point JavaScript [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) values.

Origami does not yet support binary, octal, hexadecimal numeric literals, nor does it support exponential notation. If necessary you can create such numbers with the JavaScript `Number()` function:

```ori
Number('0xf')     // ${ Number("0xf") }
Number('1e2')     // ${ Number("1e2") }
```

## Strings

Strings with double quotes and single quotes are essentially the same as in JavaScript:

```
'string'
"string"
```

You can escape characters with a `\\` backslash:

```
'It\\'s great'
```

### Templates

Text templates are quoted in backticks and can contain Origami expressions inside `\$\{` `}` placeholders. The evaluated expression results will be substituted for those placeholders in the template's text output.

Expressions inside an Origami template literal can directly return complex values like arrays, objects, or trees. Origami will perform a depth-first traversal of the result, await any `Promise` values, and concatenate the final values into the string result:

```
`Hello, \${ { name: 'Alice' }}.`      // "Hello, Alice."
```

This is different than JavaScript, where the above produces: `"Hello, [object Object]."`

Among other things, this means that a template can inline the text content a file by referencing its file name.

```console
$ cat pet.txt
Jiji
$ cat sample.ori
\`I have a cat named \$\{ pet.txt }.`
$ ori sample.ori/
I have a cat named Jiji.
```

See also [Templates](templates.html) for more about using templates to generate HTML and other text formats.

You can prefix a template literal with a function name immediately before the leading backtick. This invokes that function with the strings that make up the template's boilerplate text and a set of values to be substituted in the output — the same function signature as a JavaScript [tagged template function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates). See [`Tree.indent`](/builtins/tree/indent.html) for an example of a builtin function that you can use in a tagged template.

## Operators

Origami closely follows [JavaScript operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence). Origami introduces some operators of its own, listed here alongside the standard JavaScript operators. Operators are listed in order from highest precedence to lowest precedence.

| Operator                                                 | Example                       | Associativity |
| :------------------------------------------------------- | :---------------------------- | :------------ |
| Group                                                    | `(x)`                         | n/a           |
| [Path](syntax.html#paths)                                | `x/y/z`                       | left-to-right |
| Member access                                            | `x.y`                         | left-to-right |
| Computed member access                                   | `x[y]`                        | n/a           |
| Function call                                            | `x(y)`                        | n/a           |
| import                                                   | `import(x)`                   | n/a           |
| Tagged template                                          | `` x`y` ``                    | n/a           |
| Logical NOT                                              | `!x`                          | n/a           |
| Bitwise NOT                                              | `~x`                          | n/a           |
| Unary plus                                               | `+x`                          | n/a           |
| Unary minus                                              | `-x`                          | n/a           |
| typeof                                                   | `typeof x`                    | n/a           |
| void                                                     | `void x`                      | n/a           |
| await                                                    | `await x`                     | n/a           |
| Exponentiation                                           | `x ** y`                      | right-to-left |
| Multiplication                                           | `x * y`                       | left-to-right |
| Division                                                 | `x / y`                       | left-to-right |
| Remainder                                                | `x % y`                       | left-to-right |
| Addition                                                 | `x + y`                       | left-to-right |
| Subtraction                                              | `x - y`                       | left-to-right |
| Left shift                                               | `x << y`                      | left-to-right |
| Right shift                                              | `x >> y`                      | left-to-right |
| Unsigned right shift                                     | `x >>> y`                     | left-to-right |
| Less than                                                | `x < y`                       | left-to-right |
| Less than or equal                                       | `x <= y`                      | left-to-right |
| Greater than                                             | `x > y`                       | left-to-right |
| Greater than or equal                                    | `x >= y`                      | left-to-right |
| Equality                                                 | `x == y`                      | left-to-right |
| Inequality                                               | `x != y`                      | left-to-right |
| Strict equality                                          | `x === y`                     | left-to-right |
| Strict inequality                                        | `x !== y`                     | left-to-right |
| Logical AND                                              | `x && y`                      | left-to-right |
| Logical OR                                               | <code>x &#124;&#124; y</code> | left-to-right |
| Nullish coalescing                                       | `x ?? y`                      | left-to-right |
| Conditional (ternary)                                    | `x ? y : z`                   | right-to-left |
| Arrow                                                    | `(x) => y`                    | right-to-left |
| [Implicit parentheses](syntax.html#implicit-parentheses) | `x y`                         | right-to-left |
| [Shorthand function](syntax.html#shorthand-functions)    | `=x`                          | right-to-left |
| [Pipe](syntax.html#pipe-operator)                        | `x -> y`                      | left-to-right |
| Spread                                                   | `...x`                        | n/a           |
| Comma                                                    | `x, y`                        | left-to-right |

An operator’s precedence determines how the Origami parser handles expressions that have more than one possible interpretation.

Example: `a -> b => c` could be interpreted as `a -> (b => c)` or `(a -> b) => c`. Origami uses the former interpretation, because the arrow operator has a higher precedence than Origami pipe operator.

Origami requires spaces around binary operators:

- `x + y`
- `x - y`
- `x * y`
- `x / y`

Without the spaces, Origami interprets a slash as part of a path: `x/y` is a path. Similarly, operators without surrounding spaces are treated as part of a file name: `package-lock.json` is a file name, not a subtraction operation.

Spaces are not required around unary operators: `-foo` negates the value of `foo`. If you mean to reference a local file that starts with a hyphen, put the name in angle brackets: `<-foo>`.

Some addition usage notes:

- Instead of calling [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import), you can generally use a [path](#paths) instead.
- The `await` operator is implied in Origami so can always be omitted.

Origami does not yet support JavaScript's [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining): `x?.y`.

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

## Object literals

Origami's basic syntax for constructing object literals is essentially the same as JavaScript's: create an object literal with `{` and `}` curly braces surrounding key/value pairs:

```ori
{
  name: "Alice"
  location: "Honolulu"
}
```

You can separate key/value pairs with commas, newlines, or both.

Any valid Origami [identifier](#identifiers) can be used as an object key without being quoted. This means you can define a virtual file with a name like `index.html`:

```ori
{
  index.html: "Welcome to my site!"
}
```

To define a key that's not a valid identifier, such as one that includes spaces, put the key in single or double quotes:

```ori
{
  "Test File.txt": "Sample text"
}
```

### Shorthand properties

As a shorthand, you can define a property with just an [identifier](#identifiers):

```ori
{
  // Include the project's README.md file in this object
  README.md
}
```

This is shorthand for defining that key with a value that looks up that same key in the current scope:

```ori
{
  // Include the project's README.md file in this object
  README.md: README.md
}
```

This extends to defining a property with a path. The last part of the path becomes the key, so

```ori
{
  path/to/file.txt
}
```

is the same as

```ori
{
  file.txt: path/to/file.txt
}
```

You can do the same thing with angle brackets:

```ori
{
  <path/to/file.txt>
}
```

### Property getters

The value in a key/value pair will be evaluated once when the object is loaded. The following object, for example, evaluates `createPage.js()` only once:

```ori
{
  index.html: createPage.js()
}
```

Origami lets you define property getters with an abbreviated syntax that uses `=` equals signs instead of `:` colons:

```ori
{
  index.html = createPage.js()
}
```

Whenever this object is asked for the value of `index.html`, Origami will invoke the indicated expression — here, `createPage.js()` — and return that result. The above is roughly equivalent to the following JavaScript syntax:

```js
/* JavaScript approximation of the above */
{
  get ["index.html"]() { return createPage(); }
}
```

### Property references

There are several ways to reference the property of an object.

Suppose `alice.ori` contains:

```ori
// alice.ori
{
  name: "Alice"
  location: "Honolulu"
}
```

You can reference the "name" property of this file in several ways:

- `(alice.ori).name` — Put the `.name` reference after a closing parenthesis
- `alice.ori .name` — Put the `.name` reference after whitespace (this is standard JavaScript syntax)
- `alice.ori["name"]` — Use the string `"name"` in brackets
- `alice.ori/name` — Origami treats any [treelike](/async-tree/treelike.html) object as a tree that can be traversed with [path](#paths) syntax
- `alice.ori("name")` — Origami allows any tree to be called like a function

### Local property references

The expression that defines the value of a property can reference other properties in the same object, or any parent object, by name.

```ori
// localRef.ori
${ samples/help/localRef.ori }
```

This evaluates to:

```console
$ ori localRef.ori/
${ Origami.yaml(samples/help/localRef.ori/) }
```

This type of local property reference is not possible in JavaScript.

Origami will avoid recursive local references. If you try to define a `name` property whose value expression refers to `name`, Origami assumes the latter refers to an inherited `name` property.

```ori
// inherited.ori
${ samples/help/inherited.ori }
```

Here the expression `\${name}` will resolve to the inherited `name` defined in the parent object.

```console
$ ori inherited.ori
${ Origami.yaml(samples/help/inherited.ori/) }
```

### Non-enumerable properties

Object keys in parentheses like `(x)` are not [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties). They will not be included in a list of the object's keys, which means they will generally not be included when the object is copied or displayed.

One use for non-enumerable properties is in calculating a value that will be used in more than one place.

```ori
// hidden.ori
${ samples/help/hidden.ori }
```

Here, the declaration of the `company` property is in parentheses, so it is non-enumerable. It can be referenced by other object properties, but will not be included in the object's keys. This means it won't be shown when the object is displayed:

```console
$ ori hidden.ori/
${ Origami.yaml(samples/help/hidden.ori/) }
```

Marking a property as non-enumerable only affects whether it is included in the object's list of keys; a non-enumerable property is still accessible if one knows the property name:

```console
$ ori hidden.ori/company
${ Origami.yaml(samples/help/hidden.ori/company) }
```

### Keys with trailing slashes

As noted above, paths can [end in trailing slashes](#trailing-slashes) to follow Origami's [trailing slash convention](http://localhost:5000/async-tree/interface.html#trailing-slash-convention).

When defining an object, you have the option of adding a trailing slash to the key whose value is a traversable subtree. This can be a useful way of reminding readers of the code (including yourself) that the value is a tree.

For example, you might use the [`Tree.map`](/builtins/tree/map.html) builtin to convert a collection of markdown files to HTML:

```
// site.ori
${ samples/howTo/markdown/site.ori }
```

Here the trailing slash in `pages/` serves as a reminder that the value of that property is a traversable tree of data (here, a collection of HTML files). It also ensures that, if someone asks for this object's keys, the key for `pages/` will include this trailing slash signal:

```console
$ ori keys site.ori
${ Origami.yaml(Tree.keys(samples/howTo/markdown/site.ori)) + "\n" }
```

### Object nesting

As in JavaScript, object literals can be deeply nested. A common use for this in Origami is to define the overall structure of a website in a `.ori` file:

```
// subtree.ori
${ samples/help/subtree.ori }
```

When this file is served as a site, the user will be able to browse to `about/index.html`.

When an object created with an object literal is treated as a tree, its tree representation implicitly includes trailing slashes for any key whose value is another object literal.

```console
$ ori Tree.keys subtree.ori
${ Origami.yaml(Tree.keys(samples/help/subtree.ori)) + "\n" }
```

Here the builtin [`Tree.keys`](/builtins/tree/keys.html) function shows a trailing slash on `about/` even though the trailing slash isn't explicitly in the code above. However, if the object is unpacked and passed to the standard JavaScript [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method, the keys will be returned directly as defined:

```console
$ ori Object.keys subtree.ori/
${ Origami.yaml(Object.keys(samples/help/subtree.ori/)) + "\n" }
```

## Array literals

Origami arrays are essentially the same as JavaScript arrays, and are defined with `[` `]` square brackets:

```
[1, 2, 3]
```

As with object literals (above), you can separate array items with commas, newlines, or both:

```
[
  1
  2
  3
]
```

## Spread operator

You can use `...` three periods to merge arrays and objects.

```console
$ ori tree1.yaml
${ samples/help/merge/tree1.yaml }$ ori tree2.yaml
${ samples/help/merge/tree2.yaml }$ ori { ...tree1.yaml, ...tree2.yaml }
${ Origami.yaml({
  ...samples/help/merge/tree1.yaml
  ...samples/help/merge/tree2.yaml
}) }
```

In an `.ori` file, you can use this to merge a folder into an object that also defines individual files.

```ori
{
  index.html: "Hello!"

  // Merge in everything in the `styles` folder
  ...styles
}
```

The spread operator performs a shallow merge. You can also perform a shallow merge with the built-in [`Tree.merge`](/builtins/tree/merge.html) function. For a deep merge, see [`Tree.deepMerge`](/builtins/tree/deepMerge.html).

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

Origami assumes that any function might be asynchronous, so implicitly uses `await` when calling all functions. For compatibility with JavaScript, Origami allows use of the `async` and `await` keywords, but these have no effect on the behavior of the code — they are always implied.

The Origami language runtime itself is written in JavaScript, so types such as numbers, strings, and objects are the same as in JavaScript. E.g., if you pass an Origami string to a JavaScript function, the value will be a regular JavaScript string.

Origami does not yet support `...` spreads in function calls.

### Trees as functions

In Origami's

## Arrow functions

An Origami expression can define a type of unnamed function called an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) or _lambda_.

You can define arrow functions using `=>` and any number of parameters:

```
(parameter1, parameter2, parameter3, …) => expression
```

That `expression` will not be evaluated immediately, only later when the function is invoked.

For example, the [`Tree.map`](/builtins/tree/map.html) builtin function can apply another function to a tree's values and/or keys. To define a function that will be evaluated in the context of each tree value, you can use an arrow function:

```console
$ ori "Tree.map(['a', 'b', 'c'], (letter) => letter.toUpperCase())"
${ Origami.yaml(
  Tree.map(['a', 'b', 'c'], (letter) => letter.toUpperCase())
) }
```

Origami arrow function syntax is currently more limited than JavaScript's, and does not support default parameters, rest parameters, or parameter destructuring.

## Pipe operator

Origami has a pipe operator `→` (which can also be written `->`) for representing a sequence of function calls. This can be used to avoid deep call nesting.

These deeply-nested function calls:

```ori
three(two(one(value)))
```

can be rewritten using the pipe operator:

```ori
value → one → two → three
```

This can be useful when applying multiple transformations of data. Suppose an index page is generated from markdown and then placed inside a template:

```ori
{
  index.html = template.ori(Origami.mdHtml(index.md))
}
```

You can rewrite the above using the pipe operator so that the flow of data reads proceeds from left to right:

```ori
{
  index.html = index.md → Origami.mdHtml → template.ori
}
```

This may make the flow of data easier to see.

The pipe operator passes the value from the left side of the operator to the function on the right side. If you need to provide additional arguments to that function, wrap the function in a [arrow function](#arrow-functions) that accepts a single argument and then calls your desired function with the additional arguments.

Example: these nested calls to [`Origami.mdHtml`](/builtins/origami/mdHtml.html) and [`Tree.sort`](/builtins/tree/sort.html) both take multiple arguments:

```ori
Tree.sort(Tree.map(markdown/, Origami.mdHtml), { compare: Origami.naturalOrder })
```

This can be rewritten with the pipe operator and arrow functions:

```ori
markdown/
→ (mdFiles) => Tree.map(mdFiles, Origami.mdHtml)
→ (htmlFiles) => Tree.sort(htmlFiles, { compare: Origami.naturalOrder })
```

## Grouping

You can group expressions with `(` `)` parentheses.

## Comments

Just like JavaScript, line comments start with `//` double slashes and extend to the end of the line:

```
// This is a line comment
```

One difference is that, in a [URL](#urls) or [path](#paths) Origami interprets consecutive double slashes as part of the path and _not_ a comment. Both this URL and path include double slashes that will not be treated as comments:

```
https://example.com/
path/with/consecutive//slashes
```

Block comments are enclosed by `/* */`

```
/*

Block comment

*/
```

## Shell shorthands

To accommodate the use of Origami on the command line, the Origami [CLI](/cli) supports some additional [shorthand syntax](/cli/shorthands.html). These are not supported in Origami programs in `.ori` files.

## Unsupported JavaScript features

As an expression language, Origami will not include any of JavaScript's control structures like `for` or `while` loops. For the same reason, Origami will not support JavaScript operators that have side effects:

- Postfix and prefix operators `++`, `--`
- Assignment operators `=`, `+=`, `-=`, etc.

Additionally, Origami does not currently support these features from JavaScript:

- binary, octal, hexadecimal numeric literals, or exponential notation (see [Numbers](#numbers))
- default parameters, rest parameters, parameter destructuring (see [Arrow functions](#arrow-functions))
- `...` spread operator in function calls
- `?.` optional chaining operator (see [Operators](#operators))
- defining an object key with a computed property

For the time being, experience suggests its possible to build many interesting sites without using those JavaScript features.
