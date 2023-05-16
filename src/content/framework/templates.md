---
title: Origami templates
subtitle: Transform data to text
---

Graph Origami templates let you convert turn data into HTML or other text documents through expressions embedded in text.

- These templates work directly on a wide range of data types, including file system folders or network resources.
- You can extend what's possible in a template expression in JavaScript with essentially no configuration.

_You can use Graph Origami with other template systems, but the small degree of integration code required is currently beyond the scope of this documentation._

## Template documents

An Origami template document is a text file with a `.ori` extension. A template contains placeholders marked with `\{{` and `}}` curly braces that contain [Origami expressions](/language/syntax.html).

```console
$ cat greet.ori
Hello, \{{ name }}.
```

You can evaluate a template in the context of data, such as an object defined in a data file.

```console
$ cat alice.yaml
name: Alice Andrews
$ ori "greet.ori(alice.yaml)"
Hello, Alice Andrews.
```

## Reference input

When you invoke a template as a function, you can refer to the overall input object as `@input`.

```console
$ cat heading.ori
{{ @js/String samples/templates/heading.ori }}$ ori "heading.ori('Contact')"
{{ samples/templates/heading.ori('Contact') }}
```

If you specifically want to treat the input as text, you can use the expression `@text`.

## Reference individual files

You can reference local files in Origami expressions. Depending on the situation, you may not have to pass any arguments to the template — it may be able obtain whatever it needs from its file system context.

```console
$ cat fileRef.ori
{{ @js/String samples/templates/fileRef.ori }}$ cat copyright.txt
{{ @js/String samples/templates/copyright.txt }}
$ ori "fileRef.ori()"
{{ @scope/invoke samples/templates, samples/templates/fileRef.ori }}
```

In cases like this, where the template does not require any argument, you can avoid the need to quote parentheses by invoking the template using slash syntax:

```console
$ ori fileRef.ori/
{{ @scope/invoke samples/templates, samples/templates/fileRef.ori }}
```

## Reference graphs

If a template expression results in a graph such as a folder or hierarchical data, Origami will collect the deep values of that graph, convert them to strings, then concatenate them.

```console
$ cat greetings.yaml
{{ samples/templates/greetings.yaml }}
$ cat flatten.ori
{{ @js/String samples/templates/flatten.ori }}
$ ori flatten.ori/
{{ @scope/invoke samples/templates, samples/templates/flatten.ori }}
```

This feature forms the basis for more complex ones (like maps, below), but one basic use for it is to inline a set of files. For example, you might create a folder that contains a collection of HTML fragments as separate files:

```console
$ ls fragments
a.html b.html c.html
$ cat fragments/a.html
{{ samples/templates/fragments/a.html }}
```

You can then reference that `fragments` folder in a template to concatenate all those HTML fragments into the output:

```console
$ cat concat.ori
{{ @js/String samples/templates/concat.ori }}
$ ori concat.ori/
{{ @scope/invoke samples/templates, samples/templates/concat.ori }}
```

## Inlining the results of expressions

It may be useful to embed Origami expressions inside other kinds of files, such as .html files. You can evaluate such expressions with the built-in [@inline](/language/@inline.html) function.

For example, you can use this to inline resources such as stylesheets.

```console
$ cat inline.html
{{ @js/String samples/templates/inline.html }}$ cat inline.css
{{ @js/String samples/templates/inline.css }}$ ori @inline inline.html
{{ @scope/invoke samples/templates, @inline, samples/templates/inline.html }}
```

Here, the `inline.html` file is acting as an Origami template, but keeps the `.html` extension so that it can be otherwise treated as an HTML file.

If the input document contains any front matter (see below), @inline preserves this in the output.

## Traversing into data

Inside a template, you can use slash-separated paths to traverse into data.

```console
$ cat teamData.yaml
- name: Alice
  image: van.jpg
  location: Honolulu
  bio: After working as a manager for numerous startups over the years, I
    decided to take the plunge and start a business of my own.
…
$ cat teamLead.ori
{{ @js/String samples/templates/teamLead.ori }}$ ori teamLead.ori/
{{ @scope/invoke samples/templates, samples/templates/teamLead.ori }}
```

## Reference network resources

Since `https` and `http` URLs are valid Origami expressions, you can incorporate network content into a template’s output.

```console
$ cat net.ori
{{ @js/String samples/templates/net.ori }}$ ori net.ori/
This content came from graphorigami.org:
{{ samples/templates/net.txt }}
```

This includes being able to traverse into data from the network. A [teamData.yaml](samples/templates/teamData.yaml) file posted on the network can be referenced as an expression and then further traversed:

```console
$ cat netData.ori
{{ @js/String samples/templates/netData.ori }}$ ori netData.ori/
Bob lives in {{ samples/templates/teamData.yaml/1/location }}.
```

