---
title: Graphs represent data, files, resources
numberHeadings: true
intro = client/samples/frameworkIntro:
---

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

Creating things in Origami means thinking about the graph you've got and the graph you want, and about how to transform the former into the latter step by step.

## Explorable graphs

&nbsp;

Next: [Virtual content](intro3.html) »
