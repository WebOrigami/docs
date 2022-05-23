---
title: Thinking in graphs
numberHeadings: true
intro = client/samples/frameworkIntro:
---

Now that you know how to create virtual files, let's use them to build a little website!

Suppose your team says:

> _We need an "About Us" area for our site. The main About Us page should include a list of people on the team, with links to separate pages for each person. A person's page should show their name and a photo._

Here's an [example About Us area](/samples/aboutUs) you can consider as a model for this task:

- There's a main `index.html` URL.
- There's a `team` URL with an HTML page for each person on the team.

## Visualize the final result

Let's work backward from the desired result, which we can represent as a graph like this:

<figure>
{{ svg intro/site.yaml }}
</figure>

A graph is not only a good way to visualize your goal — in Origami, you'll create a software representation of this graph that you can browse.

## Select a starting data representation

One simple way to represent the data for this site is a data file listing the names of the people on the team.

<span class="tutorialStep"></span> Inside the `src` folder, create a file called `team.yaml`.

<span class="tutorialStep"></span> Type some names into `team.yaml` using the YAML format below. You don't have to use these stock names — this tutorial will be **much** more entertaining if you type the names of your own teammates or family members!

```\yaml
{{ intro/team.yaml }}
```

If you're not a fan of YAML, call the file `team.json` instead and type the data in JSON format:

```json
{{ json intro/team.yaml }}
```

If you go this route, use `team.json` wherever the tutorial uses `team.yaml`.

Just as you can envision the final site as a graph, you can also consider the starting data as a graph:

<figure>
{{ svg intro/team.yaml }}
</figure>

The `0`, `1`, and `2` are the indices from the array of names. If you ask this graph for `0`, you'll get a node that represents the data for Alice: a subgraph that currently defines a single property node for `name`.

## Visualize site creation as a transformation

Since both your starting data representation and final desired site are graphs, your development task is fundamentally the _transformation of the starting graph into the final graph_.

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

Viewed this way, you may see some correspondence between the two graphs: for each person in the data graph, you want to generate an HTML page in the `team` route with that person's data. You'll be able to express that correspondence directly in Origami.

Creating things in Origami means thinking about the graph you've got and the graph you want, and about how to transform the former into the latter step by step. This is similar to the paper-folding art of origami, in which you can transform a flat square of paper into an artwork.

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

&nbsp;

Next: [Transform graphs](intro4.html) »
