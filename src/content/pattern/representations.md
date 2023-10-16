---
title: Data representations
---

Let's use the async tree pattern to tackle a small, common development task:

> _Our team writes site content in markdown format since that's friendlier than raw HTML. We need to convert a folder of markdown files to HTML pages so we can deploy them on our site._

<span class="tutorialStep"></span> View the files in the `src/approaches/markdown` folder, which contains some trivial markdown files. For example, `Alice.md`, contains:

```{{'md'}}
{{ pattern-intro/approaches/markdown/Alice.md }}
```

We want to end up with a corresponding collection of HTML pages, such as `Alice.html`:

```{{'html'}}
{{ @mdHtml pattern-intro/approaches/markdown/Alice.md }}
```

We will make use of a markdown-to-HTML translator, but beyond that are going to solve this problem without depending on a framework or other code. We'll essentially write everything from scratch.

## Displaying the markdown files

Before tackling the translation of markdown to HTML, let's first solve a simpler problem: dump out the contents of the markdown files to the console.

```{{'js'}}
/* src/approaches/files.js */

{{ pattern-intro/approaches/files.js }}
```

Here we use the promise-based flavor of Node's [fs](https://nodejs.org/api/fs.html) API, as it avoids blocking the main thread and makes it easy to work with the results.

We use the `fs.readFile` API to get a list of the file names that we can loop over. For each file name, we load the file and display it.

<span class="tutorialStep"></span> In the terminal window, cd to the `src/approaches` directory, then execute `files.js` to see the contents of the three markdown files:

```console
$ cd src/approaches
$ node files.js
{{ @yaml pattern-intro/approaches/markdown }}
```

## Wait — why files?

The problem statement presumed that the markdown content was stored as a file system folder, which is certainly plausible given a file system's advantages. Files are easy to edit, copy, and share in a wide variety of applications — including applications that a general audience could use.

But we could make other choices to represent our data. Let's look at two alternatives.

## Markdown in an object

If the set of markdown files is really so trivial, we could decide to load the data directly as an in-memory JavaScript object:

```{{'js'}}
/* src/approaches/object.js */

{{ pattern-intro/approaches/object.js }}
```

<span class="tutorialStep"></span> Verify that this object approach produces the same output:

```console
$ node object.js
{{ @yaml pattern-intro/approaches/markdown }}
```

This object-based approach has its own advantages. For one thing, the code is lot simpler. Being synchronous and working directly against memory, it will also be much faster. In some cases, keeping the data in a single file might also make it easier to create, edit, and manage the data as a collection. On the downside, working directly in a JavaScript file is something only someone with development experience would feel comfortable doing.

## Markdown from a function

The particular markdown content here is so rigidly formulaic, we could write a JavaScript function to generate the markdown on demand:

```{{'js'}}
/* src/approaches/fn.js */

{{ pattern-intro/approaches/fn.js }}
```

This particular function `fn` happens to be synchronous. If the function were asynchronous, we would switch the `for` loop to a `for await` loop, and `await` the function result.

<span class="tutorialStep"></span> You can verify that the function approach produces the same output:

```console
$ node fn.js
{{ @yaml pattern-intro/approaches/markdown }}
```

## Pros and cons

In the constraints of our sample data, all three approaches produce the same output, but they offer different pros and cons:

|          | &emsp; | Object                      | &emsp; | Files                  | &emsp; | Function                    |
| -------- | ------ | :-------------------------- | ------ | :--------------------- | ------ | :-------------------------- |
| **Pros** |        | Fast                        |        | Many editing tools     |        | Create infinite results     |
|          |        | Easy to code against        |        | Editable by anyone     |        | Create complex results      |
|          |        | Easy for developers to skim |        | Arbitrarily large data |        | Incorporate other data      |
|          |        |                             |        |                        |        |                             |
| **Cons** |        | Unwieldy for large data     |        | Slower access          |        | Coding skills required      |
|          |        | Need code editor            |        | Harder to code against |        | Need code editor            |
|          |        | Restart after updating data |        |                        |        | Restart after updating data |

There are many other data representations that might be appropriate for this situation. We might, for example, choose to store and retrieve the data from:

- a JSON or YAML file
- a network file server
- a web-based storage service like Google Drive
- a Content Management System (CMS)
- a proprietary database

Each of these approaches has their own advantages over loose files. So why be so fast to pick files as the answer?

## Switching costs

One problem with all of the data representations mentioned above is that they have significant switching costs.

First, the specific data representation you pick will entail use of specific APIs and coding patterns. Although all three code examples above are doing the same thing — looping over a set of data values and displaying them — the loop code is slightly different in each case. If you ever change from one data representation to another, you must change such loops throughout your codebase.

Second, and more insidiously, the system used to store your data influences how your code refers to data. If you are working with markdown files, your code will tend to pass around strings which are file paths that refer to markdown files. If you are working with in-memory JavaScript objects, then the same type of code will tend to pass around JavaScript object references.

That means your entire code base may end up being influenced by how and where your data is stored — including code that doesn't directly read or write data.

This leads to overspecialized code. In the context of this markdown-to-HTML task, you may end up writing code that specifically transforms a _folder_ of markdown _files_. Anyone (perhaps your future self) who wants to transform a collection of markdown documents stored in some other way may be unable to use your code without substantial modification.

You often encounter this overspecialization in tools. In searching for a tool that can transform markdown to HTML, you may find a tool that expects the content to be files — but if your project isn't storing markdown in separate files, then you may find yourself forced to save data in temporary files just to be able to use that tool.

## Data as trees

Regardless of how we are storing the markdown content, it's possible to conceptualize the content as a tree:

<figure>
  {{ @svg {
    Alice.md: "Hello, **Alice**.",
    Bob.md: "Hello, **Bob**.",
    Carol.md: "Hello, **Carol**.",
  } }}
  <figcaption>The markdown documents as a tree</figcaption>
</figure>

We can write code to treat _any_ of the relevant data representations for this problem as a tree. That is, we can create an adapter or wrapper that lets us work with the data as a tree. Our core operation can then work on trees.

We can start with the simplest possible data representation and, if that suffices, we're done. If we later need to change our representation, we can write a new adapter that lets us treat that as a tree. Our core code should continue to work without modification. In this way, we productively reduce our switching costs.

&nbsp;

Next: [The async tree interface](interface.html) »
