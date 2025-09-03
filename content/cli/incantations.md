---
title: Standard Origami incantations
---

Many of the sample Origami projects like the [language tutorial](https://github.com/WebOrigami/language-intro) and the minimal [starter project](https://github.com/WebOrigami/origami-start) contain npm `start` and `run` commands that invoke the ori CLI using stock "incantations". This page explains how those incantations work.

## Starting an Origami server with debugging

The `npm run start` command for most Origami sample projects will issue the following command:

```
ori serve watch src, =debug src/site.ori
```

The purpose of the incantation is to serve the `site.ori` file locally, reloading the file if it or anything else in the `src` folder changes.

- The expression omits parentheses to avoid needing to quote them.
- The `=` is a shorthand for an [unnamed function](/language/syntax.html#lambdas-unnamed-functions) call that could also be written as `() =>`.
- So the incantation could also be rewritten with explicit parentheses and the longer function syntax `ori "serve(watch(src, () => debug(src/site.ori)))"`.
- The [`debug`](/builtins/dev/debug.html) call wraps the virtual tree defined in `src/site.ori` to add various routes that expose browser-based debugging tools.
- The [`watch`](/builtins/dev/watch.html) function here monitors the `src` folder for changes. The result of the `watch` call is a tree that delegates calls to the result of calling the second argument (the function) — with the additional behavior that, if anything changes in the monitored folder, the function will be re-evaluated to get a new tree; the initial tree `watch` returned will now delegate calls to the new tree.
- The [`serve`](/builtins/dev/serve.html) function serves the result of `watch`, which in turn is the tree in the latest `site.ori` plus debugging features.

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
