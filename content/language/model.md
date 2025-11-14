---
title: The Content/Transformation model
subtitle: How to think about making a site
---

The Content/Transformation conceptual model forms the basis for Origami, but is general and you can use it anywhere.

This is background reading. If you’d prefer to jump straight in, try the [blog tutorial](tutorial.html) or read about [expressions](expressions.html).

## Introduction

Making a site would be so much easier if the web came with a good conceptual model for thinking about site construction.

If you’re making a spreadsheet, the spreadsheet grid provides a vital conceptual and spatial scaffold for your work, helping you break down your data entry and analysis tasks into manageable parts. The web offers nothing like that grid.

This Content/Transformation model fills that gap, giving you a way to think about making your site.

## A site is indirect communication

A site is an indirect way to communicate an idea. Compare it to the direct communication possible with face-to-face speech:

![Abstract diagram of a person talking to an audience of one, with an arrow labeled “I love this book”](/assets/model/speech.png)

Talking to people is wonderful but limits how many people you can reach. Your ideas will travel much farther if you create a digital artifact of some kind — a document, a picture, a video — and email it, print it, or post it somewhere.

![Abstract person writes a document titled “I love this book”, and in a second step the audience member reads it](/assets/model/document.png)

This kind of communication is more indirect and labor-intensive but consequently more powerful.

## Vanilla HTML and CSS

You can even create a site this way! You can write some HTML and CSS files and post them on the internet somewhere.

![Abstract person creates a web page titled “I love this book” and in a second step the audience member reads it](/assets/model/site.png)

For small sites this isn’t unreasonable, but it can quickly become unwieldy.

Suppose you’re making a personal site and want to have a page about books you like:

