---
title: Metagraphs and virtual content

# Add a stuff.yaml file
step1 = merge(framework-intro/src/public, this):
  stuff.yaml: |
    title: Our Amazing Team

# Treat stuff.yaml as additions
step2 = merge(framework-intro/src/public, this):
  title: Our Amazing Team

realFolder: |
  +stuff.yaml: |
    title: Our Amazing Team
virtualFolder:
  title: Our Amazing Team
---

In Graph Origami, a _metagraph_ is any graph that defines itself. This takes the form of a graph with special keys which, when interpreted, create new virtual content for that graph.

## Create a file that defines virtual values

<span class="tutorialStep"></span> Start by creating a new file in the `/src/public` folder called `stuff.yaml`. It doesn't matter what you call this file, as long as it has a `.yaml` extension (`.yml` works too). Even calling it `+.yaml` will work.

You can use this `stuff.yaml` file to define data and other things useful for construction of the site. For example, if all of the pages on the site should show the same title, you can define that title once and use it in multiple places.

<span class="tutorialStep"></span> Enter the following line in `stuff.yaml`:

```{{'yaml'}}
{{ step1/stuff.yaml }}
```

<span class="tutorialStep"></span> Refresh or view the `.svg` page to see the updated visual graph for the `public` folder that includes `stuff.yaml`:

<figure>
{{ svg step1 }}
</figure>

There's nothing special going on yet. The `stuff.yaml` file is just a text file with some data.

Now you're going to do a magic trick to turn the data in `stuff.yaml` into virtual content in the `public` folder.

<span class="tutorialStep"></span> Rename `stuff.yaml` to `+stuff.yaml`. The `+` at the beginning is a signal to Graph Origami that the data _inside_ that data file should be treated as if it were _outside_ the data file — as if those data were elements of the containing `public` folder. The `+stuff.yaml` are called _graph additions_.

<span class="tutorialStep"></span> Refresh/view the browser preview to see the updated `public` folder:

<figure>
{{ svg step2 }}
</figure>

## Metagraphs as transformation

If you compare the above graphs, you'll see that in the second graph:

- The `public` folder now appears to contain a virtual file called `title` that contains the text "Our Amazing Team".
- The `+stuff.yaml` additions file no longer appears. Graph Origami is interpreting the contents of that file as virtual elements, so it hides the file itself.

The `+stuff.yaml` file you created transforms the real `public` folder into a slightly different, virtual `public` folder. We'll look at other graph transformations later, but an additions file like `+stuff.yaml` is one of the simplest and most concise ways to define a graph transformation. Visually, the transformation looks like this:

<div class="sideBySide">
  <figure>
    {{ svg realFolder }}
  </figure>
  <figure>
    {{ svg virtualFolder }}
  </figure>
  <figcaption>Before: Real files</figcaption>
  <figcaption>After: Virtual files</figcaption>
</div>

Since `+stuff.yaml` is sitting inside the folder it transforms, we can call the `public` folder a metagraph: a graph that defines its own transformations.

## Transforming the public folder into the final site

The rest of this tutorial will continue to transform the `public` folder into the final About Us site. The `public` folder will be what your users eventually see and interact with. The containing `src` folder will contain additional source material (like the `team.yaml` data file) that will be used as fodder to create the final result, but only the contents of the virtual `public` folder will be part of the final site.

&nbsp;

Next: [Formulas](intro4.html) »
