---
title: The Map Tree pattern
subtitle: A flexible way to work with data, files, web resources, and more
---

${ src/templates/blocks.ori(areaLinks) }

Ideas in this section:

- **You can represent almost any source of data** as a subclass of the standard JavaScript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class or an asynchronous variation.
- **You can transform maps** in various ways — for example changing data into a presentable web page — using fast, general-purpose operations.
- **You can organize maps** into hierarchical tree structures, like a site's tree of resource.

This is an excellent way to serve or build many types of software artifacts:

- web sites/apps
- documentation
- data sets
- command-line tools
- dev toolchains

As a pattern, _there is no code library or framework_. The Map Tree pattern itself helps you:

- Apply a higher level of rigor to development tasks.
- Focus on the logical representation of the data instead of its physical storage and location.
- Reconsider how and where data is stored while leaving the rest of your project intact.
- Use a consistent model for manipulating one thing or an entire batch of things.
- Reuse code between projects.

You can use this pattern in your own projects without taking on any new dependencies. Additionally, this Map Tree pattern serves as the foundation for the Web Origami project. If you use the [async-tree](/async-tree/) library, the higher-level [Origami language](/language/), or the [command-line interface](/cli/), you will find it useful to understand this foundational pattern.

Follow the walkthrough to see how to represent and transform data using this pattern. This uses JavaScript and Node.js, but you can [apply the pattern in other languages like Python](https://jan.miksovsky.com/posts/2025/10-07-python-blog).

&nbsp;

Next: [Start the walkthrough](start.html) »
