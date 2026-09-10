---
title: changes(oldTree, newTree)
supertitle: "Tree."
---

This compares an old [map-based](/async-tree/mapBasedTree.html) with a new one. It does this by obtaining a [manifest](manifest.html) for both trees and then looking for differences. This function returns a new tree of strings ("added", "changed", or "deleted") that describe the changes.

This function is also exposed as [`Dev.changes`](/builtins/dev/changes.html) so that you can omit the `Tree.` prefix when calling the function from the command line. Also see the `Dev.changes` page for how you can use the command to test static sites.

## Example

A YAML file contains the following tree:

```yaml
# oldTree.yaml
${ samples/help/oldTree.yaml }
```

The file is copied and then modified to produce:

```yaml
# newTree.yaml
${ samples/help/newTree.yaml }
```

Calling `changes` indicates what values have changed:

```console
$ ori changes oldTree.yaml, newTree.yaml
${ Origami.yaml(Dev.changes(samples/help/oldTree.yaml, samples/help/newTree.yaml)) }
```

Invoking `changes` if the trees are the same returns an empty object, indicating nothing has changed:

```console
$ ori changes newTree.yaml, newTree.yaml
$
```
