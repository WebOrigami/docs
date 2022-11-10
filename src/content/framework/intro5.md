---
title: Scope determines what formulas can reference
jsScopeExample:
  Math:
    pow: (function)
  (module):
    power: 2
    sumOfSquares: (function)
    (function body):
      result: "0"
      (for):
        i: 1
        (for body):
          squared: 1
          newTotal: (What can this see?)
---

## Comparison with block scope in programming languages

For over half a century, programming languages have often answered the scoping question with [block scoping](<https://en.wikipedia.org/wiki/Scope_(computer_science)#Block_scope>).

```js
// Return the sum of the squares from 1 to n.
const power = 2;

function sumOfSquares(n) {
  let total = 0;
  for (const i = 1; i <= n; i++) {
    const squared = Math.pow(i, power);
    const newTotal = total + squared; // What variables can be referenced here?
    total += newTotal;
  }
  return total;
}
```

The definition of `newTotal`can "see" the following variables in scope, each defined by a different level of the programming langauge's hierarchical block structure:

1. Variables defined inside the same `for` block: `squared`
1. Variables defined by the `for` loop itself: `i`
1. Variables defined inside the `function` block: `total`
1. Variables defined as function parameters: `n`
1. Variables defined at the module's top level: `sumOfSquares` and `power`
1. Global objects, like `Math`

When you write a statement like `newTotal = total + squared`, the language interpreter evaluates the references `total` and `squared` by searching through the blocks of the current scope in the above order, from innermost to outermost block.

We can visualize that scope as a graph. The first time through the loop, the scope looks like:

<figure>
{{ svg jsScopeExample }}
</figure>

&nbsp;

Next: [Templates](intro6.html) »
