---
title: Origami expression language
subtitle: A small language for expressions that access or transform graphs and other data
---

{{ templates/blocks.ori() }}

Graph Origami includes a small Origami expression language which is focused on:

- Invoking functions
- Traversing paths into graphs, including hierarchical data, files, virtual files

The Origami language is used by

- The [Origami CLI](/cli) command-line tool to evaluate command-line arguments. This gives you considerable expressive power to invoke JavaScript utilities from the command line to, for example, traverse and manipulate files and other types of data.
- [Formulas](/framework/formulas.html) inside of YAML/JSON data files or YAML/JSON front matter to define virtual data values.
- Formulas in files names to define virtual files.
- [Templates](/framework/templates.html) to add dynamic content inside boilerplate text like HTML.
