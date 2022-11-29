---
title: Define virtual content with formulas
---

In the last step, you created a trivial virtual file called `title` that contained a bit of text. What's more interesting is that you can define virtual files with _formulas_ that will be evaluated to produce a result.

## Define a formula

<span class="tutorialStep"></span> Add a new entry to the `+.yaml` file:

```yaml
# Site title
title: Our Amazing Team

# Index page
index.html = 'Hello, world!':
```

Be sure to use single quotes in the last line. Graph Origami doesn't support double quotes. There's a very good but strange reason for that, and when the reason is revealed in a moment, it will probably surprise you. But for now, just remember to use single quotes.

Also note the colon (`:`) at the end of that line. Graph Origami lets you define virtual values by defining formulas in the _key_ of a key/value pair. In YAML files, a colon is used to separate a key from a value, so that colon is part of the YAML file format, not part of the formula.

For clarity, there are now two key/value pairs in `+.yaml`:

| Key                            |              | Value            |
| :----------------------------- | ------------ | :--------------- |
| `title`                        |              | Our Amazing Team |
| `index.html = 'Hello, world!'` | &nbsp;&nbsp; | (null)           |

To define a virtual value, you put the whole formula in the key — so in YAML files, before the colon.

In this above formula, no value is given, so the real value of the key/value pair is `null`. That real value won't be used; the virtual value will be defined by evaluating the formula.

<span class="tutorialStep"></span> Navigate to (or refresh) `.svg` to see a new, virtual `index.html` file.

<span class="tutorialStep"></span> Click the box for `index.html` to open that page. You should see, "Hello, world!" Use the Back button or keyboard shortcut to go back to the `.svg` page.

Graph Origami supports a small [Origami expression language](/language), and one of its most basic expression forms is a simple quoted string. At this point, the above formula for `index.html` isn't doing anything more interesting than the definition for `title` above it. But now that we've established how you can write formulas, you can do more interesting things.

Tip: although the `public` folder now has its own index page, it can still be useful to view the previous list of real and virtual files. If you ever want to return that listing, navigate to the hidden page at `.index` (with an initial period). That virtual page is one of those provided by the Origami server as a diagnostic tool so you can inspect everything in the virtual graph you're creating.

## Invoke a JavaScript function from a formula

If you don't consider yourself a JavaScript programmer, don't worry, JavaScript isn't necessary to build this particular site, or required to use Origami in general. We'll just use it here as an example of how data might be transformed with regular JavaScript.

<span class="tutorialStep"></span> In your code editor, take a peek at the JavaScript file `src/greet.js`:

```{{'js'}}
{{ framework-intro/src/greet.js }}
```

This `greet` function returns a greeting in HTML format that incorporates a person's name. You can use this `greet` function in an Origami expression to generate the contents of a virtual file.

<span class="tutorialStep"></span> In `+.yaml`, update the definition for `index.html` to call the `greet` function:

```yaml
# Site title
title: Our Amazing Team

# Index page
index.html = greet('world'):
```

Again, note the single quotes and the final colon.

The contents of the virtual file `index.html` will now be the result of evaluating the expression `greet('world')`. In this case, the reference to `greet` will obtain the function exported by `greet.js`, then invoke that function.

<span class="tutorialStep"></span> Navigate to `index.html` to see "Hello, <strong>world</strong>!".

Each time you ask for `index.html`, Graph Origami evaluates the corresponding formula that invokes `greet`. (If you're running this tutorial locally, you can verify this by setting a breakpoint within the `greet` function, then visiting `index.html`.)

Since the `greet` function is regular JavaScript, you can use that JavaScript to create HTML by any means you like. If the function is asynchronous, Graph Origami will `await` the result before serving it to the browser. With that, you should be able to do essentially anything you want in the JavaScript function to create any HTML result.

A function like `greet` here transforms data from one form into another — in this case, it transforms a string name to an HTML greeting. The function could just as easily transform other kinds of data; there's nothing special about text here.

Graph Origami includes a number of [built-in functions](/cli/builtins.html), but it's very easy to add your own: just create a JavaScript file with the name of the function (like `greet`) that you want to use in formulas.

Note: the Graph Origami server reflects changes to files like `+.yaml` when you refresh the page. However, since JavaScript files like `greet.js` can only be loaded once, if you edit a JavaScript file, you will have to restart the Graph Origami server to see the edit's effects. In Glitch, the server automatically restarts, but if you're running on StackBlitz or your own environment you will have to restart the server manually: hit Ctrl+C, then issue the command `npm start`.

## Any key can be a formula

Above you created formulas in a YAML file called `+.yaml` by putting formulas in the key of a key/value pair. That same formula ability applies to other graphs as well — including, it turns out, file system graphs.

In the case of the file system, the keys are file names (including folder names). This means that… you can put formulas in file names?

Actually, yes.

<span class="tutorialStep"></span> In the `public` folder, create a new file with the following **file name**:

```
what.html = greet('what')
```

That whole line — including the equals sign and everything — is the file name. (Because you're not working inside a YAML file here, do not include a final colon.)

Because a formula in a file name is completely crazy, here's an image showing roughly what your code editor (here, VS Code) should look like:

<img src="/assets/misc/fileNameFormula.png" style="width: 352px;">

<span class="tutorialStep"></span> Browse to `what.html` to see: Hello, <strong>what</strong>!

This support for formulas in file names is the aforementioned reason why Graph Origami only supports single quotes in formulas: Microsoft Windows can't handle double quotes in file names, so for cross-platform compatibility, Graph Origami only supports single quotes.

The point is that Graph Origami can treat any kind of graph as a metagraph. Putting a formula in a file name may seem strange, but it's an option available to you, and it does have its advantages.

In this case, a visible `what.html` formula in the file system can serve as a useful indication that virtual content is going to appear at that point. On the other hand, when you put formulas in YAML files, you can add comments and you can put formulas in an order that makes sense to you. You're free to define formulas using both ways in the same project.

<span class="tutorialStep"></span> Because you won't be needing this file going forward, delete it.

Regardless of where you put formulas, an important question is: how _exactly_ is Graph Origami deciding what data and functions can be referenced in formulas?

&nbsp;

Next: [Scope](intro6.html) »
