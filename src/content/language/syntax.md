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

Since command lines often process both single and double quotes, Origami also supports the use of French-style `«` and `»` guillemet quote characters:

```command
$ ori «Hello»
Hello
```

On macOS, you can type the `«` character with Option+Backslash, and the `»` character with Option+Shift+Backslash. On Windows, you can type Alt+0171 and Alt+0187, respectively.

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
(){}[]<>-=,/:`"'«»\#→⇒
```

must be escaped with a `\\` backslash.

## Object literals

Object literals are created with `{` and `}` curly braces, and contain key/value pairs:

```ori
{
  name: "Alice"
  location: "Honolulu"
}
```

You can separate key/value pairs with commas, newlines, or both. Keys should not be quoted.

As with references (above), you can use periods in keys. Escape any special characters like spaces:

```ori
{
  Test\\ File.txt: "Sample text"
}
```

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

## Object properties can reference other local properties

The expression that defines the value of a property can reference other properties in the same object, or any parent object, by name.

```ori
// localRef.ori
${ samples.ori/help/localRef.ori }
```

This evaluates to:

```console
$ ori localRef.ori/
${ yaml samples.ori/help/localRef.ori/ }
```

This type of local reference is not possible in languages like JavaScript.

Origami will avoid recursive local references. If you try to define a `name` property whose value expression refers to `name`, Origami assumes the latter refers to an inherited `name` property.

```ori
// inherited.ori
${ samples.ori/help/inherited.ori }
```

Here the expression `\${name}` will resolve to the inherited `name` defined in the parent object.

```console
$ ori inherited.ori
${ yaml samples.ori/help/inherited.ori/ }
```

## Object property getters

If you'd like a value to be calculated every time it's requested, you can create a property _getter_. You create a property getter in Origami by using an `=` equals sign to define the property instead of a `:` colon.

```ori
{
  index.html = greet.js()
}
```

This `.ori` expression defines a getter called `index.html`. Each time the object is asked for `index.html`, it will invoke the JavaScript function exported by `greet.js`.

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

You can use `...` three periods or the single `…` ellipsis character to merge arrays and objects.

```console
$ ori tree1.yaml
${ samples.ori/help/merge/tree1.yaml }$ ori tree2.yaml
${ samples.ori/help/merge/tree2.yaml }$ ori { ...tree1.yaml, ...tree2.yaml }
${ yaml {
  ...samples.ori/help/merge/tree1.yaml
  ...samples.ori/help/merge/tree2.yaml
} }
```

In an `.ori` file, you can use this to merge a folder into an object that also defines individual files.

```ori
{
  index.html: "Hello!"

  // Merge in everything in the `styles` folder
  …styles
}
```

The built-in [`merge`](/builtins/tree/merge.html) function performs this same operation as a function.

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

The head of the path, like `tree` here, is resolved as a reference. If that returns a treelike object, it will be traversed using the remaining keys "with", "path", "to", and "something". Treelike objects include object literals and hierarchical data in JSON and YAML files:

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

## File paths

Paths that start with a leading `/` slash refer to absolute paths in the filesystem:

```
/Users/alice/example.txt
```

Similarly, paths that start with a leading `./` refer to relative paths, and paths that start with `../` refer to the current parent folder.

