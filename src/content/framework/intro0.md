---
title: "Origami framework introduction"
---

The Origami framework is designed to transform digital content that you can create directly — data, files, and other resources — into forms that can be viewed and used by your audience. It's built on a conceptual paradigm that treats development tasks as transformations of data represented in graphs.

## Getting started

This tutorial follows a hands-on practical example of building a small site. You can use Origami for many other things than website development; site creation is used as an illustrative example.

You can follow along with this tutorial in one of two ways:

- Open the [framework introduction on StackBlitz](https://stackblitz.com/github/ExplorableGraph/framework-intro), a hosted development environment. Open StackBlitz in a separate window so you can follow along here.
- Or you can run the tutorial locally. Clone the [ExplorableGraph/framework-intro](https://github.com/ExplorableGraph/framework-intro) repository to your own machine, then use `npm install` to install the Origami framework. With this option, you can use whatever code editor you prefer.

## Start the web server

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the small server included with the ori [command-line interface](/cli) that is part of Origami.

If you're using StackBlitz, it should start the ori server automatically. You may see a StackBlitz message asking you to enable certain cookies in order to run the server.

If you're running locally, open a terminal window in the project's root directory, then:

```console
$ ori serve
Server running at http://localhost:5000
```

Either way, you should be able to point your browser at the running server and see a listing of the project files.
