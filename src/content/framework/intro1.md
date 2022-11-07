---
title: Creating digital content through transformation
---

Creating digital content generally requires you to create one thing, then turn it into another.

If you want to create something very, very simple for someone else, you may be able to just create the thing (a document, an email, a picture) by hand and give it to them.

<figure>
  <img src="/assets/illustrations/artifact.svg">
</figure>

**[update diagram]**

But many kinds of digital artifacts require multiple steps to create, and those steps may be too complex, repetitive, or error-prone to perform by hand.

The About Us area you want to build, for example, will need to include a certain amount of repetition:

- The main page show each person in the list the same way.
- The individual pages for each person should have the same structure.

In this particular example, the site is simple enough that you _could_ build it by hand. Most sites are more complex than this. And even this simple site would be hard to maintain: if you want to change the way a person is presented, you'll have to make that change in multiple places.

Given that, it will be more convenient and powerful to write your content in an initial form, then use software to transform that into the result you want to share.

Let's call the thing you create directly the _source form_ of what you want to make.

<figure>
  <img src="/assets/illustrations/sourceAndResult.svg">
</figure>

**[update diagram]**

You might create the source form by typing stuff out of your head, or by gathering bits of stuff from the web. This source form represents, in some way or another, everything necessary to build the thing you want. For a coding project, this source form is what you would check into a source control system.

You then use a series of computer-assisted _transformations_ to produce the _result form_, which is what you can share. The result form typically is a lower-level representation of your idea, such as a final set of HTML pages that your audience can view directly in their browser. This result form is the last form of the idea that's in your hands — after you publish it, it may get transformed further (by a content distribution network, say), but for your purposes, it's the end product.

Like a square of paper that becomes an origami artwork, the source form embodies everything needed to create the result form. That enables you to _repeat_ the transformation process on demand. Whenever you change the source form, you can reliably recreate the result form.

## Initial form of the content

If your goal is to build this About Us area, then what's the most convenient initial form of the content you will create by hand?

There are lots of ways you can define content in software:

- Content files like text or images
- Data files
- JavaScript or other code
- Databases
- Web services

What's the best form for this particular About Us example?

**[diagram focusing on source form]**

Your site needs to show a bit of information about each person on your team. The most convenient form for that amount of data might be a YAML file:

```
*** data goes here ***
```

You could use a JSON file or other formats to store that data, but most formats won't as easy to write by hand.

<span class="tutorialStep"></span> Update the names in `team.yaml` to use your name and the names of your family members or friends. This will make this tutorial _much_ more fun to go through!

(If you're using StackBlitz, it may display a message saying "Project forked" to indicate that you're now working in your own copy of the tutorial project. You may need to restart the Origami server with `ori serve`.)

The photos can be kept in the `src/photos` folder.

&nbsp;

Next: [Graphs](intro2.html) »
