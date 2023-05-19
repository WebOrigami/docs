---
title: Origami expression language
subtitle: A small language for expressions that access or transform graphs and other data
---

{{ templates/blocks.ori() }}

Graph Origami includes a small Origami expression language focused on:

- Invoking functions
- Traversing paths into graphs likes files and data
- Defining graphs
- Defining text with templates

You can use the same Origami expression language in:

- The [ori command-line tool](/cli/) to evaluate command-line arguments. This gives you considerable expressive power to invoke JavaScript utilities from the command line to, for example, traverse and manipulate files and other types of data.
- The Graph Origami [framework](/framework/) `.graph` files that define virtual folders and files.
- Graph Origami [templates](/framework/templates.html) to add dynamic content inside boilerplate text like HTML.
- [Dynamic front matter in YAML](yaml.html) via a custom `!ori` tag.
