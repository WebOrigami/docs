---
title: Origami expression syntax
---

Origami is an extension of JavaScript expressions that facilitates:

- Defining tree structures like a website's pages and resources
- Traversing paths into data or files
- Creating text content using templates

Origami expression syntax is largely the same as JavaScript's, with some [differences](comparison.html) including support for loading content and data from files and network resources. The Origami [CLI](/cli) supports some optional [shell shorthands](#shell-shorthand) to make it easier to type evaluate expressions in a terminal.

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

Integers or floating-point numbers are treated as JavaScript `Number` values.

```
42
3.14159
```

You can do basic math with the `+`, `-`, `*` (multiplication), `/` (division), `%` (remainder) operations.

```
1 + 1
```

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

Unlike JavaScript identifiers, it is legal to include characters like a `.` period or a `-` (hyphen) in a reference. Spaces and the following characters

```
(){}[]<>?!=,/:`"'«»\\→⇒…
```

must be escaped with a `\\` backslash or in quotes.

Example: If you have a file with a space like `foo bar`, you could reference it with

```
foo\\ bar
```

If you know the file's in a particular folder, such as the current directory, you could also use:

```
./("foo bar")
```

A reference that's entirely numeric digits also requires special handling or it will be treated as a number. For example, you might have folders organized by year with names like `2025`. To force Origami to treat that as a reference, you can write:

```
scope:2025
```

## Object literals

Object literals are created with `{` and `}` curly braces, and contain key/value pairs:

```ori
{
  name: "Alice"
  location: "Honolulu"
}
```

As with references (above), you can use periods in keys. You can separate key/value pairs with commas, newlines, or both.

You can also put keys in single or double quotes:

```ori
{
  "Test File.txt": "Sample text"
}
```

As a shorthand, you can define a property with just a key. The key will be used as a reference (above) that will look up that key in the current scope.

```ori
{
  // Include the project's ReadMe.md file in this object
  ReadMe.md
}
```

The value in a key/value pair will be evaluated once when the object is loaded. The following object, for example, evaluates `getName()` only once:

```ori
{
  name: getName()
}
```

## Object properties

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

- `alice.ori/name` — Origami `/` path syntax; see Paths below
- `(alice.ori).name` — Put the `.name` reference after a closing parenthesis
- `alice.ori .name` — Put the `.name` reference after whitespace
- `alice.ori["name"]` — Use the string `"name"` in brackets
- `alice.ori("name")` — Treat the object as a function

## Object properties can reference other local properties

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

This type of local reference is not possible in languages like JavaScript.

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

## Object property getters

If you'd like a value to be calculated every time it's requested, you can create a property _getter_. You create a property getter in Origami by using an `=` equals sign to define the property instead of a `:` colon.

```ori
{
  index.html = greet.js()
}
```

This `.ori` expression defines a getter called `index.html`. Each time the object is asked for `index.html`, it will invoke the JavaScript function exported by `greet.js`.

## Non-enumerable properties

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

## Object nesting

Objects can be deeply nested.

One use for this is to define the overall structure of a website in a `.ori` file:

```ori
{
  // Include the entire `assets` folder
  assets

  about: {
    // Generate the index page for the "About" area
    index.html = about.ori()
  }
}
```

When this file is served as a site, the user will be able to browse to `about/index.html`.

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

## Paths

Paths are a sequence of string keys separated with `/` slashes:

```ori
folder/path/to/file.txt
```

The head of the path, like `folder` here, is resolved as a reference. If that returns a treelike object, it will be traversed using the remaining keys "path", "to", and "file.txt". Treelike objects include object literals and hierarchical data in JSON and YAML files:

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori greetings.yaml/Alice
Hello, Alice.
```

Because Origami interprets a `/` as a path separator, if you want to evaluate a division expression, you must put spaces around the `/` operator:

```console
$ ori 8 / 2
4
```

### Traversing into data

