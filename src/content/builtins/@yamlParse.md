---
title: "yamlParse(text)"
---

Parses the indicated text as JSON or YAML. The parsed plain JavaScript object is returned or, if the parse fails, this returns `undefined`. This can be used to parse JSON or YAML files.

Parsing a quoted argument on the command line:

```console
$ ori yamlParse "'[1, 2, 3]'"
- 1
- 2
- 3
```

See also [`jsonParse`](jsonParse.html), which is focused on parsing JSON.
