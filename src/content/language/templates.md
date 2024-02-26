---
title: Origami templates
subtitle: Transform data and files to text
---

Origami templates let you convert turn data into HTML or other text documents through expressions embedded in text.

- These templates work directly on a wide range of data types, including file system folders or network resources.
- Templates have a very small number of fundamental features that can be combined to address a wide range of scenarios.
- You can extend what's possible in a template expression in JavaScript with essentially no configuration.

_You can use Origami with other template systems, but the small degree of integration code required is currently beyond the scope of this documentation._

## Template files

An Origami template file is an Origami file (a text file with a `.ori` extension) defining an [Origami expressions](/language/syntax.html) that either evaluates to a text string or to a function that returns text.

The most common type of Origami template is a file that defines a template literal using an = equals sign and backtick characters. Inside the backticks, placeholders marked with `\{{`and`}}` curly braces contain additional Origami expressions whose results are included in the final text:

```console
$ cat greet.ori
{{ samples.ori/templates/greet.ori }}
```

You can evaluate a template in the context of data, such as an object defined in a data file.

```console
$ cat alice.yaml
{{ samples.ori/templates/alice.yaml }}
$ ori "greet.ori(alice.yaml)"
{{ samples.ori/templates/greet.ori(samples.ori/templates/alice.yaml) }}
```

## Reference input

When you invoke a template as a function, you can refer to the template's input using an underscore (`_`).

```console
$ cat heading.ori
{{ samples.ori/templates/heading.ori }}$ ori "heading.ori('About Us')"
{{ samples.ori/templates/heading.ori('About Us') }}
```

## Reference local files

You can reference local files in Origami expressions. Depending on the situation, you may not have to pass any arguments to the template — it may be able obtain whatever it needs from its file system context.

```console
$ cat fileRef.ori
{{ samples.ori/templates/fileRef.ori }}$ cat copyright.txt
{{ samples.ori/templates/copyright.txt }}
$ ori "fileRef.ori()"
{{ samples.ori/templates/fileRef.ori() }}
```

In cases like this, where the template does not require any argument, you can avoid the need to quote parentheses by invoking the template using slash syntax:

```console
$ ori fileRef.ori/
{{ samples.ori/templates/fileRef.ori/ }}
```

## Reference trees

If a template expression results in a tree such as a folder or hierarchical data, Origami will collect the deep values of that tree, convert them to strings, then concatenate them.

```console
$ cat greetings.yaml
{{ samples.ori/templates/greetings.yaml }}
$ cat flatten.ori
{{ samples.ori/templates/flatten.ori }}
$ ori flatten.ori/
{{ samples.ori/templates/flatten.ori/ }}
```

This feature forms the basis for more complex ones (like maps, below), but one basic use for it is to inline a set of files. For example, you might create a folder that contains a collection of HTML fragments as separate files:

```console
$ ls fragments
a.html b.html c.html
$ cat fragments/a.html
{{ samples.ori/templates/fragments/a.html }}
```

You can then reference that `fragments` folder in a template to concatenate all those HTML fragments into the output:

```console
$ cat concat.ori
{{ samples.ori/templates/concat.ori }}
$ ori concat.ori/
{{ samples.ori/templates/concat.ori/ }}
```

## Use template expressions in any file type

It may be useful to embed Origami expressions inside other kinds of files, such as .html files. You can evaluate such expressions with the built-in [@inline](/builtins/@inline.html) function.

For example, you can use this to inline resources such as stylesheets.

```console
$ cat inline.html
{{ samples.ori/templates/inline.html }}$ cat inline.css
{{ samples.ori/templates/inline.css }}$ ori @inline inline.html
{{ @inline samples.ori/templates/inline.html }}
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
{{ samples.ori/templates/teamLead.ori }}$ ori teamLead.ori/
{{ samples.ori/templates/teamLead.ori/ }}
```

## Reference network resources

Since `https` and `http` URLs are valid Origami expressions, you can incorporate network content into a template’s output.

```console
$ cat net.ori
{{ samples.ori/templates/net.ori }}$ ori net.ori/
This content came from weborigami.org:
{{ samples.ori/templates/net.txt }}
```

This includes being able to traverse into data from the network. A [teamData.yaml](samples/templates/teamData.yaml) file posted on the network can be referenced as an expression and then further traversed:

```console
$ cat netData.ori
{{ samples.ori/templates/netData.ori }}$ ori netData.ori/
Bob lives in {{ samples.ori/templates/teamData.yaml/1/location }}.
```

