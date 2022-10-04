---
title: Origami CLI tutorial setup
numberHeadings: true
---

This tutorial introduces the basics of ori by demonstrating useful actions you can perform with it. You can follow along with these examples on your own machine.

Start a terminal window running a shell — the examples here use `bash`. You'll need [node](https://nodejs.org) installed.

## Install

You can install the Origami CLI globally or locally.

<span class="tutorialStep"></span> **Global installation:** Installing ori globally will make it easier to invoke it in the rest of this tutorial:

```console
$ npm install -g @graphorigami/origami
```

_Reviewer's note: during development of ori, it's part of a larger repository of Explorable Graph work. Eventually, it will be published on its own._

<span class="tutorialStep"></span> To confirm the installation, invoke ori with no arguments.

```console
$ ori
```

This should display the list of [built-in functions](/ori/builtins.html) included with ori.

<span class="tutorialStep"></span> **Local installation:** As an alternative to global installation, run `npm install` without the `-g` global flag inside a new directory. Because ori won't be available everywhere, wherever the instructions below refer to ori, use Node's [npx](https://docs.npmjs.com/cli/v7/commands/npx) command to invoke ori:

```console
$ npm install @graphorigami/origami
$ npx ori
```

## Unpack some files

<span class="tutorialStep"></span> You can use ori itself to copy sample files used in this introduction into a new local folder called `samples`:

```console
$ ori copy https://graphorigami.org/samples/cli.yaml, files/samples
$ cd samples
$ ls
double.js      letters.json   sample.txt     text.js
greet.js       package.json   site.yaml      uppercase.js
greetings.yaml people.yaml    template.js
```

Note the comma after the URL — ori is invoking a function called [copy](/ori/builtins.html#copy) that takes two arguments which must be separated with a comma.

The new `samples` folder should show a small collection of files. (The specific files may differ slightly from what's shown above.) ori treated the indicated file as a graph — more on graphs later. The `copy` function read values out of that graph and wrote them into the destination graph: a file system (`files`) folder called `samples`.

<span class="tutorialStep"></span> If you prefer, you can wrap ori function arguments in parentheses — but since command shells typically interpret parentheses, you may have to quote them:

```console
$ ori "copy(https://graphorigami.org/samples/cli.yaml, files/samples)"
```

The expression parser in ori makes parentheses implicit, so in many cases you don't have to type them. There are some cases where parentheses are necessary; you'll see an example of that later.

&nbsp;

Next: [Basic usage](intro2.html) »
