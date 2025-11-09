---
title: tsv(object)
supertitle: "Origami."
---

Render an array or tree of objects in TSV ([tab-separated values](https://en.wikipedia.org/wiki/Tab-separated_values) format with a header row.

The first object is taken as representative of the set, and its properties used to establish both the header and which properties of all objects will be included in the output. The line breaks will use the default line break for the operating system.

```yaml
# movies.yaml
${ samples/templateDocuments/movies/movies.yaml }
```

```console
$ ori Origami.tsv movies.yaml
${ Origami.tsv(samples/templateDocuments/movies/movies.yaml) }
```

See also support for unpacking [tab-separated values files](/language/fileTypes.html#tab-separated-values-files).
