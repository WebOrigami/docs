---
title: Content creation through graph transformation
numberHeadings: true
intro = client/samples/frameworkIntro:
---

Let's say that we've been given the following design and development task:

> _Our team needs to design and implement an "About Us" area for our organization's site. The main About Us page should include a list of people on the team, with links to separate pages for each team member. A team member's page should show their name and a photo._

Here's an [example About Us area](/samples/aboutUs) we can consider as a model for this task.

## Visualize the final result

Let's start by considering what we want to end up with. Based on the linked example above, we want a site with a topology like this:

<figure>
{{ svg intro/site.yaml }}
</figure>

There's a main `index.html` route, and a `team` route with an HTML page for each person on the team.

Representing the site as a graph like this is not only a good way to visualize what we want to make. In Origami, we'll actually create a software representation of this graph that can be browsed directly.

## Select a data representation

Given our task statement, there are many ways we could represent the data we'll need. For now, let's pick the simplest possible representation that will work: a tiny data file listing the names of the people on the team.

Using the code editor (either the StackBlitz code editor or your preferred local editor), create a new folder called `src` at the root of the project.

Inside this new `src` folder, create a file called `team.yaml`.

Type some set of names into `team.yaml` using the YAML format below. You don't have to use these stock names — this tutorial will be **much** more entertaining if you type the names of your own teammates or family members!

```\yaml
{{ intro/team.yaml }}
```

If you're not a fan of YAML, call the file `team.json` instead and type the data in JSON format:

```json
{{ json intro/team.yaml }}
```

If you go this route, use `team.json` wherever the tutorial uses `team.yaml`.

## Visualize the data representation

Just as we envisioned the final site we want as a graph, we can also consider the starting data as a graph:

<figure>
{{ svg intro/team.yaml }}
</figure>

The `0`, `1`, and `2` are the indices from the array of names. If we ask this graph for `0`, we'll get a node that represents the data for Alice. This is a subgraph that currently defines a single property, `name`.

## Visualize site creation as a transformation

Since both our starting data representation and final desired site are graphs, our development task is fundamentally the _transformation of the starting graph into the final graph_.

<div class="sideBySide">
  <figure>
    {{ svg intro/team.yaml }}
  </figure>
  <figure>
    {{ svg intro/site.yaml }}
  </figure>
  <figcaption>Want to transform this data graph…</figcaption>
  <figcaption>…into this website graph</figcaption>
</div>

Viewed this way, we can already see some intriguing correspondence between the two graphs: for each person in the data graph, we want to generate an HTML page in the `team` route with that person's data. We'll be able to express that correspondence directly in Origami.

Generally speaking, creating things in Origami means thinking about the graph you've got and the graph you want, and about how to transform your starting point in steps until you have what you want. This is similar to the way the paper-folding art of origami, in which a flat square of paper is transformed in steps to create an artwork.

<figure style="align-items: center; display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); justify-items: center;">
  <img src="/assets/heart/step1.svg">
  <img src="/assets/heart/step2.svg">
  <img src="/assets/heart/step3.svg">
  <img src="/assets/heart/step4.svg">
  <img src="/assets/heart/step5.svg">
  <img src="/assets/heart/step6.svg">
  <img src="/assets/heart/step7.svg">
  <img src="/assets/heart/step8.svg">
</figure>

Each individual step is simple, but the cumulative result can be complex.

Next: [Formulas](intro2.html) »
