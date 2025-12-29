---
title: Origami expression language
subtitle: A concise dialect of JavaScript expressions for building sites
---

${ src/templates/blocks.ori(areaLinks) }

The Origami expression language lets you write concise formulas that determine the contents of your site.

If you're not a programmer, it's roughly equivalent to writing **spreadsheet formulas**. If you know JavaScript, Origami is essentially **JavaScript expressions with paths**.

The language is focused on being the most concise way possible to:

- Define the overall structure of the pages and resources for your site.
- Process data and content into publishable forms.
- Generate and reuse HTML across pages so they can be consistent and easier to make.

## Starting points

A short motion comic introduces the language:

<a href="https://origami-comics.netlify.app">
	<img class="screenshot" src="/assets/illustrations/comic.png" alt="Comic panel with the text ‘Intro to Origami’ with a bright explosion behind it in the style of classic comic book covers">
</a>

» Learn the [Content/Transformation conceptual model](/model.html) that forms the basis for Origami

» Create a basic blog in Origami in the [hands-on tutorial](tutorial.html)

» Read about the basics of [Origami expressions](expressions.html)

» Try Origami in the command line using the [Origami CLI](/cli)

## Concept

The Origami language and tools round out the native web languages, handling the tasks that HTML and CSS alone can't handle:

<figure>
  <img src="/assets/illustrations/roles.svg" style="width: 75%;">
</figure>

Using the Origami language, you can write a concise site definition to establish your site's structure. You use the same language to process data into publishable forms, and to define templates to generate HTML. You can make those pages available as static files (that is, regular files that can be served cheaply or for free), or using the included Origami server, or using other servers like [Express](https://expressjs.com/).

The Origami [expression syntax](expressions.html) is relatively simple and intended for people who have some experience working with HTML and CSS. Full knowledge of JavaScript isn't required.
