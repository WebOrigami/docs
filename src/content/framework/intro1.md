---
title: Creating digital content through transformation
---

If you want to create a very, very simple digital artifact for someone else — an email, a document, a picture — you may be able to just create the thing directly and share it with them.

<figure>
  <img src="/assets/illustrations/artifact.svg">
</figure>

But many kinds of digital artifacts are too complex or repetitive to create by hand.

## Complex content requires multiple steps

Looking at the
<a href="/samples/aboutUs" target="_blank">sample About Us area</a>
you want to build for your team, you can see a certain amount of repetition:

- The main page shows each person in the list the same way.
- The individual pages for each person each have the same structure.
- The URLs for the person pages each incorporate the person's name.

This site is so basic that you _could_ build it by hand — but most sites are more complex than this. And even this simple site would be hard to maintain. If you wanted to change the way a person is presented, you would have to make that change in multiple places.

Given that, it's often more convenient and reliable to use software to automate the things that are automatable, like calculations or repetition. You write your content in an initial form, then use software to transform that into the result you want to share.

Let's call the thing you create directly the _source form_ and the final result the _result form_.

<figure>
  <img src="/assets/illustrations/transformation.svg">
</figure>

You might create the source form by typing stuff out of your head, or by gathering bits of stuff from the web. For a website project like this About Us site, the source form is text, data, and images. This source form represents, in some way or another, the seed of everything necessary to grow the site you want.

You will define a series of computer-assisted _transformations_ to produce the result form: an immediately consumable representation of your idea, in this tutorial a final set of HTML pages that your audience can view directly in their browser. In some cases, you will need to put the source form through multiple transformations, in which the content takes on a series of intermediate forms before achieving its result form.

This result form is the last form of the idea that's in your hands — after you publish it, it may get transformed further by various network services. And the files you give your users are themselves processed by the user's browser to further transform the content into the pixels a user can finally perceive on their screen. But for your part in the process, the result form is the end product.

Graph Origami takes its name from the paper-folding art of origami, in which you can take a flat square of paper (the source form) and apply a series of folds (the transformations) to produce an artwork (the result form).

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

Each individual step is simple, but the cumulative result can be complex.

You can approach the creation of digital content the same way. Like the square of paper and the series of folds that produce an origami artwork, the source form of your site and the transformations you define will embody everything needed to create the result form. That enables you to repeat the transformation on demand to reliably recreate the result form.

## Source form of the About Us site

If your goal is to build this About Us site, what's the most convenient source form of the content you must create or gather by hand?

The tutorial project includes a `src/public` folder containing the resources that will make up the source form. For starters, your site needs to show a bit of information about each person on your team. A convenient form for that amount of data is a YAML file. You could also use a JSON file or another format for this data, but this tutorial uses YAML because it's easier to read.

<span class="tutorialStep"></span> Open the team data file in `src/public/team.yaml`:

```{{'yaml'}}
{{ framework-intro/src/team.yaml }}
```

One thing is clear: this data is too boring.

<span class="tutorialStep"></span> Update the names in `team.yaml` to use your name and the names of family members or friends. _That will make this tutorial much more fun to complete._

The `src/public` folder contains some other resources:

- An `images` folder containing stock images to use as the full-size team member photos. In a real About Us site, you'd have real headshots for person.
- A CSS stylesheet, `styles.css`, embodying the site's visual aesthetics.
- An SVG image, `personIcon.svg`, showing an icon of a person.

This `src/public` folder contains most of the raw materials necessary to build the About Us site. In the subsequent steps of this tutorial, you'll add more files to `src/public` and the top-level `src` folder to define the transformation that will produce the site as a result.

For now, the `src` folder contains a little JavaScript file, `greet.js`, that will be used to show how Graph Origami can work with JavaScript code.

Your work ahead is to define the transformation of this source form into the final result form that visitors can browse.

&nbsp;

Next: [Explorable graphs](intro2.html) »