Paths can traverse into files of known [file types](fileTypes.html#standard-file-types) like `.json` files:

```console
$ ori /Users/alice/myProject/package.json
{
  "name": "Test project",
  "type": "module"
}
$ ori /Users/alice/myProject/package.json/name
Test project
```

You can reference folder or file by name without any special leading character; such names will be resolved in [scope](scope.html). Example: if a project contains a folder called `src`, then the following are equivalent:

```console
$ ori ./src
$ ori src
```

Inside an Origami program, if you have a local variable that has the same name as a folder in scope, and you want to explicitly reference the folder instead of the variable, you can use the [`files:`](/builtins/files.html) protocol.

## Namespaces

Origami organizes its [built-in functions and objects](/builtins) into namespaces: groups of things with a name. These names end in a colon.

Some namespaces like [`https:`](/builtins/https.html) act like protocols in URLs:

```
https://example.com
```

The result of this URL will be the contents of the data at the indicated internet location.

In addition to `https:` and `http:`, Origami has some custom protocols like [`files:`](/builtins/files.html).

Other namespaces like [`dev:`](/builtins/dev/) and [`tree:`](/builtins/tree/) act as containers for functions and objects built into Origami. For example, the `tree:` namespace contains a function called [`tree:plain`](/builtins/tree/plain.html) that converts a tree (of markdown files, say) to a plain JavaScript object.

```
tree:plain(markdown)
```

## Shorthand for builtin functions

For faster typing in the command line and for more concise code generally, Origami allows built-in functions like `tree:plain` to be called in a shorthand form like `plain` that omits the namespace.

This means the following commands are equivalent:

```console
$ ori tree:copy src/site.ori, tree:clear ./build
$ ori copy src/site.ori, clear ./build
```

To distinguish between builtin function names and your own function names, the Origami parser enforces the following rule for the names of functions: if a function name contains only letters and numbers, it is taken to refer to a builtin. This rule applies to the names of functions:

- invoked with parentheses
- invoked with spaces that represent implicit parentheses
- invoked as a tagged template (see template literals, below)

Examples:

- `map(markdown, page.ori)` — `map` is taken as a shorthand for the [`tree:map`](/builtins/tree/map.html) because `map` is only letters and appears before parentheses.
- `yaml package.json` — `yaml` is a shorthand (for [`origami:yaml`](/builtins/origami/yaml.html)) because it's only letters and appears in the function position. The parentheses are implicit; it's the same as `yaml(package.json)`.
- `uppercase.js(sample.txt)` — `uppercase.js` is not a builtin name because it contains a period.
- `mdHtml("Hello")` — `mdHtml` is a shorthand (for [`text:mdHtml`](/builtins/text/mdHtml.html)).
- `mdHtml/Hello` — `mdHtml` isn't immediately assumed to be a shorthand because it's being called with slash syntax (see Paths, above). The reference `mdHtml` will be resolved in [scope](scope.html). If a folder exists called "mdHtml", the reference will resolve to that folder, not the builtin, but if there is nothing else in scope called "mdHtml", then `mdHtml` will ultimately resolve to the builtin.

In the last example, using a slash path prevented `mdHtml` from being immediately taken as the name of a builtin. In some cases you may have a local variable that contains a function, and the variable's name is only letters and numbers, such that it will be assumed to be a shorthand for a builtin function. If you want the name to reference the local variable in a function call, append a `/` slash to the name:

```ori
// Call `fn` as a function even though its name looks like a shorthand
(fn) => fn/()
```

Alternatively, place parentheses around the name:

```ori
// Another way to call `fn` as a function
(fn) => (fn)()
```

Both techniques cause the `fn` reference to be treated as a regular scope reference. In both cases the reference will find the local `fn` parameter, which can then be invoked as a function.

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

You can prefix a template literal with a function name immediately before the leading backtick. This invokes that function with the strings that make up the template's boilerplate text and a set of values to be substituted in the output. This function signature is compatible with JavaScript [tagged template functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates). See [`indent`](/builtins/text/indent.html) for an example of a builtin function that you can use in a tagged template.

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

For example, the [`map`](/builtins/tree/map.html) built-in function can apply another function to a tree's values and/or keys. To concisely define a function that will be evaluated in the context of each tree value, you can use a lambda:

```console
$ cat letters.json
${ samples.ori/cli/letters.json
}$ cat uppercase.js
${ samples.ori/cli/uppercase.js
}$ ori "map(letters.json, =uppercase.js(_))"
${ yaml map samples.ori/cli/letters.json, samples.ori/cli/uppercase.js }
```

The `_` underscore above refers to the value being mapped, so `=uppercase.js(_)` will convert the value to uppercase.

You can also define lambda functions with an expanded syntax using a "=>" (or the Unicode ⇒ Rightwards Double Arrow) that allows for multiple named parameters:

```
(parameter1, parameter2, parameter3, …) => expression
```

The `map` function shown above passes the mapping function the value and key being mapped — in that order — as arguments, so the above example can be rewritten:

```console
$ ori "map(letters.json, (description, letter) => uppercase.js(description))"
${ yaml map samples.ori/cli/letters.json, (description, letter) => samples.ori/cli/uppercase.js(description) }
```

In this case, since the `letter` argument isn't used, it can be omitted:

```console
$ ori "map(letters.json, (description) => uppercase.js(description))"
${ yaml map samples.ori/cli/letters.json, (description) => samples.ori/cli/uppercase.js(description) }
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

This can be useful when applying multiple transformations of data. Suppose an index page is generated from markdown and then placed inside a template:

```ori
{
  index.html = template.ori(mdHtml(index.md))
}
```

You can rewrite the above using the pipe operator so that the flow of data reads proceeds from left to right:

```ori
{
  index.html = index.md → mdHtml → template.ori
}
```

This may make the flow of data easier to see.

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

## Instantiating classes

For interoperability with JavaScript classes, Origami supports a `new:` syntax for creating new class instances.

If the JavaScript file `User.js` exports a `User` class, then

```
new:User.js("David")
```

is equivalent to the JavaScript `new User("David")`.
