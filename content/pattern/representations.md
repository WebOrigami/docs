---
title: Data representations
---

Let's use the Map pattern to tackle a small, common development task:

> _Our team writes blog content in markdown format since that's friendlier than raw HTML. We need to convert a folder of markdown posts to HTML pages so we can deploy them on our site._

<span class="tutorialStep"></span> View the files in the `src/approaches/markdown` folder, which contains some trivial markdown files. For example, `post1.md`, contains:

```${'md'}
${ Origami.string(pattern/approaches/markdown/post1.md) + "\n" }
```

We want to end up with a corresponding collection of HTML pages, such as `post1.html`:

```${'html'}
${ Origami.mdHtml(pattern/approaches/markdown/post1.md) }
```

We will make use of a markdown-to-HTML translator, but beyond that are going to solve this problem without depending on a framework or other code. We'll essentially write everything from scratch.

## Displaying the markdown files

Before tackling the translation of markdown to HTML, let's first solve a simpler problem: dump out the contents of the markdown files to the console.

```${'js'}
/* src/approaches/files.js */

${ pattern/approaches/files.js }
```

Here we use Node’s `fs` API to get a list of the file names that we can loop over. For each file name, we load the file and display it.

<span class="tutorialStep"></span> In the terminal window, cd to the `src/approaches` directory, then execute `files.js` to see the contents of the three markdown files:

```console
$ cd src/approaches
$ node files.js
${ Origami.yaml(pattern/approaches/markdown) }
```

## Wait — why files?

The problem statement presumed that the markdown content was stored as a file system folder, which is certainly plausible given a file system's advantages. Files are easy to edit, copy, and share in a wide variety of applications — including applications that a general audience could use.

But we could make other choices to represent our data. Let's look at two alternatives.

## Markdown in an object

If the set of markdown files is really so trivial, we could decide to load the data directly as an in-memory JavaScript object:

```${'js'}
/* src/approaches/object.js */

${ pattern/approaches/object.js }
```

<span class="tutorialStep"></span> Verify that this object approach produces the same output:

```console
$ node object.js
${ Origami.yaml(pattern/approaches/markdown) }
```

This object-based approach has the advantages of being simpler and faster. In some cases, keeping the data in a single file might also make it easier to create, edit, and manage the data as a collection. On the downside, working directly in a JavaScript file is something only someone with development experience would feel comfortable doing. The object definition will also become unwieldy with longer, multi-line content.

## Markdown from a function

The particular markdown content here is so rigidly formulaic, we could write a JavaScript function to generate the markdown on demand:

```${'js'}
/* src/approaches/fn.js */

${ pattern/approaches/fn.js }
```

This particular function `fn` happens to be synchronous. If the function were asynchronous, we would switch the `for` loop to a `for await` loop, and `await` the function result.

<span class="tutorialStep"></span> You can verify that the function approach produces the same output:

```console
$ node fn.js
${ Origami.yaml(pattern/approaches/markdown) }
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

- The specific data representation you pick entails use of specific APIs and coding patterns. Although all three code examples above are doing the same thing — looping over a set of data values and displaying them — the loop code is slightly different in each case. If you ever change from one data representation to another, you must change such loops throughout your codebase.

- More insidiously, the system used to store your data influences how your code refers to data. If you are working with markdown files, your code will tend to pass around strings which are file paths that refer to markdown files. If you are working with in-memory JavaScript objects, then the same type of code will tend to pass around JavaScript object references. Your entire code base will be influenced by how and where your data is stored — including code that doesn't directly read or write data.

- This leads to overspecialized code. In the context of this markdown-to-HTML task, you may end up writing code that specifically transforms a _folder_ of markdown _files_. Anyone (perhaps your future self) who wants to transform a collection of markdown documents stored in some other way may be unable to use your code without substantial modification.

You often encounter this overspecialization in tools. You may find a tool that can transform markdown to HTML, but expects the content to be files. If your project isn't storing markdown in files, you may find yourself forced to save data in temporary files just to be able to use that tool.

## Data as maps

Regardless of how we are storing the markdown content, it's possible to conceptualize the content as an abstract collection of keys and values:

<figure>
  ${ svg({
	  "post1.md": "This is **post 1**.",
	  "post2.md": "This is **post 2**.",
	  "post3.md": "This is **post 3**.",
  }) }
</figure>

Such a collection of keys and values is called a _map_.

We can write code to treat any of the relevant data representations for this problem as a map. We can start with the simplest possible data representation and, if that suffices, we're done. If we later need to change our representation, we can write a new adapter that lets us treat that as a map. Our core code should continue to work without modification. In this way, we productively reduce our switching costs.

&nbsp;

Next: [The Map interface](interface.html) »
