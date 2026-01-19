---
title: "files: protocol"
subtitle: To access file system folders and files
---

Returns an [FileMap](/async-tree/FileMap.html) representation of the current directory or (if `dirname` is supplied) subdirectory named `dirname` within the current directory.

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

One situation where invoking `files` is often necessary is specifying the target of a [`copy`](/builtins/dev/copy.html) operation as a folder that does not yet exist.

## Using files: in an Origami program

Inside a .ori (or .ori.html, etc.) program, a `files:` expression always resolves relative to the folder that contains that program.

For example, consider a project called `myProject` with this structure:

```
myProject/
  src/
    site.ori
```

If site.ori contains the expression `files:foo`. this reference returns `myProject/src/foo`.

If you want a file reference that’s relative to your project root, use [`Origami.projectRoot`](/builtins/Origami/projectRoot.html). If the above site.ori wanted to reference `myProject/foo`, it could do so with `Origami.projectRoot()/foo`.

## Root directory

If you want to reference the file system root directory with the `files:` protocol, start the path with _three_ slashes. E.g., to list the names of the contents of `/etc`:

```
$ ori keys files:///etc
```

As noted above, you can also just use the file path:

```
$ ori keys /etc
```