![Library web page showing book covers for ten books with titles and authors](/assets/model/library.png)
_Library page on [Nick Simson’s personal site](https://www.nicksimson.com/library), used here with his permission_

Maybe you’ve kept your book information in a table:

![](/assets/model/table.png)

And now manually write that out as the corresponding HTML:

![](/assets/model/html.png)

The HTML representation of this data is great for a computer to read, but it’s repetitive, visually noisy, and cumbersome to write by hand.

The problem compounds if you want to create a separate page for each book. Updating many HTML pages by hand is also time-consuming and error-prone. If you have copies of navigation links on every page, for example, it’s tedious to update those links whenever you reorganize your site. You can easily break a link somewhere and not even notice.

## Creating through transformation

So nearly all sites use software to automate all the things that are automatable, like calculations and repetition. This results in an additional level of indirection, so you must create _two_ things instead of one:

The source **content**: The stuff you type out of your head or gather from elsewhere. For a personal site, the source content will typically be a pile of text files, plus data, images, and so on.

The **transformation**: A set of computer instructions (i.e., software) that can expand or build the source content into the desired result. The result is typically a new pile of files: some in the original form in which you created them, others generated from the source content.

The path between you and your audience now has more steps:

![Abstract person creating source content and transformation, with arrows showing that built into HTML read by the audience member](/assets/model/transformation.png)

You create content and a transformation, then apply the transformation to the content to produce something you can share.

As an analogy, consider the traditional paper folding art of origami, in which you transform a flat square of paper into an artwork.

<figure style="align-items: center; display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); justify-items: center;">
  <img src="/assets/heart/step1.svg">
  <img src="/assets/heart/step2.svg">
  <img src="/assets/heart/step3.svg">
  <img src="/assets/heart/step4.svg">
  <img src="/assets/heart/step5.svg">
  <img src="/assets/heart/step6.svg">
  <img src="/assets/heart/step7.svg">
  <img src="/assets/heart/step8.svg">
</figure>

Here the paper is the content, and the transformation is the series of folds.

You can make a site the same way. The transformation can read in the content files you can write and transform it into another set of files your users can browse. Such a transformation is called a _static site generator_, where “static” means “stuff that doesn’t change from moment to moment”. Most sites are, or could be, static sites.

Where does the transformation come from? There are many approaches, but we can group them into general strategies and consider their pros and cons.

Most guidance for new site creators starts with the easiest approaches for non-technical people, but we’ll start with the most technical answer because, from the standpoint of our communication model, it’s actually the simplest approach.

## Write a program yourself

If you’re a programmer, it’s possible to write a program from scratch in a language like JavaScript or Python that acts as the transformation to make your site.

Instead of you writing the library page HTML by hand, you view that HTML as your program’s desired output. From that, you can work backwards to determine the most suitable form for your source content.

The source content should be both easy for you to write and easy for your program to transform. For these reasons you want the content to be as concise as possible, relying on your transformation program to expand it — to fill in all the repetitive parts — and to automate tasks like creating links between everything.

For a list of books, a [YAML](https://en.wikipedia.org/wiki/YAML) data file is a concise (albeit geeky) format that’s relatively easy for both people and programs to read and write:

![YAML data file for a list of books, with title, author, URL, and a cover image file name](/assets/model/yaml.png)

To transform this data into HTML you can write a template: a file containing regular HTML plus placeholders indicating where data should go. There are many specialized template languages for this purpose, and they generally look something like this:

```ori
<ul class="list-unstyled auto-grid">
  \${ Tree.map (books, (book) => Tree.indent`
    <li class="lib-item">
      <a href="\${ book.url }" class="lib-title">
        <img class="lib-cover" src="/img/library/\${ book.cover }">
        <span class="lib-title">\${ book.title }</span>
      </a>
      <span class="lib-author">by \${ book.author }</span>
    </li>
  `) }
</ul>
```

If you can write HTML, it’s only a little harder to write an HTML template.

A bigger challenge in coding your own transformation program is usually working with the file system: reading in the YAML data and the template, applying the template to the data, and then writing that out as an HTML file.

If you can write a program to do that, your communication diagram looks like:

![Abstract person creates text/data and code/templates, which are combined to built HTML read by an audience member](/assets/model/program.png)

That’s not too much work for many programmers, but is daunting enough that few people teach themselves how to do it.

That said, with the right programming model and language, coding a site doesn't have to be hard. Origami is designed for people who want to make sites this way: writing a program to transform the content they create into a site. Origami aims to be the easiest, most concise way to create a site. The necessary program is often fairly simple and not that long.

That said, the programming approach isn’t appropriate for everyone or for every project. For comparison, let’s look at some other ways you could make a site.

## Use a site framework

Even programmers don’t typically write their own site-generating program; they build instead on top of a site-generating _framework_ created by someone else. Popular site frameworks these days include [Astro](https://astro.build/), [Eleventy](https://www.11ty.dev/), [Gatsby](https://www.gatsbyjs.com/), and [Hugo](https://gohugo.io/); there are literally hundreds of others.

A framework provides you a ready-to-use transformation so that you can quickly produce a working site. The transformation relies on knowing the structure and format of your source content, so it will suggest how to organize your files: put your blog posts in this folder, put your artwork in that folder, etc. It will also give you a set of editable templates: this template turns a blog post into HTML, that template turns a list of posts into an index page, and so on.

This can make it much easier for you to get started, but in exchange a framework must necessarily be constrained in what it can easily transform and what it can produce. The framework will probably not create exactly what you want, and as a creative person, it’s likely you will want to change _something_ about your site. You may discover you have no idea about how to proceed.

A framework’s marketing usually pretends it is unnecessary for you to understand how its core transformation works — but without that knowledge, you can’t achieve the beautiful range of results you see in the framework’s sample site gallery.

To give you some degree of flexibility, a framework lets you influence its transformation through _configuration_. You usually can configure things to, for example, change the names or structure of your source folders. Configuring a framework is typically done by writing a configuration file (possibly in YAML or [JSON](https://en.wikipedia.org/wiki/JSON) format) or editing boilerplate code files.

![Long JavaScript code file labeled eleventy.config.js](/assets/model/eleventy.png)
_Portion of JavaScript configuration file for the blog starter project in Eleventy, a popular framework._

This is an even more indirect means of communication. Instead of designing the transformation, you’re trying to convince someone else’s preexisting general transformation to produce your specific desired result:

![Abstract person creates configuration that is fed to a transformation that builds the source content into HTML that is read by an audience member](/assets/model/config.png)

Getting your message out has gotten complicated!

Configuration can lead to as many problems as it solves:

- You may discover your framework is inflexible on a specific point you need it to be and you’re completely out of luck.
- The more your configuration diverges from what everyone else is doing, the more likely you are to find bugs in the framework: option A may conflict with option B.
- Configuring software is itself a form of programming, in fact a rather difficult and often baroque form. It can take more data files or code to configure a framework’s transformation than to write a program that directly implements that transformation itself.

Configuring software without a real understanding of how it works can be frustrating, and often leads to uncomfortably superstitious thinking: “My navigation looks good with option A on but then the header’s ugly, but if A is off the header looks wrong on mobile. I saw that if you want to use option A you might need to disable option B… Maybe that will work?!?”

You may be happiest with a framework if the default results — or some very lightly-configured variation — are good enough for you.

## Use a hosted site authoring platform

Generally speaking, most creative people would rather create content than sites.

Even the easiest programming language or web framework requires that you master basic technical skills: using a command terminal, installing software packages, and working with source code control systems. That’s more than most people want to learn, and even people who are capable of those things may want to avoid getting bogged down by such tinkering.

In response, many companies develop site creation tools you can use in your browser, including such well-known services as [WordPress.com](https://wordpress.com/) and [SquareSpace](https://www.squarespace.com/).

These site hosting platforms typically charge an ongoing subscription fee. (Some offer a free tier that may meet your needs.) The monthly fee may not be large, but it’s forever. Ten years from now you’ll probably still want your content to be publicly available, but will you still be happy paying that monthly fee? If you stop paying, your site disappears.

You do get value for your money:

- The hosting platform gives you a browser-hosted environment complete with all the tools you need to create your content and publish your site.
- The platform provides the transformation software, documentation, and support.
- Under the hood, the platform will use the same HTML template systems available to programmers. On top of this they will often provide a visual editor that lets you edit a template without having to know the underlying template language.
- Most platforms offer a wide collection of themes to quickly change the visual appearance or navigational structure of your site.

Like a framework, a site hosting platform doesn’t give you full control over the transformation; it only lets you influence its transformation through configuration.

The same diagram shown for a framework applies here, with the main difference that the browser-hosted tools may be a friendlier way to edit configuration options and templates. Large platforms offer a universe of plug-ins with additional configuration options of their own.

All this configuration can be just as constraining and finicky as configuring a web framework, sometimes more so — friendly user interfaces often impose many constraints.

Hosting platforms need to make assumptions about the types of sites people want to make, and reasonably focus on common types of sites such as blogs or small stores. If you want to do something custom — a Library page, say — you’ll be working against the grain. The platform may let you repurpose existing features for your needs (defining books as blog posts, say), but the further you get from the well-trodden paths, the harder this will be. A plugin may do what you want, but you may be unable to use that plugin unless you upgrade to a more expensive service tier.

## Making a thoughtful selection

You can apply this conceptual model whenever starting a new site or helping someone through that process. It’s helpful to think early about the best form for your site’s source content so that it can be readily transformed into your final site.

You are almost always best off picking an approach with a transformation that’s as direct as possible — one you can understand and control. That doesn’t mean everyone should be a programmer; even a WordPress user can learn quite a lot about how it works and be happier with their site if they do.

- Regardless of the approach you pick, start simply. Publishing your content in the plainest possible form lets you begin communicating your ideas to your audience. Add bells and whistles later.
- Be aware of the future complications that will result from configuring things.
- Consider the possibility of tackling an approach that lets you create things more directly. This may entail more time up front but less time over the long run.

Above all, consider how the way you make your site will constrain or expand your creative freedom, and the degree to which that’s important for the content you want to share.

If you’re interested in seeing how Origami directly supports this Content/Transformation model, try the creating a basic blog in the [blog tutorial](tutorial.html).
