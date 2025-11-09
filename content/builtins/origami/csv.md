---
title: csv(object)
supertitle: "Origami."
---

Render an array or tree of objects in CSV ([comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values)) format in compliance with [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180).

The first object is taken as representative of the set, and its properties used to establish both the header and which properties of all objects will be included in the output. Per RFC 4180, the line breaks are carriage return and line feed characters.

```yaml
# catBreeds.yaml
${ samples/help/catBreeds.yaml }
```

```console
$ ori Origami.csv catBreeds.yaml
${ Origami.csv(samples/help/catBreeds.yaml) }
```

See also support for unpacking [comma-separated values files](/language/fileTypes.html#comma-separated-values-files).
