---
title: Standard Origami incantations
---

Many of the sample Origami projects like the [language tutorial](https://github.com/WebOrigami/language-intro) and the minimal [starter project](https://github.com/WebOrigami/origami-start) contain npm `start` and `run` commands that invoke the ori CLI using stock "incantations". This page explains how those incantations work.

## Starting an Origami server with debugging

The `npm run start` command for most Origami sample projects will issue the following command:

```
ori debug2 src/site.ori
```

The purpose of the incantation is to serve the `site.ori` file locally.

- The expression omits parentheses to avoid needing to quote them. The incantation could be rewritten with explicit parentheses as `ori "debug2(src/site.ori)"`.
- The [`debug2`](/builtins/dev/debug2.html) call starts a local server with debugging features enabled.

## Building a site as static files

The `npm run build` command for most Origami sample projects will issue this command:

```
ori copy src/site.ori, clear files:build
```

This copies the virtual tree of files in `site.ori` into the local `build` folder, creating `build` and cleaning out any existing contents as necessary.

- As above, this expression omits parentheses. Adding them: `ori copy(src/site.ori, clear(files:build))`.
- The [`files:`](/builtins/protocol/files.html) protocol finds the local `build` folder and returns it as a tree. If this folder doesn't exist, then the first attempt to write to the tree will create the `build` folder.
- The [`clear`](/builtins/tree/clear.html) call deletes any existing files in `build`.
- The [`copy`](/builtins/dev/copy.html) call copies the virtual tree in `src/site.ori` to the `build` folder, thereby creating the static files necessary to deploy the site.
