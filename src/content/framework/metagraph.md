---
title: Metagraphs
formula.yaml: |
  name: world
  message = `Hello, {{ name }}.`: null
folder: |
  html = map(markdown, mdHtml, extension='md→html'):
  markdown:
    Alice.md: Hello, **Alice**.
    Bob.md: Hello, **Bob**.
    Carol.md: Hello, **Carol**.
---

The Origami framework is built on the concept of a _metagraph_: a graph that describes its own transformation.

Origami lets you modify the shape of a metagraph — the keys and values it contains — by defining special types of keys inside it. These are like power-ups you can place inside a graph to change how it behaves.

For example, by putting a file with a carefully-constructed name inside a folder, you create a new virtual file inside that folder. A metagraph could also be built on top of another type of [explorable graph](/pattern/interface.html), including an in-memory JavaScript object, the data in a YAML or JSON file, or a web resource.

The metagraph features include:

| Feature                    | Example key   | Summary                                                                                                                       |
| :------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| [Formula](formulas.html)   | `x = fn(y)`   | Defines a virtual value, like a virtual file.                                                                                 |
| [Maps](maps.html)          | `x=map(y,fn)` | A common type of formula that transforms a graph. Use this to create virtual folders.                                         |
| [Wildcard](wildcards.html) | `\[x\].html`  | Matches a pattern that can include an extension. Use this for routing or providing default values.                            |
| [Addition](additions.html) | `+`           | Incorporates a subgraph's children into a parent graph. Use this for control over the physical organization of files or data. |
| [Ghost graph](ghosts.html) | `images+`     | Adds a subgraph's children to matching subgraph(s)                                                                            |

## Example: a formula that defines a virtual value

```console assert: true
$ ori formula.yaml
name: world
message = `Hello, \{\{ name }}.`: null
```

This graph defines just two keys: the first key is `name` and it has the value "world". The second key is a text formula. In this example, the value of the second key is irrelevant; here it `null`. We can visualize the graph this way:

<figure>
{{ svg formula.yaml }}
</figure>

We can ask Origami to _interpret_ this formula by passing the graph to the built-in function `meta`. This returns a metagraph in which the formulas result in new, virtual values.

```console assert: true
$ ori meta formula.yaml
message: Hello, world.
"message = `Hello, \{\{ name }}.`": null
name: world
```

The original graph has now been expanded:

<figure>
{{ svg meta formula.yaml }}
</figure>

When we ask for the keys of this metagraph, we get _three_ keys. Two are the keys we defined: `name` and the formula. The metagraph also evaluates that formula, yielding a third, virtual key, `message`.

The value of `name` is "world", as defined in the original graph. The value of the virtual key `message` is "Hello, world.", obtained by interpreting the formula.
