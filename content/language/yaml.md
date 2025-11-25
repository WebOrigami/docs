---
title: Origami in YAML
---

Origami's YAML parser adds support for two custom YAML tags: `!ori` and `!ori.call`, which allow for Origami expressions to be embedded in YAML documents.

These tags can be helpful in contexts where the bulk of the data in a file can be easily expressed in YAML, but you wish to attach additional data from other data sources or incorporate the results of calculations.

## `!ori` tag

The `!ori` tag evaluates the rest of the line as an Origami [expression](expressions.html).

```yaml
# tagDemo.yaml
${ samples/help/yamlTags/tagDemo.yaml }
```

Evaluating this causes the `!ori` expressions to be evaluated.

```console
$ ori tagDemo.yaml/
${ Origami.yaml(samples/help/yamlTags/tagDemo.yaml/) }

```

Because Origami expressions are evaluated asynchronously, the parsed YAML data will be an object whose `calculation` and `greeting` properties are each a `Promise` for the expression's value.

## `!ori.call` tag

The related `!ori.call` tag takes an array of values. The first will be evaluated as an Origami expression, which should return a function. That function will be called with the remaining array values as arguments.

Suppose `callTagDemo.yaml` contains:

```yaml
${ samples/help/yamlTags/callTagDemo.yaml }
```

The `!ori.call` tag will invoke the [`Origami.mdHtml`](/builtins/origami/mdHtml.html) function, passing it the remaining value in the array as its argument.

Evaluating this YAML file invokes the function:

```console
$ ori callTagDemo.yaml/
${ Origami.yaml(samples/help/yamlTags/callTagDemo.yaml/) }

```

## Incorporate a file as a property

Suppose you have a set of data files to represent information on products. Most of the data is text or numbers, but you also have an image file you'd like to associate with a product.

```yaml
product: Widget
description: Our latest model
image: !ori images/widget.svg
```

The `image` expression points to an SVG file; the path will be resolved using Origami [scope](scope.html).

This makes the `image` data a property of the product. Code that, for example, renders a product as an HTML page doesn't need to know where image came from.

## Apply a template to data

One use for `!ori.call` is to apply a template to data.

Suppose a project defines a [template document](/language/templateDocuments.html) `page.ori.html`:

```ori
${ samples/help/yamlTags/page.ori.html }
```

This template document defines a function that defines a single `_` underscore parameter. The argument passed to that function should have `title` and `_body` properties.

A YAML file can define data _and_ indicate that the template should be applied to it:

```yaml
${ samples/help/yamlTags/quote.yaml }
```

Evaluating this applies the template as a function to the data and returns the text:

```console
$ ori quote.yaml/
${ samples/help/yamlTags/quote.yaml/ }
```
