---
title: Origami templates
subtitle: Transform data to text
---

Graph Origami templates let you convert turn data into HTML or other text documents through expressions embedded in text.

- These templates work directly on a wide range of data types, including file system folders or network resources.
- Templates have a very small number of fundamental features that can be combined to address a wide range of scenarios.
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
{{ samples/templates/heading.ori }}$ ori "heading.ori('Contact')"
{{ samples/templates/heading.ori('Contact') }}
```

If you specifically want to treat the input as text, you can use the expression `@text`.

## Reference individual files

You can reference local files in Origami expressions. Depending on the situation, you may not have to pass any arguments to the template — it may be able obtain whatever it needs from its file system context.

```console
$ cat fileRef.ori
{{ samples/templates/fileRef.ori }}$ cat copyright.txt
{{ samples/templates/copyright.txt }}
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
{{ samples/templates/flatten.ori }}
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
{{ samples/templates/concat.ori }}
$ ori concat.ori/
{{ @scope/invoke samples/templates, samples/templates/concat.ori }}
```

## Use template expressions in any file type

It may be useful to embed Origami expressions inside other kinds of files, such as .html files. You can evaluate such expressions with the built-in [@inline](/language/@inline.html) function.

For example, you can use this to inline resources such as stylesheets.

```console
$ cat inline.html
{{ samples/templates/inline.html }}$ cat inline.css
{{ samples/templates/inline.css }}$ ori @inline inline.html
{{ @scope/invoke samples/templates, @inline, samples/templates/inline.html }}
```

Here, the `inline.html` file is acting as an Origami template, but keeps the `.html` extension so that it can be otherwise treated as an HTML file.

If the input document contains any front matter (see below), @inline preserves this in the output.

## Traverse into data

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
{{ samples/templates/teamLead.ori }}$ ori teamLead.ori/
{{ @scope/invoke samples/templates, samples/templates/teamLead.ori }}
```

## Reference network resources

Since `https` and `http` URLs are valid Origami expressions, you can incorporate network content into a template’s output.

```console
$ cat net.ori
{{ samples/templates/net.ori }}$ ori net.ori/
This content came from graphorigami.org:
{{ samples/templates/net.txt }}
```

This includes being able to traverse into data from the network. A [teamData.yaml](samples/templates/teamData.yaml) file posted on the network can be referenced as an expression and then further traversed:

```console
$ cat netData.ori
{{ samples/templates/netData.ori }}$ ori netData.ori/
Bob lives in {{ samples/templates/teamData.yaml/1/location }}.
```

