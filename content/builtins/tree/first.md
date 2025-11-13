---
title: first(map)
supertitle: "Tree."
---

Returns the first value in the map. This can be useful in the CLI to quickly inspect a sample value from a map.

For example, if a data pipeline processes content into data ready for templating, `first` can be used to check that the data coming out of the pipeline is correct. If the data is an array, then a normal array index like `[0]` can be used to view a specific value. But if the data is another kind of object, you can use `first` to pick out a single value that may represent the rest.

This data file has string keys:

```yaml
# movies.yaml
${ samples/templateDocuments/movies/movies.yaml }
```

You can extract the first value with:

```console
$ ori Tree.first movies.yaml
${ Origami.yaml(Tree.first(samples/templateDocuments/movies/movies.yaml)) + "\n" }
```
