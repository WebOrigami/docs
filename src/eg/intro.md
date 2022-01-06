---
title: Hands-On Intro to eg
---

<style>
body {
  counter-reset: h2;
}

h2:before {
  counter-increment: h2;
  content: counter(h2) ". ";
}
</style>

The `eg` command line app is a multi-purpose tool that:

- bridges the shell and JavaScript, so you can easily invoke JavaScript from the command line, pass files to JavaScript functions, and generally mix shell tools and JavaScript.
- manipulates data representable in the [Explorable](/explorable) graph interface, such as JSON and YAML files, file system folders, and web resources.

This page introduces the basics of `eg` by demonstrating common, useful actions you can accomplish with it.

## Start

Start a terminal window running a shell (like bash, shown here). You'll need [node](https://nodejs.org) installed.

To install `eg` on your machine:

```sh
$ npm install -g @explorablegraph/explorable
```

_Reviewer's note: during development of `eg`, it's part of a larger repository of Explorable Graph work. Eventually, it will be published on its own._

To confirm the installation, you can invoke `eg` with no arguments.

```sh
$ eg
```

This should display a list of pre-installed `eg` commands. You can add your own commands, as you'll see later.

## Unpack some files

One task `eg` can perform is unpacking the values of a JSON or YAML file into a folder tree, so let's use that first to obtain sample files for the examples that follow:

```sh
$ eg copy https://explorablegraph.org/samples/eg.yaml, files/samples
$ cd samples
$ ls
```

Note the comma after the URL — the `copy` command takes two arguments that must be separated with a comma.

The new `samples` folder should show a small collection of files. `eg` treated the indicated YAML file as a graph (more on graphs later), and the `copy` function read values out of that graph and wrote them into the file system graph.

If you prefer, in the examples that follow you can wrap a function's arguments in parentheses. Since command shells typically interpret parentheses, you may have to quote them:

```sh
$ eg "copy(https://explorablegraph.org/samples/eg.yaml, files/samples)"
```

The expression parser in `eg` makes parentheses implicit, so you don't have to type them but you can if you want. There are also cases where the parentheses are necessary; you'll see an example of that later.

## Display a file from the file system

At its core, `eg` exists to bridge the shell and JavaScript. When you invoke `eg`, it:

1. Parses its arguments as an expression
2. Evaluates that expression, looking up identifiers in the current scope (defined below)
3. If the value of an identifier is a JavaScript module, `eg` imports the module and obtains its default export
4. If the value is a function, `eg` executes it
5. Displays the result

From inside the `samples` folder:

```sh
$ eg sample.txt
This is a text file.
```

Here, `eg` parsed the expression `sample.txt` as an identifier, and looked that up in the current _scope_. By default, the scope includes:

- the files in the current folder
- the functions exported by JavaScript modules in the current folder
- functions built into `eg`

In this case, "sample.txt" is a text file, so `eg` reads that file from the current folder, and the contents become the result of the expression. `eg` then renders that result to the console.

At this basic level, `eg` is effectively a tool for displaying files like the Unix `cat` command. But it can do more interesting things.

## Invoke a function

One of the sample files is a JavaScript function:

```sh
$ eg greet.js
export default (name = "world") => `Hello, ${name}.`;
```

When you ask `eg` to evaluate "greet.js", it looks up that key in the current scope and displays the contents of the indicated JavaScript file. But if you leave off the `.js` extension, `eg` _invokes_ that function.

```sh
$ eg greet
Hello, world.
```

When you ask `eg` to evaluate "greet":

- It will not find a file called "greet", so `eg` looks next to see if "greet.js" exists.
- This time it finds a JavaScript module with that name. `eg` dynamically imports the module and obtains its default export.
- The exported result is a JavaScript function, which `eg` executes.
- The function's result is the string "Hello, world.", so `eg` displays that.

## Pass a string to a function

You can pass arguments to JavaScript functions from the shell. One way is to quote the argument(s) to `eg`:

```sh
$ eg "greet('Alice')"
Hello, Alice.
```

`eg` accepts strings in single quotes or backticks, but _not_ double quotes. The double quotes shown above are parsed by the _shell_, not `eg`. The double quotes are necessary because the `bash` shell shown here would otherwise consume the single quotes and prevent `eg` from seeing them.

In the explorable graph paradigm, a function is also a graph (and vice versa). You can use path syntax as a convenient alternative to specify a string argument to a function:

```sh
$ eg greet/Alice
Hello, Alice.
```

