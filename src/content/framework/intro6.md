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

Until now we've mostly been creating trivial virtual content, but now let's start creating the top-level index page for the About Us site. For this, we'll use an HTML template system.

Many JavaScript template engines exist that let you turn data into text output like HTML. Because Graph Origami formulas can call JavaScript, you can call any of those systems from formulas.

You also have the option of using the template system built into Graph Origami. That system combines the ideas you've already seen — explorable graphs, formulas, scope — to produce an extremely powerful and concise template language.

## Create an index page template

Let's begin producing an index page by creating a template file for it.

<span class="tutorialStep"></span> In the `src` folder, create a new file called `index.ori`. The `.ori` extension indicates an Origami template. Enter the following text into the file:

```html
<h1>About Us</h1>
```

## Templates are functions

Now you'll need to tell Graph Origami to use this template to create the index page. You can do this by invoking the template as a function.

<span class="tutorialStep"></span> Add a new line to `+stuff.yaml`:

```yaml
title: Our Amazing Team
hello.html = greet(team.yaml/0/name):
index.html = index.ori():
```

The new formula specifies that, if someone asks for `index.html`, then the `index.ori` template should be invoked as a function. This particular template will ask for the data it wants, so you don't need to supply any argument to it.

You should now be able to visit `index.html` in the served site.

Tip: While the new index page will be more presentable, it can still be useful to view the previous default index page that listed real and virtual files. If you ever want to return that listing, navigate to the hidden route at `src/.index` (note the period). This virtual route is provided by the Origami server as a diagnostic tool so you can browse the virtual graph you're creating.

## Use Origami expressions in template placeholders

Let's begin using some data in this template.

<span class="tutorialStep"></span> Update `index.ori` to:

```
<h1>\{\{ title }}</h1>
```

The double curly braces `{{…}}` demarcate a placeholder in the template that will be populated with dynamic content at the time the template function is invoked. The content inside those curly braces can be any Origami expression — the exact same expressions supported in metagraph additions like `+stuff.yaml`.

<span class="tutorialStep"></span> Navigate to `public` or `public/index.html` in the browser to see an index page, with the site title as a heading.

## Template expressions use graph scope

Origami templates used the same graph scope system discussed earlier. When you invoke an Origami template as a function in a formula like `index.html = index.ori()`, the template uses the same scope that was available to that formula. In this case, it means that the `title` is in scope, and will resolve to whatever value you've defined for it in `+stuff.yaml`, like "Our Amazing Team".

This means that anything your template can "see" in scope can be pulled into the template with an expression.

<span class="tutorialStep"></span> As an example, update `index.ori` to:

```
<h1>\{\{ title }}</h1>
<pre>\{\{ README.md }}</pre>
```

This pulls in the contents of the project's `README.md` file, which is in scope, into the final HTML. In this case, the Origami expression is acting like an "include" directive in other programming languages. That's helpful, but the facility is extremely general, as you can pull in anything that can be described with an Origami expression.

All of the following Origami expressions can be used in an Origami template:

```
\{\{ greet('world') }}
\{\{ greet(team.yaml/0/name) }}
\{\{ team.yaml }}
\{\{ https://example.com }}
```

We haven't seen the last example before now, but an https/http URL is also a valid Origami expression. This will cause the page to take a moment to render as the contents of the URL are fetched, but then the contents of that page are incorporated into the template at that point.

## Template are functions that transform graphs

One thing that makes Origami templates special is they are just another example of a graph. You can consider the application of a template itself as a graph transformation.

You can consider the template like `<h1>\{\{title}}</h1>` as an array:

```\yaml
{{ yaml template }}
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

To get the final result of the template, Origami performs a depth-first traversal of the string graph, and returns the concatenation of all the values at the periphery of the graph (the "leaf nodes"). This produces the result:

```
<h1>Our Amazing Team</h1>
```

Treating template application as a graph transformation results in a flexible templating system that can be extended in interesting ways.

## Expressions that return graphs

The logical extension of the above section is that any template expression that results in a graph will have that graph's values concatenated into the final result.

<span class="tutorialStep"></span> Update `index.ori` to:

```
<h1>\{\{ title }}</h1>
\{\{ graph(team.yaml) }}
```

The `team.yaml` file is a text file in YAML format, so if you include `team.yaml` directly, the contents of that text file are inserted into the final text. The `graph()` function instructs Graph Origami to explicitly treat that YAML data as a graph.

```html
<h1>Our Amazing Team</h1>
{{ graph(framework-intro/team.yaml) }}
```

Here, all the data values in `team.yaml` are concatenated and incorporated into the final text. That itself isn't particularly useful — yet — but is a step towards what we actually want: to display a list of the team members on this index page.

To do that, we'll want the template to transform that graph of team data into a more interesting graph of HTML.

&nbsp;

Next: [Transforms](intro7.html) »
