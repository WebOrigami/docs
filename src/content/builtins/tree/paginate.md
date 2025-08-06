---
title: paginate(tree, [size])
supertitle: "Tree."
---

This returns a new tree that groups the original keys and values into "pages": fixed-size sets of items that are no bigger than `size` (default: 10). A typical use for this is breaking a long list of blog posts, search results, etc., into multiple web pages.

```console
$ cat countries.yaml
${ samples.jse/cli/countries.yaml }
```

The above set of countries can be broken into pages of (up to) 3 items each:

```console
$ ori Tree.paginate countries.yaml, 3
${ Origami.yaml(Tree.paginate(samples.jse/cli/countries.yaml, 3)) }
```

Each page includes:

- `items`: the items assigned to this page
- `nextPage`: the number of the next page, or `null` for the last page
- `pageCount`: the total number of pages
- `pageNumber`: the number assign to this page, starting with 1
- `previousPage`: the number of the previous page, or `null` for the first page

<div class="sideBySide">
  <figure>
    ${ svg.js(Tree.map(samples.jse/cli/countries.yaml, (country) => `[data for ${country.name}]`)) }
  </figure>
  <figure>
    ${ svg.js({
      "1": {
        items: [
          "[data for France]"
          "[data for Greece]"
          "[data for Italy]"
        ]
        nextPage: 2
        pageCount: 2
        pageNumber: 1
        previousPage: null
      }
      "2": {
        items: {
          "3": "[data for Portugal]"
          "4": "[data for Spain]"
        }
        nextPage: null
        pageCount: 2
        pageNumber: 2
        previousPage: 1      
      }
    }) }
  </figure>
  <figcaption>Input tree</figcaption>
  <figcaption>Grouped into pages</figcaption>
</div>

See also [`addNextPrevious`](addNextPrevious.html), which cross-links a series of items without grouping them into pages.
