---
title: Origami language syntax
---

The Origami expression language is mostly focused on invoking functions and traversing graphs, and borrows elements of its syntax from JavaScript expressions, web URLs, and template languages.

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

searches in the `years` graph for the key "2023".

## References

Unquoted character sequences will be evaluated in the current [scope](scope.html) to find, for example, a file or other graph value with the indicated name.

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
(),/:=[]\`{}#
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

In `.graph` files, the value in a key/value pair can be an expression that will be evaluated when the graph is loaded.

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

## Graph literals

Graph literals are similar to object literals, with the differences that: a) each key and value is separated with an `=` equals sign instead of a `:` colon, and b) a value defined by an expression is not evaluated until the value is requested.

```
public = {
  index.html = greet("world")
}
```

The top level of a `.graph` file is treated as the contents of graph literal; omit the outer curly braces. The `.graph` file above defines a virtual folder called `public`, whose value is a subgraph defining `index.html`.

## Template literals

Text templates are quoted in backticks and can contain Origami expressions inside `\{\{` `}}` double curly braces.

```console
$ cat pet.txt
Fluffy
$ cat sample.graph
message = `I have a pet named \{\{ pet.txt }}.`
$ ori sample.graph/message
I have a pet named Fluffy.
```

## Function calls

One way to invoke a function is with final parentheses:

```
fn(arg)
```

The arguments to a function will be evaluated, then the function will be invoked:

```console
$ ori sample.txt
This is a text file.
$ ori uppercase.js
export default (x) => x.toString().toUpperCase();
$ ori "uppercase(sample.txt)"
THIS IS A TEXT FILE.
```

To make it easier for you to invoke functions in the command line, Origami expressions also permit use of implicit parentheses for function calls. For example, the above can also be written as:

```console
$ ori uppercase sample.txt
THIS IS A TEXT FILE.
```

In some situations, you can also avoid the need for parentheses by using a `/` slash; see below.

Additionally, when ori evaluates an Origami expression, if the top-level result is a function, ori will implicitly invoke it:

```console
$ ori greet.js
export default (name = "world") => `Hello, ${name}.`;
$ ori greet
Hello, world.
```

Here, the reference `greet` will resolve to the default export of the module `greet.js`. Since that's a function, ori invokes it and returns the result.

## Paths

Paths are a sequence of string keys separated with `/` slashes.

```
graph/with/path/to/something
```

The head of the path, like `graph` here, is resolved as a reference. If that returns a graph, it will be traversed using the remaining keys "with", "path", "to", and "something".

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori greetings.yaml/Alice
Hello, Alice.
```

In Graph Origami, functions are a type of graph, so a function can also be invoked with slash syntax:

```console
$ ori greet.js
export default (name = "world") => `Hello, ${name}.`;
$ ori greet/David
Hello, David.
```

A function call using a slash like this lets you avoid having to quote parentheses in the command line.

A path that ends with a trailing slash is considered to have the JavaScript `undefined` value as the final key. If the `greet` function here is invoked with a trailing slash, that invokes the function with an `undefined` value for the `name` parameter. In this example, `greet` then uses a default name:

```console
$ ori greet/
Hello, world.
```

## URLs and protocols

URLs that start with a protocol like `https:` or `http:` are valid expressions:

```
https://example.com
```

When evaluated, the value of the expression will be the response to that network request.

In Graph Origami, a protocol is just a function call, so you can write your own protocols:

```
fn://a/b/c
```

is equivalent to:

```
fn('a', 'b', 'c')
```

The protocols `https:`, `http:`, `graphhttps:`, and `graphhttp:` are reserved.

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

## Lambdas (unnamed functions)

You can define an unnamed lambda function with an `=` equals sign.

```
=expression
```

This expression will not be evaluated immediately, but only when invoked.

For example, the [@map/values](/language/@map.html#values) built-in function can apply another function to a graph's values. To concisely define a function that will be evaluated in the context of each graph value, you can use a lambda:

```console
$ cat letters.json
{
  "a": "The letter A",
  "b": "The letter B",
  "c": "The letter C"
}
$ cat uppercase.js
export default (x) => x.toString().toUpperCase();
$ ori "@map/values(letters.json, =uppercase(@value))"
a: THE LETTER A
b: THE LETTER B
c: THE LETTER C
```

## Comments

Comments start with a `#` sharp sign and extend to the end of the line

```
# This is a comment
```

## No reserved words

The Origami expression language generally does not have reserved words. Exceptions:

- Origami does include a number of built-in functions and values which will normally be in scope. All of them have names that start with an `@` at sign. If you can, you should avoid adopting names for your own functions or data members that begin with `@`.
- A few protocols like `https:` are reserved in URLs.

Some of the Origami built-ins provide values which are normally reserved in a language, such as [@true](@true.html) and [@false](@false.html) values for true and false.
