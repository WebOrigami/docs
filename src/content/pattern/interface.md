---
title: Data as graphs
intro = client/samples/patternIntro:
---

Let's use the explorable graph pattern to tackle a small, common development task:

> _Our team writes site content in markdown format since that's friendlier than raw HTML. We need to convert a folder of markdown files to HTML pages so we can deploy them on our site._

<span class="tutorialStep"></span> View the files in `src/data/folder`, which contains some trivial markdown files. For example, `Alice.md`, contains:

```{{'md'}}
{{ intro/data/folder/Alice.md }}
```

We want to end up with a corresponding collection of HTML pages, such as `Alice.html`:

```{{'html'}}
{{ mdHtml intro/data/folder/Alice.md }}
```

## Wait — why files?

The problem statement presumed that the markdown content was stored as a file system folder, which is certainly plausible given a file system's advantages:

- Files are easy to edit, copy, and share in a wide variety of applications
- Web projects often use source code management systems like GitHub that are based on files

But it's worth noting that we could have made other choices. Since the content is currently quite small, we could put everything into a single YAML (or JSON) file:

```{{'yaml'}}
{{ intro/data/data.yaml }}
```

This approach has its own advantages:

- Keeping the data together may make it easier to create, edit, and manage
- If consistency between the keys and values is important, a single file makes it easier to review
- Reading a single file will be faster than traversing a folder of multiple files

Or we could load the data directly as an in-memory JavaScript object:

```{{'js'}}
{{ intro/data/data.js }}
```

This has the same advantages as the YAML/JSON approach, plus:

- No need to read and parse the contents, as the platform will take care of loading it for us
- Blazing fast

There are many other data representations that might be appropriate for this situation. We might, for example, choose to store and retrieve the data from:

- A network file server
- A web-based storage service like Google Drive
- A Content Management System (CMS)
- a proprietary database

Each of these approaches has their own advantages over loose files. So why be so fast to pick files as the answer?

## Switching costs

One problem with all of the data representations mentioned above is that they have significant switching costs.

First, the specific data representation you pick will entail use of specific APIs. If you want to store the markdown in files, then you're going to use a file system API such as Node's [fs](https://nodejs.org/api/fs.html) API. If you ever decide to change your data representation, you must rewrite all the code that reads and writes data.

Second, and more insidiously, the system used to store your data often influences how you reference data. If you are working with markdown _files_, then your code may end up passing around file paths that refer to markdown files. If you are working with in-memory JavaScript objects, then the same type of code will likely end up passing around JavaScript object references.

That means your entire code base may end up being influenced by how and where your data is stored — even code that has nothing to do with reading or writing data.

This leads to overspecialized code. In the context of this markdown-to-HTML task, you may end up writing code that specifically transforms a _folder_ of markdown _files_. Anyone (perhaps your future self) who wants to transform a collection of markdown documents stored in some other way may be unable to use your code without substantial modification.

## Data as graphs

Regardless of how we are storing the markdown content, it's possible to conceptualize the content as a graph:

<figure>
  {{ svg intro/data/folder }}
  <figcaption>The markdown documents as a graph</figcaption>
</figure>

We can write code to treat _any_ of the relevant data representations for this problem as a graph. That is, we can create an adapter or wrapper that lets us work with the data as a graph. Our core operation can then work on graphs.

We can start with the simplest possible data representation and, if that suffices, we're done. If we later need to change our representation, we can write a new adapter that lets us treat that as a graph. Our core code should continue to work without modification. In this way, we productively reduce our switching costs.

&nbsp;

Next: [Object graphs](intro3.html) »
