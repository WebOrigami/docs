---
title: Serving graphs
numberHeadings: true
intro = client/samples/cli.yaml:
---

## Serve a graph

You can serve any graph with the [serve](/ori/builtins.html#serve) function. For example, the sample `site.yaml` file defines a tiny graph with two web pages:

```console
$ ori site.yaml
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

<figure>
{{ svg intro/site.yaml }}
</figure>

<span class="tutorialStep"></span> You can serve this tiny site directly from the file:

```console
$ ori serve site.yaml
Server running at http://localhost:5000
```

If you open the indicated URL in your browser, you'll be able to browse between the two pages in the site. The YAML file defines a graph, and the server translates each HTTP URL into a graph traversal.

Press Ctrl+C to stop the server.

## Serve a folder

<span class="tutorialStep"></span> You can serve any graph. To serve the current folder:

```console
$ ori serve .
Server running at http://localhost:5000
```

This effectively lets ori work as a static file server.

As a shorthand, you can omit the period (`.`). If you don't specify a graph to serve, `serve` serves up the current folder.

```console
$ ori serve
Server running at http://localhost:5000
```

## Transform data into something presentable with a template

Template languages are useful for translating data into something you can present to a user. As a bare-bones template language, let's look at a function that renders HTML using a native JavaScript template literal:

```console
$ ori template.js
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

<span class="tutorialStep"></span> We can use ori to apply this template to data, potentially plucked out of a graph, to render that data as HTML:

```console
$ ori template greetings.yaml/Alice
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
$ ori uppercase greetings.yaml/Alice
HELLO, ALICE.
```

<span class="tutorialStep"></span> You can apply that `uppercase` transformation to an entire graph with the ori's built-in `map` function:

```console
$ ori "map(greetings.yaml, uppercase)"
Alice: HELLO, ALICE.
Bob: HELLO, BOB.
Carol: HELLO, CAROL.
```

It is easy to transform an entire explorable graph of one type of object into a new graph of a different type of object. You only need to identify or define a one-to-one transformation function that handles a single object, and ori can apply that as a many-to-many transformation of an entire graph.

The second argument to `map` is a function. (Technically, the second argument can be any explorable graph, but for the moment, we'll use a regular JavaScript function.) We want to treat that function as a first-class object, which means we _don't_ want ori to do its normal implicit function invocation here. To prevent that, you must include the parentheses by quoting the arguments to ori or otherwise escaping them.

The `map` example above takes the original greetings graph:

<figure>
{{ svg intro/greetings.yaml }}
</figure>

and creates a new graph where all the values are uppercase:

<figure>
{{ svg map(intro/greetings.yaml, intro/uppercase) }}
</figure>

In this intro, we're just transforming text, but you can transform anything in bulk, including images and other binaries. If you can write a function to transform a single thing in JavaScript, you can use ori to apply that transformation to an entire graph of things.

## Traversing a transformed graph

<span class="tutorialStep"></span> If you ask for a specific value from a `map` graph, then only that value is computed:

```console
$ ori "map(greetings.yaml, uppercase)/Alice"
HELLO, ALICE.
```

`map` doesn't do all its work when invoked, but immediately returns a new explorable graph that will invoke the mapping function on demand. You can think of such an explorable graph as a _lazy dictionary_. The lazy dictionary doesn't have a permanent entry for "Alice", but if you ask for "Alice", the lazy dictionary will go and compute the desired value.

## Use a graph as a map

Suppose that you have base data, like an array of people:

```console
$ ori people.yaml
- Alice
- Carol
```

And some other data that associates a person's name with a greeting:

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

<span class="tutorialStep"></span> You can then treat both the base data and the greetings data as graphs, and pass those to `map`, to turn the list of specific people into a list of greetings:

```console
$ ori "map(people.yaml, greetings.yaml)"
- Hello, Alice.
- Hello, Carol.
```

Above it was noted that the second argument passed to `map` can actually be any graph, not just a mapping function. This lets you use data to transform other data. Here the second `greetings.yaml` graph is used as a function to transform the individual names coming from `people.yaml` into greetings.

## Serve a transformed graph of stuff

<span class="tutorialStep"></span> You can ask ori to serve data transformed on demand into HTML using `map` and the template we saw earlier.

```console
$ ori "serve map(greetings.yaml, template)"
Server running at http://localhost:5000
```

The served site does _not_ have an index page, but you can browse to one of the defined pages like http://localhost:5000/Alice. You'll see "Hello, Alice." rendered in HTML. Due to the lazy nature of explorable graphs and `map`, that rendering work is only done on request.

## Turn a transformed graph of stuff into files

<span class="tutorialStep"></span> You can transform a graph and save the results as files.

```console
$ ori "copy map(greetings.yaml, template), files/html"
$ ls html
Alice   Bob     Carol
```

<span class="tutorialStep"></span> If you serve the `html` folder now, the user experience will be the same as when the HTML pages were generated dynamically by `map`:

```console
$ ori serve html
Server running at http://localhost:5000
```

You can perform a `copy` operation like the one in this example in preparation for deploying HTML pages to a static web server. The web page you're reading right now was created and deployed in exactly that way.

## Inspect a live web site

<span class="tutorialStep"></span> The web site you're reading now supports viewing its contents as an explorable graph, so you can reference it directly in ori. For example, this site includes a route [/samples/greetings/](/samples/greetings/), and you can pass that URL to ori to view the files there:

```console
$ ori https://explorablegraph.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

<span class="tutorialStep"></span> While that result may look like a YAML file, each of those lines is actually coming from a separate web resource.

```console
$ ori https://explorablegraph.org/samples/greetings/Alice
Hello, Alice.
```

<span class="tutorialStep"></span> ori can discover all the resources at the `/samples/greetings/` route because this server supports a simple protocol: for every route on this server, a `.keys.json` file exists that enumerates the resources at that route.

```console
$ ori https://explorablegraph.org/samples/greetings/.keys.json
["Alice","Bob","Carol"]
```

When you ask to view a route, ori asks that server for its `.keys.json` file, then uses that information to traverse all the resources at that route.

Making the full contents of a site more freely available might be concerning to some people, but most web content is already available to users; it's just not conveniently inspectable. ori extends the spirit of the browser's View Source feature, which looks at a single web page at a time, to let you inspect everything at a particular web route.

## Create a web site mirror

<span class="tutorialStep"></span> Since a web site like explorablegraph.org is an explorable graph, and ori can serve explorable graphs, then you can easily set up a local mirror for this site:

```console
$ ori serve https://explorablegraph.org
Server running at http://localhost:5000
```

Your local server is now mirroring the explorablegraph.org site: when you browse your local site, the local server gets the necessary resources from the original site, then re-serves them at the local address.

## Copy a live web site to local files

<span class="tutorialStep"></span> You can also use ori to copy an explorable web route to local files:

```console
$ ori copy https://explorablegraph.org/samples/greetings/, files/snapshot
$ ls snapshot
Alice Bob   Carol
```

While some people may balk at letting people freely copy web resources to their own machine, there are plenty of cases where the entire point of the site is to make information freely available.

Of course, just because copying a site is possible doesn't mean it's efficient. If you regularly need to copy web resources to local files, there are faster tools for that job. But if you only do that infrequently, the general-purpose ori may suffice.

## Finish

This concludes the ori introduction. As you've seen, ori is useful for

- invoking JavaScript functions from the shell
- parsing arguments from the command line and passing those to JavaScript functions
- passing files and folder trees to JavaScript functions
- capturing function output to files
- working with graphs defined in JSON/YAML files, the file system, or web sites
- serving graphs to a web browser

<span class="tutorialStep"></span> If you installed ori globally at the start of this introduction, but won't use ori after this, now is a good time to uninstall it and clean up:

```console
$ cd ..
$ rm -r samples
$ npm uninstall -g @explorablegraph/explorable
```

If you installed ori without the `-g` global flag, you can just delete the directory you were working in.

_Reviewer's note: Feel free to experiment further with ori if you'd like, but understand that it's not yet stable and will likely undergo further change. Anyone interested in using it should be in contact with [@JanMiksovsky](https://twitter.com/JanMiksovsky), and at this stage should be prepared to participate in the project at some level beyond just filing bug reports and expecting those bugs to be fixed._

&nbsp;

Back to [CLI](/cli/)