You can also obtain a data file from the network, treat it as a graph, and [map the graph to text](#map-graphs-to-text). This allows you to directly process network data into text in a template.

## Conditions

Use the built-in [@if](/language/@if.html) function to include text based on some condition.

The first argument to `@if` is a condition that is evaluated. If the result is truthy (not `false`, `null`, or `undefined`), the second argument to `@if` is included in the template’s text output. If the result is falsy and a third argument is provided, that third argument will be included in the output.

```console
$ cat condition.ori
{{ @js/String samples/templates/condition.ori }}
$ ori “condition.ori({ rating: 3 })”
{{ samples/templates/condition.ori({ rating: 3 }) }}
$ ori “condition.ori({})”
{{ samples/templates/condition.ori({}) }}
```

## Call your own JavaScript functions

Your template expressions can call any JavaScript in [scope](/language/scope.html) via the base of the JavaScript file name.

For example, if you have a file named `uppercase.js` in the same directory as the template, a template expression can reference that module's default export as `uppercase`:

```console
$ cat uppercase.js
export default (x) => x.toString().toUpperCase();
$ cat callJs.ori
Hello, \{{ uppercase("world") }}!
$ ori callJs.ori/
Hello, WORLD!
```

If the function you invoke is asynchronous, its result will be awaited before being incorporated into the text output.

## Calling another template as a function

One template can invoke another as a function. For example, if you create an overall site page template `page.ori`:

```
{{ @js/String samples/templates/page.ori }}
```

An individual page template like `contact.ori` can invoke `page.ori` as a function:

```
{{ @js/String samples/templates/contact.ori }}
```

Evaluating this will embed the contact page content inside the overall site page template:

```console
$ ori contact.ori/
{{ samples/templates/contact.ori/ }}
```

## Front matter

Both a template’s input document and the template itself can contain front matter in YAML or JSON format. The front matter values are added to the scope used to evaluate the template's expressions.

The following example defines a `title` value as front matter and then references that value in multiple expressions. This makes it easy to update the title in a single place and have that change reflected everywhere.

```console
$ cat front.ori

*** missing front matter ***

{{ @js/String samples/templates/front.ori }}
$ ori front.ori/
{{ samples/templates/front.ori/ }}
```

### Front matter expressions

Front matter can include Origami expressions via the `!ori` YAML tag, as discussed in [Origami expressions in YAML](/language/yaml.html). You can use this to calculate a value you want to reference multiple times in the template.

```console
$ cat blogPage.ori

*** missing front matter ***

{{ @js/String samples/templates/blogPost.ori }}
$ ori blogPost.ori posts/post1.html
{{ samples/templates/blogPost.ori samples/templates/posts/post1.html }}
```

### Template and input front matter

Both a template and an input document can define front matter. In cases where they both define the same key, the input's value for that key takes priority.

You can use this to have a template define a default, fallback value for a given key, such as a default HTML page title.

```console
$ ori blogPost.ori posts/post2.html
{{ samples/templates/blogPost.ori samples/templates/posts/post2.html }}
```

## Ambient properties available inside a template

Inside a template, additional _ambient properties_ are added to the scope in which the template's expressions are evaluated. These are generally prefixed with `@` to avoid conflict with properties in your data.

- `@input`: the input object passed to the template; see [Reference input](#reference-input).
- `@template`: a reference to properties of the current template; see below.
- `@text`: the input object as a text string. If the input object has front matter, this contains only the input's body text without the front matter.
- `.` (a single period): a shorthand for `@input`.

The `@template` property itself has the following sub-properties:

- `graph`: the data in the template's front matter
- `recurse`: a reference to the template itself as a function. You can use this to recursively call a template, such as one that renders hierarchical data as text.
- `scope`: the scope used to create the template.
- `text`: the body text of the template.

## Map graphs to text

It’s common to have a template generate some fragment of text for each value in a graph: an array, a set, a folder, etc. In Origami templates, this is done by mapping the graph’s values to text with the built-in [@map/values](/language/@map.html#values) function.

```console
$ cat teamData.yaml
{{ samples/templates/teamData.yaml }}
$ cat teamList.ori
{{ @js/String samples/templates/teamList.ori }}
$ ori teamList.ori/
{{ samples/templates/teamList.ori/ }}
```

The `teamList.ori` file defines an outer template that includes an `<ul>` tag. Inside that, a substitution calling `@map/values` appears, which maps the array of people in `teamData.yaml` to a set of HTML fragments using a nested template with an `<li>` tag.

### How maps work

Graph Origami templates don't treat such maps specially. Rather, the `@map/values` function is returning a graph of HTML fragments that are concatenated into the text output.

In the above example, the `@map/values` function maps an array of people to HTML fragments. The transformation can be visualized like this:

<div class="sideBySide">
  <figure>
    {{ svg [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Carol" }
    ] }}
  </figure>
  <figure>
    {{ svg @map/values samples/templates/teamData.yaml, =`<li>{{ name }}</li>` }}
  </figure>
  <figcaption>Source graph of people objects</figcaption>
  <figcaption>Result graph of HTML fragments</figcaption>
</div>

Per the discussion in [Reference graphs](#Reference-graphs), the template concatenates the HTML fragments into the text output.

### Reference the key for a value

**_ Define title for all posts? What about showing default values? _**

When mapping a graph (like a folder) to text, you can obtain the key (like a file name) via the ambient `@key` property.

Suppose you have a folder holding some files:

```console
$ ls posts
post1.html post2.html
```

You can create an index page that links to these files using the ambient `@key` property. This lets a link reference a file's specific file name in the `href` attribute.

```console
$ cat blogIndex.ori
{{ @js/String samples/templates/blogIndex.ori }}
$ ori blogIndex.ori/
{{ samples/templates/blogIndex.ori/ }}
```
