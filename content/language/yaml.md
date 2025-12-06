---
title: Origami in YAML
---

Origami supports .yaml files as a known [file type](fileTypes.html#yaml-files).

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

Suppose you have a set of data files to represent information on products. Most of the data is text or numbers, but you'd also like to associate each product with an image. A typical solution is to reference an image by a path:

```yaml
product: Widget
description: Our latest model
image: images/widget.svg
```

The `image` property is a string, "images/widget.svg". Code that renders this object has to be aware of the path and know what base address the path is relative to.

In some cases, it may be preferable to make the file _contents_ available as a property of the data object.

```yaml
product: Widget
description: Our latest model
image: !ori images/widget.svg
```

Here the `image` property will be (a `Promise` for) the actual SVG content. The path will be resolved using the Origami [scope](scope.html) for the folder containing the YAML file. The expression could just as easily reference a network file via a URL.

Code that renders the product as an HTML page won't need to care where the image came from.

## YAML includes

A related use for the `!ori` tag is to break apart YAML files into pieces that can be combined, in much the same way that many programming languages support via `include` statements.

Suppose a commonly-used block of YAML is defined in its own file:

```yaml
# address.yaml
${ samples/help/address.yaml }
```

This can then be included in a second YAML file:

```yaml
# order.yaml
${ samples/help/order.yaml }
```

To include the object represented by the first YAML file, the `address.yaml/` needs a trailing slash to unpack that file. Referencing `address.yaml` on its own would return the YAML file text.

With that, evaluating the second file returns an object that incorporates the first:

```console
$ ori order.yaml/
${ Origami.yaml(samples/help/order.yaml/) }
```

This allows complex files to be broken down into smaller, reusable pieces.

## Apply a template to data

One use for `!ori.call` is to apply a template to data.

Suppose a project defines a [template document](/language/templateDocuments.html) called `page.ori.html`:

```ori
${ samples/help/yamlTags/page.ori.html }
```

This template document defines a function that accepts a single `_` underscore parameter. The argument passed as that parameter should have `title` and `_body` properties.

A YAML file can define data _and_ indicate that the template function should be applied to it:

```yaml
${ samples/help/yamlTags/quote.yaml }
```

Evaluating this applies the template as a function to the data and returns the text:

```console
$ ori quote.yaml/
${ samples/help/yamlTags/quote.yaml/ }
```

This effectively treats a YAML file as a format for describing a function call, with potentially complex arguments and significant blocks of multi-line text.
