---
title: Virtual content
---

It's helpful to distinguish between:

- **Real content.** For our purposes, "real" means _persistent_: data, files, and other resources stored on a computer somewhere and which exist even if your code is not running.
- **Virtual content.** These are data, files, and other resources that are only accessible while your code is running.

In Graph Origami you can work with real content and virtual content the same way. For example, you can define a virtual HTML file that looks just and acts like a "real" HTML file, but will disappear when your code stops running.

As you work towards creating your site, some of the site's resources will be real, like the CSS stylesheet stored in `src/public/styles.css`. Other content will be virtual. For example, you'll create a virtual `index.html` file that shows a list of your team members.

At the end of the process, you'll use graph tools to turn those virtual files into real files that can be deployed.

## Virtual files for development

As a quick example of virtual content, look at the browser preview of your site. You should see a simple page with the heading "public" and a list of links to the existing real files in the `public` folder.

That page you're looking at is a virtual `index.html` page. It doesn't exist in any persistent form; it only exists while the Graph Origami server is running. Graph Origami provides that default `index.html` page as a convenience so that you can browse through your site while you're still developing it. After you define your own `index.html` page for the site, your page will be used instead.

Graph Origami provides some other virtual, default pages for development purposes.

<span class="tutorialStep"></span> In the address bar for the site preview, type `.svg` and press Enter. (If you're using Glitch: for some reasons Glitch tries to prevent you from typing a page whose name begins with a period. Either cut-and-paste that `.svg` text, or type "svg" and then insert a "." at the beginning.)

You should see the contents of the `public` folder represented as a visual graph, using the same type of diagram shown here in the Graph Origami tutorial.

<figure>
{{ svg framework-intro/src/public }}
</figure>

The graph diagram in your browser is interactive. (The one above is not.)

(Glitch users: if your window isn't large enough to see a useful portion of the diagram in the Glitch preview pane, you can open the preview into its own window by clicking the `⋮` above the preview, then selecting **Open in new window**.)

<span class="tutorialStep"></span> Click on one of the boxes in the diagram. These represent project files. Then press Back or otherwise navigate back to the diagram. Click on one of the little circles in the diagram, which here represent the `public` and `public/images` folders, then navigate back to the diagram.

This `.svg` page is another example of a virtual page provided by Graph Origami to help you explore your site as you're working on it. You can use that as a visual map of what you're building, and return to it whenever you want to see the overall state of the site.

Along the same lines, Graph Origami provides a hidden `.index` page for a graph. This offers the same basic file list as the default `index.html` — it exists so that you can use `.index` even in folders that define an `index.html` page.

## Explorable graphs don't have to expose everything

The previous page explained that an explorable graph can tell you what's inside of it. An important nuance is that such a graph doesn't have to tell you _everything_ that's inside it.

In this case, the Graph Origami server is silently adding some virtual files to the graph of the `public` folder as development tools. These virtual files, like `.svg` or the default `index.html`, are generally hidden in the visual map (like the one shown by `.svg`) and lists of files (like the one in the default `index.html`).

Now it's time to define some virtual files yourself.

&nbsp;

Next: [Metagraphs](intro4.html) »
