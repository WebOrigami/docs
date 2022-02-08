---
title: Intro to Egret
---

Egret is a framework for transforming digital content — data, files, and other resources — into forms that can be viewed and used by your audience.

This introduction leads you through how Egret could be used to create an "About Us" area for a sample website.

## Start

pika copy stuff locally
or launch StackBlitz

### Start a local server

There are a variety of ways to incorporate Egret or its output into an existing web server or a larger project, but for this introduction, you'll use the server built into the companion [pika](/pika) command-line tool.

Open a terminal window in the project's root directory, then run the following command:

```console
$ pika serve
Server running at http://localhost:5000
```

You should be able to open http://localhost:5000 and see a listing of the project files. At the moment, all of the files you see are regular files in the file system.

## Step 1: Create virtual files with formulas

The Egret framework lets you quickly create virtual files by putting formulas _in file names_.

In a code editor, open the sample project and view the contents of the `step1` folder. This folder is initially empty.

In the `step1` folder, create a new, empty file with the following name:

```console
message = 'Hello, world!'
```

The file name should be that whole formula, including the `=` sign and the single quotes.

- The left-hand side of the formula defines the name of a virtual file, `message`.
- The right-hand side is an expression that will be evaluated to determine the value or contents of that virtual file. Here the virtual `message` file will be a text string.

Without needing to do anything else, point your browser at http://localhost:5000/step1. You should now see a listing that includes the real file you just created, as well as the virtual `message` file the formula implies.

If you click on the name of that virtual `message` file, you will navigate to a page called http://localhost:5000/step1/message that says "Hello, world!"

The `pika` web server you started earlier is aware of Egret formulas. The server will parse file names that contain formulas with an `=` sign and interpret them. The file name itself is sufficient to define the behavior. The file itself can be empty, although the file itself may also contain useful information used by the formula.

### Call a function

In your code editor, open the `step2` folder. It contains just a JavaScript module, `greet.js`, that defines a "Hello, world" function:

```js
// greet.js
export default (name = "world") => `Hello, <strong>${name}</strong>!`;
```

This function generates an HTML fragment that greets a person by name if a name is supplied (or just says "Hello, world!" if no name is given).

You can use this `greet` formula in an Egret function to generate the contents of a virtual file.

As before, create a new file and set its name to the entire formula below:

```console
hello.html = greet()
```

This will define a virtual file called `hello.html`. The value or contents of that virtual file will be the result of invoking the function exported by the `greet.js` module. Egret follows a convention that `greet` is a reference to the whatever is exported by `greet.js`. In this case, that's a function that can be invoked.

If you open http://localhost:5000/step2/hello.html, you'll now see "Hello, **world**!".

Each time you ask for `hello.html`, the web server will evaluate the formula you defined.

### Pass an argument to a function

You can pass arguments to function like `greet`. Still in the `step2` folder, create a new file called:

```console
alice.html = greet('Alice')
```

Be sure to use single quotes, not double quotes. Egret won't recognize double quotes, because they're not supported in Windows file names.

You should now be able to open http://localhost:5000/step2/alice.html to see "Hello, **Alice**!"

Although the `greet()` function here is simplistic, you could do anything you want in this JavaScript to construct the HTML you want: read data, invoke a template engine, etc. If the function is asynchronous, Egret will `await` the result before serving it to the browser.

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