In path syntax, all path keys are implicitly quoted, making this a convenient syntax for passing string arguments in the shell.

## Loading functions as ES modules

Aside: The above definition of `greet.js` is an ES (EcmaScript) module that exports a function using standard JavaScript `export` syntax. By default, Node imports .js files as CommonJS modules. To allow `eg` to dynamically import JavaScript files as ES modules, you will need to include a `package.json` file in the folder with your .js file or in any parent folder. That `package.json` should include the line `"type": "module"`:

The `samples` folder you're working already includes such a `package.json` file:

```sh
$ eg package.json
{
  "comment": "This file exists to tell Node to load .js files as ES modules",
  "type": "module"
}
```

If you want to use `eg` in a JavaScript project of your own, you'll need to create a `package.json` entry like that.

## Use `eg` as a general-purpose JavaScript shell tool

`eg` lets you invoke and compose functions in any combination without having to write permanent code. This can be useful when you're experimenting or need to do one-off operations from the shell.

Suppose you have a collection of functions:

```sh
$ eg double.js
export default (x) => `${x}${x}`;
$ eg greet.js
export default (name = "world") => `Hello, ${name}. `;
$ eg uppercase.js
export default (x) => x.toString().toUpperCase();
```

You can then use `eg` to mix and match these functions from the shell:

```sh
$ eg greet
Hello, world.
$ eg uppercase/hi
HI
$ eg greet uppercase/there
Hello, THERE.
$ eg uppercase greet
HELLO, WORLD.
$ eg double greet
Hello, world. Hello, world.
$ eg double greet uppercase/there
Hello, THERE. Hello, THERE.
```

If it helps to visualize these examples using parentheses, here's the equivalent verbose form with quotes:

```sh
$ eg "greet()"
Hello, world.
$ eg "uppercase('hi')"
HI
$ eg "greet(uppercase('there'))"
Hello, THERE.
$ eg "uppercase(greet())"
HELLO, WORLD.
$ eg "double(greet())"
Hello, world. Hello, world.
$ eg "double(greet(uppercase('there')))"
Hello, THERE. Hello, THERE.
```

At this level, `eg` lets you use the shell as a basic JavaScript console.

## Reading and creating files with `eg`

You can use `eg` to feed files to your JavaScript functions without you having to write code to deal with files. When you reference a file in an expression,`eg` loads its contents from the local graph (the current folder). At that point it can feed the file contents to a function you specify.

```sh
$ eg sample.txt
This is a text file.
$ eg uppercase sample.txt
THIS IS A TEXT FILE.
```

Note that, in order to interpret "sample.txt" as the name of a file, you _don't_ want to quote that name — you want to let `eg` evaluate it.

In this example, `eg` ends up feeding a file buffer (a Node `Buffer` object) to the `uppercase` function. The `uppercase` function includes a `toString()` call which here will extract the text from the file buffer. It can then do its uppercasing work on the resulting text.

## Reading input from stdin

You can pipe data into JavaScript functions with the built-in `stdin` function:

```sh
$ echo This is input from the shell | eg uppercase stdin
THIS IS INPUT FROM THE SHELL
```

The result of the `stdin` function will be the complete standard input fed to the `eg` command.

## Writing output to a file

You can use regular shell features to pipe the output from your JavaScript functions to a file:

```sh
$ eg uppercase sample.txt > uppercase.txt
$ eg uppercase.txt
THIS IS A TEXT FILE.
```

## Rendering a graph

`eg` is generally useful as a way to invoke JavaScript from the shell, but it's especially good at dealing with graphs. `eg` is specifically designed for working with _explorable graphs_: a type of graph that can tell you what's in it, and can be either synchronous or asynchronous. Many common data structures can be represented as explorable graphs.

Let's start with a simple YAML file:

