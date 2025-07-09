---
title: group(tree, fn)
supertitle: "tree:"
---

This function creates a new tree that groups values according to the result of a grouping function.

For example, suppose the data for a set of books includes a `genre` field that can have multiple values:

```console
$ cat books.yaml
${ samples.jse/help/books.yaml }
```

The books can then be grouped by genre. Here the `=_/genre` function is shorthand for `(book) => book/genre`. This function lets the `group` built-in know what the books should be grouped by.

```console
$ ori group books.yaml, =_/genre
${ yaml group samples.jse/help/books.yaml, =_/genre }
```

In the result tree, the top-level keys for the groups are the individual values found in the `genre` field: "Sci-Fi", "Romance", and "Gothic". The group values are arrays containing references to all the books that included that particular genre; a single book can appear in multiple groups.

<div class="sideBySide">
  <figure>
    ${ <svg.js>([
      "[data for 1984]"
      "[data for Pride and Prejudice]"
      "[data for Jane Eyre]"
      "[data for Frankenstein]"
      "[data for The Time Traveler's Wife]"
    ]) }
  </figure>
  <figure>
    ${ <svg.js>({
      Sci-Fi: [
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
  <figcaption>Input tree</figcaption>
  <figcaption>Grouped by genre</figcaption>
</div>

A common use for `group` comes up anywhere content is tagged. For example, a blog with posts that can have multiple tags may want to offer a `/tags` area showing blog posts grouped by tag.