You can also obtain a data file from the network, treat it as a graph, and [map the graph to text](#map-graphs-to-text). This allows you to directly process network data into text in a template.

## Conditions

Use the built-in [@if](/language/@if.html) function to include text based on some condition.

The first argument to `@if` is a condition that is evaluated. If the result is truthy (not `false`, `null`, or `undefined`), the second argument to `@if` is included in the template’s text output. If the result is falsy and a third argument is provided, that third argument will be included in the output.

```console
$ cat condition.ori
{{ samples/templates/condition.ori }}
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

## Call another template as a function

One template can invoke another as a function.

We can define a template `stars.ori` as a component that displays a star rating:

```console
$ cat stars.ori
{{ samples/templates/stars.ori }}
```

This template repeats a ★ star character for the number of times defined in a `count` value somewhere in scope. For example, you can directly invoke and test this template, passing in a `count` value:

```console
$ ori "stars.ori({ count: 3 })"
{{ samples/templates/stars.ori { count: 3 } }}
```

This `stars.ori` template defines a function that you can invoke inside expressions in other templates:

```console
$ cat review.ori
{{ samples/templates/review.ori }}
$ ori review.ori/
{{ samples/templates/review.ori/ }}
```

This technique can let you define components in plain HTML and CSS.

## Wrap one template with another

Another application of invoking a template as a function is to wrap the output of one template inside another. For example, you can create an overall page template for a site called `page.ori`:

```console
$ cat page.ori
{{ samples/templates/page.ori }}
```

A template for a specific type of page, like a `contact.ori` template for a Contact Us page, can invoke `page.ori` as a function:

```console
$ cat contact.ori
{{ samples/templates/contact.ori }}
```

Evaluating this embeds the contact page template, then passes its content to the overall site page template:

```console
$ ori contact.ori/
{{ samples/templates/contact.ori/ }}
```

## Front matter

Both a template’s input document and the template itself can contain front matter in YAML or JSON format. The front matter is delineated with both a leading and trailing line of three hyphens (`---`), like so:

```console
$ cat front.ori
{{ samples/templates/front.ori }}
```

This template defines a `title` value as front matter and then references that value in multiple expressions. This makes it easy to update the title in a single place and have that change reflected everywhere. The front matter values are added to the scope used to evaluate the template's expressions, so the `\{\{title}}` references in the template body will find the title value.

Invoking this template performs the title substitutions:

```console
$ ori front.ori/
{{ samples/templates/front.ori/ }}
```

### Front matter expressions

Front matter can include Origami expressions via the `!ori` YAML tag, as discussed in [Origami expressions in YAML](/language/yaml.html). You can use this to calculate a value you want to reference multiple times in the template.

```console
$ cat banner.ori
{{ samples/templates/banner.ori }}
$ ori banner.ori/
{{ samples/templates/banner.ori/ }}
```

### Template and input front matter

Both a template and an input document can define front matter. In cases where they both define the same key, the input's value for that key takes priority.

Among other things, you can use this to have a template define a default, fallback value for a given key. A blog post template can define a default `title`:

```console
$ ori blogPost.ori
{{ samples/templates/blogPost.ori }}
```

If a blog post defines a `title`, that title is preferred:

```console
$ cat posts/post1.html
{{ samples/templates/posts/post1.html }}
$ ori blogPost.ori posts/post1.html
{{ samples/templates/blogPost.ori samples/templates/posts/post1.html }}
```

But if a post fails to define a `title`, the template's default `title` is used:

```console
$ cat posts/post2.html
{{ samples/templates/posts/post2.html }}
$ ori blogPost.ori posts/post2.html
{{ samples/templates/blogPost.ori samples/templates/posts/post2.html }}
```

## Ambient properties available inside a template

Inside a template, additional ambient properties are added to the scope in which the template's expressions are evaluated. These are generally prefixed with `@` to avoid conflict with properties in your data.

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

It’s common to have a template generate some fragment of text for each value in a graph: an array, a set, a folder, etc.
You can handle such cases in Graph Origami templates by calling the built-in [@map/values](/language/@map.html#values) function to map a graph’s values to text.

```console
$ cat teamData.yaml
{{ samples/templates/teamData.yaml }}
$ cat teamList.ori
{{ samples/templates/teamList.ori }}
$ ori teamList.ori/
{{ samples/templates/teamList.ori/ }}
```

The `teamList.ori` file defines an outer template that includes an `<ul>` tag. Inside that, a substitution calling `@map/values` appears, which maps the array of people in `teamData.yaml` to a set of HTML fragments using a nested template with an `<li>` tag.

### How maps work

Graph Origami templates don't treat such maps specially. Rather, the `@map/values` function is returning a graph of HTML fragments that are concatenated into the text output.

In the above example, the `@map/values` function maps an array of people to HTML fragments. The transformation can be visualized like this:

<div class="sideBySide">
  <figure>
    {{ svg.js [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Carol" }
    ] }}
  </figure>
  <figure>
    {{ svg.js @map/values samples/templates/teamData.yaml, =`<li>{{ name }}</li>` }}
  </figure>
  <figcaption>Source graph of people objects</figcaption>
  <figcaption>Result graph of HTML fragments</figcaption>
</div>

Per the discussion in [Reference graphs](#Reference-graphs), the template concatenates the HTML fragments into the text output.

### Reference the key for a value

When mapping a graph (like a folder) to text, you can obtain the key (like a file name) via the ambient `@key` property.

Suppose you have a folder holding some files:

```console
$ ls posts
post1.html post2.html
```

You can create an index page that links to these files using the ambient `@key` property. This lets a link reference a file's specific file name in the `href` attribute.

```console
$ cat blogIndex.ori
{{ samples/templates/blogIndex.ori }}
```

This index page template defines a default `title` property to use if a page omits a title; see [template and input front matter](#template-and-input-front-matter) above.

Evaluating this template produces a list of links to each post, with each `href` attribute referencing the appropriate file:

```console
$ ori blogIndex.ori/
{{ samples/templates/blogIndex.ori/ }}
```
