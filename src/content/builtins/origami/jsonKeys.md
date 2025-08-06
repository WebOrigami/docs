---
title: jsonKeys(tree)
supertitle: "site:"
---

This function implements the [JSON Keys protocol](/async-tree/jsonKeys.html) for a tree-like structure. It generates a `.keys.json` file for each route in the tree, listing the keys available at that route.

Suppose a site has the following structure:

```ori
// site.ori
{
  about: {
    index.html: "About Us"
  }

  index.html: "Home page"
}
```

Applying the `jsonKeys` function to this tree will add the `.keys.json` files at all levels:

```console
$ ori jsonKeys site.ori
about:
  index.html: About Us
  .keys.json: '["index.html"]'
index.html: Home page
.keys.json: '["about/","index.html"]'
```

By including the `.keys.json` files in the static build of the site, you will make it possible for yourself and others to completely traverse the site tree using the [SiteTree](/async-tree/SiteTree.html) class and the [`httpstree:`](/builtins/httpstree.html) protocol.

See also [`static`](static.html).
