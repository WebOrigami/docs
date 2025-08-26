---
title: The Origami language
subtitle: Complements HTML, CSS, and JavaScript so you can build complete websites
---

${ src/templates/blocks.ori(areaLinks) }

The HTML, CSS, and JavaScript languages let you define individual web pages, but to build a complete site you also need to:

- Define the overall structure of the pages and resources for your site.
- Process data and content into publishable forms.
- Generate and reuse HTML across pages so they can be consistent and easier to make.
- Serve those pages to your visitors.

## Starting points

A short motion comic introduces the language:

<a href="https://origami-comics.netlify.app">
	<img class="screenshot" src="/assets/illustrations/comic.png" alt="Comic panel with the text ‘Intro to Origami’ with a bright explosion behind it in the style of classic comic book covers">
</a>

You can read about the basics of Origami in [Hello, world](hello.html) »

Create a basic blog in Origami in the [hands-on tutorial](tutorial.html) »

Try Origami in the command line using the [Origami CLI](/cli) »

## Concept

The Origami language and tools round out the native web languages:

<figure>
  <img src="/assets/illustrations/roles.svg" style="width: 75%;">
</figure>

Using the Origami language, you can write a concise site definition to establish your site's structure. You use the same language to process data into publishable forms, and to define templates to generate HTML. You can make those pages available as static files (that is, regular files that can be served cheaply or for free), or using the included Origami server, or using other servers like [Express](https://expressjs.com/).

The Origami language [syntax](syntax.html) is relatively simple and intended for people who have some experience working with HTML and CSS. Knowledge of JavaScript isn't required, although if you do know JavaScript you can do a lot with Origami.
