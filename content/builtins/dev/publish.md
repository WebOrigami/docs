---
title: publish(source, target, [options])
supertitle: "Dev."
---

This updates the `target` [map-based tree](/async-tree/mapBasedTree.html) to match the `source` tree using one of several different methods. You can call this function to publish your Origami site to a network host in one of several ways.

Depending on the `target` and `options`, `publish` will pick the first of these methods that applies:

1. **Custom publishing API**. This approach is used by Origami extensions for specific network hosts that have custom publishing APIs. Example: Origami's [Netlify extension](https://github.com/WebOrigami/extensions/tree/main/netlify).
2. **Target can provide a manifest.** If the `target` defines a custom `manifest()` method, [`Tree.applyChanges`](/builtins/tree/applyChanges.html) is invoked to copy over only the resources differ between the `source` and `target`. This approach is used for network hosts with an API that can define some kind of [manifest](/builtins/tree/manifest.html) indicate what files the server currently has. Example: Origami's [Neocities extension](https://github.com/WebOrigami/extensions/tree/main/neocities), or the [`Origami.sftp`](/builtins/origami/sftp.html) builtin if you have shell access.
3. **A local manifest records what's been published.** You can supply an `options` dictionary with a `manifest` property identifying where you would like Origami to save a local copy of the `target` manifest. See "Saving a local manifest" below.
4. **Clear and copy**. The existing contents of the `target` will be erased with [`Tree.clear`](/builtins/tree/clear.html), and then [`Tree.apply`](/builtins/tree/apply.html) will be used to copy the entire `source` tree to the `target`. This can be used with any file storage target, but may be slow.

## Saving a local manifest

To avoid copying over the entire contents of a source tree to a target tree, you can provide options to `publish` that indicate:

- `manifest` - the name of a local manifest file in JSON format, like `published-files.json`. This file does not need to exist; `publish` will create it.
- `manifestContainer` - an optional reference to a local folder where the manifest file can be found. (This is an Origami reference like `path/to/files`, not a quoted string path like `"path/to/files"`.) If omitted, by default the manifest container will be the current folder if using the command line or, if calling `publish` in a `.ori` file, the folder containing that file.

For example, suppose you have followed the instructions for Origami's [SFTP extension](https://github.com/WebOrigami/extensions/tree/main/sftp) and created a file `heliohost.ori` that lets you connect to your site hosted on [Heliohost](https://heliohost.org):

```ori
// heliohost.ori
package:@weborigami/sftp({
  host: "morty2.heliohost.org"
  password: <your password here>
  path: "/<your user name here>/httpdocs"
  port: 1373
  username: <your user name here>
})
```

With that in place, you can then publish to Heliohost with:

```console
$ ori "publish src/site.ori, heliohost.ori, { manifest: 'heliohost.json' }"
```

The first time you call `publish`, the entire site will be uploaded to the server — and a manifest of which files were published will be saved in `heliohost.json`. The next time you call `publish`, that manifest will be consulted to determine what files have changed, and only the changed files will be uploaded.

## Improving the performance of incremental site builds

As an optimization, you may be able to use the same manifest technique above to speed up the time required to build a large site. Add a `manifest` option to the `publish` command, for example in an npm script in your `package.json`:

```
  "scripts": {
    "build": "ori publish src/site.ori, files:build, { manifest: 'built-files.json' }"
  }
```

Each time you build the site with `npm run build`, `publish` will update `built-files.json` to reflect the current state of the `build` folder. The next time you build the site, Origami will still need to do the work to generate each file in memory — but can consult `built-files.json` to determine exactly which files have changed and need to be copied.

Whether this `manifest` option makes a noticeable difference in build time depends on a number of factors, including your hardware, how large your site is, and how many files have changed. You can time the execution of builds with `time npm run build` both with and without the `manifest` option to see whether the option makes sense for your project.
