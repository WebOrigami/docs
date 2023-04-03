---
title: Origami expression language
subtitle: A small language for expressions that access or transform graphs and other data
---

{{ templates/blocks.ori() }}

Graph Origami includes a small Origami expression language which is focused on:

- Invoking functions
- Traversing paths into graphs, including hierarchical data, files, virtual files
- Defining graphs
- Defining text with templates

The Origami language is used by

- The [Origami CLI](/cli) command-line tool to evaluate command-line arguments. This gives you considerable expressive power to invoke JavaScript utilities from the command line to, for example, traverse and manipulate files and other types of data.
- [Framework](/framework) `.graph` files that define virtual folders and files.
- [Templates](/framework) to add dynamic content inside boilerplate text like HTML.
- Document front matter.
