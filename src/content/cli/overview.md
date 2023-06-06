---
title: Overview
---

_reference CLI samples folder_

call functions
traverse paths

ori evaluates [expressions] and displays the result in the terminal

- a string in single quotes, or a number
- a file or folder name
- an https: or http: URL
- a name like "foo" that refers to an object/function exported by a project file foo.js
- the name of a built-in function
  custom functions
  traversing into data

**Get the contents of a file** with a name or path:

```
$ ori sample.txt
```

**Get a network data file** and extract a specific value:

```
$ ori "(https://graphorigami.org/samples/templates/teamData.yaml)/1/location"
```

Invoke a function
Pass a string to a function

parens vs slashes

Read input from stdin

Extract a value from a graph

Translate JSON to YAML or vice-versa

Parse JSON or YAML

Render the current file system tree as a graph

Unpack files into the file system

Treat a folder tree as a JavaScript object

Apply a template

Map the values in a graph

Map the keys in a graph

Copy virtual files into real files

Serve a folder

Serve a virtual graph

Define a command-line traversable site

Copy a traversable web site to local files

Crawl a site and copy to local files

Read front matter
