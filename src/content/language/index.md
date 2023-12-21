---
title: Origami language
subtitle: Use formulas to define a website or other structured content
---

{{ templates/blocks.orit(_) }}

Use the Origami language to make digital content:

- websites
- documentation
- data sets
- command-line tools

Working in Origami feels like making a spreadsheet: you define things with formulas that each yield a piece of the thing you're trying to create and build toward a final result. Like a spreadsheet, Origami is excellent for quick experiments or independent projects, but it's also just as suitable for real work; this site is created in Origami.

You can learn more about the basics of Origami in [Hello, world](hello.html), or follow the short [tutorial](tutorial.html) to build a simple site in Origami.

## Features

The Origami language is relatively small, because it is intended just to:

- Define tree structures, like that of a website's pages and resources
- Traverse paths into trees of data or files
- Create text content using templates
- Invoke functions defined in other languages like JavaScript

## Flexibility

You can use the same Origami language in:

- Origami `.ori` files that define websites and other structured content.
- Origami [templates](templates.html) to add dynamic content inside boilerplate text like HTML.
- [Dynamic front matter in YAML](yaml.html) via a custom tag.
- The [ori command-line tool](/cli/) to evaluate command-line arguments. This gives you considerable expressive power to invoke JavaScript from the command line to, for example, traverse and manipulate files and other types of data.

## Concepts

Most tools for creating websites deliver power by hiding complexity from you, at the cost of inflexibility. When they offer flexibility, they do so through configuration systems that are often difficult to understand.

The Origami approach gives you a both power and flexibility through a foundation of interlocking, fundamental concepts:

1. **Async trees** are a convenient way think about hierarchical data, files, and other resources.
1. **Virtual content** represents your intermediate results and your final result.
1. **Formulas** transform your real data and files into virtual content you can browse.
1. **Scope** determines the code and data your formulas can reference.
1. **Templates** turn data and trees into text.
1. **Transforms** change a tree from one form to another, processing content in bulk.
1. **Tools** serve virtual content or copy it to static files for publishing.

Applying these concepts lets you create impressive results with much less work than other systems while maintaining control over all aspects of the process.

If you want to understand things all the way down, explore the [programming pattern](/pattern/), [async-tree](/async-tree/) library, and [language](/language/) that support the high-level concepts.
