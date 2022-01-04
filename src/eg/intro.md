---
title: Quick Hands-On Intro to eg
---

The `eg` command line app is a multi-purpose tool that:

- lets you easily work with JavaScript from the command line
- manipulates data representable in the [Explorable](/explorable) graph interface, such as JSON and YAML files, file system folders, and web resources.

This page introduces the basics of `eg` by demonstrating common, useful actions you can accomplish with `eg`.

---> graph diagrams?

## Start

Start a terminal window running whatever shell you prefer. (The examples here show `bash`.) You'll need [node](https://nodejs.org) installed.

---> for now, install globally

```sh
$ npx eg
```

Invoking `eg` on its own will show the available list of pre-installed commands. You can add your own commands, as you'll see in a bit.

If you decide `eg` is useful enough to install, you can install it and drop the `npx` part.

```sh
$ npm install eg
$ eg
```

## Unpack some files

A common task `eg` can accomplish is unpacking the values of a JSON or YAML file into a folder tree, so let's use that first to obtain sample files for the examples that follow.

Copy/paste or type the following into your terminal:

```sh
$ eg copy https://explorablegraph.org/intros/eg.yaml, files/intro
$ cd intro
```

This should create a new folder called `intro` containing a tree of files. `eg` treated the indicated YAML file as a graph, and the `copy` function read values out of that graph and wrote them into the file system graph.

## Use parentheses if you prefer

Note the comma after the URL above — the `copy` command is a pre-installed JavaScript _function_ that takes two arguments, and those arguments need to be separated with a comma. If you prefer, you can wrap the function's arguments in parentheses, but since command shells often interpret parentheses, you may have to quote them:

```sh
$ eg "copy(https://explorablegraph.org/intros/eg.yaml, files/intro)"
```

`eg` contains a small JavaScript-ish expression parser whose syntax makes parentheses implicit. So you don't have to type them, but you can if you want. There are also cases where the parentheses are necessary, which we'll touch on later.

## Display a file from the file system

At its core, `eg` exists to bridge the shell and JavaScript. When you invoke `eg`, it:

1. Parses its arguments as a JavaScript-ish expression
1. Evaluates that expression, looking up identifiers in the current scope (defined below)
1. If the value of an identifier is a JavaScript module, `eg` imports the module and obtains its default export
1. If the value is a function, `eg` executes it
1. Displays the result

Enter this command from inside the `intro` folder:

```sh
$ eg text.txt
This is a plain text file.
```

Here, `eg` interpreted the expression `text.txt`, and determined that this was an identifier. It looked up "text.txt" in the current _scope_. The scope is a graph. By default, the scope is a graph that includes:

- the files in the current folder
- the functions exported by JavaScript modules in the current folder
- functions built into `eg`

In this case, "text.txt" is a text file. `eg` reads that file from the current folder, and this becomes the result of the expression. `eg` then renders that result – the contents of the file — to the console.

At this rudimentary level, `eg` is effectively a tool for displaying files like the Unix `cat` command. But it can do more interesting things.

## Invoke a function

Let's look at a JavaScript function:

```sh
$ eg greet.js
export default (name = "world") => `Hello, ${name}.`;
```

When you ask `eg` to evaluate "greet.js", it looks up that key in the current scope. As a result, it just displays the contents of the indicated JavaScript file. But if you leave off the `.js` extension, `eg` will _invoke_ that function.

```sh
$ eg greet
Hello, world.
```

When you ask `eg` to evaluate "greet", it will not find a file called "greet", so instead `eg` will look to see if "greet.js" exists. This time it finds a result. Since the result is a JavaScript module, `eg` dynamically imports the module and obtains its default export. That's a function, which `eg` executes. The function's result is the string "Hello, world.", so `eg` displays that.

## Pass a string to a function

If you have a function, you may want to pass an argument to it, such as a string.

One way to do this is by quoting the argument(s) to `eg`:

```sh
$ eg "greet('Alice')"
Hello, Alice.
```

