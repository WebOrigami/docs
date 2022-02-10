---
title: |
  Intro part 2:
  Designing by identifying transformations
numberHeadings: true
---

This section builds on the [previous section on formulas](intro.html).

## Task statement

As a motivating example, the rest of this introduction leads you through the following hypothetical design and development task:

> _Your team needs to design and implement an "About Us" area for your organization's site. The main About Us page will need to include a list of people on the team, with links to separate pages for each team member. A team member's page should show their position, bio, and a photo._

Before going further, think for a moment about how you would approach this engineering problem.

## Creating digital content through transformation

You can approach creative tasks by thinking about _transformation_.

Given the hypothetical task statement above, you can't directly manifest a site's About Us area out of thin air. The design you have for the area is currently sitting only in your head. You eventually want to end up with something a site visitor can browse.

Somehow you have to get the idea out of your head into some initial digital form. In most cases, it would be inefficient for you to manually create the content in some immediately consumable form. Instead, you'll type or gather data and code into some initial form. You'll then apply various transformations to that content to produce a final artifact that you can make available to your audience.

![](pipeline.svg)

Given this pipeline, ask yourself these questions:

1. What is the final form of the content I want to end up with?
1. What is the most appropriate initial form for the content I can start with?
1. How am I going to transform the starting form into the final usable artifact?

Most designers and developers will ultimately touch on these questions, but often don't ask them directly. Doing so can give you a better understanding of what you are trying to do, and thereby help you do whatever it is better and more easily.

Egret is a mental paradigm and programming framework for doing this.

## Desired final form of the About Us content

--> graph diagram

--> index page

--> person page

## Considering the initial form of digital content

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

often need to work on both these questions at the same time

small team of 10 people
the team may have some sort of basic cloud-hosted HR or payroll system with names, roles, and a few other bits of data like location
will probably want to convert this to a table
will also need to ask for bios
can put all this into some form that can be easily read programmatically
photo comes separately

## Choosing the initial form of the About Us content

--> graph diagram

## Identifying the necessary transformations

Given the initial conception of the starting form of the content and the desired final form, you'll have to conceptually transform this content in several ways

1. Transform the array of person records into a named collection of person records. Will need a unique ID.
1. Transform the person records into an index page. For each person, create a tile representing them and a link to their full bio.
1. Transform an individual person record into HTML.

## A starting point

```console
$ cat team.yaml
- name: Alice
- name: Bob
- name: Carol
```

## An ending point
