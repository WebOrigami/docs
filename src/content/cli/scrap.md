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
