---
title: inflatePaths(map)
supertitle: "Tree."
---

Given a flat [map-like](/async-tree/maplike.html) object mapping slash-separated string paths to values, this "inflates" it into the corresponding tree structure.

Example: a YAML file contains:

```yaml
# deflated.yaml
${ samples/help/paths/deflated.yaml }
```

You can inflate this into a tree:

```console
$ ori Tree.inflatePaths deflated.yaml
${ Origami.yaml(Tree.inflatePaths(samples/help/paths/deflated.yaml)) }
```

See also the inverse operation, [`Tree.deflatePaths`](deflatePaths.html).
