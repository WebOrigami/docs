---
title: Origami language syntax
---

The Origami language is relatively small and focused on:

- Defining tree structures like that of a website's pages and resources
- Traversing paths into trees of data or files
- Creating text content using templates
- Invoking functions defined in other languages like JavaScript

Origami expression syntax generally follows JavaScript, with some [differences](comparison.html) such as: URLs, file paths, and file names are valid references; and some shorthands make it easier to type expressions in the shell when using the [CLI](/cli).

Microsoft Visual Studio Code users can install the [Origami language extension](https://marketplace.visualstudio.com/items?itemName=WebOrigami.origami-vscode-extension) for syntax highlighting.

## Strings

Strings use single or double quotes:

```
'string'
"string"
```

You can escape characters with a `\\` backslash:

```
'It\\'s great'
```

## Numbers

On their own, integers or floating-point numbers are treated as JavaScript `Number` values.

```
42
3.14159
```

Numbers that appear in paths are treated as strings:

```
years/2023
```

searches in the `years` tree for the key "2023".

## References

Unquoted character sequences will be evaluated in the current [scope](scope.html) to find, for example, a file or other tree value with the indicated name.

```console
$ ls
Hello.md
$ cat Hello.md
Hello, world.
$ ori Hello.md
Hello, world.
```

In the last command above, `Hello.md` is evaluated as a reference. In this case, it finds the local file, `Hello.md`, so ori displays the contents of that file.

Unlike JavaScript identifiers, it is legal to include a `.` period in a reference. Spaces and the following characters

```
(){}[]<>-=,/:`"'\#→⇒
```

must be escaped with a `\\` backslash.

## Object literals

Object literals are created with `{` and `}` curly braces, and contain key/value pairs:

```
{
  name: "Alice"
  location: "Honolulu"
}
```

You can separate key/value pairs with commas, newlines, or both. Keys should not be quoted.

As with references (above), you can use periods in keys. Escape any special characters like spaces:

```
{
  Read\\ Me.txt: "The name for this value contains a space"
}
```

In `.ori` files, the value in a key/value pair can be an expression that will be evaluated when the tree is loaded.

```
data = {
  name: getName()
}
```

Command shells generally interpret curly braces, so you will need to escape them with backslashes or quote the expression you want ori to evaluate.

```console
$ ori "{ a: 1, b: 2 }"
a: 1
b: 2
```

## Array literals

Arrays use `[` `]` square brackets.

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

## Tree literals

Tree literals are similar to object literals, with the differences that: a) each key and value is separated with an `=` equals sign instead of a `:` colon, and b) a value defined by an expression is not evaluated until the value is requested.

```
{
  public = {
    index.html = greet.js("world")
  }
}
```

The top level of a `.ori` file is treated as the contents of tree literal. The `.ori` file above defines a virtual folder containing a subtree called `public` that defines `index.html`.

## Template literals

Text templates are quoted in backticks and can contain Origami expressions inside `\$\{` `}` placeholders.

```console
$ cat pet.txt
Fluffy
$ cat sample.ori
\`I have a pet named \$\{ pet.txt }.`
$ ori sample.ori/
I have a pet named Fluffy.
```

## Function calls

You can invoke a function with parentheses:

```
fn(arg)
```

The arguments to a function will be evaluated, then the function will be invoked:

```console
$ ori sample.txt
This is a text file.
$ ori uppercase.js
export default (x) => x.toString().toUpperCase();
$ ori "uppercase.js(sample.txt)"
THIS IS A TEXT FILE.
```

To make it easier for you to invoke functions in the command line, Origami expressions also let you use implicit parentheses for function calls. For example, the above can also be written as:

```console
$ ori uppercase.js sample.txt
THIS IS A TEXT FILE.
```

In some situations, you can also avoid the need for parentheses by using a `/` slash; see below.

## Paths

Paths are a sequence of string keys separated with `/` slashes.

```
tree/with/path/to/something
```

The head of the path, like `tree` here, is resolved as a reference. If that returns a tree, it will be traversed using the remaining keys "with", "path", "to", and "something".

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori greetings.yaml/Alice
Hello, Alice.
```

In Origami, functions are a type of tree, so a function can also be invoked with slash syntax:

```console
$ ori greet.js
export default (name = "world") => `Hello, \${name}.`;
$ ori greet.js/David
Hello, David.
```

A function call using a slash like this lets you avoid having to quote parentheses in the command line.

If the `greet.js` function here is invoked with a trailing slash, that invokes the function with an `undefined` value for the `name` parameter. In this example, `greet` then uses a default name:

```console
$ ori greet.js/
Hello, world.
```

## URLs and protocols

URLs that start with a protocol like `https:` or `http:` are valid expressions:

```
https://example.com
```

When evaluated, the value of the expression will be the response to that network request.

In Origami, a protocol is just a function call, so you can write your own protocols:

```
fn://a/b/c
```

is equivalent to:

```
fn('a', 'b', 'c')
```

The following protocols are reserved:

- `http:`
- `https:`
- `tree:`
- `treehttp:`
- `treehttps:`

## Absolute file paths

Paths that start with a leading `/` slash refer to absolute paths in the filesystem:

```
/Users/alice/example.txt
```

Like other paths that refer to files, absolute paths can traverse into data files.

```console
$ ori /Users/alice/myProject/package.json
{
  "name": "Test project",
  "type": "module"
}
$ ori /Users/alice/myProject/package.json/name
Test project
```

## Grouping

You can group expressions with `(` `)` parentheses. Command shells generally interpret parentheses, so you will need to escape them with backslashes or quote the expression you want ori to evaluate.

<a name="lambdas"></a>

## Lambdas (unnamed functions)

An Origami expression can define a type of unnamed function called a lambda.

You can create the simplest form of a lambda function with an `=` equals sign:

```
=expression
```

This expression will not be evaluated immediately, but only later when explicitly invoked.

For example, the [@map](/builtins/@map.html) built-in function can apply another function to a tree's values and/or keys. To concisely define a function that will be evaluated in the context of each tree value, you can use a lambda:

```console
$ cat letters.json
${ samples.ori/cli/letters.json
}$ cat uppercase.js
${ samples.ori/cli/uppercase.js
}$ ori "@map(letters.json, =uppercase.js(_))"
${ @yaml @map samples.ori/cli/letters.json, samples.ori/cli/uppercase.js }
```

The `_` underscore above refers to the value being mapped, so `=uppercase.js(_)` will convert the value to uppercase.

You can also define lambda functions with an expanded syntax using a "=>" (or the Unicode ⇒ Rightwards Double Arrow) that allows for multiple named parameters:

```
(parameter1, parameter2, parameter3, …) => expression
```

The `@map` function shown above passes the mapping function the value and key being mapped — in that order — as arguments, so the above example can be rewritten:

```console
$ ori "@map(letters.json, (description, letter) => uppercase.js(description))"
${ @yaml @map samples.ori/cli/letters.json, (description, letter) => samples.ori/cli/uppercase.js(description) }
```

In this case, since the `letter` argument isn't used, it can be omitted:

```console
$ ori "@map(letters.json, (description) => uppercase.js(description))"
${ @yaml @map samples.ori/cli/letters.json, (description) => samples.ori/cli/uppercase.js(description) }
```

## Pipe operator

Origami has a pipe operator `→` (which can also be written `->`) for representing a sequence of function calls. This can be used to avoid deep call nesting.

These deeply-nested function calls:

```
three(two(one(value)))
```

can be rewritten using the pipe operator:

```
value → one → two → three
```

This can be useful when applying multiple transformations of data. If an index page is generated from markdown that is then placed inside a template, you can write:

```
{
  index.html = index.md → @mdHtml → template.ori
}
```

to make the flow of data easier to see.

## Comments

Line comments start with `//` double slashes and extend to the end of the line:

```
// This is a line comment
```

Note: In a URL or file path (see above), Origami interprets consecutive double slashes as part of the path and _not_ a comment.

```
https://example.com/path/with/consecutive//slashes
```

Block comments are enclosed by `/* */`

```
/*

Block comment

*/
```

## Reserved words

Generally speaking, the Origami expression language does not have reserved words, but:

- Origami does include a number of built-in functions and values which will normally be in scope. All of them have names that start with an `@` at sign. If you can, avoid adopting names for your own functions or data members that begin with `@`.
- A few protocols like `https:` are reserved in URLs.

Some of the Origami built-ins provide values which are normally reserved in a language, such as [@true](@true.html) and [@false](@false.html) values for true and false.
