---
title: Metagraphs
formula.yaml: |
  a: Hello
  b = a: ""
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
a: Hello
b = a: ""
```

This graph defines just two keys: the first key is `a` and it has the value "Hello", the second key is the text `b = a`. (In this example, the value of the second key is irrelevant; here it is an empty string.) That second key is a formula. If we're treating this example as a simple YAML file, then the formula key is just a string with no effect.

We can visualize the graph this way:

<div>
{{ svg formula.yaml }}
</div>

But we can ask Origami to _interpret_ this formula. One way to do that is with the built-in function `meta`. This returns a metagraph.

```console assert
$ ori meta formula.yaml
a: Hello
b: Hello
b = a: ""
```

The original graph has now been expanded:

<div>
{{ svg meta formula.yaml }}
</div>

When we ask for the keys of this metagraph, we get _three_ keys. Two are the keys we defined: `a` and `b = a`. The metagraph also evaluates the formula `b = a`, yielding a third, virtual key, `b`.

The value of `a` is "Hello", as defined in the original graph. The value of the virtual key `b` is _also_ "Hello", obtained by interpreting the formula `b = a`.

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

<div>
{{ svg folder }}
</div>

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

<div>
{{ svg meta folder }}
</div>
