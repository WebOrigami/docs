---
title: "Graph Origami framework tutorial"
---

As an example of creating things in Graph Origami, in this tutorial you'll create a simple website. The tutorial assumes you know some basic HTML and CSS.

This tutorial does its best to explain _how_ the framework works, illustrating the underlying concepts so that you can imagine for yourself how to apply those concepts to your own projects. If you're more interested in just seeing things work, you can focus on the interactive steps marked with the ➤ symbol.

## Goal

Suppose one day one of your teammates says:

> _We need an "About Us" area for our site! The main About Us page should list of people on our team, with links to separate pages for each person. A person's page should show their name and a photo._

Using this [sample About Us area](/samples/aboutUs) as a model, this tutorial walks you through achieving this goal.

You can do the tutorial in three ways:

## Option 1: Web-hosted Glitch editor

Glitch is a code editor intended for a general audience, including hobbyists and content creators whose primary profession is _not_ software programming.

<span class="tutorialStep"></span> Open the **[link goes here]** project and click the **Remix** button.

## Option 2: Web-hosted StackBlitz coding environment

StackBlitz is intended for people who are comfortable in a full programming environment. It uses a web-based version of VS Code, a popular editor for professional software developers.

<span class="tutorialStep"></span> Open the [framework introduction on StackBlitz](https://stackblitz.com/github/GraphOrigami/framework-intro) in a separate window so you can follow along here.

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with the [ori command-line interface](/cli) that is part of Origami.

<span class="tutorialStep"></span> Start the web server:

```console
$ ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

Note: The default StackBlitz terminal prompt looks like `❯`, but this tutorial uses the more typical `$` as the prompt.

StackBlitz may indicate that you need to enable certain cookies in order to run the server.

<span class="tutorialStep"></span> View the served site, which at this point will just show a listing of the project files.

## Option 3: Your local coding environment

Select this option if you're a programmer and prefer to use your own code editor.

<span class="tutorialStep"></span> Clone the [GraphOrigami/framework-intro](https://github.com/GraphOrigami/framework-intro) repository to your own machine.

<span class="tutorialStep"></span> Open a terminal window in the project's root directory, then:

```console
$ npm install
```

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with the [ori command-line interface](/cli) that is part of Origami.

<span class="tutorialStep"></span> Start the web server:

```console
$ npx ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

When running locally, you'll need to invoke this ori tool with `npx ori`. _Throughout the rest of the tutorial, where you see `ori`, you should type `npx ori` instead._

<span class="tutorialStep"></span> View the served site, which at this point will just show a listing of the project files.

&nbsp;

Next: [Content creation as transformation](intro1.html) »
