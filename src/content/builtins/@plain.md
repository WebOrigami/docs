---
title: "plain([treelike])"
---

Converts an asynchronous async tree into a synchronous plain JavaScript object. The supplied argument can be any [treelike object](/async-tree/treelike.html) such as a JSON/YAML file, file system folder, etc. If omitted, `plain` converts the current tree — in the command line, this will be the current folder — to a plain JavaScript object.

A common use for `plain` is to convert a tree into a form that you can pass to any function that works with plain JavaScript objects.
