---
title: groupBy(map, fn)
supertitle: "Tree."
---

This function creates a new tree that groups values according to the result of a grouping function.

For example, suppose the data for a set of books includes a `genre` field that can have multiple values:

```console
$ cat books.yaml
${ samples/help/books.yaml }
```

The books can then be grouped by genre. Here the `=_/genre` function is shorthand for `(book) => book/genre`. This function lets the `groupBy` built-in know what the books should be grouped by.

```console
$ ori Tree.groupBy books.yaml, =_.genre
${ Origami.yaml(Tree.groupBy(samples/help/books.yaml, (book) => book.genre)) }
```

In the result tree, the top-level keys for the groups are the individual values found in the `genre` field: "Sci-Fi", "Romance", and "Gothic". The group values are arrays containing references to all the books that included that particular genre; a single book can appear in multiple groups.

<div class="sideBySide">
  <figure>
    ${ svg([
      "[data for 1984]"
      "[data for Pride and Prejudice]"
      "[data for Jane Eyre]"
      "[data for Frankenstein]"
      "[data for The Time Traveler's Wife]"
    ]) }
  </figure>
  <figure>
    ${ svg({
      "Sci-Fi": [
        "[data for 1984]"
        "[data for Frankenstein]"
        "[data for The Time Traveler's Wife]"
      ]
      Romance: [
        "[data for Pride and Prejudice]"
        "[data for Jane Eyre]"
        "[data for The Time Traveler's Wife]"
      ]
      Gothic: [
        "[data for Jane Eyre]"
        "[data for Frankenstein]"
      ]
    }) }
  </figure>
  <figcaption>Input map</figcaption>
  <figcaption>Grouped by genre</figcaption>
</div>

A common use for `groupBy` comes up anywhere content is tagged. For example, a blog with posts that can have multiple tags may want to offer a `/tags` area showing blog posts grouped by tag.
