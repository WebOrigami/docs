---
title: basename(text)
supertitle: "origami:"
---

For a string that looks like a file name with an extension, like "index.html", this returns the portion of the string before the last period. If the text contains no period, the entire text is returned.

```console
$ ori basename/test.html
${ basename/test.html + "\n" }
$ ori basename/test.x.y.z
${ basename/test.x.y.z + "\n" }
$ ori basename/test
${ basename/test + "\n" }
```

This behaves slightly different from the Node.js [basename](https://nodejs.org/dist/v19.9.0/docs/api/path.html#pathbasenamepath-suffix) command, which is available in Origami as `path/basename`. The Node.js `basename` command only strips the extension if the expected extension is provided as an argument:

```console
$ ori "path/basename('foo.txt')"
${ path/basename('foo.txt') + "\n" }
$ ori "path/basename('foo.txt, '.txt')"
${ path/basename('foo.txt', '.txt') + "\n" }
```
