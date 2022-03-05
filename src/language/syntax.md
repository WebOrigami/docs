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

The following types of expressions are supported by the Origami CLI and in Egret formulas:

| Description                                  |              | Examples                  |
| :------------------------------------------- | ------------ | :------------------------ |
| String with single quotes                    | &nbsp;&nbsp; | `'hello'`                 |
| Template literal with substitution           |              | `` `Hello, \{\{name}}` `` |
| Function call                                |              | `greet('world')`          |
|                                              |              | `fn('foo', 'bar')`        |
| Function call with implicit parentheses      |              | `greet 'world'`           |
|                                              |              | `fn 'foo', 'bar'`         |
| Indirect function call                       |              | `(fn())()`                |
| Slash-separated function call or path¹       |              | `greet/world`             |
| Percent-separated function call or path¹     |              | `greet%world`             |
| Integers                                     |              | `42`                      |
| Floating-point numbers                       |              | `3.14`                    |
| Literal reference to a key in scope          |              | `foo`                     |
|                                              |              | `file.txt`                |
| Self-reference to the value defined by a key |              | `this`                    |
| Bound variable reference in a formula        |              | `${x}`                    |
| HTTP or HTTPS URL                            |              | `https://example.com`     |
| Parentheses group                            |              | `(foo)`                   |
| Lambda expressions (anonymous functions)     |              | `=> message`              |

¹ You can use slashes in paths in the command-line, but Windows prevents the use of slashes in file names, and even macOS applications may not expect slashes to appear in file names. For this reason, it's recommended to use percent signs in paths that appear in file names.

See also Egret [formulas](/egret/formulas.html), which define additional syntax for assignments and other types of declarations.

### Implicit vs explicit parentheses

Origami generally permits use of implicit parentheses for function calls to make it easier for you to invoke functions from a command-line shell, as shells often interpret parentheses.

```console
$ ori greet.js
export default (name = "world") => `Hello, ${name}.`;
$ ori "greet()"
Hello, world.
$ ori greet
Hello, world.
```

Here, both the `greet()` and `greet` forms are equivalent.

The last function in a command is a special case, and treated differently depending on the environment in which the expression is being evaluated:

- If an expression is invoked from the command line, and the expression ends with an identifier (like `greet` above), and the value of that identifier is function, the function will be invoked. This allows the easy invocation of functions from the command line. If you want to pass a function as a first-class object to a receiving function ([map](#map), say), use explicit parentheses for the receiving function.
- If the expression appears in an Egret [formula](/egret/Formula.html), a final function name in an expression will _not_ be invoked. This difference in behavior allows a formula to return a function as a first-class object. If you want to invoke a final function in a formula, use explicit parentheses.
