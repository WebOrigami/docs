---
title: Origami language syntax
---

## Requirements

The Origami syntax is designed to be relatively easy to type and read in several different environments, each of which impose some constraints:

- Windows filenames, which cannot use the characters `\ / : * ? " < > |`
- macOS filenames, whose requirements are a subset of Windows'
- Terminal shells such as `bash`, which suggests avoiding the characters `( ) { } &`
- YAML/JSON file keys. These file formats can technically represent any string key, but it's desirable to let authors write Origami formulas as string keys, particularly in YAML, with a minimum degree of quoting or escaping.
- Templates, in which Origami expressions can appear inside `\{\{}}` substitutions.

## Expressions

The following types of expressions are supported by the Origami CLI and in Origami formulas:

| Description                                  |        | Examples                         |
| :------------------------------------------- | ------ | :------------------------------- |
| String with single quotes                    | &emsp; | `'hello'`                        |
| Function call                                |        | `greet('world')`                 |
|                                              |        | `fn('foo', 'bar')`               |
| Function call with implicit parentheses      |        | `greet 'world'`                  |
|                                              |        | `fn 'foo', 'bar'`                |
| Function call with colon (useful in shell)   |        | `fn:foo`                         |
| Indirect function call                       |        | `(fn())()`                       |
| Slash-separated function call or path¹       |        | `greet/world`                    |
| Percent-separated function call or path¹     |        | `greet%world`                    |
| Integers                                     |        | `42`                             |
| Floating-point numbers                       |        | `3.14`                           |
| Literal reference to a key in scope          |        | `foo`                            |
|                                              |        | `file.txt`                       |
| Object literals                              |        | `a=1 b=2 c=3`                    |
| Self-reference to the value defined by a key |        | `this`                           |
| HTTPS or HTTP URL                            |        | `https://example.com/index.html` |
| HTTPS or HTTP URL with spaces                |        | `https example.com index.html`   |
| Parentheses group                            |        | `(foo)`                          |
| Template literal with substitution           |        | `` `Hello, \{\{name}}` ``        |
| Lambda expressions (anonymous functions)     |        | `=message`                       |

¹ You can use slashes in paths in the command-line, but Windows prevents the use of slashes in file names, and even macOS applications may not expect slashes to appear in file names. For this reason, it's recommended to use percent signs in paths that appear in file names.

See also Origami [formulas](/framework/formulas.html), which define additional syntax for assignments and other types of declarations.

### Implicit vs explicit parentheses

Origami expressions generally permit use of implicit parentheses for function calls to make it easier for you to invoke functions from a command-line shell, as shells often interpret parentheses.

For example, if you have a file `sample.txt`, you can pass it to a function `uppercase` with or without parenthesis:

```console
$ ori sample.txt
This is a text file.
$ ori uppercase.js
export default (x) => x.toString().toUpperCase();
$ ori "uppercase(sample.txt)"
THIS IS A TEXT FILE.
$ ori uppercase sample.txt
THIS IS A TEXT FILE.
```

Additionally, when the ori CLI evaluates an Origami expression, if the top-level result is a function, then ori will implicitly invoke it:

```console
$ ori greet.js
export default (name = "world") => `Hello, ${name}.`;
$ ori "greet()"
Hello, world.
$ ori greet
Hello, world.
```

Here, both the `greet()` and `greet` forms are equivalent.
