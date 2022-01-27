---
title: Software design as content transformation
---

A useful way to approach software design problems is to think about _transformation_:

1. What is the final form of the content I want to end up with?
1. What is the form of the content I can start with?
1. How am I going to transform the starting content into the end result?

Most designers and developers will ultimately touch on these questions, but often don't ask them directly. Doing so can give you a better understanding of what you are trying to do, and thereby help you do whatever it is better and more easily.

## Creating things for people

![](artifact.svg)

![](transformation.svg)

## Final form of the content

## Starting form of the content

Where is the data going to come from?

- Your head. You'll have to type it out.
- Other people's heads. You'll need to ask them for the data.
- documents.
- web pages. Will need to copy it, download it, scrape it, etc.
- APIs

Your goals may include:

- be efficient with time
- be efficient with brainpower
- avoid costs. Someone may offer the exact data you need but charge for it.
- minimize risk. If the data you want to start with exists in an online web page, may be easier to do brute force copy-and-paste than to write code to programmatically scrape it.
- avoid making yourself a bottleneck. Can you put the data somewhere where other people can easily contribute to it?
- ensure clarity, legibility
- minimize maintenance costs
- minimize duplication

These goals may conflict. It may be much simpler to get started by copying and pasting data from existing documents, but this itself is a form of duplication and can create maintenance burdens later on when the source data changes.

Forms of data that are usually easy to work with in JavaScript

- data files: JSON, YAML
- text files

Harder:

- image/audio/video files
- APIs. Authentication, learning curve, resiliency

Hard:

- Spreadsheets
- rich text