`eg` accepts strings in single quotes or backticks, but _not_ double quotes. (The double quotes above are parsed by the shell, not `eg`. The double quotes are necessary here because `bash` would otherwise interpret the single quotes and prevent `eg` from seeing them.)

In the explorable graph paradigm, a function is also a graph (and vice versa), which leads to a convenient alternative way to specify a string argument with implicit quotes: path syntax.

```sh
$ eg greet/Alice
Hello, Alice.
```

In path syntax, all path keys are implicitly quoted, so you can pass text like "Alice" more easily.

## Use `eg` as a general-purpose JavaScript shell tool

`eg` lets you invoke and compose functions in any combination without having to write permanent code. This can be useful when you're experimenting or need to do one-off operations from the shell.

```sh
$ eg uppercase/world
WORLD
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
$ eg "uppercase('world')"
WORLD
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

The `eg` tool is also useful for feeding files to your JavaScript functions without having to write code to deal with files. When you reference a file, `eg` loads its contents from the local graph (folder), then feeds those contents to any function you specify.

```sh
$ eg sample.txt
This is a text file.
$ eg uppercase sample.txt
THIS IS A TEXT FILE.
```

## Read input from stdin

You can pipe data into JavaScript functions with the built-in `stdin` function:

```sh
$ echo hi | eg uppercase stdin
HI
```

## Rendering a graph

Many data structures can be represented as explorable graphs.

Let's start with a simple YAML file:

```sh
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

`eg` natively understands a number of graph formats:

- JSON
- YAML
- JavaScript objects
- JavaScript arrays
- JavaScript functions
- folder trees
- web sites (some operations require support for [.keys.json](/eg/.keys.json) files)
- any object that implements the [Explorable](/explorable) interface

## Extract specific values out of a graph

You can use path syntax to extract a specific value from a graph.

```sh
$ eg greetings.yaml/Alice
Hello, Alice.
```

An explorable graph can also be invoked like a function, so you also have the option of using function call syntax:

```sh
$ eg "greetings.yaml('Alice')"
Hello, Alice.
```

You can easily combine `eg` features like JSON/YAML parsing, path syntax, and function invocation to have `eg` parse a specific value out of a graph and feed that directly to your function.

```sh
$ eg uppercase greetings.yaml/Alice
HELLO, ALICE.
```

## Translate JSON to YAML and vice versa

By default, `eg` renders graphs in YAML format, a superset of JSON which is generally easier to read. If you prefer JSON format, you can ask for that with the `json` function:

```sh
$ eg json greetings.yaml
{
  "Alice": "Hello, Alice.",
  "Bob": "Hello, Bob.",
  "Charlie": "Hello, Charlie."
}
```

`eg` treats JSON files specially, and will render them in JSON format by default. If you want to render a JSON file as YAML, you can explicitly invoke `yaml`:

```sh
$ eg yaml letters.json
a: The letter A
b: The letter B
c: The letter C
```

## Parse JSON/YAML files

You can use `eg` to parse a JSON or YAML file into a plain JavaScript object that your function can then operate on.

Let's suppose you have a function that does something with a flat, plain object, like return the text of the object's values:

```sh
$ eg text.js
export default function text(obj) {
  return Object.values(obj).join("\t");
}
```

You can convert a YAML file to a plain object, then pass that to your `text` function:

```sh
$ eg text plain greetings.yaml
Hello, Alice.   Hello, Bob.     Hello, Charlie.
```

Or pass a parsed JSON file to your function:

```sh
$ eg text plain letters.json
The letter A    The letter B    The letter C
```

## Render the current file system tree as a graph

The file system is another graph that `eg` natively understands. If you give it a path to a folder, it will treat that as a graph. For example, you can specify the current folder with `.`:

```sh
$ eg .
```

This will render the complete contents of the current folder, including subfolders, in YAML. You can capture that result to package up the current folder as a YAML file.

```sh
$ eg . > package.yaml
```

Or render the folder as JSON:

