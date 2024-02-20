---
title: Sharing a common library and tools
---

The async tree pattern is simple enough that you can readily apply it to any project without having to accept a dependency on anyone else's code. That independence can be a strength, and depending on your constraints, may be appropriate for your projects.

But it's also true that everything shown in this tutorial is general-purpose in nature, and could find ready application in many contexts. That is one objective of the Web Origami project: to provide solid implementations of these general-purpose building blocks.

You don't have to use any of these Web Origami pieces to take advantage of the async tree pattern in your work — but it's likely they address things you'd want to do, and so can make your work easier.

## async-tree library

The Web Origami [async-tree](/async-tree) library contains implementations of the base classes illustrated in this tutorial:

- [ObjectTree](/async-tree/ObjectTree.html) creates an async tree backed by an in-memory JavaScript object.
- [FileTree](/async-tree/FileTree.html) creates an async tree backed by a file system folder tree.
- [FunctionTree](/async-tree/FunctionTree.html) creates an async tree backed by a function and a domain.

These async-tree library implementations are somewhat more full-featured that the simplified versions presented in this tutorial.

The library also contains general-purpose versions of some of the tree operations in this tutorial:

- `map` handles the general case of mapping a tree with keys of one type (`.md` for markdown files, say) to another (`.html` for HTML files).
- `merge` merges multiple trees.
- [Tree](/async-tree/Tree.html) is a collection of helper functions, including a `plain` function like the one discussed in this tutorial. It resolves any async tree to a plain JavaScript object.

## Command-line tool

This tutorial demonstrated a simple `json` tool that dumps a tree's contents to the console. The Web Origami project expands this idea with its [ori](/cli) command-line interface.

By default, ori displays a tree in YAML format, but can also display a tree as JSON, a table, or a diagram in SVG format. The built-in [@svg](/builtins/@svg.html) command is used to generate all the tree diagrams in this tutorial.

ori includes richer implementations of all the general-purpose tools shown in this tutorial:

- [@serve](/builtins/@serve.html) command. ori's server has more features, but the basic concept remains the same: the server translates an HTTP/HTTPS request into the traversal of an async tree. ori also includes an Express middleware version that does the same thing.
- [@setDeep](/builtins/@setDeep.html) command like the one in this tutorial. ori also includes a related [@copy](/builtins/@copy.html) command that adds command-line progress feedback. This can be used as the basis for a build process like the one shown in this tutorial.
- [@mdHtml](/builtins/@mdHtml.html) command that transforms markdown text to the corresponding HTML.

In addition to these commands, ori includes a number of other general-purpose commands for working with async trees.

## Pick a representation that works, change it later if necessary

The async tree pattern in general, and the Web Origami async-tree library in particular, make it fairly easy to start on a development problem. You can pick a data representation that's good enough to get started, knowing that you have the flexibility to change that representation later.

When working with async trees, it's often useful to deliberately start with a simplified tree and change it later. For example:

- You might write a quick function-based tree that generates a handful of sample objects your initial code can operate on.
- As your code begins to function, you may need to provide a wider range of sample input than a function can easily express. At that point, you could swap in an object-based tree of sample data.
- As your project continues to mature, you may need to incorporate data at larger scales, swapping in a tree of sample files.
- Eventually, when your code is working against your sample data, you might swap in another tree that obtains the data from some official data source like a database or other network resource. You might retain any of the earlier function, object, or files-based trees for testing purposes.

## Focus on your domain-specific problems

This tutorial set out to tackle a simple problem: converting a tree of markdown content into a corresponding tree of HTML content. If you were to solve the same problem using the Web Origami async-tree library and the ori tool, you would have to very little code.

Most of the code we've looked at here would be subsumed by the corresponding classes in the async-tree library and commands provided by the ori tool. The only code you would have to write would be to address the specifics of the particular development task covered in this tutorial:

- the specific definition of a collection of markdown content from an object, folder tree, or function (or a combination of all three)
- the specific transformation of values identified with keys ending in `.md` to keys ending in `.html`

Those things can be accomplished in very little JavaScript code. (Using the even higher-level [Origami language](/language/), you can solve the entire problem even less code.)

The general lesson of working with async trees is that many common development tasks can be viewed as the definition or transformation of trees. Viewed at the proper level of abstraction, most of those tasks are, in fact, general problems that can be solved with shared code. Using such shared code lets you focus most of your time on solving the problems that are unique to your chosen domain.

This concludes the async tree pattern tutorial.

&nbsp;

[Back to top of area](/pattern)
