---
title: Quick Hands-On Intro to eg
---

This 10-minute intro guides you through the basics of explorable graphs with quick demonstrations you can do for yourself using the [eg](/eg) command line tool. You can also watch a _ video intro _ that covers roughly similar topics.

## Start

Start a terminal window running whatever shell you prefer (e.g., `bash`). You'll need [node](https://nodejs.org) installed.

```sh
$ npx eg
```

If you decide `eg` is useful enough to install, you can install it and drop the `npx` part.

```sh
$ npm install eg
$ eg
```

Use npx to start, switch to npm install when comfortable

## Unpack some files

Copy a sample demo from a URL to local files

```sh
$ eg copy https://explorablegraph.org/intro/intro.yaml, files/intro
```

## What’s a graph?

eg with no args to see available commands

## Pretty much everything’s a graph

eg greet.yaml, greeting graph in a variety of formats
eg json greet.yaml > greet.json switch between various formats

## Serve a graph

```sh
$ eg serve site.yaml
Server running at http://localhost:5000
```

If you open the indicated URL in your browser, you'll be able to browse the nodes of the graph. Press Ctrl+C to stop the server.

You can serve any graph. To serve the current folder, you can serve `.`:

```sh
$ eg serve .
Server running at http://localhost:5000
```

There are a number of ways to combine graphs of different types to create a web site based on a combination of in-memory objects, functions, local files, and server resources.

## Invoke JavaScript functions from the command line

```sh
$ eg "greet('world')"
Hello, world.
$
```

Because shells like `bash` tend to interpret parentheses, you need to quote them above. But to make life easier for you, the `eg` command generally lets you drop parentheses. You still need to quote the single quote marks or escape them with a backslash:

```sh
$ eg "greet 'world'"
Hello, world.
$ eg greet \'there\'
Hello, there.
$
```

The eg model also lets you use path syntax to quote arguments:

```sh
$ eg greet/world
Hello, world.
$
```

Note that this isn't some special syntax just for quoting arguments to functions. In the above example, `eg` is treating `greet` as an explorable graph, then getting the `"world"` key from that graph. This has the same effect as invoking the function.

## Use `eg` as a general-purpose JavaScript shell tool

If you're comfortable writing JavaScript and invoking it from the shell, why use `eg` to do that? Because `eg`'s syntax lets you invoke and compose functions any way you like without having to write permanent code. This can be useful when you're experimenting, or just need to do one-off operations from the shell.

```sh
$ eg greet uppercase/world
Hello, WORLD.
$ eg uppercase greet/world
HELLO, WORLD.
$ eg double greet/world
Hello, world. Hello, world.
$ eg double greet uppercase/world
Hello, WORLD. Hello, WORLD.
```

If it helps to visualize these examples using parentheses, here's the equivalent verbose form with quotes:

```sh
$ eg "greet(uppercase('world'))"
Hello, WORLD.
$ eg "uppercase(greet('world'))"
HELLO, WORLD.
$ eg "double(greet('world'))"
Hello, world. Hello, world.
$ eg "double(greet(uppercase('world')))"
Hello, WORLD. Hello, WORLD.
```

## Reading and creating files with `eg`

The `eg` tool is also useful for feeding files to the functions you write without you having to write code to deal with files.

```sh
$ cat sample.txt
This is a text file.
$ eg uppercase sample.txt
THIS IS A TEXT FILE.
$
```

You can also write functions that deal with objects, and have `eg` parse objects from JSON or YAML files.

```sh
$ eg xml sample.obj
...
```

## Extract specific values out of a graph

Or have `eg` parse a specific value out of a JSON/YAML file and feed that to your function.

```sh
$ eg uppercase greetings.yaml/french/a
HELLO, A.
$
```

## Transform a whole graph of stuff

eg map greet.yaml, uppercase

In this intro, we're just transforming text, but you can transform anything in bulk, including images and other binaries. If you can write a function to transform a single thing in JavaScript, you can use `eg` to apply that transformation to an entire graph of things.

## Transform data into something presentable with a template

Handlebars

`greet.hbs alice.yaml` is the same as `greet.hbs(alice.yaml)`

```sh
$ eg greet.hbs alice.yaml
<!DOCTYPE html>
<html lang="en">
...
</html>
$
```

## Serve a transformed graph of stuff

eg serve map(greet.yaml, greet.hbs)
…

## Copy of a transformed graph of stuff

eg copy map(greet.yaml, uppercase), files/upper
