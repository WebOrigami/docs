---
title: Creating digital content through transformation
---

If you want to create some very, very simple digital content for someone else, you may be able to just create the thing directly — a document, an email, a picture — and share it with them.

<figure>
  <img src="/assets/illustrations/artifact.svg">
</figure>

**[update diagram]**

But many kinds of digital artifacts are too complex, repetitive, or error-prone to perform by hand.

## Complex content requires multiple steps

Looking at the [sample About Us area](/samples/aboutUs) you want to build for your team, for example, you can see a certain amount of repetition:

- The main page shows each person in the list the same way.
- The individual pages for each person each have the same structure.

This extremely basic About Us site happens to be simple enough that you _could_ build it by hand — but most sites are more complex than this. And even this simple site would be hard to maintain. If you wanted to change the way a person is presented, you would have to make that change in multiple places.

Given that, it will be more convenient and reliable to use software to automate things that are automatable, like calculations or repetition. You will write your content in an initial form, then use software to transform that into the result you want to share.

Let's call the thing you create directly the _source form_.

<figure>
  <img src="/assets/illustrations/sourceAndResult.svg">
</figure>

**[update diagram]**

You might create the source form by typing stuff out of your head, or by gathering bits of stuff from the web. This source form represents, in some way or another, everything necessary to grow the thing you want. For a coding project, this source form is what you would check into a source control system.

You then use a series of computer-assisted _transformations_ to produce the _result form_, which is what you can share. The result form is typically a immediately consumable representation of your idea, such as a final set of HTML pages that your audience can view directly in their browser. This result form is the last form of the idea that's in your hands — after you publish it, it may get transformed further (by a content distribution network, say), but for your purposes, it's the end product.

Like a square of paper that becomes an origami artwork, the source form embodies everything needed to create the result form. That enables you to _repeat_ the transformation process on demand. Whenever you change the source form, you can reliably recreate the result form.

Graph Origami takes its name from the paper-folding art of origami, in which you can turn a flat square of paper (the source form) into an artwork (the result form) through a series of folds (the transformations).

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

Each individual step is simple, but the cumulative result can be complex. You can approach the creation of digital content the same way.

## Source form of the About Us site

If your goal is to build this About Us area, then what's the most convenient source form of the content you will create by hand?

There are lots of ways you can define content in software:

- Content files like text or images
- Data files
- JavaScript or other code
- Databases
- Web services

What's the best source form for this particular About Us example? The tutorial project includes a `src` folder containing the various resources that make up the source form.

For starters, your site needs to show a bit of information about each person on your team. A convenient form for that amount of data might be a YAML file:

```{{'yaml'}}
{{ framework-intro/team.yaml }}
```

You could use a JSON file or other formats to store that data, but most formats won't as easy to write by hand.

<span class="tutorialStep"></span> Update the names in `team.yaml` to use your name and the names of family members or friends. _That will make this tutorial much more fun._

(If you're using StackBlitz, it may display a message saying "Project forked" to indicate that you're now working in your own copy of the tutorial project. You may need to restart the Origami server with `ori serve`.)

Other resources in your site's source form include:

- A collection of headshot photos. This tutorial provides some stock images to use in place of real headshots. To simplify organization, the photos have been grouped into a `src/photos` folder.
- A CSS stylesheet, `styles.css`, embodying the visual aesthetics of the site.
- An SVG image, `personIcon.svg`, showing an icon of a person.

This `src` folder contains most of the raw materials necessary to build the About Us site. The work ahead is to transform this material into the final result form that visitors can browse.

&nbsp;

Next: [Graphs](intro2.html) »
