---
title: Language design principles
---

These general principles guide the design of the Origami language itself. They are listed here so you can decide whether the language is likely to be a good fit for you.

### Simplicity is as important as performance

- Do things in the plainest way possible. This makes things easier on collaborators and on yourself when you return to a project later. It also enables a high degree of sharing/reuse.
- Use plain strings, plain functions, and plain objects whenever possible.
- Functions should have the most obvious, simplest signature possible. They should generally be [pure functions](https://en.wikipedia.org/wiki/Pure_function): they always return the same output for identical inputs and have no side effects.
- Use standard, or _de facto_ standard, file formats whenever possible.
- Avoid dependencies.

### You are always in control

- No magic black boxes that guess what you probably want. Things only happen according to your instructions.
- You should be able to understand, anticipate, and explain the effect of every line of code.
- No enforcement of a particular file structure or build tool.

### Complement HTML, CSS, and JavaScript instead of trying to replace them

- If you know HTML and CSS but not JavaScript, the language should make sense to you.
- If you already know JavaScript, the language is essentially JavaScript expressions with syntax for slash-delimited paths.
- If you ever encounter a situation where Origami expressions are not sufficient, you can easily invoke JavaScript.
- Origami prefers using existing platform concepts directly. In advanced usage, this may mean you might encounter an unfamiliar concept from the platform — like async functions or typed arrays — but in the end that's better than a slightly simpler but proprietary concept. You are learning something you can apply to every future web project.

### Focus on creating great sites

- The Origami language built-in functions cover the features that many, many sites need.
- Features only of interest to specific communities are offered as extensions. Those extensions should be as simple as possible. If their core utility can be expressed without any dependency on Origami, do it that way.
- You can build sites directly in JavaScript (without Origami) using the async-tree library.

### Focus on providing good ways to perform operations on trees

- Such operations are ubiquitous in building digital artifacts like websites, but the platform (and Node.js) includes no solution for them. People fail to notice the considerable cost of implementing these operations.
- Make it possible to represent all hierarchical data sources as trees. Origami offers built-in access to many common types of trees; others are offered via extensions.
- For all other hierarchical data sources, it should be straightforward to define a tree implementation compatible with Origami using just the tiny AsyncTree interface.
- Operations that work on one kind of tree should work on any kind of tree.
