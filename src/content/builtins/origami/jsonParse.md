---
title: jsonParse(text)
supertitle: "origami:"
---

Parses the indicated text as JSON using the JavaScript [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

You will generally only need to call `jsonParse` in cases where you are obtaining JSON values from a web service. Origami will already [unpack](/language/fileTypes.html#unpacking-files) local or web JSON files you reference in Origami expressions.

See also [`yamlParse`](yamlParse.html).
