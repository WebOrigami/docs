---
title: Origami templates
subtitle: Transform data and files to text
---

Origami templates let you convert turn data into HTML or other text documents through expressions embedded in text.

- These templates work directly on a wide range of data types, including file system folders or network resources.
- Templates have a very small number of fundamental features that can be combined to address a wide range of scenarios.
- You can extend what's possible in a template expression in JavaScript with essentially no configuration.

You can also use Origami with other template systems. For a reference example, see the [Origami Handlebars extension](https://github.com/WebOrigami/extensions/tree/main/handlebars) that defines a handler for [Handlebars](https://handlebarsjs.com) templates.

## Template files

An Origami template file is an Origami file (a text file with a `.ori` extension) defining an [Origami expressions](/language/syntax.html) that either evaluates to a text string or to a function that returns text.

Origami templates come in two forms.

### Shorthand form

In the shorthand form, you define an Origami template literal using an `=` equals sign and backtick characters. Inside the backticks, placeholders marked with `\$\{ }` contain additional Origami expressions whose results are included in the final text:

```ori
// greet.ori
${ samples.ori/templates/greet.ori }
```

The `_` underscore represents the template's input, so the expression `_/name` will get the `name` property of any object passed to the template:

```${"yaml"}
# alice.yaml
${ samples.ori/templates/alice.yaml }
```

```console
$ ori "greet.ori(alice.yaml)"
${ samples.ori/templates/greet.ori(samples.ori/templates/alice.yaml) }
```

### Long form with named parameters

You can also define templates with a longer form in which you name the parameters to the template. This form begins with a list of named parameters in parentheses, and uses `=>` instead of a plain `=` equals sign:

```ori
// heading.ori
${ samples.ori/templates/heading.ori }
```

```console
$ ori "heading.ori('About Us')"
${ samples.ori/templates/heading.ori('About Us') }
```

Here, the `text` parameter will have whatever value is passed to the template.

Naming the parameter can help you document the template's expected input. This also allows you to define multiple parameters.

## Reference local files

You can reference local files in Origami expressions. Depending on the situation, you may not have to pass any arguments to the template — it may be able obtain whatever it needs from its file system context.

If `copyright.txt` contains:

```
${ samples.ori/templates/copyright.txt }
```

Then an Origami template can reference that local file directly:

```ori
// fileRef.ori
${ samples.ori/templates/fileRef.ori }
```

Invoking the template will inline that file:

```console
$ ori "fileRef.ori()"
${ samples.ori/templates/fileRef.ori() }
```

In cases like this, where the template does not require any argument, in the command line you can avoid the need to quote parentheses by invoking the template with a trailing slash:

```console
$ ori fileRef.ori/
${ samples.ori/templates/fileRef.ori() }
```

## Reference trees

If a template expression results in a tree such as a folder or hierarchical data, Origami will collect the deep values of that tree, convert them to strings, then concatenate them.

```yaml
# greetings.yaml
${ samples.ori/templates/greetings.yaml }
```

```ori
// flatten.ori
${ samples.ori/templates/flatten.ori }
```

```console
$ ori flatten.ori/
${ samples.ori/templates/flatten.ori/ }
```

This feature forms the basis for more complex ones (like maps, below), but one basic use for it is to inline a set of files. For example, you might create a folder that contains a collection of HTML fragments as separate files:

```console
$ ls fragments
a.html b.html c.html
$ cat fragments/a.html
${ samples.ori/templates/fragments/a.html }
```

You can then reference that `fragments` folder in a template to concatenate all those HTML fragments into the output:

```ori
// concat.ori
${ samples.ori/templates/concat.ori }
```

```console
$ ori concat.ori/
${ samples.ori/templates/concat.ori() }
```

## Use template expressions in any file type

It may be useful to embed Origami expressions inside other kinds of files, such as .html files. You can evaluate such expressions with the built-in [`inline`](/builtins/text/inline.html) function.

For example, you can use this to inline resources such as stylesheets.

```html
<!-- inline.html -->
${ samples.ori/templates/inline.html }
```

```css
/* inline.css */
${ samples.ori/templates/inline.css }
```

```console
$ ori inline inline.html
${ inline samples.ori/templates/inline.html }
```

Here, the `inline.html` file is acting as an Origami template, but keeps the `.html` extension so that it can be otherwise treated as an HTML file.

If the input document contains any front matter (see below), inline preserves this in the output.

## Template documents

To facilitate inlining, you can also define Origami _template documents_. These are files identified with multiple extensions, where the second-to-last extension is `.ori`, like `index.ori.html` or `about.ori.md`.

When you ask Origami to evaluate such a file, it will implicitly inline the results of any Origami expressions inside the file.

This means you can rename the above `inline.html` file to `inline.ori.html`:

```html
<!-- inline.ori.html -->
${ samples.ori/templates/inline.html }
```

and then evaluate that file:

```console
$ ori inline.ori.html/
${ samples.ori/templates/inline.ori.html() }
```

A template document can be called as a function with up to one argument. Inside the document, use a `_` underscore to refer to the single argument.

```html
<!-- bold.ori.html -->
${ samples.ori/templates/bold.ori.html }
```

```console
$ ori "bold.ori.html('Hooray')"
${ samples.ori/templates/bold.ori.html("Hooray") }
```

Substitutions inside a template document are full Origami expressions so, among other things, they can reference other template documents.

## Traverse into data

Inside a template, you can use slash-separated paths to traverse into data.

```yaml
# teamData.yaml
- name: Alice
  image: van.jpg
  location: Honolulu
  bio: After working as a manager for numerous startups over the years, I
    decided to take the plunge and start a business of my own.
```

```ori
// teamLead.ori
${ samples.ori/templates/teamLead.ori }
```

```console
$ ori teamLead.ori/
${ samples.ori/templates/teamLead.ori/ }
```

## Reference network resources

Since `https` and `http` URLs are valid Origami expressions, you can incorporate network content into a template’s output.

```ori
// net.ori
${ samples.ori/templates/net.ori }
```

```console
$ ori net.ori/
This content came from weborigami.org:
${ samples.ori/templates/net.txt }
```

This includes being able to traverse into data from the network. A [teamData.yaml](samples/templates/teamData.yaml) file posted on the network can be referenced as an expression and then further traversed:

```ori
// netData.ori
${ samples.ori/templates/netData.ori }
```

```console
$ ori netData.ori/
Bob lives in ${ samples.ori/templates/teamData.yaml/1/location }.
```

You can also obtain a data file from the network, treat it as a tree, and [map the tree to text](#map-trees-to-text). This allows you to directly process network data into text in a template.

## Conditions

If your template should output one thing or another depending on a condition, you can use the conditional operator.The general form looks like:

```
<condition> ? <result if true> : <result if false>
```

The condition will be evaluated and the appropriate result will be returned.

For example, this template accepts a `input` argument that may or may not have a `rating` property. The template uses the conditional operator.

```ori
// condition.ori
${ samples.ori/templates/condition.ori }
```

If the `input` does have a rating, the template shows the rating, otherwise it shows "Not yet rated".

```console
$ ori “condition.ori({ rating: 3 })”
${ samples.ori/templates/condition.ori({ rating: 3 }) }
$ ori “condition.ori({})”
${ samples.ori/templates/condition.ori({}) }
```

A particularly kind of condition that often arises in templates is providing a default value for some field that might not exist in the template. For that particular kind of condition, you can use a "nullish coalescing operator" whose general form is:

```
<thing that might not exist> ?? <default result>
```

If the thing exists, the template will output that, otherwise it will output the default result. For an example, see "Processing input front matter" below.

## Call your own JavaScript functions

Your template expressions can call any JavaScript in [scope](/language/scope.html) via the base of the JavaScript file name.

For example, if you have a file named `uppercase.js` in the same directory as the template, a template expression can reference that module's default export as `uppercase`:

```js
// uppercase.js
${ samples.ori/templates/uppercase.js }
```

```ori
// callJs.ori
${ samples.ori/templates/callJs.ori }
```

```console
$ ori callJs.ori/
${ samples.ori/templates/callJs.ori/ }
```

If the function you invoke is asynchronous, its result will be awaited before being incorporated into the text output.

## Call another template as a function

One template can invoke another as a function.

We can define a template `stars.ori` as a component that displays a star rating:

```ori
// stars.ori
${ samples.ori/templates/stars.ori }
```

This template repeats a ★ star character for the number of times defined in in the input value. For example, you can directly invoke and test this template, passing in a value of 3:

```console
$ ori stars.ori 3
${ samples.ori/templates/stars.ori(3) }
```

This `stars.ori` template defines a function that you can invoke inside expressions in other templates:

```ori
// review.ori
${ samples.ori/templates/review.ori }
```

```console
$ ori review.ori/
${ samples.ori/templates/review.ori() }
```

This technique can let you define components in plain HTML and CSS.

## Wrap one template with another

Another application of invoking a template as a function is to wrap the output of one template inside another. For example, you can create an overall page template for a site called `page.ori`:

```ori
// page.ori
${ samples.ori/templates/page.ori }
```

A template for a specific type of page, like a `contact.ori` template for a Contact Us page, can invoke `page.ori` as a function:

```ori
// contact.ori
${ samples.ori/templates/contact.ori }
```

Evaluating the contact page template passes its HTML fragment to the overall site page template:

```console
$ ori contact.ori/
${ samples.ori/templates/contact.ori() }
```

### Processing input front matter

An input document can define front matter.

Both a template’s input document and the template itself can contain front matter in YAML or JSON format. The front matter is delineated with both a leading and trailing line of three hyphens (`---`), like so:

Example: a blog post can be stored as a markdown file with front matter that defines a `title` property.

```html
<!-- post1.html -->
${ samples.ori/templates/posts/post1.html }
```

And a template can then reference this `title` property. Here the template uses the `??` operator to provide a default title if the input document has no `title`.

```ori
// blogPost.ori
${ samples.ori/templates/blogPost.ori }
```

Applying the template the blog post includes the document's `title` property as desired:

```console
$ ori blogPost.ori posts/post1.html
${ samples.ori/templates/blogPost.ori samples.ori/templates/posts/post1.html }
```

If the template is applied to a post that has no `title`, the default title is used:

```console
$ ori blogPost.ori posts/post2.html
${ samples.ori/templates/blogPost.ori samples.ori/templates/posts/post2.html }
```

## Map trees to text

It’s common to have a template generate some fragment of text for each value in a tree: an array, a set, a folder, etc.
You can handle such cases in Origami templates by calling the built-in [`map`](/builtins/tree/map.html#values) function to map a tree’s values to text.

```${"yaml"}
# teamData.yaml
${ samples.ori/templates/teamData.yaml }
```

```ori
// teamList.ori
${ samples.ori/templates/teamList.ori }
```

```console
$ ori teamList.ori/
${ samples.ori/templates/teamList.ori() }
```

The `teamList.ori` file defines an outer template that includes an `<ul>` tag. Inside that, a substitution calling `map` appears, which maps the array of people in `teamData.yaml` to a set of HTML fragments using a nested template with an `<li>` tag.

### How maps work

Origami templates don't treat such maps specially. Rather, the `map` function is returning a tree of HTML fragments that are concatenated into the text output.

In the above example, the `map` function maps an array of people to HTML fragments. The transformation can be visualized like this:

<div class="sideBySide">
  <figure>
    ${ svg.js [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Carol" }
    ] }
  </figure>
  <figure>
    ${ svg.js map(samples.ori/templates/teamData.yaml, =`<li>${ _/name }</li>`) }
  </figure>
  <figcaption>Source tree of people objects</figcaption>
  <figcaption>Result tree of HTML fragments</figcaption>
</div>

Per the discussion in [Reference trees](#Reference-trees), the template concatenates the HTML fragments into the text output.

### Reference the key for a value

When `map` calls a template, it passes three parameters: the value being mapped, the key for that value, and the overall tree being mapped. You don't have to use all the parameters.

The key parameter can be useful when you are building a list or index. For example, suppose you want to build an index page for a blog, where you will write posts in a `posts` folder:

```console
$ ls posts
post1.html post2.html
```

You can create an index page that links to these files using the key parameter. Here, the `fileName` parameter will end up holding the name of the file being mapped:

```ori
// blogIndex.ori
${ samples.ori/templates/blogIndex.ori }
```

This lets a link reference a file's specific file name in the `href` attribute.

This index page template defines a default `title` property to use if a page omits a title; see [template and input front matter](#template-and-input-front-matter) above.

Evaluating this template produces a list of links to each post, with each `href` attribute referencing the appropriate file:

```console
$ ori blogIndex.ori posts
${ samples.ori/templates/blogIndex.ori samples.ori/templates/posts }
```
