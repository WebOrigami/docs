---
title: Operators
---

Origami is a dialect of JavaScript expressions so closely follows [JavaScript operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence).

## Operator precedence

Origami introduces some operators of its own, listed here alongside the standard JavaScript operators. Operators are listed in order from highest precedence to lowest precedence.

| Operator                                                    | Example                       | Associativity |
| :---------------------------------------------------------- | :---------------------------- | :------------ |
| Group                                                       | `(x)`                         | n/a           |
| [Protocol with path](syntax.html#namespaces)                | `https://example.com/about`   | left-to-right |
| Function call                                               | `x(y)`                        | n/a           |
| Path                                                        | `x/y/z`                       | n/a           |
| Tagged template                                             | `` x`y` ``                    | n/a           |
| Logical NOT                                                 | `!x`                          | n/a           |
| Bitwise NOT                                                 | `~x`                          | n/a           |
| Unary plus                                                  | `+x`                          | n/a           |
| Unary minus                                                 | `-x`                          | n/a           |
| Exponentiation                                              | `x ** y`                      | right-to-left |
| Multiplication                                              | `x * y`                       | left-to-right |
| Division                                                    | `x / y`                       | left-to-right |
| Remainder                                                   | `x % y`                       | left-to-right |
| Addition                                                    | `x + y`                       | left-to-right |
| Subtraction                                                 | `x - y`                       | left-to-right |
| Left shift                                                  | `x << y`                      | left-to-right |
| Right shift                                                 | `x >> y`                      | left-to-right |
| Unsigned right shift                                        | `x >>> y`                     | left-to-right |
| Less than                                                   | `x < y`                       | left-to-right |
| Less than or equal                                          | `x <= y`                      | left-to-right |
| Greater than                                                | `x > y`                       | left-to-right |
| Greater than or equal                                       | `x >= y`                      | left-to-right |
| Equality                                                    | `x == y`                      | left-to-right |
| Inequality                                                  | `x != y`                      | left-to-right |
| Strict equality                                             | `x === y`                     | left-to-right |
| Strict inequality                                           | `x !== y`                     | left-to-right |
| Logical AND                                                 | `x && y`                      | left-to-right |
| Logical OR                                                  | <code>x &#124;&#124; y</code> | left-to-right |
| Nullish coalescing                                          | `x ?? y`                      | left-to-right |
| Conditional (ternary)                                       | `x ? y : z`                   | right-to-left |
| Arrow                                                       | `(x) => y`                    | right-to-left |
| [Implicit parentheses](syntax.html#function-calls)          | `x y`                         | right-to-left |
| [Shorthand function](syntax.html#lambdas-unnamed-functions) | `=x`                          | right-to-left |
| [Pipe](syntax.html#pipe-operator)                           | `x -> y`                      | left-to-right |
| Spread                                                      | `...x`                        | n/a           |
| Comma                                                       | `x, y`                        | left-to-right |

An operator’s precedence determines how the Origami parser handles expressions that have more than one possible interpretation.

Example: `a -> b => c` could be interpreted as `a -> (b => c)` or `(a -> b) => c`. Origami uses the former interpretation, because the arrow operator has a higher precedence than Origami pipe operator.

## Spaces required for certain operators

Note: Origami allows the characters `%`, `&`, `+`, `-`, and `^` in [references](syntax.html#references). To use those characters as operators, put spaces around the character.

For example, minus signs often appear in file names as hyphens, so:

```
package-lock.json
```

refers to a file called `package-lock.json`. If you really intended to perform subtraction, put spaces around the minus sign:

```
package - lock.json
```

would subtract the value of `lock.json` from the value of `package`.
