---
title: addNextPrevious(tree)
supertitle: "Tree."
---

This returns a new tree that extends the values in the given tree with `nextKey` and `previousKey` properties. These properties will indicate the keys of the next and previous entries in the tree. This information can then be used to, for example, add links below a blog post that take the reader to the next or previous post.

Example application of `addNextPrevious` to a tree of strings:

```console
$ cat letters.yaml
${ samples.jse/help/letters.yaml }$ ori Tree.addNextPrevious letters.yaml
${ Origami.yaml(Tree.addNextPrevious(samples.jse/help/letters.yaml)) }
```

<div class="sideBySide">
  <figure>
    ${ svg.js(samples.jse/help/letters.yaml) }
  </figure>
  <figure>
    ${ svg.js(Tree.addNextPrevious(samples.jse/help/letters.yaml)) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result of addNextPrevious</figcaption>
</div>

If the values in the given tree aren't objects, they will be transformed to plain objects as follows:

- A value which is a treelike will be resolved to a plain object.
- Any other value (e.g., a string) will become a plain object with a `value` property containing the value.

See also [`paginate`](paginate.html), which groups a set of items into fixed-size pages.
