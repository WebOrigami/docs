---
title: Operator precedence
---

Origami is a dialect of JavaScript expressions so closely follows [JavaScript operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence).

Origami introduces some operators of its own. The following table indicates their precedence relative to the standard JavaScript operators.

| Operator                                                    | Example                       | Associativity |
| :---------------------------------------------------------- | :---------------------------- | :------------ |
| Group                                                       | `(x)`                         | n/a           |
| [Protocol with path](syntax.html#namespaces)                | `https://example.com/about`   | left-to-right |
| Function call                                               | `x(y)`                        | n/a           |
| Path                                                        | `x/y/z`                       | n/a           |
| Tagged template                                             | `` x`y` ``                    | n/a           |
| Logical NOT                                                 | `!x`                          | n/a           |
| Equality                                                    | `x == y`                      | left-to-right |
| Inequality                                                  | `x != y`                      | left-to-right |
| Strict equality                                             | `x === y`                     | left-to-right |
| Strict inequality                                           | `x !== y`                     | left-to-right |
| Logical AND                                                 | `x && y`                      | left-to-right |
| Logical OR                                                  | <code>x &#124;&#124; y</code> | left-to-right |
| Nullish coalescing                                          | `x ?? y`                      | left-to-right |
| Conditional (ternary)                                       | `x ? y : z`                   | right-to-left |
| Arrow                                                       | `(x) => y`                    | right-to-left |
| Spread                                                      | `...x`                        | n/a           |
| [Implicit parentheses](syntax.html#function-calls)          | `x y`                         | right-to-left |
| [Shorthand function](syntax.html#lambdas-unnamed-functions) | `=x`                          | right-to-left |
| [Pipe](syntax.html#pipe-operator)                           | `x -> y`                      | left-to-right |
