---
title: debug(tree)
supertitle: "Dev."
---

Adds features to the indicated tree that facilitate debugging in the browser.

You can enable these features by including `debug` in the command that serves a tree:

```console
$ ori serve debug site.ori
```

**Caution:** You should only enable debugging features for local debugging — the ability to invoke Origami commands from inside the browser (below) is far too powerful a feature to give to site visitors. Among other things, access to the [`shell`](/builtins/origami/shell.html) command would essentially provide a site visitor with a command line on the host machine.

## Origami commands in the browser

You can issue Origami commands in the browser's address bar by prefixing the command with a `!` exclamation mark.

For example, the [`svg`](svg.html) built-in function lets you generate an SVG diagram of a tree in the command line:

```console
$ ori svg site.ori
```

The `debug` facility lets you issue this same command from inside the browser. If you launch the server following the example at the top, then in the browser's address bar you can browse to a URL like

```
http://localhost:5000/!svg
```

to obtain an SVG diagram rooted at that point in the tree.
