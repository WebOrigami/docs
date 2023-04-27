---
title: Origami templates
samples: !ori node_modules/@graphorigami/samples/src
subtitle: Transform data to text
teamData.yaml:
  - name: Alice
  - name: Bob
  - name: Carol
names: !ori (@map/values(teamData.yaml, =./name))
strings: !ori (@map/values(teamData.yaml, =`<a href='{{name}}.html'>{{./name}}</a> `))
template:
  - Hello, <strong>
  - "{{name}}"
  - </strong>!
application:
  - Hello, <strong>
  - Alice
  - </strong>!
index.ori: |
  <h1>About Us</h1>
  {{ @map/values teamData.yaml, =`
    <li>{{./name}}</li>
  `}}
indexTemplate:
  - <h1>About Us</h1>
  - "{{ @map/values teamData.yaml, =`<li>{{./name}}</li>` }}"
indexText:
  0: "<h1>About Us</h1>"
  1: !ori (@map/values(teamData.yaml, =`<li>{{./name}}</li>`))
index.html: !ori index.ori(teamData.yaml)
---

This is a test.

Origami templates let you efficiently produce HTML or other text documents from data using Origami expressions.

The Graph Origami system provides a template system both as a convenience and because the Origami language lends itself to the domain of templates. (You can use Graph Origami with other template systems, although that requires writing a small degree of integration code that’s currently beyond the scope of this documentation.)

## Origami template documents

An Origami template document is a text file with a `.ori` extension. A template contains placeholders marked with `\{{` and `}}` curly braces.

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

The text inside the `\{{` and `}}` can be any valid expression in the Origami [language](/language/).

## Referencing files

Because you can reference local files in Origami expressions, you can incorporate anything into a template’s output with, e.g., a file name. Depending on the situation, you may not have to pass any arguments to the template — it may be able obtain whatever it needs from its file system context.

```console
*** example
$ ori “ref.ori()”
```

In cases like this where the template does not require any argument, you can avoid the need to quote parentheses by invoking the template using slash syntax:

```console
$ ori ref.ori/
```

## Traversing into data

Inside a template, you can use slash-separated paths to traverse into data files.

```console
*** example
```

## Referencing network resources

Since `https` and `http` URLs are valid Origami expressions, you can incorporate network content into a template’s output.

```console
$ cat net.ori
This content came from graphorigami.org:
{{ https://graphorigami.org/samples/templates/net.txt }}
$ ori net.ori/
```

## Inlining the results of expressions

It may be useful to embed Origami expressions inside other kinds of files, such as .html files. You can evaluate such expressions with the built-in [@inline](/language/@inline.html) function.

For example, you can use this to inline resources such as stylesheets.

```console
$ cat inline.html
<html>
  <head>
{{ inline.css }}
  </head>
  <body>
    This text will be red.
  </body>
</html>
$ cat inline.css
    body { color: red }
$ ori @inline inline.html
<html>
  <head>
    body { color: red }
  </head>
  <body>
    This text will be red.
  </body>
</html>
```

The @inline function preserves any front matter (below) in its output.

## Front matter

Both a template’s input document and the template itself can contain front matter in YAML or JSON format.

### Ambient properties available inside a template

- `@input`
- `@template`
- `@text`
- `.`

The `@template` property itself has the following properties:

- `graph`
- `recurse`
- `scope`
- `text`

### Front matter expressions

Front matter can include Origami expressions via the `!ori` YAML tag; see [Origami expressions in YAML](/language/yaml.html) for details. You can use this to, for examle, calculate a value that you want to reference multiple times in the template.

```console
$ cat expr.ori
---
banner: !ori `<p>{{ title }}</p>`
title: My Blog
---
<html>
  <body>
    {{ banner }}
    <p>Page content goes here</p>
    {{ banner }}
  </body>
</html>
$ ori expr.ori/
<html>
  <body>
    <p>My Blog</p>
    <p>Page content goes here</p>
    <p>My Blog</p>
  </body>
</html>
```

