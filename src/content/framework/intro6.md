---
title: Deploy a site as static files
numberHeadings: true
intro = client/samples/frameworkIntro:
---

## Review the structure of the site

Your goal in this tutorial has been to build a basic About Us area. You started with a simple `team.yaml` data file, then applied a series of graph transformations to create the following virtual graph:

<figure>
  {{ svg intro/siteFull.yaml }}
</figure>

This meets the functional requirements of our goal. You could add more data to the team.yaml file, add more HTML elements to the index page template and the individual person template, add real headshot photos, etc., but from a functional standpoint you're finished.

You could deploy this project as it stands, running the small ori web server on a hosted machine somewhere. That might be appropriate if the site contained dynamic portions that would need to be reevaluated on each request.

However, like many sites, this particular site is fundamentally static in nature. You can render all the pages and other necessary resources and deploy them as static files on a CDN (Content Delivery Network). That will be cheaper, faster, and more reliable.

## Build static web pages

To render the site's pages and other resources, you can take the above graph of virtual files and make those files real.

The ori command-line tool has a built-in [copy](/cli/builtins.html#copy) function that can copy one graph into another. You can use that `copy` function to copy a virtual graph into a graph of real files in the file system.

<span class="tutorialStep"></span> In the terminal, stop the server with Ctrl+C, and issue the following command:

```console
$ ori copy virtual/src, files/dist
```

This copies the entire virtual graph represented by the `src` folder into a new filesystem folder called `dist`.

<span class="tutorialStep"></span> Inspect the `dist` folder. In addition to all the source files you created by hand, you should now also see:

- A real `avatars` folder with real SVG images for each team member.
- A real `index.html` page with HTML to create a tile for each team member.
- A real `team` folder with real HTML pages for each team member.

<span class="tutorialStep"></span> Restart the server and browse the `dist` route in the served site. You should see a fully functional About Us area that's identical to the one visible at the `src` route — only the `dist` version is backed entirely by static files.

Some of the source files you created by hand or copied in, such as `styles.css`, are necessary to run the site, but the formula files aren't necessary. It's possible to filter out the files you don't need, but for now you can leave them in the `dist` folder; deploying them is harmless.

At this point, you could deploy the About Us site by copying the `dist` folder to a CDN or some other network-visible location. The specific instructions for doing that will depend on where you want to deploy the files, which is beyond the scope of this tutorial.

## Conclusion

Through this tutorial, you created a small but functionally meaningful About Us site.

- You started with a real data file that you can consider as a graph of data.
- You created virtual files and folders with formulas.
- Those formulas transform the data graph in various ways to create a virtual graphs of avatars, HTML fragments, or HTML pages.
- The final result involves no JavaScript code. In an Origami project, you often just need JavaScript to define the one-to-one transformations you would like to perform. The many-to-many transformations — of people to HTML pages, say — can be accomplished with formulas.
- You rendered the virtual graph of the site into real files that can be deployed directly.

This concludes the tutorial.

&nbsp;

Back to [Framework](index.html)
