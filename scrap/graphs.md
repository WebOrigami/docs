---
title: Explorable graphs represent data, files, and other resources
teamByName: !ori mapKeys(framework-intro/src/teamData.yaml, =./name)
complete:
  index.html: |
    <h1>Our Amazing Team</h1>
    <li>Alice</li>
    <li>Bob</li>
    <li>Carol</li>
  personIcon.svg: !ori framework-intro/src/assets/personIcon.svg
  images: !ori framework-intro/src/images
  styles.css: !ori framework-intro/src/assets/styles.css
  team: !ori "map(teamByName, =`<h1>${ ./name }</h1>`, { extension: '→html' })"
  thumbnails: !ori images
---

When creating digital content through transformation, it's often helpful to identify the high-level structure of the source form, intermediate forms, and result form. In many cases, the content will have a hierarchical or tree-like structure.

A _graph_ is an appropriate way to conceptualize and visualize such hierarchical structures. Mathematically speaking, a graph is a set of objects in which certain pairs of the objects are related in some way. Colloquially speaking, a graph is the sort of boxes-with-arrows diagram you often see depicting the structure of organizations, processes, and websites.

## Visualize a folder as a graph

The `src/public` folder contains the material that will become your public-facing About Us site. The hierarchical structure of file system folders lends itself well to representation as a graph. Web Origami includes tools that let you visualize graphs such as folders in your browser.

<span class="tutorialStep"></span> In the browser preview, add `.svg` to the URL you are previewing. (Glitch users: do this in the fake address bar above the preview window. Glitch tries hard to prevent you from navigating to a page that starts with a period, so you'll need to either the type the `svg` part and then add a `.` at the beginning, or cut-and-paste the text `.svg` into the address bar.)

You'll see the `public` folder visually represented as a graph:

<figure>
${ svg framework-intro/src/static }
</figure>

The little circles represent folders, like the `public` folder itself (on the left) and the `images` folder (in the middle). The boxes represent _values_ — in this case, the contents of files. The arrow labels, or _keys_, are the way the graph identifies what's what. In the case of a folder, the keys are the file names.

(Glitch users: if your window isn't large enough to see a useful portion of the diagram in the Glitch preview pane, you can open the preview into its own window by clicking the `⋮` button above the preview, then selecting **Open in new window**.)

<span class="tutorialStep"></span> In the browser preview, explore the graph diagram by clicking on the little circles or boxes. (Click Back to return to the diagram.) In Web Origami, this diagrammatic view of your project can be a useful way to visualize and explore the graph you are building.

The `public` folder graph in sitting inside a larger graph for the entire project.

## Visualize the team data as a graph

The `teamData.yaml` data also has a hierarchical structure: it's an array of people, each of which have some properties.

```\yaml
${ framework-intro/src/teamData.yaml }
```

We can visually represent this data as a graph.

<figure class="constrain">
${ svg client/samples/frameworkIntro/focusedteamData.yaml }
</figure>

(For brevity, in this and other diagrams showing team data, we'll just show the `name` and `image` properties for each person.)

In this graph, the top-level keys are integers (0, 1, 2), which are the indices of the array of names. The second-level keys are strings: `name`, `image`, etc.

Like the `public` folder, the graph of data in `teamData.yaml` in also sitting inside the larger project graph. It turns out to be useful to treat all these graphs the same way.

## Explorable graphs

Web Origami is designed to work with a very flexible type of graph called an _explorable graph_. An explorable graph is any structure that can do two things:

1. An explorable graph can tell you the keys it wants to make public — the labels on the arrows leading to the values. In the case of the `public` folder, the keys are file names (`images`, etc.); for the team data, the keys are the array indices (0, 1, 2) and property names (`name`, `location`, etc.).
1. You can ask an explorable graph for the value that goes with a given key. If you ask the graph for `src` folder for the `public` key, it will give you back the `public` folder as a graph. If you ask the team data graph for the `0` key, it will give you back the data for the first team member.

Web Origami _treats all explorable graphs exactly the same way_. Whatever you can do to a graph of files you can also do to a graph of data, and vice versa. For example, while many web servers let you browse through folders of files, Web Origami lets you also browse inside data files.

<span class="tutorialStep"></span> In the address bar, navigate to `teamData.yaml` to see the team data. Now add a trailing slash to that address, so that it ends in `teamData.yaml/`.

The browser will show an index page for the top level of the team data. You can browse into the data for the team members. For example, `teamData.yaml/0/name` will show the name of the first team member.

You can also explore data files with graph tools like the `.svg` tool you used above.

<span class="tutorialStep"></span> Navigate to `teamData.yaml/.svg` to view the graph of the team data, or navigate to `teamData.yaml/0/.svg` to view the graph of the data for just the first team member.

<figure>
${ svg framework-intro/src/teamData.yaml/0 }
</figure>

An explorable graph can be an in-memory object, a folder tree, data in a file, dynamically-generated data, or other structured content. (You can read more about the different [graph variants](/core/variants.html) supported by Origami.)

If you're interested in reading more about the technical definition of explorable graphs, see the [pattern](/pattern) section of this site. For now, one key technical point to mention is that explorable graphs are _asynchronous_ by nature, so they can encompass a wide variety of structures including network resources. If you are a programmer and are familiar with the concept of a [promise](https://en.wikipedia.org/wiki/Futures_and_promises), you can think of an explorable graph as a _tree of promises_.

## Visualize the final result as a graph

Since you can think of any structures as a graph, you can also visualize the final result of your About Us site as a graph.

Let's work backward from the desired result form of the site. It might look like this:

<figure>
${ svg complete }
</figure>

As discussed at the outset, we want an index page listing our team members, plus a page for each individual member, full-size photos, thumbnail-size photos, and some resources for the site's visual design.

## Visualize site creation as a transformation

If you can treat the `src/public` folder (the source form of your project) and the final site (the result form) as graphs, then your creation task is fundamentally the _transformation of the source graph into the result graph_.

Viewed this way, you may see some correspondences between the source graph and result graph:

- For each person in the team data, you want to generate an HTML page in the `team` route with that person's data.
- For each person, you also want to have a link on the main `index.html` page.
- For each full-size photo in the `images` folder, you want to have a corresponding thumbnail photo in the `thumbnails` folder.

You'll be able to express these correspondences directly in Web Origami.

Creating things in Web Origami means thinking about the graph you've got and the graph you want, and about how to transform the former into the latter step by step.

&nbsp;

Next: [Virtual content](intro3.html) »