```sh
$ eg json . > package.json
```

## Serve a graph

You can serve any graph with the `serve` function, which starts a local web server.

```sh
$ eg serve site.yaml
Server running at http://localhost:5000
```

If you open the indicated URL in your browser, you'll be able to browse the nodes of that graph. The server will translate each HTTP URL into a graph traversal. Press Ctrl+C to stop the server.

You can serve any graph. To serve the current folder, you can serve `.`:

```sh
$ eg serve .
Server running at http://localhost:5000
```

This effectively lets `eg` work as a static file server.

There are a number of ways to combine graphs of different types to create a web site based on a combination of in-memory objects, functions, local files, and server resources.

## Transform data into something presentable with a template

Template languages are useful for translating data into something you can present to a user. As a bare-bones template language, we can write a function using native JavaScript template literals.

```sh
$ eg template.js
export default function (body) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      body {
        background: #fbf0f2;
        font-family: Zapfino;
        color: darkred;
        font-size: 48px;
      }
    </style>
  </head>
  <body>${body}</body>
</html>
`;
}
```

We can then apply this template to data, potentially plucked out of a graph, to render that data as HTML:

```sh
$ eg template greetings.yaml/Alice
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
    body {
      background: #fbf0f2;
      font-family: Zapfino;
      color: darkred;
      font-size: 48px;
    }
  </style>
</head>
  <body>Hello, Alice.</body>
</html>
```

## Transform a whole graph of stuff

One key benefit of representing data as explorable graphs is being able to easily transform an entire graph of one type of object into a new graph of a different type of object. You only need to identify or define a transformation function that handles a single object, and `eg` can apply that transformation to an entire graph.

Earlier we saw an `uppercase` function that takes a string argument and returns an uppercase version:

```sh
$ eg uppercase greetings.yaml/Alice
HELLO, ALICE.
```

We can apply that `uppercase` transformation to an entire graph with the `map` function:

```sh
$ eg "map(greetings.yaml, uppercase)"
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Charlie: HELLO, CHARLIE.
```

---> diagram

The second argument to `map` is a map function. Technically, this can be any explorable graph, but for our purposes, let's assume it's a regular JavaScript function. When invoking `map`, we want to treat the map function as a first-class object, which means we _don't_ want `eg` to do its normal implicit function invocation here. To prevent that, you must manually specific the parentheses, which generally requires quoting the arguments to `eg` or otherwise escaping them.

In this intro, we're just transforming text, but you can transform anything in bulk, including images and other binaries. If you can write a function to transform a single thing in JavaScript, you can use `eg` to apply that transformation to an entire graph of things.

## Serve a transformed graph of stuff

The most important thing to understand about `map` is that it does _not_ do all its work when invoked. Instead, it immediately returns a new explorable graph that will invoke the mapping function on demand. An explorable graph is a _lazy dictionary_.

In contrast to the `map` function found in places like JavaScript's `Array` class, which immediately applies a map function to every element in an array, the `map` function here only does work when it has to. In the `uppercase` example above, `eg` does end up doing all the `uppercase` work — but only because we're asking `eg` to display the complete results. In other cases, the work will only be done when asked.

For example, we can ask `eg` to serve HTML created using `map` and the template we saw earlier.

```sh
$ eg "serve map(greetings.yaml, template)"
Server running at http://localhost:5000
```

The served site does _not_ have an index page, but you can browse to one of the defined pages like http://localhost:5000/Alice. You'll see a message like "Hello, Alice." rendered in HTML. That rendering work is _only done on request_.

## Turn a transformed graph of stuff into files

You can transform a graph and save the results in any graph form. For example, instead of serving a set of templated web pages, we can render them as files by copying the lazy dictionary defined by `map`.

```sh
$ eg "copy map(greetings.yaml, template), files/html"
$ ls html
Alice   Bob     Charlie
```

You can do such a `copy` operation in preparation for deploying HTML pages to a static web server.

## Copy a live web site to local files

## Add a command to `eg`
