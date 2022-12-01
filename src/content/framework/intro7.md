---
title: Templates turn graphs into text
template:
  - <h1>
  - \{\{ title }}
  - </h1>
application:
  - <h1>
  - Our Amazing Team
  - <h1>
---

Until now you've mostly been creating trivial demonstration content, but now let's begin working on a real top-level index page for your About Us site. For this, you'll use an HTML template system.

Many JavaScript template engines exist that let you turn data into text output like HTML. Because Graph Origami formulas can call JavaScript, you can call any of those systems from formulas.

You also have the option of using the template system built into Graph Origami. That system combines the ideas you've already seen — graphs, formulas, scope — to produce a small but powerful template language.

## Create an index page template

Let's create a template to use for your `index.html` page. This template file itself won't be part of the final site, so you can put it in the `src` folder, where it will be in scope but not visible to users.

<span class="tutorialStep"></span> In the `src` folder, create a new file called `index.ori`. The `.ori` extension indicates an Origami template. Enter the following text into the file:

```html
<h1>About Us</h1>
```

## Templates are functions

Now you'll need to tell Graph Origami to use this template to create the index page. You can do this by invoking the template as a function.

<span class="tutorialStep"></span> In `+.yaml`, update the formula for `index.html` and its comment:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page obtained by invoking the index.ori template
index.html = index.ori():
```

The new formula specifies that, if someone asks for `index.html`, then the `index.ori` template should be invoked as a function. This particular template will ask for the data it wants, so you don't need to supply any function arguments.

<span class="tutorialStep"></span> Navigate to `index.html` to see the heading "<strong>About Us</strong>".

## Use Origami expressions in template placeholders

Now that you've created a template for the index page, you can have it show some data.

<span class="tutorialStep"></span> Update `index.ori` to:

```
<h1>\{\{ title }}</h1>
```

The double curly braces `{{…}}` create a placeholder in the template that will be populated with dynamic content at the time the template function is invoked. The content inside those curly braces can be any Origami expression — the same expressions you can use in formulas in `+.yaml`.

<span class="tutorialStep"></span> Refresh `index.html` to see the site title as a heading.

## Template expressions use graph scope

Origami templates used the same graph scope system discussed earlier. When you invoke an Origami template as a function in an expression like `index.ori()`, the template uses the same scope that was available to that formula. In this case, it means that, inside the template, the `title` is in scope, and will resolve to the value you've defined for it in `+.yaml`.

This means you can pull anything your template can "see" in scope into the template's output.

<span class="tutorialStep"></span> As a demonstration, update `index.ori` to:

```
<h1>\{\{ title }}</h1>
<pre>\{\{ README.md }}</pre>
```

This pulls in the contents of the project's `README.md` file, which is in scope, into the final HTML. The Origami expression is acting like an "include" directive in other programming languages. Here, pulling unprocessed markdown content into an HTML page is not particularly interesting, but just shows that you can pull in anything that can be described with an Origami expression.

Examples of Origami expressions you can use in an Origami template:

```
\{\{ greet('world') }}
\{\{ greet(team.yaml/0/name) }}
\{\{ team.yaml }}
\{\{ https://example.com }}
```

As shown in the last example, an https/http URL is also a valid Origami expression. This will cause the page to take a moment to render as the contents of the URL are fetched, but then the contents of that page are incorporated into the template at that point. This will have the side effect of changing the page styles — it's not confining the page to a frame, but injecting the complete HTML for that page into your site's index page.

Again, these specific examples just make the point that you can inject anything into a template result, including resources from elsewhere.

## Template are functions that transform graphs

One thing that makes Origami templates special is they are just another example of a graph. You can consider the application of a template itself as a graph transformation.

Imagine that a template like `<h1>\{\{title}}</h1>` is an array:

```yaml
- <h1>
- \{\{ title }}
- </h1>
```

The first and last items in this array are boilerplate strings holding HTML; the middle element is a placeholder containing an Origami expression. As with other arrays, you can visualize this array as a graph:

<figure>
{{ svg template }}
</figure>

When you invoke this template as a function, you transform the array graph into a new graph. Boilerplate strings in the source graph are carried over as is, while expressions in placeholders are evaluated in the current scope. This results in a new graph of strings:

<div class="sideBySide">
  <figure>
    {{ svg template }}
  </figure>
  <figure>
    {{ svg application }}
  </figure>
  <figcaption>Graph for a template…</figcaption>
  <figcaption>…maps to graph of plain strings</figcaption>
</div>

Origami collects the "leaf nodes" — all the text at the periphery of the graph — to produce the template's result:

```
<h1>Our Amazing Team</h1>
```

In the parlance of computer science, applying a Graph Origami template is a type of _map-reduce_ operation that maps a template graph, in the context of a data graph, to a graph of text, then reduces that to a single block of text as the final result.

Treating template application as a graph transformation results in a flexible templating system that can be extended in interesting ways.

## Expressions that return graphs

Any template expression that results in a graph will have that graph's values concatenated into the final result.

<span class="tutorialStep"></span> Update `index.ori` to:

```
<h1>\{\{ title }}</h1>
\{\{ graph(team.yaml) }}
```

The `team.yaml` file is a text file in YAML format, so if you include `team.yaml` directly, the contents of that text file are inserted into the final text. The `graph()` function instructs Graph Origami to explicitly treat that YAML data as a graph.

```html
<h1>Our Amazing Team</h1>
{{ graph(framework-intro/src/public/team.yaml) }}
```

Here, all the data values in `team.yaml` are concatenated and incorporated into the final text. That's much more data than you want to show, but it's a small step towards what you actually want: to display a list of the team members on this index page.

To do that, you'll want the template to transform that graph of team data into a more selective and interesting graph of HTML.

&nbsp;

Next: [Transforms](intro8.html) »
