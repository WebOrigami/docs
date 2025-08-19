---
title: Set up for the Origami tutorial
---

<script src="/components.js"></script>

You can follow these steps to create the few files needed to start the [tutorial](tutorial.html).

You'll need to have a currently-maintained version of [Node.js](https://nodejs.org) installed.

<span class="tutorialStep"></span> Create a directory for the tutorial project.

<span class="tutorialStep"></span> Create a `package.json` file containing:

<clipboard-copy>

<pre class="step">
{
  "name": "origami-intro",
  "type": "module",
  "dependencies": {
    "@weborigami/origami": "${ Dev.version }"
  },
  "scripts": {
    "build": "ori copy src/site.ori, clear files:build",
    "start": "ori serve watch src, =debug src/site.ori"
  }
}
</pre>

</clipboard-copy>

Here setting the `"type"` to `"module"` will enable the use of a JavaScript module at one point in the tutorial. The two `scripts` will also come into play during the tutorial.

Then:

```console
$ npm install
```

<span class="tutorialStep"></span> To create some markdown content to work with, make a subdirectory called `markdown`. Inside that directory, create two markdown files called, say, `post1.md` and `post2.md`. Give each file a `title` property and some markdown content like:

<clipboard-copy>

<pre class="step">
\---
title: First post
\---

This is the **first** post.
</pre>

</clipboard-copy>

<span class="tutorialStep"></span> Create a subdirectory called `images`. Put a couple of images in there, and add references to those images in the markdown files.

You're now ready to [begin the tutorial](tutorial2.html).
