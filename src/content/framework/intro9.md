---
title: Graph tools to deploy content
---

## Review the structure of the site

Your goal in this tutorial has been to build a basic About Us area. You started with a simple `team.yaml` data file and a handful of resources like styles, then applied a series of graph transformations to create the following virtual graph:

<figure>
{{ svg client/samples/frameworkIntro/complete.meta/public }}
</figure>

The site is now complete. You could deploy this project as it stands, running the small Graph Origami server on a hosted machine somewhere. That might be appropriate if the site contained dynamic portions that would need to be reevaluated on each request.

However, like many sites, this particular site is fundamentally static in nature. You can render all the pages and other necessary resources and deploy them as static files on a CDN (Content Delivery Network). That will be cheaper, faster, and more reliable.

That will also be pretty easy — the virtual graph above reflects _exactly_ the set of static files necessary for the site. What you need to do now is use one of the tools included with Graph Origami to _copy_ the virtual files into real files. Once you've done that, you'll have files you can deploy anywhere.

The specific steps required depend on how you've been doing this tutorial.

## Building static files on Glitch

The Glitch project you're working in is already set up to automatically run the Graph Origami tool that copies virtual files to static files.

Glitch automatically invokes a "build" step whenever you stop actively working on the project and the server is shutdown. This build step will invoke the Graph Origami copy tool to create a `build` folder containing the static files. After that point, visitors to your site will see the static files instead of the virtual files. Importantly, Glitch will not charge you to serve those static files — this project counts as a static Glitch project, and those are free.

So there's nothing you need to do to make those static files — but if you would like to see the build process in action, you can manually trigger it.

<span class="tutorialStep"></span> Click the **Terminal** button in the toolbar at the bottom of the Glitch window.

<span class="tutorialStep"></span> In the Glitch terminal, type the following command:

```console
$ npm run build
```

That will invoke an Origami tool called `ori`, and instruct it to copy the virtual contents of `src/public` to a real file system folder called `build`. You can inspect the contents of the resulting `build` directory in the terminal.

<span class="tutorialStep"></span> To view the `build` files in the Glitch editor, type this command:

```console
$ refresh
```

That refreshes the list of files on the left. You can close the Terminal at this point.

Again, Glitch will normally update the `build` folder automatically. So when you're done working on the site, you can close the Glitch window. Glitch will stop the Graph Origami server, but you'll still be able to view your site.

Your site will have a URL like https://origami-framework-intro.glitch.me/. You can find your site's URL by clicking **Share** button in the upper right, then look for **Live site**. Your site is now ready for visitors.

## Building on StackBlitz or your own local environment

The ori command-line tool has a built-in [copy](/cli/builtins.html#copy) function that can copy one graph into another. You can use that `copy` function to copy a virtual graph into a graph of real files in the file system.

<span class="tutorialStep"></span> In the terminal, stop the server with Ctrl+C, and issue the following command:

```console
$ ori copy virtual/src/public, files/build
```

This copies the entire virtual graph represented by the `src` folder into a new file system folder called `build`.

At this point, you could deploy the About Us site by copying the `build` folder to a CDN or some other network-visible location. That step is beyond the scope of this tutorial, and the specifics will depend on where you want to deploy the files.

## Inspect the build folder

<span class="tutorialStep"></span> In your code editor, inspect the `build` folder.

In addition to copies of the real files in the `src/public` folder, the `build` folder will contain:

- A real `thumbnails` folder with real thumbnail versions of each image.
- A real `index.html` page with HTML that includes a tile for each team member.
- A real `team` folder with real HTML pages for each team member.

The `build` folder contains a fully functional About Us area that's identical to the one visible at the `src` route — only the `build` version is backed entirely by static files.

## Recap

In this tutorial you created a small About Us site that demonstrates the core concepts of the Graph Origami framework:

1. The overarching **creation-as-transformation** model offered a way of thinking about the final result form of the site, the initial source form of the material you had to work with, and the transformations that would be necessary to turn the source form into the result form.
1. **Explorable graphs** provided a convenient way to represent the data about team members, the structure of the project's files, and the structure of the final site.
1. **Virtual content** let you browse files and content that only exist while code is running.
1. **Metagraphs** let you define folders like `public` that define their own transformations.
1. **Formulas** let you concisely transform real data and files into browseable virtual content.
1. **Scope** determined the code (`greet`) and data (`title`) your formulas could reference.
1. **Templates** turned your data and graphs into text like the site's `index.html` page and individual team member pages.
1. **Transforms** changed graphs from one form to another, processing content in bulk: like images into thumbnails, or team data into HTML fragments or pages.
1. **Graph tools** let you (automatically or manually) copy your virtual site into real static files that can be published.

The final definition of the site is quite compact: a handful of formulas in `+public.yaml` and `+private.yaml` orchestrate the transformations, and the templates `index.ori` and `person.ori` transform data into HTML. Although a sample `greet` function was used for demonstration, the construction of the actual site didn't require writing JavaScript code.

To the extent you had to configure things, you did so by positioning them in the project's hierarchical scope. Throughout the process, you could both think about the structure of the site at a high level, as well as directly visualize that structure in an interactive graph diagram that showed the live state of the site.

This concludes the tutorial.

&nbsp;

Back to [Framework](/framework/)
