---
title: debug2(tree)
supertitle: "Dev."
---

Serves the indicated tree with debugging features enabled. See also the [`serve`](serve.html) command, which serves a tree without debugging features.

```console
$ ori debug2 site.ori
```

This will display a local URL for the running debug server; you can open the URL in your browser to see your site.

**Caution:** Do not deploy a debug server! You should only enable debugging features for local debugging — the ability to invoke Origami commands from inside the browser (below) is far too powerful a feature to give to site visitors. Among other things, access to the [`shell`](/builtins/origami/shell.html) command would essentially provide a site visitor with a command line on the host machine.

## File watching

The `debug2` command monitors the local project file system for changes.

- If you edit a file in your project, `debug2` will remove any affected site resources from the [cache](/language/caching.html) so that when you refresh your browser you will immediately see the edit's effects.
- If you edit a JavaScript file, `debug2` will restart the local server so that it will pick up the changes. The restart will take a second or two.

## Origami commands in the browser

You can issue Origami commands in the browser's address bar by prefixing the command with a `!` exclamation mark.

For example, the [`svg`](svg.html) built-in function lets you generate an SVG diagram of a tree in the command line:

```console
$ ori svg site.ori
```

The `debug2` facility lets you issue this same command from inside the browser. If you launch the server following the example at the top, then in the browser's address bar you can browse to a URL like

```
http://localhost:5000/!svg
```

to obtain an SVG diagram rooted at that point in the tree.