## Conditions

You can use the built-in [@if](/language/@if.html) function to include text based on some condition.

The first argument to `@if` is a condition that is evaluted. If the result is truthy (not `false`, `null`, or `undefined`), the second argument to `@if` is included in the template’s text output. If the result is falsy, the third argument will be included, or nothing if there is no third argument.

```console
$ cat condition.ori
{{ @js/String samples/condition.ori }}
$ ori “condition.ori({ rating: 3 })”
{{ samples/condition.ori({ rating: 3 }) }}
$ ori “condition.ori({})”
{{ samples/condition.ori({}) }}
```

## Extending the template language

As with the Origami CLI itself and Graph Origami .graph files, you can extend the template language in JavaScript. Generally this consists of placing a JavaScript file somewhere in the current [scope](/language/scope.html), for example in the current directory.

If you have a file named `uppercase.js`, then you can invoke it by referencing `uppercase` in your template expressions:

```console
$ cat uppercase.js
export default (x) => x.toString().toUpperCase();
$ cat callJs.ori
Hello, \{{ uppercase(‘world’) }}!
$ ori callJs.ori/
Hello, WORLD!
```

## A template is a graph transformation

You can consider the application of a template itself as a graph transformation.

In the case of the above template, you can view the elements of the template as an array:

```{{'yaml'}}
{{ @yaml template }}
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

Expressions inside an Origami template's placeholders have access to same language facilities as Origami formulas used in file names or the ori command-line interface. Among other things, this means you can call your own JavaScript functions (like `uppercase`, earlier) inside template placeholders.

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

This feature forms the basis for more complex ones (like maps, below), but one direct use for it is to inline a set of files by placing them in a folder, then referencing that folder in a template.

```console
$ ls svgs
a.svg b.svg c.svg
$ cat concatSvgs.ori
<html>
<body>
{{ svgs }}
</body>
</html>
$ ori concatSvgs.ori/
<html>
<body>

… svgs go here …

</body>
</html>
```

## Including text for each item in a collection

It’s common to have a template generate some fragment of text for each value in a graph: an array, a set, a folder, etc. In Origami templates, this is done by mapping the graph’s values to text with the built-in [@map/values](/language/@map.html#values) function.

```console
$ cat teamData.yaml
- name: Alice
  image: van.jpg
  location: Honolulu
  bio: After working as a manager for numerous startups over the years, I
    decided to take the plunge and start a business of my own.
  …
$ cat teamList.ori
{{ @js/String samples/teamList.ori }}
$ ori teamList.ori/
{{ samples/teamList.ori/ }}
```

The `index.ori` file represents an outer template that includes an `ul` heading. Below that, a substitution calling `map` appears, which maps the `teamData.yaml` graph of people to an inner, nested Origami template. The inner template incorporates an individual person’s `name` into a short HTML fragment.

### Referencing the key for a value

### How mapping works

Most template languages include some way to iterate over arrays or objects. In Origami, such situations are viewed as a graph transformation: you map a graph of things to a graph of strings and then, per the above section on concatenating graph values, that graph of strings is concatenated into a larger text result.

```console
$ ori teamData.yaml
- name: Alice
- name: Bob
- name: Carol
$ ori @map/values teamData.yaml, =name
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
{{ @map/values teamData.yaml, =name }}
```

When you apply the template, the people objects in `teamData.yaml` will be mapped to names. Then, per the above section about concatenating graph values, those names will then be concatenated and incorporate in the template's final text output.

```console
$ ori index.ori
<h1>Team</h1>
AliceBobCarol
```

This isn't quite usable yet, but illustrates the basic concept: any Origami expression in a template that produces a graph will have its text values concatenated. This same principle applies equally to graphs created via `map` or `map`.

## Mapping graphs with nested templates

…

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
$ ori index.ori/
<h1>Team</h1>
<a href="Alice.html">Alice</a>
<a href="Bob.html">Bob</a>
<a href="Carol.html">Carol</a>
```
