---
title: Origami expression language
subtitle: A small language for expressions that access or transform trees and other data
---

{{ templates/blocks.orit(_) }}

Web Origami includes a small Origami expression language focused on:

- Invoking functions
- Traversing paths into trees likes files and data
- Defining trees
- Defining text with templates

You can use the same Origami expression language in:

- The [ori command-line tool](/cli/) to evaluate command-line arguments. This gives you considerable expressive power to invoke JavaScript utilities from the command line to, for example, traverse and manipulate files and other types of data.
- The Web Origami [framework](/framework/) `.ori` files that define virtual folders and files.
- Web Origami [templates](/framework/templates.html) to add dynamic content inside boilerplate text like HTML.
- [Dynamic front matter in YAML](yaml.html) via a custom `!ori` tag.