You can also obtain a data file from the network, treat it as a tree, and [map the tree to text](#map-trees-to-text). This allows you to directly process network data into text in a template.

## Conditions

Use the built-in [@if](/builtins/@if.html) function to include text based on some condition.

The first argument to `@if` is a condition that is evaluated. If the result is truthy (not `false`, `null`, or `undefined`), the second argument to `@if` is included in the template’s text output. If the result is falsy and a third argument is provided, that third argument will be included in the output.

```console
$ cat condition.ori
{{ samples.ori/templates/condition.ori }}
$ ori “condition.ori({ rating: 3 })”
{{ samples.ori/templates/condition.ori({ rating: 3 }) }}
$ ori “condition.ori({})”
{{ samples.ori/templates/condition.ori({}) }}
```

## Call your own JavaScript functions

Your template expressions can call any JavaScript in [scope](/language/scope.html) via the base of the JavaScript file name.

For example, if you have a file named `uppercase.js` in the same directory as the template, a template expression can reference that module's default export as `uppercase`:

```console
$ cat uppercase.js
{{ samples.ori/templates/uppercase.js }}
$ cat callJs.ori
{{ samples.ori/templates/callJs.ori }}
$ ori callJs.ori/
{{ samples.ori/templates/callJs.ori/ }}
```

If the function you invoke is asynchronous, its result will be awaited before being incorporated into the text output.

## Call another template as a function

One template can invoke another as a function.

We can define a template `stars.ori` as a component that displays a star rating:

```console
$ cat stars.ori
{{ samples.ori/templates/stars.ori }}
```

This template repeats a ★ star character for the number of times defined in in the input value. For example, you can directly invoke and test this template, passing in a value of 3:

```console
$ ori "stars.ori(3)"
{{ samples.ori/templates/stars.ori(3) }}
```

This `stars.ori` template defines a function that you can invoke inside expressions in other templates:

```console
$ cat review.ori
{{ samples.ori/templates/review.ori }}
$ ori review.ori/
{{ samples.ori/templates/review.ori/ }}
```

This technique can let you define components in plain HTML and CSS.

## Wrap one template with another

Another application of invoking a template as a function is to wrap the output of one template inside another. For example, you can create an overall page template for a site called `page.ori`:

```console
$ cat page.ori
{{ samples.ori/templates/page.ori }}
```

A template for a specific type of page, like a `contact.ori` template for a Contact Us page, can invoke `page.ori` as a function:

```console
$ cat contact.ori
{{ samples.ori/templates/contact.ori }}
```

Evaluating the contact page template passes its HTML fragment to the overall site page template:

```console
$ ori contact.ori/
{{ samples.ori/templates/contact.ori/ }}
```

### Processing input front matter

An input document can define front matter.

Both a template’s input document and the template itself can contain front matter in YAML or JSON format. The front matter is delineated with both a leading and trailing line of three hyphens (`---`), like so:

Example: a blog post can be stored as a markdown file with front matter that defines a `title` property.

```console
$ cat posts/post1.html
{{ samples.ori/templates/posts/post1.html }}
```

And a template can then reference this `title` property. Here the template uses the [@or](/builtins/@or.html) function to provide a default title if the input document has no `title`.

```console
$ can blogPost.ori
{{ samples.ori/templates/blogPost.ori }}
```

Applying the template the blog post includes the document's `title` property as desired:

```console
$ ori blogPost.ori posts/post1.html
{{ samples.ori/templates/blogPost.ori samples.ori/templates/posts/post1.html }}
```

## Map trees to text

It’s common to have a template generate some fragment of text for each value in a tree: an array, a set, a folder, etc.
You can handle such cases in Origami templates by calling the built-in [@map](/builtins/@map.html#values) function to map a tree’s values to text.

```console
$ cat teamData.yaml
{{ samples.ori/templates/teamData.yaml }}
$ cat teamList.ori
{{ samples.ori/templates/teamList.ori }}
$ ori teamList.ori/
{{ samples.ori/templates/teamList.ori/ }}
```

The `teamList.ori` file defines an outer template that includes an `<ul>` tag. Inside that, a substitution calling `@map` appears, which maps the array of people in `teamData.yaml` to a set of HTML fragments using a nested template with an `<li>` tag.

### How maps work

Origami templates don't treat such maps specially. Rather, the `@map` function is returning a tree of HTML fragments that are concatenated into the text output.

In the above example, the `@map` function maps an array of people to HTML fragments. The transformation can be visualized like this:

<div class="sideBySide">
  <figure>
    {{ svg.js [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Carol" }
    ] }}
  </figure>
  <figure>
    {{ svg.js @map(samples.ori/templates/teamData.yaml, =`<li>{{ _/name }}</li>`) }}
  </figure>
  <figcaption>Source tree of people objects</figcaption>
  <figcaption>Result tree of HTML fragments</figcaption>
</div>

Per the discussion in [Reference trees](#Reference-trees), the template concatenates the HTML fragments into the text output.

### Reference the key for a value

When mapping a tree (like a folder) to text, you can obtain the key (like a file name) via the ambient `@key` property.

Suppose you have a folder holding some files:

```console
$ ls posts
post1.html post2.html
```

You can create an index page that links to these files using the ambient `@key` property. This lets a link reference a file's specific file name in the `href` attribute.

```console
$ cat blogIndex.ori
{{ samples.ori/templates/blogIndex.ori }}
```

This index page template defines a default `title` property to use if a page omits a title; see [template and input front matter](#template-and-input-front-matter) above.

Evaluating this template produces a list of links to each post, with each `href` attribute referencing the appropriate file:

```console
$ ori blogIndex.ori posts
{{ samples.ori/templates/blogIndex.ori samples.ori/templates/posts }}
```

### Using named parameters

As noted, you can reference the value being mapped as an `_` underscore and the key being mapped as `@key`. You can also define your own parameter names that are more meaningful to your specific situation.

For example, you can rewrite the blog example above:

```console
$ ori blogIndex2.ori
{{ samples.ori/templates/blogIndex2.ori }}
$ ori blogIndex2.ori/
{{ samples.ori/templates/blogIndex2.ori/ }}
```
