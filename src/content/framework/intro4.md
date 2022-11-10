---
title: Define virtual content with formulas
numberHeadings: true
intro = client/samples/frameworkIntro:
team.yaml = intro/team.yaml:
teamByName = mapKeys(team.yaml, =name):
greetings = map(team.yaml, =intro/greet(name)):
greetingsByName = map(teamByName, =intro/greet(name)):
---

In the last step, you created a trivial virtual value — a virtual "file" — called `title` that contained a bit of static text. What's more interesting is that you can define virtual values with _formulas_ that will be evaluated to produce a result.

## Define a simple formula

<span class="tutorialStep"></span> Add a new line to the `+stuff.yaml` file so that it reads:

```yaml
title: Our Amazing Team
hello.html = `Hello, \{\{title}}!`:
```

Note the colon (`:`) at the end of that new line.

Graph Origami lets you define virtual values by defining formulas in the _key_ of a key/value pair. In YAML files, a colon is used to separate a key from a value. To define a virtual value, you put the whole formula in the key — before the colon. The value is whatever after the colon. In this case, no value is given, so the real value of the key/value pair is `null`. The virtual value will be defined by evaluating the formula.

<span class="tutorialStep"></span> Navigate to (or refresh) `/src/public` to see a new, virtual `hello.html` file.

<span class="tutorialStep"></span> Open `hello.html`. You should see, "Hello, Our Amazing Team!"

Graph Origami supports a small [Origami expression language](/language). One of the things it can do is insert data into a template string, like inserting the value of `title` into a little greeting.

## Invoke a JavaScript function from a formula

If you don't consider yourself a JavaScript programmer, don't worry, JavaScript isn't necessary to build this particular site, or required to use Origami in general. We'll just use it here as just an example of how data might be transformed with regular JavaScript.

<span class="tutorialStep"></span> In your code editor, take a peek at the JavaScript file `/src/greet.js`:

```{{'js'}}
{{ framework-intro/greet.js }}
```

This `greet` function just inserts a name into a greeting. You can use this `greet` function in an Origami expression to generate the contents of a virtual file.

<span class="tutorialStep"></span> Update the definition for `hello.html` in `+stuff.yaml` to call the `greet` function:

```yaml
title: Our Amazing Team
hello.html = greet('world'):
```

And again note the final colon. Also, be sure to use single quotes. Graph Origami doesn't support double quotes. There's a very good reason for that, and the reason will probably surprise you and make you laugh. But for now, just remember to use single quotes.

This formula defines a virtual file called `hello.html`. The value or contents of that virtual file will be the result of evaluating the expression `greet('world')`. In this case, the reference to `greet` will obtain the function exported by `greet.js`, then invoke that function.

<span class="tutorialStep"></span> Refresh `hello.html` to see "Hello, <strong>world</strong>!".

Each time you ask for `hello.html`, the web server evaluates the corresponding formula that invokes `greet`. (If you're running this tutorial locally, you can verify this by setting a breakpoint within the greet function, then visiting `hello.html`.)

Since the `greet` function is regular JavaScript, you can use that JavaScript to create HTML by any means you like. If the function is asynchronous, Origami will `await` the result before serving it to the browser. With that, you should be able to do essentially anything you want in the JavaScript function to create any HTML result.

A function like `greet` here transforms data from one form into another — in this case, it transforms a string name to an HTML greeting. The function could just as easily transform other kinds of data; there's nothing special about text here.

&nbsp;

Next: [Scope](intro5.html) »
