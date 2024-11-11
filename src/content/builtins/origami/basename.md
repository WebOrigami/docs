---
title: "basename(text)"
supertitle: "origami:"
---

For a string that looks like a file name with an extension, like "index.html", this returns the portion of the string before the last period. If the text contains no period, the entire text is returned.

```console
$ ori basename/test.html
test
$ ori basename/test.x.y.z
test.x.y
$ ori basename/test
test
```
