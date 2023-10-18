---
title: Origami expressions in YAML
---

When you load YAML files in Graph Origami, any values tagged with the `!ori` YAML tag will be evaluated as Origami expressions.

Suppose `expressions.yaml` contains:

```{{"yaml"}}
{{ samples.ori/templates/expressions.yaml }}
```

The `greetings` expression above is in parentheses, because YAML prohibits values from starting with an `@` at sign or a \` backtick. If your Origami expression starts with one of those characters, quote the expression in double quotes, or surround it with parentheses as shown above.

You can invoke this file to evaluate its expressions:

```console
$ ori expressions.yaml/
{{ @yaml samples.ori/templates/expressions.yaml/ }}
```

This lets you treat a YAML file as a template for data.
