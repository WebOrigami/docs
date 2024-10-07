---
title: Language design principles
---

These general principles guide the design of the Origami language itself. They are listed here so you can decide whether the language is likely to be a good fit for you.

### Simplicity is as important as performance

- Do things in the plainest way possible. This makes things easier on collaborators and on yourself when you return to a project later. It also enables a high degree of sharing/reuse.
- Use plain strings, plain functions, and plain objects whenever possible.
- Functions should have the most obvious, simplest signature possible.
- Use standard formats whenever possible.
- Avoid dependencies.

### Always keep you in control

- No magic black boxes.
- You should be able to understand, anticipate, and explain the effect of every line of code.

### Design for consistency with the web platform

For these purposes, the web platform includes Node.js.

- Using a complex concept from the platform — e.g., async functions, typed arrays — is much better than a slightly simpler proprietary concept. You are learning something you can apply to every future web project.
- No compilation or build required; all Origami code runs in Node or the browser directly. If you want a build process, you can bring your own.

### Design the Origami language to complement HTML, CSS, and JavaScript

- If you know HTML and CSS but not JavaScript, the language should make sense to you.
- If you already know JavaScript, the language should be as close to JavaScript expressions as possible.
- If you ever encounter a situation where Origami is not sufficient, you should be able to easily invoke JavaScript.

### Focus on creating great sites

- The Origami language built-in functions cover the features that many, many sites need.
- Features only of interest to specific communities are offered as extensions. Those extensions should be as simple as possible. If their core utility can be expressed without any dependency on Origami, do it that way.
- You can build sites directly in JavaScript (without Origami) using the async-tree library.

### Focus on providing good ways to perform operations on trees

- Such operations are ubiquitous in building digital artifacts like websites, but the platform (and Node.js) includes no solution for them. People fail to notice the considerable cost of implementing these operations.
- Make it possible to represent all hierarchical data sources as trees. Origami offers built-in access to many common types of trees; others are offered via extensions.
- For all other hierarchical data sources, it should be straightforward to define a tree implementation compatible with Origami using just the tiny AsyncTree interface.
- Operations that work on one kind of tree should work on any kind of tree.
