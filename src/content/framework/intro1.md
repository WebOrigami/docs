---
title: Creating digital content through transformation
---

If you want to create a very, very simple digital content for someone else, you may be able to just create the thing directly — a document, an email, a picture — and share it with them.

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

You might create the source form by typing stuff out of your head, or by gathering bits of stuff from the web. This source form represents, in some way or another, the seed of everything necessary to grow the thing you want. For a coding project like this About Us site, the source form is the files you would check into a source control system. If you're currently looking at the tutorial project in code editor right now, you're looking at the source form.

You will define a series of computer-assisted _transformations_ to produce the result form: an immediately consumable representation of your idea, such as a final set of HTML pages that your audience can view directly in their browser. In some cases, you will need to put the source form through multiple transformations, in which the content takes on a series of intermediate forms before achieving its result form.

This result form is the last form of the idea that's in your hands — after you publish it, it may get transformed further by various network services, but for your purposes it's the end product.

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

If your goal is to build this About Us site, what's the most convenient source form of the content you will create by hand?

There are lots of ways you can define content in software:

- Content files like text or images
- Data files
- JavaScript or other code
- Databases
- Web services

So let's consider the best source form for this particular About Us example.

The tutorial project includes a `src/public` folder containing some of the resources that will make up the source form. For starters, your site needs to show a bit of information about each person on your team. A convenient form for that amount of data might be a YAML file.

<span class="tutorialStep"></span> Open the team data file in `src/public/team.yaml`:

```{{'yaml'}}
{{ framework-intro/src/public/team.yaml }}
```

You could use a JSON file or other formats to store this data, but this tutorial will use YAML because it's easier to read and edit by hand.

Looking at the above data, it's obvious that it's too boring.

<span class="tutorialStep"></span> Update the names in `team.yaml` to use your name and the names of family members or friends. _That will make this tutorial much more fun._

(If you're using StackBlitz, it may display a message saying "Project forked" to indicate that you're now working in your own copy of the tutorial project. You may need to restart the Origami server with `npm start`.)

The `src/public` folder contains some other resources:

- An `images` folder containing stock images to use as the full-size team member photos. In a real About Us site, you'd have real headshots for person.
- A CSS stylesheet, `styles.css`, embodying the site's visual aesthetics.
- An SVG image, `personIcon.svg`, showing an icon of a person.

Lastly, the `src` folder also contains a little JavaScript file, `greet.js`, that will be used to show how Graph Origami can work with JavaScript code.

This `src` folder contains most of the raw materials necessary to build the About Us site. Your work ahead is to define transformations of this material into the final result form that visitors can browse.

&nbsp;

Next: [Explorable graphs](intro2.html) »
