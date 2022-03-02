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

Given this pipeline, ask yourself:

1. What is the final form of the content I want to publish?
1. What is the most appropriate starting form for the content I can start with?
1. How am I going to transform the starting form into the final usable artifact?

Most designers and developers will ultimately touch on these questions, but often don't ask them directly. Doing so can give you a better understanding of what you are trying to do, and thereby help you do whatever it is better and more easily.

Egret is a mental paradigm and programming framework for doing this.

## Desired final form of the About Us content

--> graph diagram

--> index page

--> person page

## Considering the initial form of digital content

Now that you know what you want to end up with, you have to consider what you want to start with.

Where could the data come from?

- Your head. You'll have to type it out.
- Other people's heads. You'll need to ask them for the data, then copy/paste it or ask them to enter it.
- Documents, data bases, web resources. You'll have to search for it, then copy/paste or otherwise extract it.
- APIs. You'll have to write code to access it. Depending on the API, you may have to arrange for authentication, etc.

Your goals may include:

- Time efficiency. Some forms of data may be easier to type in, but then harder to work with in code.
- Labor efficiency. Some methods of data entry or gathering take longer but are more mechanical and therefore easier — or, alternatively, more mind-numbing.
- Repeatability. Can the source data change? How frequently? How much of a hassle will it be to go through the process of gathering the data again? Can you put the data somewhere where other people can easily contribute to it?
- Clarity and learnability. Will you always be around to update how things work? How self-evident is the initial form of the data? You yourself may be the person who has to update the data a year from now, so making things clearer to others may also make things clearer to future self.
- Cost avoidance. Someone may offer the exact data you need but charge for it.
- Risk minimization. A simple approach may have the benefit of being less likely to hit surprises.
- Rot mitigation. Over time, external sources of data may disappear.
- Similarity to solutions already in use in your organization.
- Balance your effort in entering/gathering data with your effort in expressing the sequence of transformations that get that content into the final form.

These goals may conflict. It may be much simpler to get started by copying and pasting data from existing documents, but this itself is a form of duplication and can create maintenance burdens later on when the source data changes. On the other hand, copied data will be available if the online source of that data disappears.

In most cases, you'll be creating digital content as files or resources. Forms of data vary in how easy or hard they are to work with programmatically.

- Easy to work with programmatically: text files
- Need to be parsed: JSON, YAML, HTML, CSS
- Binary formats that are often harder to program against: images, audio clips, videos
- Proprietary formats are often difficult as well: spreadsheets, rich text
- Proprietary APIs can present data format challenges, as well as security complexity

## Choosing the initial form of the About Us content

For this sample About Us project, let's assume your organization is small: a team of 10 people. Let's also assume the team doesn't change very often, so the About Us page won't change often. You don't have that much data to present for each person. The data will change from time to time however, so you'll want something that's easy for you (or your replacement someday) to update.

At this small scale, let's say that you decide on the following:

- The primary data will be stored in a YAML file.
- This file will contain an array of person records
- A person record will include their name, position, location, and a bio
- A headshot photo of each person will be stored in a folder
- A person record will include a unique ID that can associate their YAML record with their photo in the headshots folder

--> graph diagram

## Identifying the necessary transformations

Given the initial conception of the starting form of the content and the desired final form, you'll have to conceptually transform this content in several ways. These include:

1. Transform the array of person records into a graph keyed by a person's unique ID.
1. Transform the graph of person records into a graph of HTML.
1. Transform the graph of person records into an index page. For each person, create a tile representing them and a link to their full bio.

With that, you now have a good sense of what content you're going to create by hand, what you want to end up with, and how you're going to make that transformation happen. You're now ready to start building.

Next: [Rough in the site structure](intro3.html)