Paths can traverse into files of known [file types](fileTypes.html#standard-file-types) like `.json` files.

If a `package.json` file contains

```json
{
  "name": "Test project",
  "type": "module"
}
```

then the expression

```ori
<package.json/name>
```

returns the string "Test project".

You can reference folder or file by name without any special leading character; such names will be resolved in [scope](scope.html). Example: if a project contains a folder called `src`, then `<./src>` and `<src>` both reference the folder.

### Angle brackets

Origami uses a [heuristic](http://localhost:5000/language/comparison.html#path-literals) to determine whether an expression like `abc.xyz` is a file name or an object `abc` with a property `xyz`. You can also explicitly indicate that something is a path or file name by surrounding it with `< >` angle brackets:

```ori
<folder/path/to/file.txt>
```

You can also place URLs (below) in angle brackets.

### URLs

You can also use URLs in an Origami path:

```ori
https://example.com
```

The result of this URL will be the contents of the data at the indicated internet location.

## Template literals

Text templates are quoted in backticks and can contain Origami expressions inside `\$\{` `}` placeholders. The evaluated expression results will be substituted for those placeholders in the template's text output.

```console
$ cat pet.txt
Fluffy
$ cat sample.ori
\`I have a pet named \$\{ pet.txt }.`
$ ori sample.ori/
I have a pet named Fluffy.
```

You can prefix a template literal with a function name immediately before the leading backtick. This invokes that function with the strings that make up the template's boilerplate text and a set of values to be substituted in the output. This function signature is compatible with JavaScript [tagged template functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates). See [`Tree.indent`](/builtins/tree/indent.html) for an example of a builtin function that you can use in a tagged template.

Also see [Templates](templates.html) for more about using templates to generate HTML and other text formats.

## Grouping

You can group expressions with `(` `)` parentheses. Command shells generally interpret parentheses, so you will need to escape them with backslashes or quote the expression you want ori to evaluate.

<a name="lambdas"></a>

## Lambda functions

An Origami expression can define a type of unnamed function called a _lambda_.

You can define lambda functions using a "=>" (or the Unicode ⇒ Rightwards Double Arrow) and any number of parameters:

```
(parameter1, parameter2, parameter3, …) => expression
```

This expression will not be evaluated immediately, but only later when explicitly invoked.

For example, the [`Tree.map`](/builtins/tree/map.html) built-in function can apply another function to a tree's values and/or keys. To define a function that will be evaluated in the context of each tree value, you can use a lambda:

```console
$ ori "Tree.map(letters.json, (description) => uppercase.js(description))"
${ Origami.yaml(
  Tree.map(
    samples/cli/letters.json
    (description) => samples/cli/uppercase.js(description)
  )
) }
```

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

The pipe operator passes the value from the left side of the operator to the function on the right side. If you need to provide additional arguments to that function, wrap the function in a [lambda function](#lambda-functions) that accepts a single argument and then calls your desired function with the additional arguments.

Example: these nested calls to [`Origami.mdHtml`](/builtins/origami/mdHtml.html) and [`Tree.sort`](/builtins/tree/sort.html) both take multiple arguments:

```ori
Tree.sort(Tree.map(markdown/, Origami.mdHtml), { compare: Origami.naturalOrder })
```

This can be rewritten with the pipe operator and lambda functions:

```ori
markdown/
→ (mdFiles) => Tree.map(mdFiles, Origami.mdHtml)
→ (htmlFiles) => Tree.sort(htmlFiles, { compare: Origami.naturalOrder })
```

## Comments

Line comments start with `//` double slashes and extend to the end of the line:

```
// This is a line comment
```

Note: In a URL or file path (see above), Origami interprets consecutive double slashes as part of the path and _not_ a comment.

```
<https://example.com/path/with/consecutive//slashes>
```

Block comments are enclosed by `/* */`

```
/*

Block comment

*/
```

## Shell shorthand

When you use the Origami [CLI](/cli) to evaluate an Origami expression, Origami supports additional shorthand syntax to reduce typing and avoid conflicts with the way shells typically parse text.

### Guillemet strings

Since command lines often process both single and double quotes, Origami also supports the use of French-style `«` and `»` guillemet quote characters:

```console
$ ori «Hello»
Hello
```

On macOS, you can type the `«` character with Option+Backslash, and the `»` character with Option+Shift+Backslash. On Windows, you can type Alt+0171 and Alt+0187, respectively.

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

This use of slash syntax to invoke a function isn't limited to the command line; it works in Origami `<path>` expressions too.

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
