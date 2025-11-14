---
title: "text`…`"
supertitle: "Tree."
---

A [tagged template function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) that renders a text string including the deep values of [map-based trees](/async-tree/mapBasedTree.html). See also [`Tree.indent`](indent.html), which normalizes whitespace indentation.

As discussed in [template expressions](http://localhost:5000/language/expressions.html#templates), Origami template strings can directly include the contents of arrays, objects, or trees. JavaScript template literals do not provide useful results for such objects:

```js
// JavaScript
`Hello, \${ { name: 'Alice' } }.`; // "Hello, [object Object]."
```

Origami provides more useful results for such complex values through the `Tree.text` template literal. This is implicitly used for all template literals in Origami expressions, so it's use is optional. Both of these produce the same result:

```ori
// Origami
`Hello, \${ { name: 'Alice' } }.`               // "Hello, Alice."
Tree.text`Hello, \${ { name: 'Alice' } }.`      // "Hello, Alice."
```

## Calling from JavaScript

The `Tree.text` builtin is provided so that JavaScript programs can use it to render trees the same way Origami does.

```js
${ samples/js/treeText.js }
```

Since `text` is a tagged template function, it is followed immediately by a backtick instead of an opening parenthesis. Also note the use of `await`, since `text` is an asynchronous function.

The above module exports this string:

```
${ samples/js/treeText.js/ }

```
