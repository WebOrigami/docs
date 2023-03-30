---
title: SiteGraph
subtitle: Wraps a web site as an explorable graph
---

## .keys.json files

To participate in the explorable graph ecosystem, a server can indicate which keys are available at a given route by defining a **.keys.json** file. This is an array of the keys available at that route in JSON format.

For example, this site has a route [/samples/greetings](/samples/greetings) containing some trivial files. The server defines a JSON file at [/samples/greetings/.keys.json](/samples/greetings/.keys.json) that enumerates the names of those files:

```{{'json'}}
{{ @json @graph/keys client/samples/greetings }}
```

If you ask a `SiteGraph` to enumerate the keys available at its URL, it will retrieve this `.keys.json` file, then yield those keys. This allows you to loop over the keys in a `SiteGraph`.

For example, you can use the ori [CLI](/cli) to display the complete contents of all pages at a given route using the [site](/language/builtins.html#site) command.

```console
$ ori site://graphorigami.org/samples/greetings
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

Above, the `site` command retrieves the route's keys defined in the `.keys.json`, then makes separate requests for each of those pages.

The `.keys.json` file should normally not include itself in its list of keys.

{{ templates/class.ori(api/SiteGraph.yaml/exports/0) }}
