---
title: filter(tree, options)
supertitle: "tree:"
---

Applies a filter operation to a tree, returning only those values that pass a `test` function.

The `options` parameter can be either a function that will be used as the `test` function or a dictionary of options:

- `deep`: a boolean (default: false) indicating whether the filter should be applied deeply
- `test`: a function to use to test values for inclusion

The `test` function will be called with the `value`, `key`, and `tree` of each key/value in the tree. The `test` function should return a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) result if the value should be included in the result of the `filter` operation.

See also [`tree:mask`](mask.html).

## Example

The `filter` operation can be used, for example, to filter a set of blog posts and return only published blog posts — those with a false or missing `draft` property. This would commonly be applied to a set of post files, but for illustration purposes can be applied to a small data set in a YAML file:

```yaml
# posts.yaml
${ <samples.jse/help/filter/posts.yaml> }
```

The filter operation returns `true` if the `draft` property is missing or `false`:

```ori
// published.ori
${ <samples.jse/help/filter/published.ori> }
```

Applying this to the posts returns just the published posts:

```console
$ ori published.ori/
${ yaml samples.jse/help/filter/published.ori/ }
```
