---
title: Define virtual content with formulas
---

In the last step, you created a trivial virtual file called `title` that contained a bit of text. What's more interesting is that you can define virtual files with _formulas_ that will be evaluated to produce a result.

## Define a simple formula

<span class="tutorialStep"></span> Add a new line to the `+stuff.yaml` file so that it reads:

```yaml
title: Our Amazing Team
index.html = 'Hello, world!':
```

Be sure to use single quotes. Graph Origami doesn't support double quotes. There's a very good but strange reason for that, and when the reason is revealed in a few pages, it will probably surprise you and make you laugh. But for now, just remember to use single quotes.

Also note the colon (`:`) at the end of that new line. Graph Origami lets you define virtual values by defining formulas in the _key_ of a key/value pair. In YAML files, a colon is used to separate a key from a value, so at the moment, here are two key/value pairs in `stuff.yaml`:

| Key                          |        | Value            |
| :--------------------------- | ------ | :--------------- |
| title                        |        | Our Amazing Team |
| index.html = 'Hello, world!' | &nbsp; | (null)           |

To define a virtual value, you put the whole formula in the key — before the colon.

In this above formula, no value is given, so the real value of the key/value pair is `null`. That real value won't be used; the virtual value will be defined by evaluating the formula.

<span class="tutorialStep"></span> Navigate to (or refresh) `.svg` to see a new, virtual `index.html` file.

<span class="tutorialStep"></span> Click the box for `index.html` to open that page. You should see, "Hello, world!" Use the Back button or keyboard shortcut to go back to the `.svg` page.

Graph Origami supports a small [Origami expression language](/language), and one of its most basic expression forms is a simple quoted string. At this point, the above formula for `index.html` isn't doing anything more interesting than the definition for `title` above it. But now that we've established how you can write formulas, you can do more interesting things.

## Invoke a JavaScript function from a formula

If you don't consider yourself a JavaScript programmer, don't worry, JavaScript isn't necessary to build this particular site, or required to use Origami in general. We'll just use it here as just an example of how data might be transformed with regular JavaScript.

<span class="tutorialStep"></span> In your code editor, take a peek at the JavaScript file `src/greet.js`:

```{{'js'}}
{{ framework-intro/src/greet.js }}
```

This `greet` function returns a greeting in HTML format that incorporates a person's name. You can use this `greet` function in an Origami expression to generate the contents of a virtual file.

<span class="tutorialStep"></span> In `+stuff.yaml`, update the definition for `index.html` to call the `greet` function:

```yaml
title: Our Amazing Team
index.html = greet('world'):
```

Again, note the single quotes and the final colon.

The contents of the virtual file `index.html` will now be the result of evaluating the expression `greet('world')`. In this case, the reference to `greet` will obtain the function exported by `greet.js`, then invoke that function.

<span class="tutorialStep"></span> Navigate to `index.html` to see "Hello, <strong>world</strong>!".

Each time you ask for `index.html`, the web server evaluates the corresponding formula that invokes `greet`. (If you're running this tutorial locally, you can verify this by setting a breakpoint within the `greet` function, then visiting `index.html`.)

Since the `greet` function is regular JavaScript, you can use that JavaScript to create HTML by any means you like. If the function is asynchronous, Origami will `await` the result before serving it to the browser. With that, you should be able to do essentially anything you want in the JavaScript function to create any HTML result.

A function like `greet` here transforms data from one form into another — in this case, it transforms a string name to an HTML greeting. The function could just as easily transform other kinds of data; there's nothing special about text here.

Graph Origami includes a number of [built-in functions](/cli/builtins.html), but it's very easy to add your own: just create a JavaScript file with the name of the function (like `greet`) you will use in expressions.

This gives rise to a question: how _exactly_ is Graph Origami deciding what data and functions can be referenced in formulas?

&nbsp;

Next: [Scope](intro5.html) »
