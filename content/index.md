---
title: Web Origami
subtitle: A way of making sites where you can understand how they're made
icon: bird.svg
area: "home"
fileName: index.html
---

${ src/templates/blocks.ori(areaLinks) }

Origami is a system for creating sites that complements HTML and CSS with the ability to concisely define the structure and content of your site.

**Everybody has something to say,** and the web is a great place to say it, but creating interesting sites can be hard or expensive. Standard HTML and CSS let you define individual pages, but it’s hard to efficiently create a bunch of pages and organize them into a coherent site.

Origami is designed for you: someone who wants to make a site for yourself or a small organization, who can write some HTML and CSS, who wants to understand how their site is put together. Maybe you're not a professional developer — or you are, but want to build sites more quickly.

The core idea is to describe the site you want at a high level as concisely as possible. If you can sketch your site like this:

<figure>
  <img src="/assets/illustrations/Site Sketch.svg">
</figure>

then you can turn that into a small Origami program that orchestrates the creation of your site:

```ori
{
  // Stylesheets, etc.
  assets/

  // Create a home page listing all the products
  index.html = index.ori(products.yaml)

  // Create a page for each product
  products = Tree.map(products.yaml, products.ori)
}
```

Origami lets you describe how you want to transform your data and files into HTML and the other resources for your site. You can create many things without complex programming: a full-text search feature, RSS feeds for blogs, and so on.

A high-level site definition is enough to let you immediately view and iterate on your site without complex build tools. When you’re ready to publish, Origami turns your site into a collection of plain files you can deploy wherever you want, often for free.

## Aspects

Web Origami includes these tools and ideas:

- The [Origami dialect of JavaScript](/language/) lets you concisely define a site or other structured using formulas similar to those in a spreadsheet.
- The [ori command-line interface](/cli/) (CLI) lets you use Origami expressions in a command terminal to manipulate files or get resources out of an Origami site in the command line. The CLI is also useful as a general tool in its own right for working with JavaScript in the shell.
- The [built-in functions](/builtins/) let you perform a number of common site development tasks in the Origami language or JavaScript.
- The [async-tree library](/async-tree/) lets JavaScript programmers use core Origami features in JavaScript applications.
- The [conceptual pattern](/pattern/) at the foundation of it all lets you represent a wide variety of data types as tree structures that can be easily traversed and transformed. There's no code at this level; you can use the ideas in any project.

<span class="tutorialStep"></span> View some [example sites](/language/examples.html)

<span class="tutorialStep"></span> Make a basic blog in the [tutorial](/language/tutorial.html)

## Building sites through transformation

Web Origami takes its name from the traditional paper folding art of origami, in which you can transform a flat square of paper into an artwork.

<figure style="align-items: center; display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); justify-items: center; max-width: calc(4 * 125px + 6rem);">
  <img src="/assets/heart/step1.svg">
  <img src="/assets/heart/step2.svg">
  <img src="/assets/heart/step3.svg">
  <img src="/assets/heart/step4.svg">
  <img src="/assets/heart/step5.svg">
  <img src="/assets/heart/step6.svg">
  <img src="/assets/heart/step7.svg">
  <img src="/assets/heart/step8.svg">
</figure>

The steps may be simple but the end result can be complex and beautiful. In the same way, Origami lets you transform your content into something to share.

## Community

If you'd like to ask questions, visit the [Web Origami room](https://matrix.to/#/%23weborigami:envs.net) on [Matrix](https://matrix.org).

If you're interested in trying Origami in a friendly setting, you can participate in a guided playtest and share your feedback. Or join a pair programming session to use these new techniques and tools to collaboratively implement a site. Contact [Jan Miksovsky](https://jan.miksovsky.com/contact.html).
