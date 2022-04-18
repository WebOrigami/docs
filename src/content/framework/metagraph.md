---
title: Metagraphs
formula.yaml: |
  name: world
  message = `Hello, {{name}}.`:
folder: |
  html = map(markdown, mdHtml, '.md', '.html'):
  markdown:
    Alice.md: Hello, **Alice**.
    Bob.md: Hello, **Bob**.
    Carol.md: Hello, **Carol**.
---

A _metagraph_ is a graph that describes its own transformation. The transformation is defined by formulas in keys: instead of a key being a simple string like "a", you create a key with a formula like "b = a". The metagraph will parse and evaluate this formula to define a new, virtual key called "b" that has the same value "a" has.

## Example: Metagraph with a key that includes a formula

```console assert
$ ori formula.yaml
name: world
message = `Hello, \{\{name}}.`:
```

This graph defines just two keys: the first key is `name` and it has the value "world". The second key is a text formula. In this example, the value of the second key is irrelevant; here it `null`, as indicated by the fact there is nothing after the final `:` colon. We can visualize the graph this way:

<figure>
{{ svg formula.yaml }}
</figure>

We can ask Origami to _interpret_ this formula by passing the graph to the built-in function `meta`. This returns a metagraph in which the formulas result in new, virtual values.

```console assert
$ ori meta formula.yaml
name: world
message: Hello, world.
"message = `Hello, \{\{name}}.`":
```

The original graph has now been expanded:

<figure>
{{ svg meta formula.yaml }}
</figure>

When we ask for the keys of this metagraph, we get _three_ keys. Two are the keys we defined: `name` and the formula. The metagraph also evaluates that formula, yielding a third, virtual key, `message`.

The value of `name` is "world", as defined in the original graph. The value of the virtual key `message` is "Hello, world.", obtained by interpreting the formula.

## Example: Defining a virtual folder

```console
$ ls
markdown    html = map(markdown, mdHtml, '.md', '.html')
$ ls markdown
Alice.md    Bob.md    Carol.md
$ cat Alice.md
Hello, **Alice**.
```

```console assert
$ ori folder
html = map(markdown, mdHtml, '.md', '.html'):
markdown:
  Alice.md: Hello, **Alice**.
  Bob.md: Hello, **Bob**.
  Carol.md: Hello, **Carol**.
```

<figure>
{{ svg folder }}
</figure>

```console assert
$ ori meta folder
html:
  Alice.html: |
    <p>Hello, <strong>Alice</strong>.</p>
  Bob.html: |
    <p>Hello, <strong>Bob</strong>.</p>
  Carol.html: |
    <p>Hello, <strong>Carol</strong>.</p>
"html = map(markdown, mdHtml, '.md', '.html')": null
markdown:
  Alice.md: Hello, **Alice**.
  Bob.md: Hello, **Bob**.
  Carol.md: Hello, **Carol**.
```

<figure>
{{ svg meta folder }}
</figure>
