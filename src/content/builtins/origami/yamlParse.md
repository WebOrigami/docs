---
title: yamlParse(text)
supertitle: "origami:"
---

Parses the indicated text as JSON or [YAML](https://en.wikipedia.org/wiki/YAML). The parsed plain JavaScript object is returned or, if the parse fails, this returns `undefined`.

You will generally only need to call `jsonParse` in cases where you are obtaining YAML values from a web service. Origami will already [unpack](/language/fileTypes.html#unpacking-files) local or web YAML files you reference in Origami expressions.

To parse a quoted argument on the command line:

```console
$ ori yamlParse "'[1, 2, 3]'"
- 1
- 2
- 3
```

To convert something to YAML format, see [`yaml`](yaml.html). See also [`jsonParse`](jsonParse.html), which is focused on parsing JSON.
