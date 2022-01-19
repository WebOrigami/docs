---
title: Hands-On Intro to eg
path: /eg/intro.html
numberHeadings: true
---

`eg` is a general-purpose command line tool that lets you:

- **use the shell as a basic JavaScript console**. You can invoke JavaScript functions, pass arguments (including files or folder trees) to functions, and capture function output as files. You can quickly experiment, test, or do ad hoc operations from the shell.
- **manipulate hierarchies, graphs, and other data** representable in the [Explorable](/core/explorable.html) graph interface — including data files, file system folders, JavaScript objects, and web resources.

This page introduces the basics of `eg` by demonstrating useful actions you can perform with it. You can follow along with these examples on your own machine.

## Start

Start a terminal window running a shell — the examples here use `bash`. You'll need [node](https://nodejs.org) installed.

You can install `eg` globally to make the tool available in all directories. (Or see below for instructions and adjustments to install `eg` in just one directory.)

```console
$ npm install -g @explorablegraph/explorable
```

_Reviewer's note: during development of `eg`, it's part of a larger repository of Explorable Graph work. Eventually, it will be published on its own._

To confirm the installation, invoke `eg` with no arguments.

```console
$ eg
```

This should display the list of [built-in functions](/eg/builtins.html) included with `eg`.

If you'd prefer not to install things globally, inside a new directory run `npm install` without the `-g` global flag. Because `eg` won't be available everywhere, however, you will need to always use Node's [npx](https://docs.npmjs.com/cli/v7/commands/npx) command to invoke `eg`:

```console
$ npm install @explorablegraph/explorable
$ npx eg
```

If you go this route, use `npx eg` wherever the instructions below use `eg`. When run this way, `eg` will also be a little slower.

## Unpack some files

You can use `eg` itself to copy sample files used in this introduction into a new local folder called `samples`:

```console
$ eg copy https://explorablegraph.org/samples/eg.yaml, files/samples
$ cd samples
$ ls
double.js      letters.json   sample.txt     text.js
greet.js       package.json   site.yaml      uppercase.js
greetings.yaml people.yaml    template.js
```

