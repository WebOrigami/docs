---
title: Functional forms
---

A number of Origami built-in functions have two forms:

- A _standard form_ with two arguments: the first argument is the target of the operation, the second is some form of options that determine how the operation will be performed. The built-in applies the operation to the target and returns the result.
- A _functional form_ with a single argument: the options that determine how the operation will be performed. The built-in returns a function result; this function can be applied to a target to perform the actual operation.

| Standard form                   | &nbsp;&nbsp;&nbsp; | Functional form            |
| :------------------------------ | ------------------ | :------------------------- |
| `@image/format(image, format)`  |                    | `@image/formatFn(format)`  |
| `@image/resize(image, options)` |                    | `@image/resizeFn(options)` |
| `@group(treelike, fn)`          |                    | `@groupFn(fn)`             |
| `@regexParse(text, regex)`      |                    | `@regexParseFn(regex)`     |
| `@map(treelike, options)`       |                    | `@mapFn(options)`          |
| `@deepMap(treelike, options)`   |                    | `@deepMapFn(options)`      |
| `@paginate(treelike, count)`    |                    | `@paginateFn(count)`       |
| `@sort(treelike, options)`      |                    | `@sortFn(options)`         |
| `@take(treelike, count)`        |                    | `@takeFn(count)`           |
| `@deepTake(treelike, count)`    |                    | `@deepTakeFn(count)`       |

The functional forms are useful in combination with Origami's [pipe operator](http://localhost:5000/language/syntax.html#pipe-operator) to create content pipelines. These apply a series of functions to input data to create a final result.

## Example

A small project has a set of names in `names.yaml`, and two functions: `greet.js` turns a name into a greeting, and `paragraph.ori` turns a text string into an HTML fragment with a `<p>` paragraph tag around that text.

```console
$ ori names.yaml
- Alice
- Bob
- Carol
$ ori greet.js
export default (name = "world") => `Hello, \${name}.`;
$ ori paragraph.ori
(text) => `<p>\${ text }</p>`
```

To apply one of the functions to the names, a [@map](@map.html) can be used.

```console
$ ori @map names.yaml, greet.js
- Hello, Alice.
- Hello, Bob.
- Hello, Carol.
```

Two `@map` calls can be nested to first convert a name to a greeting, then put that text in a paragraph.

```console
$ ori "@map(@map(names.yaml, greet.js), paragraph.ori)"
- <p>Hello, Alice.</p>
- <p>Hello, Bob.</p>
- <p>Hello, Carol.</p>
```

The `greet.js` and `paragraph.ori` functions are the beginning of a content pipeline: a series of transformations that will be applied to the data to produce the final result. As the pipeline grows longer, it can be hard to read the nested function calls to understand the flow of data.

As the pipeline grows longer, it may be useful to express the nested function calls as a pipeline with the pipe operator, which is `->` or the `→` arrow character. A single string can be passed through both functions in a pipeline:

```console
$ ori "'Alice' → greet.js → paragraph.ori"
<p>Hello, Alice.</p>
```

To put all the data through the pipeline at once, the functional form of `@map` can be used, which is called `@mapFn`.

```console
$ ori "names.yaml → @mapFn(greet.js) → @mapFn(paragraph.ori)"
- <p>Hello, Alice.</p>
- <p>Hello, Bob.</p>
- <p>Hello, Carol.</p>
```

The `@mapFn(greet.js)` expression creates a function that will be applied to the entire collection of names in `names.yaml` to produce a set of greetings. The `@mapFn(paragraph.ori)` in the next step creates a function that will be applied to the set of greetings to produce a set of paragraphs.

<div class="sideBySide">
  <figure>
    ${ svg.js(samples.ori/cli/names.yaml) }
  </figure>
  <figure>
    ${ svg.js(@map(samples.ori/cli/names.yaml, samples.ori/cli/greet.js)) }
  </figure>
  <figure>
    ${ svg.js(@map(@map(samples.ori/cli/names.yaml, samples.ori/cli/greet.js), samples.ori/cli/paragraph.ori)) }
  </figure>
  <figcaption>Names</figcaption>
  <figcaption>Greetings</figcaption>
  <figcaption>Paragraphs</figcaption>
</div>

Deciding when to use a standard form like `@map` and a functional form like `@mapFn` is a matter of preference. Traditional function calls and pipelines can be freely mixed. In this case, perhaps you prefer to think of the map operation applying a pipeline to individual names:

```console
$ ori "@map(names.yaml, (name) => name → greet.js → paragraph.ori)"
- <p>Hello, Alice.</p>
- <p>Hello, Bob.</p>
- <p>Hello, Carol.</p>
```

Other operations like sorting and grouping can be placed into a pipeline through the functional forms [@sortFn](@sort.html) and [@groupFn](@group.html).
