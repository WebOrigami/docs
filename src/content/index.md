---
title: Origami
subtitle: A conceptual system and tools for creating websites, documentation, data, and other content
icon: bird.svg
---

{{ templates/blocks.ori() }}

Origami is a set of ideas and tools for building a wide variety of software artifacts and digital content. The system builds on the notion that creating digital things can be productively viewed as an exercise in transformation: turning your starting point into a result you can use and share.

The system is built in a series of layers; you can work at whatever layer(s) you prefer.

At the lowest level, there's a conceptual programming [pattern](/pattern) for representing a wide variety of data types as graphs that can be easily transformed. There's no code at that level, so you can use the ideas without depending on anyone else's code. If you would like to save time and benefit from sharing basic code, that pattern is used as the basis for a small [core library](/core) written in JavaScript.

At the highest levels, there is a [framework](/framework) for expressing the transformations that will create the software or other content you wish to make. There is also a companion [command-line interface](/cli) (CLI) for using the framework in a command terminal. That CLI is also useful as a general tool in its own right for working with JavaScript in the shell. Both the framework and CLI make use of a small [expression language](/language) that lets you concisely describe transformations of simple or complex data.

## Creating things through transformation

The Origami system takes its name from the traditional paper folding art of origami, in which you can transform a flat square of paper into something like a heart, flower, or animal.

<figure style="align-items: center; display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); justify-items: center;">
  <img src="/assets/heart/step1.svg">
  <img src="/assets/heart/step2.svg">
  <img src="/assets/heart/step3.svg">
  <img src="/assets/heart/step4.svg">
  <img src="/assets/heart/step5.svg">
  <img src="/assets/heart/step6.svg">
  <img src="/assets/heart/step7.svg">
  <img src="/assets/heart/step8.svg">
</figure>

Every part of the final result _is present at the start_. It's the sequence of folds that transforms the square of paper into the final artwork.

## Creating digital content through transformation

You can view the creation of a digital work as a transformation too.

If you want to create something very, very simple for someone else, you may be able to just create the thing (a document, an email, a picture) by hand and give it to them.

<figure>
  <img src="/assets/illustrations/artifact.svg">
</figure>

But many kinds of digital artifacts require multiple steps to create, and many of those steps are too complex, tedious, or error-prone to perform by hand. If you're creating a website, for example, chances are that you will want to write some higher-level expression of the desired final result, then use some tool to produce that output.

Let's call the thing you create directly the _source form_ of what you want to make.

<figure>
  <img src="/assets/illustrations/sourceAndResult.svg">
</figure>

You might create the source form by typing stuff out of your head, or by gathering bits of stuff from the web. This source form represents, in some way or another, everything necessary to build the thing you want. For a coding project, this source form is what you would check into a source control system.

You then use a series of computer-assisted _transformations_ to produce the _result form_, which is what you can share. The result form typically is a lower-level representation of your idea, such as a final set of HTML pages that your audience can view directly in their browser. This result form is the last form of the idea that's in your hands — after you publish it, it may get transformed further (by a content distribution network, say), but for your purposes, it's the end product.

Like a square of paper that becomes an origami artwork, the source form embodies everything needed to create the result form. That enables you to _repeat_ the transformation process on demand. Whenever you change the source form, you can reliably recreate the result form.

## Origami as a system for digital content transformation

The Origami system described on this site is a collection of ideas and tools for directly expressing the transformations you need to turn a source form of your idea into a result you can publish.
