---
title: A system of tools for map-based trees
---

You can readily use this Map Tree pattern in any project without having to accept a dependency on anyone else's code. That independence can be a strength and, depending on your constraints, may be appropriate for your projects.

But it's also true that everything shown in this walkthrough is general-purpose in nature, and could find ready application in many contexts. That is one objective of the Web Origami project: to provide solid, reusable system of general-purpose tools based on this pattern.

You don't have to use any of these Web Origami pieces to take advantage of the map pattern in your work. But they do things you’ll likely want, and so can make your work easier.

## async-tree library

The Web Origami [async-tree](/async-tree) library contains more full-featured implementations of the base `Map` classes illustrated in this walkthrough:

- [ExplorableSiteMap](/async-tree/ExplorableSiteMap.html) is an async map backed by a site
- [FileMap](/async-tree/FileMap.html) is a map backed by a file system folder tree
- [FunctionMap](/async-tree/FunctionMap.html) is a map backed by a function and a domain
- [ObjectMap](/async-tree/ObjectMap.html) is a map backed by an in-memory JavaScript object

The library also contains general-purpose versions of some of the map and tree operations in this walkthrough:

- [`copy`](/builtins/dev/copy.html) command which, as shown here, can be used as the basis for a build process.
- [`json`](/builtins/tree/json.html) returns a JSON representation of a map-based tree.
- [`map`](/builtins/tree/map.html) handles the general case of mapping a tree with keys of one type (`.md` for markdown files, say) to another (`.html` for HTML files).
- [`mdHtml`](/builtins/origami/mdHtml.html) command that transforms markdown text to the corresponding HTML.
- [`plain`](/builtins/tree/plain.html) can resolve a tree (including an async tree) to a plain JavaScript object.
- [`serve`](/builtins/dev/serve.html) command. This server has more features but retains the fundamental concept of translating an HTTP/S request into the traversal of a tree of maps.

## Command-line tool

This walkthrough showed a simple `json` tool to dump a map-based tree to the console. The Web Origami project expands this idea with its [ori](/cli) CLI (command-line interface). By default, ori displays a tree in YAML format, but can also display a tree as JSON or other formats.

Beyond displaying trees, the ori CLI is an interpreter of for the full [Origami expression language](/language) (see below).

## Functions for handling common site tasks

The `async-tree` library and the ori CLI are completely generic in nature and can be used in many software domains.

The [origami](/builtins/origami) collection of functions is specifically designed for creating sites from `Map`-based site trees. It includes functions for tasks that come up often while making sites, like converting markdown to HTML, or creating a blog feed from a set of posts.

## Origami expression language for working with trees

The [Origami language](/language) is a dialect of JavaScript expressions designed for concisely building software artifacts like sites. The language makes it easy to describe a `Map`-based tree and to apply operations to such trees.

## Pick a representation that works, change it later if necessary

The Map Tree pattern in general, along with the various pieces of of the Web Origami system, make it fairly easy to start on a development problem. You can pick a data representation that's good enough to get started, knowing that you have the flexibility to change that representation later.

When working with maps and trees, it's often useful to deliberately start with the simplest tree representation possible and change it later if necessary. For example:

- You might write a quick function-based map that generates a handful of sample objects your initial code can operate on.
- As your code begins to function, you may need to provide a wider range of sample input than a function can easily express. At that point, you could swap in an object-based map of sample data.
- As your project continues to mature, you may need to incorporate data at larger scales, swapping in a map-based tree of sample files.
- Eventually, when your code is working against your sample data, you might swap in an async tree that obtains the data from some official data source like a database or other network resource. You might retain any of the earlier function, object, or files-based trees for testing purposes.

## Focus on your domain-specific problems

This walkthrough set out to tackle a simple problem of converting a tree of markdown content into a corresponding tree of HTML content. If you were to solve that same problem using the Web Origami async-tree library, the ori tool, and the Origami expression language, you would have to very little code.

- Most of the code we've looked at here would be subsumed by the corresponding classes and commands in the Web Origami libraries and CLI.
- The only substantive code you would have to write would specify where your data comes from and the structure of your unique site (the `site.js` file in this example).
- Those things can be accomplished in very little code in JavaScript, and even less code in the higher-level Origami language.

The general lesson of the Map Tree pattern is that many common development tasks can be viewed as the definition or transformation of trees. At that level of abstraction, most of those tasks are, in fact, general problems that can be solved with shared, reusable code. This lets you focus most of your time on solving the problems unique to your chosen domain.

&nbsp;

[Done](/pattern)
