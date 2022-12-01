---
title: "Graph Origami framework tutorial"
---

In this tutorial you'll create a simple website using the Graph Origami framework. The tutorial assumes you know some HTML and CSS.

This tutorial does its best to explain _how_ the framework works, illustrating the underlying concepts so you can apply those concepts to your own projects. If you're more interested in just seeing things work, focus on the interactive steps marked with the ➤ symbol.

## Goal: A little About Us site

One day one of your teammates says:

> _We need an "About Us" area for our site! The main page should list the people on our team, with thumbnail photos and links to separate pages for each person. A person's page should show their name and a full-size photo._

<span class="tutorialStep"></span> Open the
<a href="/samples/aboutUs" target="_blank">sample About Us area</a>
and click on a few pages. The tutorial will use this sample as a model for the site you'll build.

You can do the tutorial in three ways:

## Option 1: Web-hosted Glitch editor

Glitch is a code editor intended for a general audience, including hobbyists and content creators whose primary profession isn't software programming.

<span class="tutorialStep"></span> Open the
<a href="https://glitch.com/edit/#!/origami-framework-intro" target="_blank">tutorial project on Glitch</a>
and click the <strong>Remix</strong> button (or Remix to Edit) to create your own copy of the project to work on.

In the Glitch window, you will see a list of files on the left, the currently-open file in the middle, and a preview window on the right. The preview window will initially show a list of the files in the `src/public` folder.

## Option 2: Web-hosted GitHub Codespaces coding environment

GitHub Codespaces is intended for people who are comfortable in a full programming environment. It uses a web-based version of VS Code, a popular editor for professional software developers. Codespaces is a fee-based service, but free GitHub accounts include a monthly amount of free use of Codespaces.

<span class="tutorialStep"></span> Open the
<a href="https://github.com/GraphOrigami/framework-intro" target="_blank">framework introduction on GitHub</a>.

<span class="tutorialStep"></span> Create your own copy of the project by clicking the **Fork** button near the top.

<span class="tutorialStep"></span> In your newly-created copy of the framework intro project, click the **Code** button, then the **Codespaces** tab, then click the button **Create codespace on main**.

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with Graph Origami.

<span class="tutorialStep"></span> Start the web server:

```console
$ npm run start
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

A popup should appear indicating that you can open the running site in your browser.

<span class="tutorialStep"></span> In the popup, click the **Open in Browser** button.

<span class="tutorialStep"></span> View the served site, which at this point will just show a listing of the project files.

## Option 3: Your local coding environment

Select this option if you're a programmer and prefer to use your own code editor. You will need to have [Node.js](https://nodejs.org/en/) installed.

<span class="tutorialStep"></span> Clone the
<a href="https://github.com/GraphOrigami/framework-intro" target="_blank">GraphOrigami/framework-intro</a>
repository to your own machine.

<span class="tutorialStep"></span> Open a terminal window in the project's root directory, then:

```console
$ npm install
```

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with Graph Origami.

<span class="tutorialStep"></span> Start the web server:

```console
$ npm run start
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

<span class="tutorialStep"></span> View the served site, which at this point will just show a listing of the project files.

&nbsp;

Next: [Content creation as transformation](intro1.html) »
