---
title: Metagraphs

# Add a stuff.yaml file
step1 = merge(framework-intro/src/public, this):
  stuff.yaml: |
    title: Our Amazing Team

# Treat stuff.yaml as additions
step2 = merge(framework-intro/src/public, this):
  title: Our Amazing Team

realFolder: |
  stuff.yaml: |
    title: Our Amazing Team
virtualFolder:
  title: Our Amazing Team
---

In Graph Origami, a _metagraph_ is a graph whose contents define the graph's own transformation. This takes the form of a graph with special keys which, when interpreted, create new virtual content for that graph.

## Create a file that defines virtual values

<span class="tutorialStep"></span> In the `/src/public` folder, create a new file called `stuff.yaml`. It doesn't matter what you call this file, as long as it has a `.yaml` extension (`.yml` works too).

<span class="tutorialStep"></span> Enter the following line in `stuff.yaml`:

```{{'yaml'}}
{{ step1/stuff.yaml }}
```

<span class="tutorialStep"></span> Navigate to `.svg` to see the updated visual graph for the `public` folder that includes `stuff.yaml`:

<figure>
{{ svg step1 }}
</figure>

There's nothing special going on yet. The `stuff.yaml` file is just a text file with some data.

Now you're going to do a magic trick to turn the data in `stuff.yaml` into virtual content in the `public` folder.

<span class="tutorialStep"></span> Rename `stuff.yaml` to `+.yaml`.

Files like `+.yaml` are called _graph additions_. The `+` at the beginning is a signal to Graph Origami that the data _inside_ that data file should be treated as if it were _outside_ the data file — as if those data were virtual files in the containing `public` folder.

The name of a graph additions file needs to start with a `+`, but beyond that you can name the file what you want: `+stuff.yaml`, `+additions.yaml`, etc.

<span class="tutorialStep"></span> Refresh/view the `.svg` preview to see the updated `public` folder:

<figure>
{{ svg step2 }}
</figure>

If you compare the above graphs, you'll see that in the second graph:

- The `public` folder now appears to contain a virtual file called `title` that contains the text "Our Amazing Team".
- The `+.yaml` additions file no longer appears. Graph Origami is interpreting the contents of that file as virtual elements, so it hides the file itself. (It's still there — you can browse to `+.yaml` to see it.)

## Metagraphs as transformation

The `+.yaml` file you created transforms the real `public` folder into a slightly different, virtual `public` folder. We'll look at other graph transformations later, but an additions file like `+.yaml` is one of the simplest and most concise ways to define a graph transformation.

Visually, the transformation looks like this:

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

Since `+.yaml` is sitting inside the folder it transforms, we can call the `public` folder a metagraph: a graph that defines its own transformations.

## Adding comments

Right now the one line in `+.yaml` is fairly self-explanatory, but you'll be adding more entries. To help document your work as you go, you can add a comment prefixed with a `#` character. (This is standard YAML syntax.)

<span class="tutorialStep"></span> Optional: update `+.yaml` with a comment:

```yaml
# Site title
title: Our Amazing Team
```

## Transforming the public folder into the final site

The rest of this tutorial will continue to transform the real `public` folder into an increasingly fleshed-out virtual folder. In the creation-as-transformation model discussed at the start, the transformed, virtual version of the `public` folder will be the result form of your About Us site.

The `public` folder will contain both real files and virtual files, and will be what your users eventually see and interact with. The containing `src` folder will contain additional source material that will be used as fodder to create the final result, but only files (both real and virtual) in the `public` folder will be part of the final site.

Side note if you've built websites in code and are familiar with the concept of a "router": you can think of the virtual `public` graph you're building as a router. After all, what a router is really doing is defining a virtual graph, usually in a rather procedural, code-heavy way. In Graph Origami, you build a virtual graph that _is_ the router. To route a request, the server traverses the graph, following each part of the path in the HTTP/HTTPS request as the next key to follow in the graph. Eventually, if the traversal arrives at a resource (HTML, an image, etc.), the server returns that resource to the client as the response.

&nbsp;

Next: [Formulas](intro5.html) »
