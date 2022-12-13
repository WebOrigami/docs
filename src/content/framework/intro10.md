---
title: Observations
---

## Stepping back

The crux of your website project is the set of formulas you've written in `+.yaml`. Here at the end, that file contains:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page obtained by invoking the index.ori template
index.html = index.ori():

# Thumbnails for all the images, at 200 pixels width
thumbnails = map(images, =image/resize(@value, width=200)):

# A graph of the team data by name (hidden)
(teamByName) = mapKeys(teamData.yaml, =name):

# HTML pages for each team member via the person.ori template
team = map(teamByName, person.ori, extension='->html'):
```

This one file provides an extremely high-level overview of how the whole site is built.

In fact, this file serves as the core of the transformation in the creation-as-transformation model with which we began this tutorial:

<figure>
  <img src="/assets/illustrations/transformation.svg">
</figure>

Other aspects of the transformation include the `index.ori` and `person.ori` templates and the `image/resize` function. But it's the formulas that are orchestrating the overall transformation of the real files and data into the graph of the final site. They let you concisely describe how you want to create individual virtual files, or virtual folders containing multiple files, starting with real source data and resources.

The `+.yaml` file is extremely information dense; it would be hard to find _general-purpose_ tools that let you create a website using comparable transformations in substantively less code.

By "general-purpose", we can observe that, aside from the presence of the `image/resize` function, nothing here is specific to generating websites. You can use the same exact concepts — formulas, `map`, expressions that search a scope, templates that convert graphs to text — to generate many other types of digital content. In the same way that a spreadsheet isn't limited to only creating invoices or financial models, Graph Origami isn't limited to only creating websites.

Although a sample `greet` function was used for demonstration, the construction of the final site didn't require you to write any JavaScript code. Graph Origami gives you easy access to JavaScript if you need it, but you create many interesting things without writing JavaScript.

In order to keep this tutorial clear, this particular About Us site is of course trivial. It _looks_ trivial, for one thing, but that's mostly a matter of the small amount of sample data in `teamData.yaml` and the basic visual aesthetic defined in the page templates and `styles.css`. You could easily expand this example into a more interesting site by adding more data, more complex styling, and more transformations. And you could also build substantially more complex things using the same concepts.

Beyond that, it's important to recognize that, when viewed through the lens of transformation, _most static sites are just not that complex_. They may present more information, and have a larger intricate navigational structure. But at their core, many site projects are fundamentally taking a set of data (or files) and just saying, in different ways, "For each thing of type X, create a corresponding page (or page fragment, or resource) of type Y." Those sorts of transformations are precisely the sorts of things Graph Origami lets you concisely express.

## Core concepts

This tutorial promised to introduce the core concepts of the Graph Origami framework, so let's review those concepts in the context of what you've achieved:

1. The overarching **creation-as-transformation** model offered a way of thinking about the final result form of your About Us site, the initial source form of the material you had to work with, and the transformations that would be necessary to turn the source form into the result form.
1. **Explorable graphs** provided a convenient way to represent the data about team members in `teamData.yaml`, the structure of the project's files in the `src` tree, the structure of the final site, as well as intermediate results like the `teamByName` graph.
1. **Virtual content** let you conceptualize and view content like `index.html` or the `team` pages that only exist while code is running.
1. **Metagraphs** let you define folders like `public` that define their own transformations. In this case, you created additions to the `public` graph through the `+.yaml` file.
1. **Formulas** let you concisely transform real data and files (like `images`) into browsable virtual content (like `thumbnails`).
1. **Scope** determined the code (like `greet`) and data (`title`) your formulas could reference. To the extent you had to configure things, you did so by positioning them in the project's hierarchical scope.
1. **Templates** like `index.ori` and `person.ori` turned your data and graphs into text like the site's `index.html` page and individual team member pages.
1. **Transforms** turned graphs from one form to another, processing content in bulk: like `images` into `thumbnails`, or `teamData.yaml` data into HTML fragments in `index.html` or the complete pages in `team`.
1. **Graph tools** let you (automatically or manually) copy your virtual site into real static files that can be published.

Throughout the process, you could both think about the structure of the site at a high level, as well as directly see the various virtual parts of the site as they came together. As a bonus, you could visualize the site's overall structure in an interactive graph diagram showing the live structure of the evolving site.

## Next steps

This concludes the Graph Origami framework tutorial. If you've found this interesting, you can explore related aspects of Graph Origami:

- As you were creating the About Us site, the [Origami command-line interface](/cli) and its included web server was working behind the scenes to let you view the site during development and to copy the virtual files to real files.
- The [Origami expression language](/language) you've been using to write formulas has additional features which were not covered in this tutorial.
- The Graph Origami framework is built on a [core library](/core) that can let you do everything you did here with formulas, but using JavaScript instead. This can be useful in more complex projects, or if you prefer more control.
- You can implement sites like this About Us site completely from scratch using the [explorable graph pattern](/pattern) and no library or framework at all. That approach may appeal to people who want to work as close to the metal as possible, and is also useful reference if you want to understand the basics of how the Graph Origami framework works under the hood.

&nbsp;

Back to [Framework](/framework/)
