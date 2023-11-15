---
title: Virtual content
---

It's helpful to distinguish between:

- **Real content.** For our purposes, "real" means _persistent_: data, files, and other resources which are stored on a computer and which exist when your code is not running. Somewhere, somehow, this content is directly represented in the real world.
- **Virtual content.** These are data, files, and other resources that are only accessible while your code is running.

In Web Origami you can work with real content and virtual content the same way. For example, you can define a virtual HTML file that looks just and acts like a real HTML file, but which is only available while your code is running.

As you work towards creating your site, some of the site's resources will be real, like the CSS stylesheet stored in `src/public/styles.css`. Other content will be virtual. For example, you'll create a virtual `index.html` file that shows a list of your team members.

At the end of the process, you'll use graph tools to turn those virtual files into real files that can be deployed.

## Virtual files for development

As a quick example of virtual content, let's use the browser to view a list of files.

<span class="tutorialStep"></span> In the browser preview, navigate to `index.html`.

This should show the simple page you saw at the start, with the heading "public" and a list of links to the existing real files in the `public` folder.

There's no `index.html` file in your project's `src/public` folder. Instead, Web Origami provides a default, virtual `index.html` file as a convenience so that you can browse through your site while you're still developing it. That virtual `index.html` page doesn't exist in real form; it only exists while the Web Origami server is running.

In a little while you will define your own `index.html` file for the site, and your own page will be used instead of the default page. From that point on, you can still get access to a basic list of files for any folder by navigating to `.index`, another default, virtual page that will work even if a folder has an `index.html` page.

The `.svg` pages you explored in the previous step are another example of default, virtual pages provided by Web Origami for development purposes.

## Explorable graphs don't have to expose everything

The previous page explained that an explorable graph can tell you the keys it wants to make public. An important nuance is that such a graph doesn't have to tell you _everything_ that's inside it.

In this case, the Web Origami server is silently adding some virtual files to the graph of the `public` folder as development tools. These virtual files, like `.svg` or the default `index.html`, are generally hidden in the visual map (like the one shown by `.svg`) and lists of files (like the one in the default `index.html`).

The main point here is that, when you look at the `src/public` folder in the browser preview, you're actually looking at a virtual, somewhat transformed version of the real `src/public` folder. The virtual version can include more things (or different things) than the real version.

Now it's time to define some virtual files yourself.

&nbsp;

Next: [Metagraphs](intro4.html) »
