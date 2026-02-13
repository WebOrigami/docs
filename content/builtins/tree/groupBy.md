---
title: groupBy(map, fn)
supertitle: "Tree."
---

Groups values in the [map-like](/async-tree/maplike.html) object according to the result of a grouping function, returning a new [map-based tree](/async-tree/mapBasedTree.html).

For example, suppose the data for a set of anime includes a `genre` field that can have multiple values:

```console
$ cat anime.yaml
${ samples/help/anime.yaml }
```

The anime can then be grouped by genre:

```console
$ ori "Tree.groupBy(anime.yaml, (anime) => anime.genre)"
${ Origami.yaml(Tree.groupBy(samples/help/anime.yaml, (anime) => anime.genre)) }
```

In the result tree, the top-level keys for the groups are the individual values found in the `genre` field: "Comedy", "Drama", etc. The group values are arrays containing references to all the items that included that particular genre; a single item can appear in multiple groups.

<div class="sideBySide">
  <figure>
    ${ svg([
      "[data for Kaguya-sama]"
      "[data for Oshi no Ko]"
      "[data for Spy x Family]"
      "[data for Wolf Children]"
    ]) }
  </figure>
  <figure>
    ${ svg({
      "Comedy": [
        "[data for Kaguya-sama]"
        "[data for Spy x Family]"
      ]
      Drama: [
        "[data for Oshi no Ko]"
        "[data for Wolf Children]"
      ]
      Fantasy: [
        "[data for Wolf Children]"
      ]
      Romance: [
        "[data for Kaguya-sama]"
      ]
      "Slice of Life": [
        "[data for Oshi no Ko]"
        "[data for Wolf Children]"
      ]
    }) }
  </figure>
  <figcaption>Input map</figcaption>
  <figcaption>Grouped by genre</figcaption>
</div>

A common use for `groupBy` comes up anywhere content is tagged. For example, a blog with posts that can have multiple tags may want to offer a `/tags` area showing blog posts grouped by tag.

It's also common to group items by year or month.