---
title: applyChanges(source, target)
supertitle: "Tree."
---

Given a target tree and a source tree, this:

1. Obtains the [manifests](manifest.html) of both trees.
2. Compares the manifests using [`Tree.changes`](changes.html).
3. If there are any changes, it calls [`Tree.apply`](apply.html) to apply just the changes to the target tree.

After the operation, the target should exactly match the source. The function returns the result of the comparison in the same format as `Tree.changes` so you can see what was changed.

When the target is a tree of files on a network server, calling `applyChanges` can be much more efficient than clearing the target and copying over all entries from the source. This relies on representing the target using an Origami extension that exposes a `manifest()` method.

## Example

As in the [example](apply.md#example) for `Tree.apply`, the `Tree.applyChanges` function can update a local or network folder with changes.

If the `build` folder contains some files:

```console
$ ori build
${ Origami.yaml(samples/help/publish/site1.ori) }
```

and an Origami file now includes a change to `about.html`:

```ori
// site.ori
${ samples/help/publish/site2.ori }
```

If you invoke `Tree.applyChanges`, it will display what changed, and the `build` folder will reflect those changes.

```console
$ ori Tree.applyChanges site.ori, build
${ Origami.yaml(
  Tree.applyChanges(
    samples/help/publish/site2.ori
    Tree.clone(samples/help/publish/site1.ori)
  )
) }
$ ori build
${ Origami.yaml(samples/help/publish/site2.ori/) }

```
