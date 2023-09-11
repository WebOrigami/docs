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

## Finish

This concludes the ori introduction. As you've seen, ori is useful for

- invoking JavaScript functions from the shell
- parsing arguments from the command line and passing those to JavaScript functions
- passing files and folder trees to JavaScript functions
- capturing function output to files
- working with graphs defined in JSON/YAML files, the file system, or web sites
- serving graphs to a web browser

_Reviewer's note: Feel free to experiment further with ori if you'd like, but understand that it's a research project and will undergo further change. Anyone interested in using it should be in contact with [Jan Miksovsky](https://jan.miksovsky.com/contact.html), and at this stage should be prepared to participate in the project at some level beyond just filing bug reports and expecting those bugs to be fixed._

&nbsp;

Back to [CLI](/cli/)
