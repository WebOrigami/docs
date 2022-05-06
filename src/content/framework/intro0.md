---
title: "Quick tutorial setup"
---

You can do this tutorial in two ways:

## Option 1: Web-hosted coding environment

This option doesn't require installing anything on your own computer.

<span class="tutorialStep"></span> Open the [framework introduction on StackBlitz](https://stackblitz.com/github/ExplorableGraph/framework-intro), a hosted development environment. Open StackBlitz in a separate window so you can follow along here.

<span class="tutorialStep"></span> Create a new `src` folder using the terminal:

```console
$ mkdir src
```

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with the [ori command-line interface](/cli) that is part of Origami.

<span class="tutorialStep"></span> Start the web server:

```console
$ ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

(You may see a StackBlitz message requiring you to enable certain cookies in order to run the server.)

<span class="tutorialStep"></span> View the running server, which at this point will just show a listing of the project files.

## Option 2: Your local coding environment

With this option, you can use whatever code editor you prefer.

<span class="tutorialStep"></span> Clone the [ExplorableGraph/framework-intro](https://github.com/ExplorableGraph/framework-intro) repository to your own machine.

<span class="tutorialStep"></span> Open a terminal window in the project's root directory, then:

```console
$ npm install
... npm installs files ...
```

<span class="tutorialStep"></span> Create a new `src` folder:

```console
$ mkdir src
```

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with the [ori command-line interface](/cli) that is part of Origami.

<span class="tutorialStep"></span> Start the web server:

```console
$ npx ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

When running locally, you'll need to invoke this ori tool with `npx ori`. _Throughout the rest of the tutorial, where you see `ori`, you should type `npx ori` instead._

<span class="tutorialStep"></span> View the running server, which at this point will just show a listing of the project files.

&nbsp;

Next: [Thinking in graphs](intro1.html) »
