---
title: Intro to Egret
---

## Start

pika copy stuff locally
or launch StackBlitz

## Creating a site's About Us area

Suppose you've been given the task of designing and developing an "About Us" area for your organization's site. The main About Us index page will need to include a list of people on the team, with links to separate pages for each team member. A team member's page includes their position, bio, and a photo.

Asking yourself the [content transformation questions](transformation.html), consider:

1. What is the final form of the content I want to end up with?
1. What is the form of the content I can start with?
1. How am I going to transform the starting content into the end result?

Before going further, think for a moment about how you would approach this engineering problem.

Let's consider these questions in turn.

## Question 2: What is the content's final form?

--> graph diagram

--> index page

--> person page

## Question 1: What is the starting form of the content?

often need to work on both these questions at the same time

small team of 10 people
the team may have some sort of basic cloud-hosted HR or payroll system with names, roles, and a few other bits of data like location
will probably want to convert this to a table
will also need to ask for bios
can put all this into some form that can be easily read programmatically
photo comes separately

--> graph diagram

## Question 3: What transformations need to take place?

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

## Transformation #1: Picking a field to use as a key

```console
$ pika addIndex team.yaml, "'name'"
Alice:
  name: Alice
Bob:
  name: Bob
Carol:
  name: Carol
```

## Transformation #2: Mapping data to HTML

## Serving the HTML

## Transformation #3: Creating an index page

## Building static web pages

```console
$ pika copy app/html, files/dist
```

## Deploying

## Adding images

## Adding more data
