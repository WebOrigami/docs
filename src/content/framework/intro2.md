---
title: Create virtual files
numberHeadings: true
intro = client/samples/frameworkIntro:
# Mocks for the code samples below
files:
  src: |
    "+.yaml": |
      # Origami formulas for the About Us web site.
      message: Hello, world!
virtual:
  src = graphVirtual(files/src):
---

Origami lets you quickly create virtual folders and files in a variety of ways. One simple way is with a data file in YAML or JSON format.

## Define a virtual file in a YAML or JSON file

<span class="tutorialStep"></span> Inside the `src` folder, open the file called `+.yaml`. This file initially just contains a comment:

```{{'yaml'}}
{{ intro/siteInitial.yaml }}
```

The name of the `+.yaml` is a signal to the Origami framework that anything inside the file should be considered a virtual member of the containing folder. Any keys you define in that file will appear as the name of a virtual file in the containing `src` folder.

This `+.yaml` file could also be a JSON file, but we'll use a YAML file for this tutorial because it'll be more concise. The file could be called anything that starts with a plus sign, like `+formulas.yaml`. The `+` suggests that the file's contents will be added to the container.

<span class="tutorialStep"></span> Add a line to the `+.yaml` file:

```{{'yaml'}}
{{ intro/siteMessage.yaml }}
```

(If you're using StackBlitz, it may display a message saying "Project forked" to indicate that you're now working in your own copy of the tutorial project. You may need to restart the Origami server with `ori serve`.)

The line you've just added defines a key called `message` with a value of "Hello, world!" Because that key/value definition is sitting in a file called `+.yaml`, the Origami framework will show a virtual file in the containing `src` folder when that folder is viewed in the browser (or, later, through the command line).

## View the virtual value

<span class="tutorialStep"></span> Without needing to do anything else, in the browser pane/window showing your served site, navigate to the `src` folder.

You will see a listing that includes an entry for `message`.

<span class="tutorialStep"></span> Click on the `message` link to navigate to a page that says "Hello, world!"

By adding an entry to a data file, you've created a virtual file that is visible via the Origami server.

You don't have to use the Origami server: you can integrate the support for formulas into other servers (e.g., [Express](http://expressjs.com/)). Later in this tutorial you'll dispense with a live server altogether by building static files that you can host anywhere.

## Conceptualize real and virtual files as graphs

In addition to viewing a virtual file in the served site as you did above, at any time you can also view a virtual file in the command line with the command-line tool, ori.

<span class="tutorialStep"></span> In the terminal, press Ctrl+C to stop the running server, then:

```console assert: true, path: files
$ ls src
+.yaml
$ ori src
"+.yaml": |
  # Origami formulas for the About Us web site.
  message: Hello, world!
```

(Reminder: if running locally, you'll need to use `npx ori` whenever invoking the ori tool.)

If you ask ori to render the `src` folder, it returns a graph of the real files in the `src` folder. It displays this graph in YAML form. At the moment, there is just one file called `+.yaml` that defines a key called `message`.

You can visualize the real files in the `src` folder as a graph:

<figure>
  {{ svg files/src }}
  <figcaption>The src folder graph has one real file</figcaption>
</figure>

If you ask ori to show the contents of a _virtual_ graph based on `src`, the resulting virtual graph includes the real files and any virtual files you've defined. The virtual graph omits special files like `+.yaml`.

<span class="tutorialStep"></span> View the virtual files:

```console assert: true, path: files
$ ori virtual/src
{{ yaml virtual/src }}
```

The `virtual` graph has a virtual `message` file that contains "Hello, world!"

<figure>
  {{ svg virtual/src }}
  <figcaption>Virtual graph includes the virtual message file</figcaption>
</figure>

The `src` files graph above is your starting point: the real files you create by transcribing the ideas and information in your head or collecting data from elsewhere. Through step-by-step transformations, you create a final `virtual` graph that represents the artifact you wish your audience to view or use.

_Transforming graphs is the fundamental operation of the Origami framework._

The ori command-line interface knows how to traverse graphs, including virtual graphs.

<span class="tutorialStep"></span> Ask ori to display a single virtual file on demand:

```console assert: true, path: files
$ ori virtual/src/message
Hello, world!
```

In the steps that follow, you will define Origami formulas to dynamically create data and HTML pages. At any point you can view those in the browser, or use ori to view those virtual files in the command line.

&nbsp;

Next: [Formulas](intro3.html) »
