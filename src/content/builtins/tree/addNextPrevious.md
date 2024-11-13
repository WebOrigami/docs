---
title: addNextPrevious(tree)
supertitle: "tree:"
---

This returns a new tree that extends the values in the given tree with `nextKey` and `previousKey` properties. These properties will indicate the keys of the next and previous entries in the tree. This information can then be used to, for example, add links below a blog post that take the reader to the next or previous post.

Example application of `addNextPrevious` to a tree of strings:

```console
$ cat letters.yaml
${ samples.ori/help/letters.yaml }$ ori addNextPrevious letters.yaml
${ yaml addNextPrevious samples.ori/help/letters.yaml }
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/help/letters.yaml }
  </figure>
  <figure>
    ${ svg.js addNextPrevious samples.ori/help/letters.yaml }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Result of addNextPrevious</figcaption>
</div>

If the values in the given tree aren't plain objects, they will be transformed to plain objects as follows:

- A value which is an AsyncTree will be resolved to a plain object.
- A string value will become a plain object with a `text` property containing the string.
- Any other scalar value will become a plain object with a `data` property containing the scalar value.

See also [`paginate`](paginate.html), which groups a set of items into fixed-size pages.
