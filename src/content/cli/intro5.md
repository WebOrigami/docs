---
title: Serving graphs
numberHeadings: true
intro: !ori samples/cli
---

## Serve a graph

You can serve any graph with the [@serve](/language/@serve.html) function. For example, the sample `site.yaml` file defines a tiny graph with two web pages:

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
{{ @svg intro/site.yaml }}
</figure>

<span class="tutorialStep"></span> You can serve this tiny site directly from the file:

```console
$ ori @serve site.yaml
Server running at http://localhost:5000
```

If you open the indicated URL in your browser, you'll be able to browse between the two pages in the site. The YAML file defines a graph, and the server translates each HTTP URL into a graph traversal.

Press Ctrl+C to stop the server.

## Serve a folder

<span class="tutorialStep"></span> You can serve any graph. To serve the current folder:

```console
$ ori @serve .
Server running at http://localhost:5000
```

This effectively lets ori work as a static file server.

As a shorthand, you can omit the period (`.`). If you don't specify a graph to serve, `@serve` serves up the current folder.

```console
$ ori @serve
Server running at http://localhost:5000
```

## Serve a transformed graph of stuff

<span class="tutorialStep"></span> You can ask ori to serve data transformed on demand into HTML using `map` and the template we saw earlier.

```console
$ ori "@serve @map/values greetings.yaml, template"
Server running at http://localhost:5000
```

You can browse to one of the defined pages like http://localhost:5000/Alice. You'll see "Hello, Alice." rendered in HTML. Due to the lazy nature of async graphs and `map`, that rendering work is only done on request.

## Transforming data into static files and then serving

Earlier you saw how you can transform a graph and save the results as files.

```console
$ ori "@copy @map/values(greetings.yaml, template), @files/html"
$ ls html
Alice   Bob     Carol
```

<span class="tutorialStep"></span> If you serve the `html` folder created this way, the user experience will be the same as above, when the HTML pages were generated dynamically by `map`:

```console
$ ori @serve html
Server running at http://localhost:5000
```

You can perform a `copy` operation like the one in this example in preparation for deploying HTML pages to a static web server. The web page you're reading right now was created and deployed in exactly that way.

## Inspect a live web site

<span class="tutorialStep"></span> The web site you're reading now supports viewing its contents as an async graph, so you can reference it directly in ori. For example, this site includes a route [/samples/greetings/](/samples/greetings/). You can pass that URL to ori with the custom [graphhttps:](/language/@graphHttps.html) protocol to treat that route as an async graph, and display all the files at that route:

```console
$ ori graphhttps://graphorigami.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

<span class="tutorialStep"></span> While the result above may look like a YAML file, each of those lines is actually coming from a separate web resource.

```console
$ ori https://graphorigami.org/samples/greetings/Alice
Hello, Alice.
```

<span class="tutorialStep"></span> ori can discover all the resources at the `/samples/greetings/` route because this server supports a simple protocol: for every route on this server, a [.keys.json](/core/SiteGraph.html#keysjson-files) file exists that enumerates the resources at that route.

```console
$ ori https://graphorigami.org/samples/greetings/.keys.json
["Alice","Bob","Carol"]
```

When you ask to view a route via `graphHttps`, ori asks that server for its `.keys.json` file, then uses that information to traverse all the resources at that route.

Making the full contents of a site more freely available might be concerning to some people, but most web content is already available to users; it's just not conveniently inspectable. ori extends the spirit of the browser's View Source feature, which looks at a single web page at a time, to let you inspect everything at a particular web route.

## Copy a live web site to local files

<span class="tutorialStep"></span> You can also use ori to copy a website as an async graph to local files:

```console
$ ori @copy graphhttps://graphorigami.org/samples/greetings/, @files/snapshot
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
$ npm uninstall -g @graphorigami/origami
```

If you installed ori without the `-g` global flag, you can just delete the directory you were working in.

_Reviewer's note: Feel free to experiment further with ori if you'd like, but understand that it's a research project and will undergo further change. Anyone interested in using it should be in contact with [Jan Miksovsky](https://jan.miksovsky.com/contact.html), and at this stage should be prepared to participate in the project at some level beyond just filing bug reports and expecting those bugs to be fixed._

&nbsp;

Back to [CLI](/cli/)
