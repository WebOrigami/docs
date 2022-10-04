---
title: Data representations
approaches = node_modules/@graphorigami/pattern-intro/src/approaches:
---

Let's use the explorable graph pattern to tackle a small, common development task:

> _Our team writes site content in markdown format since that's friendlier than raw HTML. We need to convert a folder of markdown files to HTML pages so we can deploy them on our site._

<span class="tutorialStep"></span> View the files in the `src/approaches/markdown` folder, which contains some trivial markdown files. For example, `Alice.md`, contains:

```{{'md'}}
{{ approaches/markdown/Alice.md }}
```

We want to end up with a corresponding collection of HTML pages, such as `Alice.html`:

```{{'html'}}
{{ mdHtml approaches/markdown/Alice.md }}
```

We will make use of a markdown-to-HTML translator, but beyond that are going to solve this problem without depending on a framework or other code. We'll essentially write everything from scratch.

## Displaying the markdown files

Before tackling the translation of markdown to HTML, let's first solve a simpler problem: dump out the contents of the markdown files to the console.

```{{'js'}}
// approaches/folder.js

{{ approaches/folder.js }}
```

Here we use the promise-based flavor of Node's [fs](https://nodejs.org/api/fs.html) API, as it avoids blocking the main thread and makes it easy to work with the results.

We use the `fs.readFile` API to get a list of the file names that we can loop over. For each file name, we load the file and display it.

When we run this in the console, we see the contents of the three markdown files:

```console
$ node folder
{{ yaml approaches/markdown }}
```

## Wait — why files?

The problem statement presumed that the markdown content was stored as a file system folder, which is certainly plausible given a file system's advantages. Files are easy to edit, copy, and share in a wide variety of applications — including applications that a general audience can use.

But we could make other choices to represent our data. Let's look at two alternatives.

## Markdown in an object

If the set of markdown files is really so trivial, we could decide to load the data directly as an in-memory JavaScript object:

```{{'js'}}
// approaches/object.js

{{ approaches/object.js }}
```

This approach has its own advantages. For one thing, the code is lot simpler. Being synchronous and working directly against memory, it will also be much faster. In some cases, keeping the data together might make it easier to create, edit, and manage the data overall. On the downside, working directly in a JavaScript file is something only someone with development experience would feel comfortable doing.

## Markdown from a function

The particular markdown content here is so rigidly formulaic, we could write a JavaScript function to generate the markdown on demand:

```{{'js'}}
// approaches/fn.js

{{ approaches/fn.js }}
```

This particular function happens to be synchronous. If the function were asynchronous, we would switch the `for` loop to a `for await` loop, and `await` the function result.

## Pros and cons

To summarize some of the pros and cons of these three approaches:

|          | &emsp; | Object                      | &emsp; | Files                  | &emsp; | Function                |
| -------- | ------ | :-------------------------- | ------ | :--------------------- | ------ | :---------------------- |
| **Pros** |        | Fast                        |        | Many editing tools     |        | Create infinite results |
|          |        | Easy to code against        |        | Editable by anyone     |        | Create complex results  |
|          |        | Easy for developers to skim |        | Arbitrarily large data |        | Incorporate other data  |
|          |        |                             |        |                        |        |                         |
| **Cons** |        | Unwieldy for large data     |        | Slower access          |        | Requires coding         |
|          |        | Need code editor            |        | Harder to code against |        | Need code editor        |
|          |        |                             |        |                        |        | Coding skills required  |

There are many other data representations that might be appropriate for this situation. We might, for example, choose to store and retrieve the data from:

- JSON or YAML file
- network file server
- web-based storage service like Google Drive
- Content Management System (CMS)
- proprietary database

Each of these approaches has their own advantages over loose files. So why be so fast to pick files as the answer?

## Switching costs

One problem with all of the data representations mentioned above is that they have significant switching costs.

First, the specific data representation you pick will entail use of specific APIs and coding patterns. Although all three code examples above are doing the same thing — looping over a set of data values and displaying them — the loop code is slightly different in each case. If you ever change from one data representation to another, you must change such loops throughout your codebase.

Second, and more insidiously, the system used to store your data influences how you reference data. If you are working with markdown files, your code will tend to pass around strings which are file paths that refer to markdown files. If you are working with in-memory JavaScript objects, then the same type of code will tend to pass around JavaScript object references.

That means your entire code base may end up being influenced by how and where your data is stored — even code that doesn't directly read or write data.

This leads to overspecialized code. In the context of this markdown-to-HTML task, you may end up writing code that specifically transforms a _folder_ of markdown _files_. Anyone (perhaps your future self) who wants to transform a collection of markdown documents stored in some other way may be unable to use your code without substantial modification.

You often encounter this overspecialization in tools. In searching for a tool that can transform markdown to HTML, you may find a tool that expects the content to be files. If your project isn't storing markdown in separate files, then you may find yourself forced to save data in temporary files just to be able to use that tool.

## Data as graphs

Regardless of how we are storing the markdown content, it's possible to conceptualize the content as a graph:

<figure>
  {{ svg approaches/markdown }}
  <figcaption>The markdown documents as a graph</figcaption>
</figure>

We can write code to treat _any_ of the relevant data representations for this problem as a graph. That is, we can create an adapter or wrapper that lets us work with the data as a graph. Our core operation can then work on graphs.

We can start with the simplest possible data representation and, if that suffices, we're done. If we later need to change our representation, we can write a new adapter that lets us treat that as a graph. Our core code should continue to work without modification. In this way, we productively reduce our switching costs.

&nbsp;

Next: [The Explorable interface](interface.html) »
