---
title: Origami expressions in YAML
samples: !ori node_modules/@graphorigami/samples/src
---

When you load YAML files in Graph Origami, any values tagged with the `!ori` YAML tag will be evaluated as Origami expressions.

If `expressions.yaml` contains:

```{{"yaml"}}
{{ samples/expressions.yaml }}
```

Then you can invoke this file to evaluate its expressions:

```console
$ ori "expressions.yaml()"

*** doesn't work ***

{{ samples/expressions.yaml/ }}
```

Note that the `greetings` expression above is in parentheses. YAML prohibits values from starting with certain characters like an `@` at sign or a \` backtick. If your Origami expression starts with one of those characters, quote the expression in double quotes, or surround it with parentheses as shown above.
