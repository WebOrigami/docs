---
title: pika Syntax
path: /pika/syntax.html
---

This describes the syntax of the small expression language by both the `pika` command-line tool and formulas in [Egret](/egret).

## Requirements

The `pika` syntax is designed to be relatively easy to type and read in several different environments, each of which impose some constraints:

- Windows filenames, which cannot use the characters `\ / : * ? " < > |`
- macOS filenames, whose requirements are a subset of Windows'
- Terminal shells such as `bash`, which suggests avoiding the characters `( ) { } &`
- YAML file keys. This file format can technically represent any string key, but it's desirable to let authors write `pika` formulas as YAML keys with a minimum degree of quoting or escaping.

## Expressions

The following types of expressions are supported by the `pika` tool and in Egret formulas:

| Description                                   |              | Examples               |
| :-------------------------------------------- | ------------ | :--------------------- |
| String with single quotes                     | &nbsp;&nbsp; | `'hello'`              |
| String with backticks and variable references |              | `` `Hello, ${name}` `` |
| Function call                                 |              | `greet('world')`       |
|                                               |              | `fn('foo', 'bar')`     |
| Function call with implicit parentheses       |              | `greet 'world'`        |
|                                               |              | `fn 'foo', 'bar'`      |
| Indirect function call                        |              | `(fn())()`             |
| Slash-separated function call or path¹        |              | `greet/world`          |
| Percent-separated function call or path¹      |              | `greet%world`          |
| Integers                                      |              | `42`                   |
| Floating-point numbers                        |              | `3.14`                 |
| Literal reference to a key in scope           |              | `foo`                  |
|                                               |              | `file.txt`             |
| Self-reference to the value defined by a key  |              | `this`                 |
| Bound variable reference in a formula         |              | `${x}`                 |
| HTTP or HTTPS URL                             |              | `https://example.com`  |
| Parentheses group                             |              | `(foo)`                |

¹ You can use slashes in paths in the command-line, but Windows prevents the use of slashes in file names, and even macOS applications may not expect slashes to appear in file names. For this reason, it's recommended to use percent signs in paths that appear in file names.

See also Egret [formulas](/egret/formulas.html), which define additional syntax for assignments and other types of declarations.

### Implicit vs explicit parentheses

`pika` generally permits use of implicit parentheses for function calls to make it easier for you to invoke functions from a command-line shell, as shells often interpret parentheses.

```console
$ pika greet.js
export default (name = "world") => `Hello, ${name}.`;
$ pika "greet()"
Hello, world.
$ pika greet
Hello, world.
```

Here, both the `greet()` and `greet` forms are equivalent.

The last function in a command is a special case, and treated differently depending on the environment in which the expression is being evaluated:

- If an expression is invoked from the command line, and the expression ends with an identifier (like `greet` above), and the value of that identifier is function, the function will be invoked. This allows the easy invocation of functions from the command line. If you want to pass a function as a first-class object to a receiving function ([map](#map), say), use explicit parentheses for the receiving function.
- If the expression appears in an Egret [formula](/egret/Formula.html), a final function name in an expression will _not_ be invoked. This difference in behavior allows a formula to return a function as a first-class object. If you want to invoke a final function in a formula, use explicit parentheses.

## Formal grammar

The `pika` shell command parses an expression by starting with the `expression` term below. The [Formula](/egret/Formula.html) class used by [MetaMixin](/egret/MetaMixin.html) and the [meta](/pika/meta.html) command parses a key which may be a formula by starting with the `key` term.

```
args: parentheticalArgs
      omittedParensArgs

assignment: ["…"]declaration = expression [extension]

backtickContents: backtickText variableReference backtickContents
                  backtickText

backtickQuoteString: `backtickContents`

backtickText: everything but ` and $

declaration: variableDeclaration
             literal

expression: singleQuoteString
            backtickQuoteString
            indirectCall
            group
            spaceUrl
            spacePathCall
            protocolCall
            slashCall
            percentCall
            functionCall
            number
            reference

extension:  .literal

functionCall: reference [args]

group: ( expression )

indirectCall: group args

key: assignment
     inheritableDeclaration
     declaration

list: expression , list
      expression

literal: everything but =(){}$&"'/`%, and whitespace

number: (valid JavaScript signed/unsigned integer or floating point number)

omittedParensArgs: whitespace list

parentheticalArgs: ( [list] )

pathHead: indirectCall
          group
          functionCall
          getReference

pathKey: group
         reference

reference: thisReference
           variableReference
           literal

singleQuoteString: '[text]'

percentCall: pathHead "/" [percentPath]

percentPath: pathKey / percentPath
           pathKey

protocolCall: pathHead ":"|"://" slashPath
              pathHead ":"|"://" protocolCall

slashCall: ["//"] pathHead "/" [slashPath]

slashPath: pathKey / slashPath
           pathKey

spaceUrl: spaceUrlProtocol whitespace spaceUrlPath

spaceUrlProtocol: https
                  http

spaceUrlPath: pathKey whitespace spaceUrlPath
              pathKey

spacePathCall: "."|".." [spaceUrlPath]

thisReference: "this"

valueDeclaration: ["…"]declaration

variableDeclaration: {variableName}[extension]

variableName: for now, JavaScript identifiers with ASCII letters

variableReference: ${variableName}[extension]
```
