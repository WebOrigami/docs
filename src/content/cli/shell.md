---
title: Shell scripting
---

## Invoking Origami programs as shell commands

Origami language syntax allows you to include add a [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) directive at the top of an Origami program. If you mark the file as executable (e.g., via `chmod`), you will be able to invoke the program with just its file name — without having to specify the use of `ori` in the command.

For example, this Origami function accepts a tree and displays the keys of that tree in an HTML list:

```ori
${ samples/cli/list.ori }
```

You can store this in a file called `list.ori` and mark that file as executable.

The shebang directive is the first line of the file and starts with `#!`. This lets you invoke this just by typing the file's name.

If the file is in the current directory, for example, you can invoke it by typing `./list.ori`.

If you put that `list.ori` file somewhere in your system path, then you can invoke it from any directory to, for example, generate an HTML list of that folder's file names.

```console
$ ls
file1.txt  file2.txt  file3.txt
$ list.ori .
<ul>
  <li>file1.txt</li>
  <li>file2.txt</li>
  <li>file3.txt</li>
</ul>
```
