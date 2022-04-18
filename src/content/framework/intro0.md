---
title: "Origami framework introduction"
numberHeadings: true
---

The Origami framework is designed to transform digital content that you can create directly — data, files, and other resources — into forms that can be viewed and used by your audience. It's built on a conceptual paradigm for considering common development tasks that can be translated directly into an efficient [expression language](/language) for describing what you want.

## Task statement

As a motivating example, this introduction leads you through the following hypothetical design and development task:

> _Your team needs to design and implement an "About Us" area for your organization's site. The main About Us page will need to include a list of people on the team, with links to separate pages for each team member. A team member's page should show their position, bio, and a photo._

... link to example site ...

Before going further, think for a moment about how you would approach this design and engineering problem.

## Getting started

ori copy stuff locally
or launch StackBlitz

## Start a web server

There are a variety of ways to incorporate Origami into an existing web server or a larger project, but for this introduction, you'll use the server built into the companion ori [command-line interface](/cli).

Open a terminal window in the project's root directory, then run the following command:

```console
$ ori serve
Server running at http://localhost:5000
```

You should be able to open http://localhost:5000 and see a listing of the project files. At the moment, all of the files you see are regular files in the file system.
