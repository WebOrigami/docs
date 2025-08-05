---
title: "files: protocol"
subtitle: To access file system folders and files
---

Returns an [FileTree](/async-tree/FileTree.html) representation of the current directory or (if `dirname` is supplied) subdirectory named `dirname` within the current directory.

Because the Origami language recognizes many types of file paths, you won't often need to explicitly invoke the `files` command.

For example, suppose the current folder contains a subfolder called `misc`. To display the contents of that folder in the terminal, you could write:

```console
$ ori files:misc
```

But you can also write:

```console
$ ori ./misc
```

or just

```console
$ ori misc
```

One situation where invoking `files` is often necessary is specifying the target of a [`copy`](tree/copy.html) operation as a folder that does not yet exist.

## Root directory

If you want to reference the root directory with the `files:` protocol, start the path with _three_ slashes. E.g., to list the names of the contents of `/etc`:

```
$ ori keys files:///etc
```

As noted above, you can also just use the file path:

```
$ ori keys /etc
```
