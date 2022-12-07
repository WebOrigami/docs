---
title: Graph tools to deploy content
teamByName = mapKeys(framework-intro/src/public/team.yaml, =name):
complete:
  index.html: |
    <h1>Our Amazing Team</h1>
    <li>Alice</li>
    <li>Bob</li>
    <li>Carol</li>
  personIcon.svg = framework-intro/src/public/personIcon.svg:
  images = framework-intro/src/public/images:
  styles.css = framework-intro/src/public/styles.css:
  team = map(teamByName, =`<h1>{{ name }}</h1>`, extension='→html'):
  thumbnails = images:
---

## Review the structure of the site

Your goal in this tutorial has been to build a basic About Us area. You started with a simple `team.yaml` data file and a handful of resources like styles, then applied a series of graph transformations to create the following virtual graph:

<figure>
{{ svg complete }}
</figure>

The site is now complete. You could deploy this project as it stands, running the small Graph Origami server on a hosted machine somewhere. That might be appropriate if the site contained dynamic portions that would need to be reevaluated on each request.

However, like many sites, this particular site is fundamentally static in nature. You can render all the pages and other necessary resources and deploy them as static files on a CDN (Content Delivery Network). That will be cheaper, faster, and more reliable.

That will also be pretty easy — the virtual graph above reflects _exactly_ the set of static files necessary for the site. What you need to do now is use one of the tools included with Graph Origami to _copy_ the virtual files into real files. Once you've done that, you'll have files you can deploy anywhere.

The specific steps required depend on how you've been doing this tutorial.

## Building static files if you're using Glitch

The Glitch project you're working in is already set up to automatically run the Graph Origami tool that copies virtual files to static files.

Glitch automatically invokes a "build" step whenever you stop actively working on the project and the server is shutdown. This build step will invoke the Graph Origami copy tool to create a `build` folder containing the static files. After that point, visitors to your site will see the static files instead of the virtual files. Importantly, Glitch will not charge you to serve those static files — this project counts as a static Glitch project, and those are free.

So there's nothing you need to do to make those static files — but if you would like to see the build process in action, you can manually trigger it.

<span class="tutorialStep"></span> Click the **Terminal** button in the toolbar at the bottom of the Glitch window.

<span class="tutorialStep"></span> In the Glitch terminal, type the following command:

```console
$ npm run build
```

That will invoke a Graph Origami tool called `ori`, and instruct it to copy the contents of the entire virtual graph in `src/public` to a real file system folder called `build`.

<span class="tutorialStep"></span> To view the `build` files in the Glitch editor, type this command:

```console
$ refresh
```

That refreshes the list of files on the left. You can close the Terminal at this point.

Again, Glitch will normally update the `build` folder automatically. So when you're done working on the site, you can close the Glitch window. Glitch will stop the Graph Origami server, but you'll still be able to view your site.

Your site will have a URL like https://origami-framework-intro.glitch.me/. You can find your site's URL by clicking **Share** button in the upper right, then look for **Live site**. Your site is now ready for visitors.

## Building static files if you're using GitHub Codespaces or your own local environment

The Graph Origami command-line interface has a built-in [copy](/cli/builtins.html#copy) function that can copy one graph into another. You can use that `copy` function to copy a virtual graph into a graph of real files in the file system.

<span class="tutorialStep"></span> In the terminal, stop the server with Ctrl+C, and issue the following command:

```console
$ npm run build
```

That will invoke a Graph Origami tool called `ori`, and instruct it to copy the contents of the entire virtual graph in `src/public` to a real file system folder called `build`.

At this point, you could deploy the About Us site by copying the `build` folder to a CDN or some other network-visible location. That step is beyond the scope of this tutorial, and the specifics will depend on where you want to deploy the files.

## Inspect the build folder

<span class="tutorialStep"></span> In the terminal or your code editor, inspect the `build` folder.

In addition to copies of the real files in the `src/public` folder, the `build` folder will contain:

- A real `thumbnails` folder with real thumbnail versions of each image.
- A real `index.html` page with HTML that includes a listing for each team member.
- A real `team` folder with real HTML pages for each team member.

The `build` folder contains a fully functional About Us area that's identical to the one visible at the `src` route — only the `build` version is backed entirely by static files.

Because these static files are all in native web formats, the deployed static site can be extremely fast. There are opportunities around the margins to make the site even faster, but this is already a good start on a very performant site.

&nbsp;

Next: [Observations](intro10.html) »
