---
title: jsonKeys(tree)
supertitle: "Origami."
---

This function implements the [JSON Keys protocol](/async-tree/jsonKeys.html) for a tree-like structure. It generates a `.keys.json` file for each route in the tree, listing the keys available at that route.

Suppose a site has the following structure:

```ori
// site.ori
${ samples/help/jsonKeys/site.ori }
```

You can wrap the site definition with a call to`jsonKeys`:

```ori
// site.ori
${ samples/help/jsonKeys/site2.ori }
```

to add the `.keys.json` files at all levels:

```console
$ ori site.ori/.keys.json
${ samples/help/jsonKeys/site2.ori/.keys.json }

$ ori site.ori/about/.keys.json
${ samples/help/jsonKeys/site2.ori/about/.keys.json }

```

Alternatively, you could change the site's [build script](/cli/incantations.html#building-a-site-as-static-files) in `package.json` to invoke `Origami.jsonKeys`:

```
"build": "ori 'copy Origami.jsonKeys(src/site.ori), clear files:build'"
```

By including the `.keys.json` files in the static build of the site, you will make it possible for yourself and others to completely traverse the site tree using the [SiteMap](/async-tree/SiteMap.html) class and the [`explore:`](/builtins/protocol/explore.html) protocol.

See also [`static`](static.html).
