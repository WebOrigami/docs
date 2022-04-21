---
title: Origami templates
subtitle: Map graphs and object data to text
team.yaml:
  - name: Alice
  - name: Bob
  - name: Carol
names = shallowMap(team.yaml, =name):
strings = shallowMap(team.yaml, =`<a href="{{name}}.html">{{name}}</a> `):
---

Origami templates let you write Origami expressions in the context of a text document. These expressions can then be evaluated in the context of input data to efficiently produce, for example, HTML.

The Origami system provides its own template engine as a convenience and because the Origami language lends itself to the domain of templates. But the Origami framework is designed to be extended with other template systems (e.g., [Handlebars](https://handlebarsjs.com/)). This requires writing a small degree of integration code which is currently beyond the scope of this documentation.

## Origami template documents

An Origami template is a text file containing _substitutions_ surrounded by `\{{` and `}}` curly braces.

```console
$ cat greet.ori
Hello, \{{ name }}.
```

A template like this can then be evaluated in the context of an object such as a graph or data object.

```console
$ cat alice.yaml
name: Alice Andrews
$ ori "greet.ori(alice.yaml)"
Hello, Alice Andrews.
```

The text inside the `\{{` and `}}` can be any valid expression in the Origami [language](/language).

## Concatenating graph values

If you write a template substitution that results in a graph, Origami will collect the deep values of that graph, convert them to strings, then concatenate them. The final concatenated text will then be appear at the point of the substitution.

```console
$ cat greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ cat flatten.ori
Here are the text strings in the greetings graph:
\{{ greetings.yaml }}
$ ori flatten.ori
Here are the text strings in the greetings graph:
Hello, Alice.Hello, Bob.Hello, Carol.
```

## Mapping graphs to text

Most template languages include some way to iterate over arrays or objects. In Origami, such situations are viewed as another kind of graph transformation: you are mapping a graph of something to a graph of strings. Then, per the above section on concatenating graph values, that graph of strings is concatenated into a larger text result.

If you have a small array of people objects, you can map that to a graph of names using the Origami command line interface:

```console
$ ori team.yaml
- name: Alice
- name: Bob
- name: Carol
$ ori "shallowMap team.yaml, =name"
- Alice
- Bob
- Carol
```

We can visualize that mapping this way:

<div class="sideBySide">
  <figure>
    {{ svg team.yaml }}
  </figure>
  <figure>
    {{ svg names }}
  </figure>
  <figcaption>Source graph of people objects</figcaption>
  <figcaption>Result graph of names</figcaption>
</div>

Because the Origami CLI and Origami templates share the same expression language, you can perform the same type of mapping inside a template.

```console
$ cat index.ori
<h1>Team</h1>
{{ shallowMap team.yaml, =name }}
```

When you apply the template, the people objects in `team.yaml` will be mapped to names. Then, per the above section about concatenating graph values, those names will then be concatenated and incorporate in the template's final text output.

```console
$ ori index.ori
<h1>Team</h1>
AliceBobCarol
```

This isn't quite usable yet, but illustrates the basic concept: any Origami expression in a template that produces a graph will have its text values concatenated. This same principle applies equally to graphs created via `map` or `shallowMap`.

## Mapping graphs with nested templates

Let's extend the above example to generate HTML links for each person. This becomes a matter of mapping the graph of people objects to a graph of HTML fragments.

```console
$ cat index.ori
<h1>Team</h1>
\{{ shallowMap team.yaml, =`<a href="\{{name}}.html">\{{name}}</a>
` }}
```

The `index.ori` file represents an outer template that includes an `h1` heading. Below that, a substitution calling `shallowMap` appears, which maps the `team.yaml` graph of people to an inner, nested Origami template. The inner template incorporates an individual person's `name` into a short HTML fragment.

We can visualize this as a graph transformation:

<div class="sideBySide">
  <figure>
    {{ svg team.yaml }}
  </figure>
  <figure>
    {{ svg strings }}
  </figure>
  <figcaption>Source graph of people objects</figcaption>
  <figcaption>Result graph of HTML fragments</figcaption>
</div>

When the template is invoked, it performs the above transformation, then flattens all the strings into a single text string representing the result:

```console
$ ori index.ori
<h1>Team</h1>
<a href="Alice.html">Alice</a>
<a href="Bob.html">Bob</a>
<a href="Carol.html">Carol</a>
```

## Front matter

## Template scope

- `@key`
- `@value`

## Extending the template language