```sh
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

`eg` can model this file as explorable graph:

![](greetings.svg)

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

`eg` can serve as a way of transforming a graph from one format to another. By default, `eg` renders graphs in YAML format, a superset of JSON which can be easier to read. If you prefer JSON format, you can ask for that with the `json` function:

```sh
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ eg json greetings.yaml
{
  "Alice": "Hello, Alice.",
  "Bob": "Hello, Bob.",
  "Carol": "Hello, Carol."
}
```

If you want to render a JSON file as YAML, you can explicitly invoke `yaml`:

```sh
$ eg letters.json
{
  "a": "The letter A",
  "b": "The letter B",
  "c": "The letter C"
}
$ eg yaml letters.json
a: The letter A
b: The letter B
c: The letter C
```

## Parse JSON/YAML files

You can use `eg` to parse a JSON or YAML file into a plain JavaScript object that your function can then operate on. This relieves you of the parsing work.

Suppose you have a function that does something with a flat, plain object, like return the text of the object's values:

```sh
$ eg text.js
export default function text(obj) {
  return Object.values(obj).join("\t");
}
```

You can convert a YAML file to a plain object, then pass that to your `text` function:

```sh
$ eg text plain greetings.yaml
Hello, Alice.   Hello, Bob.     Hello, Carol.
```

Or pass a parsed JSON file to your function:

```sh
$ eg text plain letters.json
The letter A    The letter B    The letter C
```

Separating the parsing from your function like this lets you keep your function as general as possible.

## Render the current file system tree as a graph

The file system is just another graph that `eg` natively understands. If you give `eg` a path to a folder, it will treat that as a graph. For example, you can specify the current folder with `.`:

```sh
$ eg .
```

This will render the complete contents of the current folder, including subfolders, in YAML. You can capture that result to package up the current folder as a YAML file.

```sh
$ eg . > package.yaml
```

Or package the folder as JSON:

```sh
$ eg json . > package.json
```

## Unpack files into the file system

You already saw the unpacking a YAML or JSON file into files as the first step in this introduction. This uses the `copy` function to write a YAML/JSON graph into the file system graph.

As another example, you can unpack the greetings in `greetings.yaml` into individual files:

```sh
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ eg copy greetings.yaml, files/greetings
$ ls greetings
Alice   Bob     Carol
$ cat greetings/Alice
Hello, Alice.
```

The key/value pairs in the YAML file are now individual files in the file system.

The important point here is that _all graphs look the same to `eg`_. It doesn't matter whether a graph is defined in a single file like YAML, or a collection of loose files in the file system. Having unpacked the `greetings.yaml` file above, we can ask `eg` to display the `greetings` folder we just created:

```sh
$ eg greetings
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

It _looks_ like `greetings` is a YAML file, but it's not — it's a folder. `eg` is just displaying the folder's files in the default YAML output format. Each line of that output is coming from a different file.

The `greetings` folder and the `greetings.yaml` file both define the same graph, even though the underlying data is stored in completely different ways and accessed via different APIs.

## Serve a graph

You can serve any graph with the `serve` function, which starts a local web server.

```sh
$ eg serve site.yaml
Server running at http://localhost:5000
```

If you open the indicated URL in your browser, you'll be able to browse the nodes of that graph. The server will translate each HTTP URL into a graph traversal. Press Ctrl+C to stop the server.

The particular graph `site.yaml` is defined in a single file, but you can serve any type of graph. To serve the current folder:

```sh
$ eg serve .
Server running at http://localhost:5000
```

This effectively lets `eg` work as a static file server.

There are a number of ways to combine graphs of different types to create a web site based on a combination of in-memory objects, functions, local files, and server resources.

## Transform data into something presentable with a template

Template languages are useful for translating data into something you can present to a user. As a bare-bones template language, let's look at a function that renders HTML using a native JavaScript template literal:

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
        font-family: Zapfino, Segoe Script, cursive;
        color: darkred;
        font-size: 48px;
      }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>
`;
}
```

We can use `eg` to apply this template to data, potentially plucked out of a graph, to render that data as HTML:

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
      font-family: Zapfino, Segoe Script, cursive;
      color: darkred;
      font-size: 48px;
    }
  </style>
</head>
  <body>
    Hello, Alice.
  </body>
