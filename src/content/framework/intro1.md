---
title: Content creation through graph transformation
numberHeadings: true
intro = client/samples/framework.yaml/intro:
---

As a motivating example, this introduction leads you through the following hypothetical design and development task:

> _Your team needs to design and implement an "About Us" area for your organization's site. The main About Us page will need to include a list of people on the team, with links to separate pages for each team member. A team member's page should show their name and a photo._

... link to example site ...

## Visualize the final result

Let's start by considering what we want to end up with. Based on the linked example, we want a site with a topology like this:

<figure>
{{ svg intro/site.yaml }}
</figure>

There's a main `index.html` route, and a `team` route with an HTML page for each person on the team.

Representing the site as a graph like this is not only a good way to visualize what we want to make. In Origami, we'll actually create a software representation of this graph that can be browsed directly.

## Select a data representation

Given our task statement, there are many ways we could represent the data we'll need. For now, let's pick the simplest possible representation that will work: a tiny data file listing the people on the team.

First, create a new folder called `src` at the root of the project.

Using the StackBlitz code editor or (if running locally) you're preferred code editor, create a file called `team.yaml` in the `src` folder.

Type a set of names into this `team.yaml` file using the YAML format below. You don't have to use the stock names — _this tutorial will be much more amusing to you if you type the names of your own teammates or family members!_

```\yaml
{{ intro/team.yaml }}
```

If you're not a fan of YAML, call the file `team.json` instead and type the data in JSON format:

```json
{{ json intro/team.yaml }}
```

If you go this route, use `team.json` wherever the tutorial uses `team.yaml`.

## Visualize the data representation

Above we envisioned the site we want to create as a graph. We can also consider the starting data representation as a graph:

<figure>
{{ svg intro/team.yaml }}
</figure>

The `0`, `1`, and `2` are the indices from the array of names. If we ask the array for index `0`, we'll get back the data for Alice.

## Visualize site creation as a transformation

Since both our starting data representation and final desired site are graphs, our development task is fundamentally the _transformation of the first graph into the second graph_.

<div class="two-up">
  <figure>
    {{ svg intro/team.yaml }}
  </figure>
  <figure>
    {{ svg intro/site.yaml }}
  </figure>
  <figcaption>Want to transform this data graph…</figcaption>
  <figcaption>…into this website graph</figcaption>
</div>

Viewed this way, we can already some intriguing correspondence between the two: for each person in the data graph, we want to generate an HTML page in the `team` route with that person's data. We'll be able to express that correspondence directly in Origami.

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

Next: [Formulas](intro2.html) »
