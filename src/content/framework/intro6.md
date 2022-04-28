---
title: Deploying a site
numberHeadings: true
intro = client/samples/frameworkIntro:
---

## Reviewing the structure of the site

Our goal in this tutorial has been to build a basic About Us area. We started with a simple `team.yaml` data file, then applied a series of graph transformations to create the following virtual graph:

<figure>
  {{ svg intro/siteFull.yaml }}
</figure>

This meets the functional requirements of our goal. We could add more data to the team.yaml file, and more HTML elements to the index page template and the individual person template, but from a functional standpoint we're finished.

We could deploy this project as it stands, running the small ori web server on a hosted machine somewhere. That might be necessary if the site contained some dynamic portions that would need to be reevaluated on each request.

However, like many sites, this particular site is simple and fundamentally static in nature. We can render all the pages and other resources we need and then deploy them as static files on a CDN. That will be cheaper, more reliable, and more performant.

## Building static web pages

To render the site's pages and other resources, we can take the above graph of virtual files and make those files real.

The Origami command-line interface has a built-in [copy](/cli/builtins.html#copy) function that can copy one graph into another. We can use that `copy` command to copy a virtual graph into a graph of real files in the file system.

In the terminal, issue the following command. (If you're currently running the ori server, you can stop it with Ctrl+C.)

```console
$ ori copy virtual/src, files/dist
```

This will copy the entire virtual graph represented by the `src` folder into a new filesystem folder called `dist`.

When this completes, inspect the `dist` folder. In addition to all the source files you created by hand, you should now also see:

- An `avatars` folders, with SVG images for each team member.
- An `index.html` page, with HTML to create a tile for each team member.
- A `team` folder, with individual HTML pages for each team member.

If you browse the `dist` route in the served site, you should see a fully functional About Us area that's identical to the one visible at the `src` route — only the `dist` version is backed entirely by static files.

Some of the source files you created by hand or copied in, such as `styles.css`, are necessary to run the site. Others are not necessary. It's possible to filter out the files you don't need, but for now we can leave those files in the `dist` folder; deploying them would be harmless.

At this point, you could deploy the About Us site by copying the `dist` folder to a CDN or some other network-visible location. The specific instructions for doing that will depend on where you want to deploy the files, and so is beyond the scope of this tutorial.

## Take-aways

Through this tutorial, you created a small but functionally meaningful About Us site.

- You started with a real data file that could be viewed as a graph of data.
- You created virtual files and folders with formulas.
- Those formulas transformed data graph in various ways to create virtual graphs of avatars, HTML fragments, or HTML pages.
- The final result involved no JavaScript code. In an Origami project, you often just need JavaScript to define the one-to-one transformations you would like to perform. The many-to-many transformations — of people to HTML pages, say — can be accomplished with formulas.
- You rendered the virtual graph of the site into real files that could be deployed directly.

This concludes the tutorial.

Back to [Framework](index.html)