Note the comma after the URL — `eg` is invoking a function called [copy](/eg/builtins.html#copy) that takes two arguments which must be separated with a comma.

The new `samples` folder should show a small collection of files. (The specific files may differ slightly from what's shown above.) `eg` treated the indicated YAML file as a graph — more on graphs later. The `copy` function read values out of that graph and wrote them into the destination graph: a file system (`files`) folder called `samples`.

If you prefer, you can wrap `eg` function arguments in parentheses — but since command shells typically interpret parentheses, you may have to quote them:

```console
$ eg "copy(https://explorablegraph.org/samples/eg.yaml, files/samples)"
```

The expression parser in `eg` makes parentheses implicit, so in many cases you don't have to type them. There are some cases where parentheses are necessary; you'll see an example of that later.

## Display a file from the file system

From inside the `samples` folder:

```console
$ eg sample.txt
This is a text file.
```

When you invoke `eg`:

1. It parses its arguments as an expression.
2. It evaluates that expression, looking up identifiers in the current scope (defined below).
3. If the value of the expression is a JavaScript module, `eg` imports the module and obtains its default export. If it's a JavaScript function, `eg` executes it.
4. It displays the result.

Here `eg` parses the expression `sample.txt` as an identifier. In JavaScript, `sample.txt` is not a valid identifier because it contains a period, but `eg`'s expression parser can recognize file names as identifiers. `eg` looks up that identifier in the current _scope_. By default, the scope includes:

- the files in the current folder
- the functions exported by JavaScript modules in the current folder
- the functions built into `eg`

In this case, `eg` finds that "sample.txt" is the name of a file, and reads that file from the current folder. The file's contents become the result of the expression, which `eg` then renders to the console.

At this basic level, `eg` is effectively a tool for displaying files like the Unix `cat` command.

## Invoke a function

One of the sample files, `greet.js`, defines a JavaScript function. If you ask `eg` for `greet.js`, it returns the contents of that file:

```console
$ eg greet.js
export default (name = "world") => `Hello, ${name}.`;
```

But if you leave off the `.js` extension, `eg` invokes the function exported by that file:

```console
$ eg greet
Hello, world.
```

Or, with explicit parentheses:

```console
$ eg "greet()"
Hello, world.
```

When you ask `eg` to evaluate `greet`:

- It looks for a file called `greet` but doesn't find one.
- `eg` tries adding `.js` to see if `greet.js` exists. This time it finds a JavaScript module with that name.
- `eg` dynamically imports the module and obtains the default export (a function).
- Because the result is a JavaScript function, `eg` executes it.
- The function's result is the string "Hello, world.", which `eg` displays.

## Pass a string to a function

You can pass arguments to JavaScript functions from the shell:

```console
$ eg "greet('Alice')"
Hello, Alice.
```

`eg` accepts strings in single quotes. The double quotes shown above are parsed by the _shell_, and are necessary because the `bash` shell shown here would otherwise prevent `eg` from seeing the single quotes.

In the explorable graph paradigm discussed later, any function can be treated like a graph, and vice versa. This means you can use path syntax as a convenient alternative to specify a string argument:

```console
$ eg greet/Alice
Hello, Alice.
```

In this path syntax, the first path segment (`greet`) will be looked up in the currents cope. All subsequent path segments (like `Alice`) are used as is. Otherwise, both ways of passing arguments behave the same.

`eg` lets you call a JavaScript function like `greet` from the shell without needing to write JavaScript code to parse command line arguments.

## Aside: Loading functions as ES modules

The `samples` folder you're working in includes a file called `package.json` that instructs Node to load `.js` files as ES (EcmaScript) modules:

```console
$ eg package.json
{
  "comment": "This file exists to tell Node to load .js files as ES modules",
  "type": "module"
}
```

By default, Node imports .js files as CommonJS modules. To allow `eg` to dynamically import JavaScript files in your own projects as ES modules, you will need to include a `package.json` file in the folder with your .js file or in any parent folder. That `package.json` should include the entry `"type": "module"`.

## Use `eg` as a general-purpose JavaScript shell tool

Suppose you have a collection of functions:

```console
$ eg double.js
export default (x) => `${x}${x}`;
$ eg greet.js
export default (name = "world") => `Hello, ${name}. `;
$ eg uppercase.js
export default (x) => x.toString().toUpperCase();
```

You can then use `eg` to mix and match these functions from the shell:

```console
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

Here are the equivalent verbose forms with parentheses:

```console
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

`eg` lets you use the shell as a basic JavaScript console, so you can invoke and compose functions in any combination without having to write permanent code. This can be useful when you're experimenting, testing, or need to do one-off operations from the shell.

## Read files with `eg`

You can feed a file to a JavaScript function:

```console
$ eg sample.txt
This is a text file.
$ eg uppercase.js
export default (x) => x.toString().toUpperCase();
$ eg uppercase sample.txt
THIS IS A TEXT FILE.
```

This lets you pass files to your JavaScript functions without you having to write code to deal with files.

In this example, `eg` ends up passing a file buffer to the `uppercase` function. The `uppercase` function includes a `toString()` call which here will extract the text from the file buffer. It can then do its uppercasing work on the resulting text.

## Reading input from stdin

You can pipe data into JavaScript functions with the built-in `stdin` function:

```console
$ echo This is input from the shell | eg uppercase stdin
THIS IS INPUT FROM THE SHELL
```

The result of the `stdin` function will be the complete standard input fed to the `eg` command. This lets you pipe data to a JavaScript function that accepts a simple argument instead of needing specialize the function specifically to read data from the console.

## Writing output to a file

You can use regular shell features to pipe the output from your JavaScript functions to a file:

```console
$ eg sample.txt
This is a text file.
$ eg uppercase sample.txt > uppercase.txt
$ eg uppercase.txt
THIS IS A TEXT FILE.
```

## Explorable graphs

`eg` is is especially good at dealing with graphs. One way to define a graph is in YAML format:

```console
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

`eg` can interpret this file as the following graph:

![](greetings.svg)

More specifically, `eg` is designed to work with _explorable graphs_: a graph that can tell you what's in it, and can be either synchronous or asynchronous. Many common data structures can be represented as explorable graphs.

`eg` natively understands several types of explorable graphs:

- JSON
- YAML
- JavaScript objects
- JavaScript arrays
- JavaScript functions
- folder trees
- web sites (some operations require support for [.keys.json](/eg/.keys.json) files, discussed later)
- any object that implements the [Explorable](/explorable) interface

## Extract specific values out of a graph

You can use path syntax to extract a specific value from a graph.

```console
$ eg greetings.yaml/Alice
Hello, Alice.
```

The `greetings.yaml` graph is a flat list, but it can be a hierarchical tree or arbitrarily complex.

An explorable graph can also be invoked like a function, so you also have the option of using function call syntax:

```console
$ eg "greetings.yaml('Alice')"
Hello, Alice.
```

You can easily combine `eg` features like JSON/YAML parsing, path syntax, and function invocation to have `eg` parse a specific value out of a graph and feed that directly to your function.

```console
$ eg uppercase greetings.yaml/Alice
HELLO, ALICE.
```

## Translate JSON to YAML and vice versa

You can use `eg` to transform a graph from one format to another. By default, `eg` renders graphs in YAML format, but you can ask for JSON format with the `json` function:

```console
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

In the other direction, you can render a JSON file as YAML with the [yaml](/eg/builtins.html#yaml) function:

```console
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

The `json` function isn't a specific YAML-to-JSON transformation; it can transform any graph to JSON text. Similarly, `yaml` can transform any graph to YAML text.

## Parse JSON/YAML files

You can use `eg` to parse a JSON or YAML file into a plain JavaScript object that your JavaScript function can then handle.

Suppose you have a focused function that does something with a flat, plain object. Perhaps it returns the text of an object's values:

```console
$ eg text.js
export default function text(obj) {
  return Object.values(obj).join("\t");
}
```

You can use the built-in `plain` function to convert a YAML file to a plain JavaScript object, then pass that to the sample `text` function:

```console
$ eg text plain greetings.yaml
Hello, Alice.   Hello, Bob.     Hello, Carol.
```

Or pass a parsed JSON file to your function:

```console
$ eg text plain letters.json
The letter A    The letter B    The letter C
```

Separating the parsing from your function like this lets you keep your function as general as possible.

## Render the current file system tree as a graph

The file system is just another graph that `eg` natively understands. If you give `eg` a path to a folder, it will treat that as a graph. For example, you can specify the current folder with a period (`.`):

```console
$ eg .
```

This will render the complete contents of the current folder, including subfolders, in YAML.

You can capture that result to package up the current folder as a YAML file.

```console
$ eg . > package.yaml
```

Or package the folder as JSON:

```console
$ eg json . > package.json
```

## Unpack files into the file system

This `eg` introduction began with you unpacking a YAML file into separate files. As another example, you can unpack the greetings in `greetings.yaml` into individual files:

```console
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

The `files/greetings` argument indicates that [copy](/eg/builtins.html#copy) should copy the input YAML graph to a file system graph under a folder named `greetings`. As a result, the key/value pairs in the YAML file are now individual files in a `greetings` folder.

The important point here is that _all graphs look the same to `eg`_. It doesn't matter whether a graph is defined in a single file like YAML, or a collection of loose files in the file system. Having unpacked the `greetings.yaml` file above, we can ask `eg` to display the `greetings` folder we just created:

```console
$ eg greetings
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

It _looks_ like `greetings` is a YAML file, but it's not — it's really a folder. `eg` is just displaying the folder's contents in the default YAML output format. Each line of that output is actually coming from a different file.

The `greetings` folder and the `greetings.yaml` file both define the same graph, even though the underlying data is stored in completely different ways and accessed via different APIs.

## Process a folder tree as a JavaScript object

Because the `greetings` folder created in the above example is just another graph `eg` can process, you can feed it to the simple JavaScript function `text(obj)` shown earlier that displayed the text values of a plain JavaScript object.

```console
$ eg text plain greetings
Hello, Alice.   Hello, Bob.     Hello, Carol.
```

This connects two ideas:

- A folder like `greetings` is a explorable graph `eg` can understand.
- `eg` to convert any graph to a plain JavaScript object with the `plain` function.

This means that you can use the `plain` function to convert a _folder_ to a plain JavaScript object too. The keys will be the file/folder names, and the values will be the file contents or folder subgraphs.

Writing code to work with folder and files this way can be much easier than using Node's file system API directly. There is a performance trade-off implied by building an in-memory object to hold the file system data, but in many cases this is still very fast. And in practice it can much easier to manipulate a complete file system hierarchy as an in-memory object than working with a file system API.

Another important benefit of working with explorable graphs is that you can change your mind later about how you want to represent data without having to rewrite code that processes that data. You could start a small project by representing data in a single file and then, if your needs change later, switch to representing that data in a hierarchical tree of files, or data stored as web resources.

## Serve a graph

You can serve any graph with the [serve](/eg/builtins.html#serve) function. For example, the sample `site.yaml` file defines a tiny graph with two web pages:

```console
$ eg site.yaml
index.html: |
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Index</h1>
      <a href="about/">About</a>
    </body>
  </html>

about:
  index.html: |
    <!DOCTYPE html>
    <html>
      <body>
        <h1>About</h1>
        <p>This site is defined in a YAML file.</p>
      </body>
    </html>
```

The graph looks like this:

![](site.svg)

You can serve this tiny site directly from the file:

```console
$ eg serve site.yaml
Server running at http://localhost:5000
```

If you open the indicated URL in your browser, you'll be able to browse between the two pages in the site. The YAML file defines a graph, and the server translates each HTTP URL into a graph traversal.

Press Ctrl+C to stop the server.

## Serve a folder

You can serve any graph. To serve the current folder:

```console
$ eg serve .
Server running at http://localhost:5000
```

This effectively lets `eg` work as a static file server.

As a shorthand, you can omit the period (`.`). If you don't specify a graph to serve, `serve` serves up the current folder.

```console
$ eg serve
Server running at http://localhost:5000
```

## Transform data into something presentable with a template

Template languages are useful for translating data into something you can present to a user. As a bare-bones template language, let's look at a function that renders HTML using a native JavaScript template literal:

```console
$ eg template.js
export default (body) => `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
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
```

We can use `eg` to apply this template to data, potentially plucked out of a graph, to render that data as HTML:

```console
$ eg template greetings.yaml/Alice
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
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

Earlier you saw an `uppercase` function that takes a string argument and returns an uppercase version:

```console
$ eg uppercase greetings.yaml/Alice
HELLO, ALICE.
```

You can apply that `uppercase` transformation to an entire graph with the `eg`'s built-in `map` function:

```console
$ eg "map(greetings.yaml, uppercase)"
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Carol: HELLO, CAROL.
```

It is easy to transform an entire explorable graph of one type of object into a new graph of a different type of object. You only need to identify or define a one-to-one transformation function that handles a single object, and `eg` can apply that as a many-to-many transformation of an entire graph.

The second argument to `map` is a function. (Technically, the second argument can be any explorable graph, but for the moment, we'll use a regular JavaScript function.) We want to treat that function as a first-class object, which means we _don't_ want `eg` to do its normal implicit function invocation here. To prevent that, you must include the parentheses by quoting the arguments to `eg` or otherwise escaping them.

The `map` example above takes the original greetings graph:

![](greetings.svg)

and creates a new graph where all the values are uppercase:

![](uppercase.svg)

In this intro, we're just transforming text, but you can transform anything in bulk, including images and other binaries. If you can write a function to transform a single thing in JavaScript, you can use `eg` to apply that transformation to an entire graph of things.

## Traversing a transformed graph

If you ask for a specific value from a `map` graph, then only that value is computed:

```console
$ eg "map(greetings.yaml, uppercase)/Alice"
HELLO, ALICE.
```

`map` doesn't do all its work when invoked, but immediately returns a new explorable graph that will invoke the mapping function on demand. You can think of such an explorable graph as a _lazy dictionary_. The lazy dictionary doesn't have a permanent entry for "Alice", but if you ask for "Alice", the lazy dictionary will go and compute the desired value.

## Use a graph as a map

Suppose that you have base data, like an array of people:

```console
$ eg people.yaml
- Alice
- Carol
```

And some other data that associates a person's name with a greeting:

```console
$ eg greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

You can then treat both the base data and the greetings data as graphs, and pass those to `map`, to turn the list of specific people into a list of greetings:

```console
$ eg "map(people.yaml, greetings.yaml)"
- Hello, Alice.
- Hello, Carol.
```

Above it was noted that the second argument passed to `map` can actually be any graph, not just a mapping function. This lets you use data to transform other data. Here the second `greetings.yaml` graph is used as a function to transform the individual names coming from `people.yaml` into greetings.

## Serve a transformed graph of stuff

You can ask `eg` to serve data transformed on demand into HTML using `map` and the template we saw earlier.

```console
$ eg "serve map(greetings.yaml, template)"
Server running at http://localhost:5000
```

The served site does _not_ have an index page, but you can browse to one of the defined pages like http://localhost:5000/Alice. You'll see "Hello, Alice." rendered in HTML. Due to the lazy nature of explorable graphs and `map`, that rendering work is only done on request.

## Turn a transformed graph of stuff into files

You can transform a graph and save the results as files.

```console
$ eg "copy map(greetings.yaml, template), files/html"
$ ls html
Alice   Bob     Carol
```

If you serve the `html` folder now, the user experience will be the same as when the HTML pages were generated dynamically by `map`:

```console
$ eg serve html
Server running at http://localhost:5000
```

You can perform a `copy` operation like the one in this example in preparation for deploying HTML pages to a static web server. The web page you're reading right now was created and deployed in exactly that way.

## Inspect a live web site

The web site you're reading now supports viewing its contents as an explorable graph, so you can reference it directly in `eg`. For example, this site includes a route [/samples/greetings/](/samples/greetings/), and you can pass that URL to `eg` to view the files there:

```console
$ eg https://explorablegraph.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

While that result may look like a YAML file, each of those lines is actually coming from a separate web resource.

```console
$ eg https://explorablegraph.org/samples/greetings/Alice
Hello, Alice.
```

`eg` can discover all the resources at the `/samples/greetings/` route because this server supports a simple protocol: for every route on this server, a `.keys.json` file exists that enumerates the resources at that route.

```console
$ eg https://explorablegraph.org/samples/greetings/.keys.json
["Alice","Bob","Carol"]
```

When you ask to view a route, `eg` asks that server for its `.keys.json` file, then uses that information to traverse all the resources at that route.

Making the full contents of a site more freely available might be concerning to some people, but most web content is already available to users; it's just not conveniently inspectable. `eg` extends the spirit of the browser's View Source feature, which looks at a single web page at a time, to let you inspect everything at a particular web route.

## Create a web site mirror

Since a web site like explorablegraph.org is an explorable graph, and `eg` can serve explorable graphs, then you can easily set up a local mirror for this site:

```console
$ eg serve https://explorablegraph.org
Server running at http://localhost:5000
```

Your local server is now mirroring the explorablegraph.org site: when you browse your local site, the local server gets the necessary resources from the original site, then re-serves them at the local address.

## Copy a live web site to local files

You can also use `eg` to copy an explorable web route to local files:

```console
$ eg copy https://explorablegraph.org/samples/greetings/, files/snapshot
$ ls snapshot
Alice Bob   Carol
```

While some people may balk at letting people freely copy web resources to their own machine, there are plenty of cases where the entire point of the site is to make information freely available.

Of course, just because copying a site is possible doesn't mean it's efficient. If you regularly need to copy web resources to local files, there are faster tools for that job. But if you only do that infrequently, the general-purpose `eg` may suffice.

## Finish

This concludes the `eg` introduction. As you've seen, `eg` is useful for

- invoking JavaScript functions from the shell
- parsing arguments from the command line and passing those to JavaScript functions
- passing files and folder trees to JavaScript functions
- capturing function output to files
- working with graphs defined in JSON/YAML files, the file system, or web sites

If you installed `eg` globally at the start of this introduction, but won't use `eg` after this, now is a good time to uninstall it and clean up:

```console
$ cd ..
$ rm -r samples
$ npm uninstall -g @explorablegraph/explorable
```

If you installed `eg` without the `-g` global flag, you can just delete the directory you were working in.

_Reviewer's note: Feel free to experiment further with `eg` if you'd like, but understand that it's not yet stable and will likely undergo further change. Anyone interested in using it should be in contact with [@JanMiksovsky](https://twitter.com/JanMiksovsky), and at this stage should be prepared to participate in the project at some level beyond just filing bug reports and expecting those bugs to be fixed._
