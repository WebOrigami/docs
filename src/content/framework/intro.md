---
title: "Origami framework introduction"
---

Let's build a little website!

This will give you a feel for Origami, a framework to help you create digital content such as websites, documentation, and data sets.

- You'll use a conceptual paradigm that treats development tasks as transformations of data represented in graphs.
- You'll define and orchestrate these transformations at a high level using Excel-like formulas.
- The formulas will transform real data and files into virtual files containing the HTML and other content that can be viewed and used by your audience.

You can use Origami for many things; site creation is just used here as an illustrative example.

## Getting started

You can follow along with this tutorial in one of two ways:

- Open the [framework introduction on StackBlitz](https://stackblitz.com/github/ExplorableGraph/framework-intro), a hosted development environment. Open StackBlitz in a separate window so you can follow along here.
- Or you can run the tutorial locally. Clone the [ExplorableGraph/framework-intro](https://github.com/ExplorableGraph/framework-intro) repository to your own machine. Then use `npm install` to install the Origami framework. With this option, you can use whatever code editor you prefer.

## Start the web server

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with the [ori command-line interface](/cli) that is part of Origami.

**If you're using StackBlitz**, it should start the ori server automatically. You may see a StackBlitz message requiring you to enable certain cookies in order to run the server. You can always restart the server with:

```console
$ ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

**If you're running locally,** open a terminal window in the project's root directory. If you haven't already run `npm install`, do so now. Then:

```console
$ npx ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

Note that, when running locally, _you'll need to invoke the ori command-line interface with `npx ori`._ Throughout the rest of the tutorial, where you see `ori`, use `npx ori` instead.

Either way, you should be able to view the running server, which at this point will just show a listing of the project files.

Next: [Creating content](intro1.html) »
