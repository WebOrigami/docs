---
title: manifest(tree)
supertitle: "Tree."
---

Returns a new [map-based tree](/async-tree/mapBasedTree.html) where the same keys as the original, but with the values mapped to their [hash value](/builtins/origami/hash.html).

## Example

A tiny site contains the following files:

```ori
// site1.ori
${ samples/help/publish/site1.ori }
```

The manifest for this site shows the hash values for every resource in the tree:

```console
$ ori Tree.manifest site1.ori
${ Origami.yaml(Tree.manifest(samples/help/publish/site1.ori)) }
```

Each of the hex strings characterizes the current content of the corresponding resource. If you were to change any of the resource definitions, the affected hash values would change.

Suppose you copy the site and change the text of just `about.html`:

```ori
// site2.ori
${ samples/help/publish/site2.ori }
```

Now when you get the manifest for the updated site…

```console
$ ori Tree.manifest site2.ori
${ Origami.yaml(Tree.manifest(samples/help/publish/site2.ori)) }
```

the hash value for `about.html` has changed. The hash value for `index.html` remains the same as before, because `index.html` didn't change.

In this way, a manifest for a site (or a folder of files, etc.) is a way of very concisely reflecting the state of all the content.

## Comparing manifests

You can compare two manifests to see if they reflect exactly the same content. The [`Tree.changes`](changes.html) builtin exists for precisely that purpose. Give the function two sites, and it will compare manifests to determine any changes between them:

```console
$ ori changes site1.ori, site2.ori
${ Origami.yaml(
  Tree.changes(
    samples/help/publish/site1.ori
    samples/help/publish/site2.ori
  )
) }

```

The [`Tree.applyChanges`](applyChanges.html) function compares manifests in this way to determine what values have changed and therefore need to be applied to a target tree. That process is one of the ways [`Dev.publish`](/builtins/dev/publish.html) may use to publish a site to a network host.
