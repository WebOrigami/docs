---
title: Origami templates
subtitle: Map graphs and object data to text
teamData.yaml:
  - name: Alice
  - name: Bob
  - name: Carol
names = map(teamData.yaml, =name):
strings = map(teamData.yaml, =`<a href="{{name}}.html">{{name}}</a> `):
template:
  - Hello, <strong>
  - "{{name}}"
  - </strong>!
application:
  - Hello, <strong>
  - Alice
  - </strong>!
intro = client/samples/frameworkIntro:
index.ori: |
  <h1>About Us</h1>
  {{map teamByName, =`
    <li>{{name}}</li>
  `}}
indexTemplate:
  - <h1>About Us</h1>
  - "{{map teamByName, =`<li>{{name}}</li>` }}"
indexText = results(this):
  0: "<h1>About Us</h1>"
  1 = map(intro/teamByName, =`<li>{{name}}</li>`):
index.html = index.ori(intro/teamData.yaml):
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

## A template is a graph transformation

You can consider the application of a template itself as a graph transformation.

In the case of the above template, you can view the elements of the template as an array:

```\yaml
{{ yaml template }}
```

The first and last items in this array are boilerplate strings holding HTML; the middle element is a placeholder. As with other arrays, you can model this array as a graph.

When you apply this template to the data for a person like Alice, you transform the array graph into a new graph. Boilerplate strings in the source graph are carried over as is, while expressions in placeholders are evaluated in the context of the data. This results in a new graph of strings:

<div class="sideBySide">
  <figure>
    {{ svg template }}
  </figure>
  <figure>
    {{ svg application }}
  </figure>
  <figcaption>Graph for a person template…</figcaption>
  <figcaption>…maps to graph of plain strings</figcaption>
</div>

To get the final result of the template, Origami performs a depth-first traversal of the string graph, and returns the concatenation of all the strings. This produces the result: Hello, **Alice**.

Treating template application as a graph transformation results in a flexible templating system that can be extended in interesting ways, as you'll see in a bit with nested templates.

Expressions inside an Origami template's placeholders have access to same language facilities as Origami formulas used in file names or the ori command-line interface. Among other things, this means you can call your own JavaScript functions (like `greet`, earlier) inside template placeholders.

### Nested templates

Above you saw how applying an Origami template is a kind of graph transformation that produces a graph of strings. In the case of `index.ori`, this transformation produces a multi-level graph of strings.

<div class="sideBySide">
  <figure>
    {{ svg indexTemplate }}
  </figure>
  <figure>
    {{ svg indexText }}
  </figure>
  <figcaption>Graph for an index page template…</figcaption>
  <figcaption>
    …maps to graph that flattens to final text
  </figcaption>
</div>

As before, a boilerplate string like `<h1>About Us</h1>` is kept as is. The `#map` block in the template is a placeholder that is evaluated. It produces its own subgraph of strings: an HTML fragment like `<li>Alice</li>` for each person.

The entire deep graph of strings is concatenated in depth-first order to produce the final result, which is served as `index.html`.

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
$ ori teamData.yaml
- name: Alice
- name: Bob
- name: Carol
$ ori "map teamData.yaml, =name"
- Alice
- Bob
- Carol
```

We can visualize that mapping this way:

<div class="sideBySide">
  <figure>
    {{ svg teamData.yaml }}
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
{{ map teamData.yaml, =name }}
```

When you apply the template, the people objects in `teamData.yaml` will be mapped to names. Then, per the above section about concatenating graph values, those names will then be concatenated and incorporate in the template's final text output.

```console
$ ori index.ori
<h1>Team</h1>
AliceBobCarol
```

This isn't quite usable yet, but illustrates the basic concept: any Origami expression in a template that produces a graph will have its text values concatenated. This same principle applies equally to graphs created via `map` or `map`.

## Mapping graphs with nested templates

Let's extend the above example to generate HTML links for each person. This becomes a matter of mapping the graph of people objects to a graph of HTML fragments.

```console
$ cat index.ori
<h1>Team</h1>
\{{ map teamData.yaml, =`<a href="\{{name}}.html">\{{name}}</a>
` }}
```

The `index.ori` file represents an outer template that includes an `h1` heading. Below that, a substitution calling `map` appears, which maps the `teamData.yaml` graph of people to an inner, nested Origami template. The inner template incorporates an individual person's `name` into a short HTML fragment.

We can visualize this as a graph transformation:

<div class="sideBySide">
  <figure>
    {{ svg teamData.yaml }}
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

- `.`
- `@key`

## Extending the template language