</html>
```

You could save this output as an HTML file and open it in your browser, or in a minute you'll see another way to view such a page directly.

## Transform a whole graph of stuff

It is easy to transform an entire explorable graph of one type of object into a new graph of a different type of object. You only need to identify or define a one-to-one transformation function that handles a single object, and `eg` can apply that as a many-to-many transformation of an entire graph.

Earlier you saw an `uppercase` function that takes a string argument and returns an uppercase version:

```sh
$ eg uppercase greetings.yaml/Alice
HELLO, ALICE.
```

You can apply that `uppercase` transformation to an entire graph with the `eg`'s built-in `map` function:

```sh
$ eg "map(greetings.yaml, uppercase)"
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Carol: HELLO, CAROL.
```

Note that the second argument to `map` is a function. (Technically, that argument can be any explorable graph, but for the moment, we'll use a regular JavaScript function.) We want to treat that function as a first-class object, which means we _don't_ want `eg` to do its normal implicit function invocation here. To prevent that, you must include the parentheses, which generally requires quoting the arguments to `eg` or otherwise escaping them.

In any event, this `map` takes the original greetings graph

![](greetings.svg)

and creates a new graph where all the values are uppercase:

![](uppercase.svg)

In this intro, we're just transforming text, but you can transform anything in bulk, including images and other binaries. If you can write a function to transform a single thing in JavaScript, you can use `eg` to apply that transformation to an entire graph of things.

Significantly, `map` does _not_ do all its work when invoked, but immediately returns a new explorable graph that will invoke the mapping function on demand. You can think of such an explorable graph as a _lazy dictionary_.

In this `uppercase` example, `eg` does end up doing all the `uppercase` work — but only because we're asking `eg` to display the complete results. In other cases, such as the server example later, the work will only be done when asked.

## Use a graph as a map

Above it was noted that the mapping function passed to `map` can actually be any graph. This lets you use data to transform other data.

Suppose that you have base data, like an array of people:

```bash
$ eg people.yaml
- Alice
- Carol
```

And some other data that associates a person's name with a greeting:

```bash
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

You can then treat both the base data and the greetings data as graphs, and pass those to `map`, to turn the list of specific people into a list of greetings:

```bash
$ eg "map(people.yaml, greetings.yaml)"
- Hello, Alice.
- Hello, Carol.
```

Here the second `greetings.yaml` graph is used as a function to transform the individual names coming from `people.yaml` into greetings.

## Serve a transformed graph of stuff

We can ask `eg` to serve HTML created using `map` and the template we saw earlier.

```sh
$ eg "serve map(greetings.yaml, template)"
Server running at http://localhost:5000
```

The served site does _not_ have an index page, but you can browse to one of the defined pages like http://localhost:5000/Alice. You'll see a message like "Hello, Alice." rendered in HTML. Due to the lazy nature of explorable graphs and `map`, that rendering work is _only done on request_.

## Turn a transformed graph of stuff into files

You can transform a graph and save the results in any graph form. For example, instead of serving a set of templated web pages, we can render them as files by copying the lazy dictionary defined by `map`.

```sh
$ eg "copy map(greetings.yaml, template), files/html"
$ ls html
Alice   Bob     Carol
```

You can do such a `copy` operation in preparation for deploying HTML pages to a static web server. The web page you're reading right now was created and deployed in exactly that way.

## Inspect a live web site

Using `eg` to work with graphs at a high level means that many tasks which were previously very difficult can become easy. For example, it's generally not easy today to immediately see the complete contents of a web site. But if a web site is modeled as an explorable graph, and the server follows a simple protocol for implementing the Explorable interface, viewing a portion of a site (or the entire site) becomes trivial.

The web site you're reading now supports viewing its contents as an explorable graph, so you can reference it directly in `eg`. For example, this site includes a route /samples/greetings, and you can view the files there just by passing that URL to `eg`:

```bash
$ eg https://explorablegraph.org/samples/greetings/
```

Again, this may look like this is a YAML file, but each of those lines is coming from a separate web resource.

```bash
$ eg https://explorablegraph.org/samples/greetings/Alice
Hello, Alice.
```

`eg` can discover all the resources at the `/samples/greetings/` route because the server supports a simple protocol: for every route on this server, a `.keys.json` file exists that enumerates the resources at that route.

```sh
$ eg https://explorablegraph.org/samples/greetings/.keys.json
["Alice","Bob","Carol"]
```

When you ask to view a route, `eg` asks that server for its `.keys.json` file, then uses that information to download and display that list of resources as a graph.

Making the full contents of a site more freely available might be concerning to some people, but most web content is already available to users; it's just not conveniently inspectable. `eg` extends the spirit of the browser's View Source feature (which looks at a single web page at a time) to let you inspect everything at a particular web route.

## Copy a live web site to local files

If you can view a live site as a graph, then you can use `eg` to copy that graph to local files:

```bash
$ eg copy https://explorablegraph.org/samples/greetings, files/snapshot
$ ls snapshot
Alice Bob   Carol
```

Of course, just because this is possible doesn't mean it's efficient. If your regular task is copy web resources to local files, you can find faster tools for that job. But if you only do that infrequently, or don't want to spend time researching and developing specialized tools, the general-purpose `eg` may suffice.

## Uninstall

If you're finished with this introduction and won't use `eg` after this, you can uninstall it:[z](https://)

```
$ npm uninstall -g @explorablegraph/explorable
```
