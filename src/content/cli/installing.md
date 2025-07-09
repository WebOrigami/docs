---
title: Installing Origami
numberHeadings: true
---

This page outlines the basics steps to install Origami for use on your machine.

## Install Node.js

Origami requires [Node.js](https://nodejs.org). You'll need to download and install that first.

## Install the Origami command-line interface

<span class="tutorialStep"></span> Once you have Node installed, the simplest option is to install Origami globally:

```console
$ npm install --global @weborigami/origami
```

<span class="tutorialStep"></span> Then verify that Origami is installed:

```console
$ ori
```

Origami should display some basic help instructions.

If you don't want to install Origami globally, you can still invoke Origami within the context of a project using `npm run` commands — see below.

## Create a package.json file

A typical Origami website project will exist in a folder containing a `package.json` file

<span class="tutorialStep"></span> Create a new folder and name it whatever you want.

<span class="tutorialStep"></span> Inside the folder create a file called `package.json` and paste in the following:

```json
${ <package.ori.json>() }
```

Update the `name` field to reflect the name of your project.

## Create an Origami file

Origami projects often put the Origami files in a `src` folder (but you can organize your source files however you want).

<span class="tutorialStep"></span> Inside your project's top folder, create a folder called `src`.

<span class="tutorialStep"></span> Inside the `src` folder, create a file called `site.ori` and paste in the following:

```ori
{
  index.html = "Hello, world!"
}
```

This defines a tiny site with a simple home page.

<span class="tutorialStep"></span> You can work with this tiny site in the command line. If you installed Origami globally:

```console
$ ori src/site.ori/index.html
Hello, world!
```

If you didn't install Origami globally, prefix the command with `npx`:

```console
$ npx ori src/site.ori/index.html
Hello, world!
```

<span class="tutorialStep"></span> Start the Origami server:

```console
$ npm run start
Server running at http://localhost:5000
```

If you open the indicated URL in your browser, you should see "Hello, world!"
