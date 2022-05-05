---
title: "Quick tutorial setup"
---

You can do this tutorial in two ways:

## Option 1: web-hosted coding environment

Open the [framework introduction on StackBlitz](https://stackblitz.com/github/ExplorableGraph/framework-intro), a hosted development environment. Open StackBlitz in a separate window so you can follow along here.

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with the [ori command-line interface](/cli) that is part of Origami.

StackBlitz will start the ori server automatically. You may see a StackBlitz message requiring you to enable certain cookies in order to run the server. You can start or restart the server with:

```console
$ ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

You should be able to view the running server, which at this point will just show a listing of the project files.

## Option 2: your local coding environment

Clone the [ExplorableGraph/framework-intro](https://github.com/ExplorableGraph/framework-intro) repository to your own machine. With this option, you can use whatever code editor you prefer.

Open a terminal window in the project's root directory, then:

```console
$ npm install
... npm installs files ...
$ npx ori serve
Server running at http://localhost:5000. Press Ctrl+C to stop.
```

This tutorial uses a command-line tool called `ori` included with Origami. When running locally, you'll need to invoke this tool with `npx ori`. _Throughout the rest of the tutorial, where you see `ori`, you should type `npx ori` instead._

You should be able to view the running server, which at this point will just show a listing of the project files.

Next: [Thinking in graphs](intro1.html) »
