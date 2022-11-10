---
title: Explorable graphs represent data, files, and other resources
complete = client/samples/frameworkIntro/complete.meta:
---

When creating digital content through transformation, it's often helpful to identify the high-level structure of the source form, intermediate forms, and result form. In many cases, the content will have a hierarchical or tree-like structure.

A _graph_ is a great way to conceptualize and visualize such hierarchical structures. Mathematically speaking, a graph is a set of objects in which certain pairs of the objects are related in some way. Colloquially speaking, a graph is the sort of boxes-with-arrows diagram often used to depict the structure of organizations, processes, and websites.

## Visualize the source folder as a graph

The `src` folder for this project contains the source form of your site. File system folders are hierarchical, so you think of that folder as a graph. Graph Origami includes tools that let you visualize structures like the `src` folder as a graph in your browser.

<span class="tutorialStep"></span> Add `.svg` to the URL you're previewing so that it ends with `/src/.svg`. If you're using Glitch or StackBlitz, do this in the fake address bar inside the Glitch or StackBlitz page. If you're running locally, do this in your browser's real address bar.

You'll see the `src` folder visually represented as a graph:

<figure>
{{ svg framework-intro }}
</figure>

The little circles represent folders, like `src`, `photos`, and `public`. The boxes represent _values_ — in this case, files in those folders. The arrow labels, or _keys_, are the way the graph identifies what's what. In the case of a folder, the keys are the file names.

## Visualize the team data as a graph

The `team.yaml` data also has a hierarchical structure: it's an array of people, each of which have some properties.

<span class="tutorialStep"></span> Navigate to the `team.yaml` file in the browser. If the browser's still showing the graph above, click the box for `team.yaml` to navigate to it. Or type in the address bar to navigate to `/src/team.yaml` file.

You'll see the contents of the file itself:

```\yaml
{{ framework-intro/team.yaml }}
```

<span class="tutorialStep"></span> Now view the `team.yaml` data in graph form by adding `.svg` to the address bar. You'll see the team data represented visually:

<figure>
{{ svg framework-intro/team.yaml }}
</figure>

The `0`, `1`, and `2` are the indices from the array of names. If you ask this graph for `0`, you'll get a node that represents the data for Alice: a subgraph that currently defines a single property node for `name`.

## Explorable graphs

Graph Origami is designed to work with a very flexible type of graph called an _explorable graph_. An explorable graph is any structure that can do two things:

1. An explorable graph can tell you the keys it has — the labels on the arrows leading to the values. In the case of the `src` folder, the keys are file names (`photos`, etc.); for the team data, the keys are the object keys (`name`, `location`, etc.).
1. You can ask an explorable graph for the value that goes with a given key. If you ask the graph for `src` folder for the `public` key, it will give you back the `public` folder as a graph. If you ask the team data graph for the `0` key, it will give you back the data for the first team member.

Graph Origami _treats all graphs exactly the same way_. Whatever you can do to a graph of files you can do to a graph of data, and vice versa.

For example, while many web servers let you browse through files, Graph Origami lets you also browse into data files.

<span class="tutorialStep"></span> In the address bar, navigate to `/src/team.yaml` to see the team data. Now add a trailing slash to that address, so that it reads `/src/team.yaml/`.

The browser will show an index page for the top level of the team data. You can browse into the data for the team members. For example, `/src/team.yaml/0/name` will show the name of the first team member.

You can also explore data files with graph tools like the `.svg` tool you used above.

<span class="tutorialStep"></span> Navigate to `/src/team.yaml/0/.svg` to view the graph of the data for just the first team member.

<figure>
{{ svg framework-intro/team.yaml/0 }}
</figure>

## Visualize the final result as a graph

Since you can think of any structures as a graph, you can also visualize the final result of your About Us site as a graph.

Let's work backward from the desired result form of the site. It might look like this:

<figure>
{{ svg client/samples/frameworkIntro/complete.meta/public }}
</figure>

As discussed at the outset, we want an index page listing our team members, plus a page for each individual member, plus the other resources the site needs.

## Visualize site creation as a transformation

If you can treat the `src` folder (the source form of your project) and the final site (the result form) as graphs, then your creation task is fundamentally the _transformation of the source graph into the result graph_.

<div class="sideBySide">
  <figure>
    {{ svg expand framework-intro }}
  </figure>
  <figure>
  {{ svg client/samples/frameworkIntro/complete.meta/public }}
  </figure>
  <figcaption>Want to transform this source graph…</figcaption>
  <figcaption>…into this result graph</figcaption>
</div>

Viewed this way, you may see some correspondence between the two graphs: for each person in the team data, you want to generate an HTML page in the `team` route with that person's data. You'll be able to express that correspondence directly in Origami.

Creating things in Graph Origami means thinking about the graph you've got and the graph you want, and about how to transform the former into the latter step by step.

&nbsp;

Next: [Metagraphs and virtual content](intro3.html) »
