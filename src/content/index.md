---
title: Graph Origami
subtitle: A conceptual system and tools for creating websites, documentation, data sets, and other content
icon: bird.svg
area: ""
fileName: index.html
---

{{ templates/blocks.orit(_) }}

Graph Origami is a research project exploring ideas and tools for building a wide variety of software artifacts and digital content. The system encourages you to view creating such things as an exercise in transformation: you take your starting files, data, etc., and transform them step-by-step into a final result you can use and share.

Graph Origami takes its name from the traditional paper folding art of origami, in which you can transform a flat square of paper into something like a heart, flower, or animal.

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

Every part of the final result is present at the start; the sequence of folds transforms the initial square of paper into the artwork. The steps may be simple but the end result can be complex.

In the same way, Graph Origami lets you take content you write and transform it step-by-step into something to share. The system is intended for designers, developers, and content authors.

<iframe style="aspect-ratio: 16/9; max-width: 100%; width: 560px;" src="https://www.youtube.com/embed/H5qu0sHLbi0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Graph Origami is built in a series of layers:

- At the lowest level, there's a conceptual programming [pattern](/pattern/) for representing a wide variety of data types as graphs that can be easily transformed. There's no code at this level; you can use the ideas without depending on another project.
- If you're a programmer and would like to save time and benefit from sharing code, that conceptual pattern is implemented in a small [core library](/core/) written in JavaScript.
- At the highest level, a [framework](/framework/) lets you concisely express transformations that create the software or other content you wish to make.
- There is also a companion [command-line interface](/cli/) (CLI) for using the framework in a command terminal. The CLI is also useful as a general tool in its own right for working with JavaScript in the shell.
- Both the framework and CLI make use of a small [expression language](/language/) that lets you concisely describe transformations of data using formulas similar to those in a spreadsheet.

These layers are independently useful; you can work at whatever layer you prefer.
